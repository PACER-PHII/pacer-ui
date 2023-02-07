# Deploy on RHEL7 w/ Apache Httpd
The following steps walk through deploying the Pacer UI on RHEL7 with the Apache web server.

## Setting up the Server
If you do not have the httpd server setup, please begin by running through the following. If you have it already
configured, you may skip to the next step.

1) First, use the Yum package manager to install the Apache server: `yum install httpd`
2) Start the server with: `service httpd start`

Depending on your settings and individual security considerations, you will need to open appropriate ports. Typically, this will be port 80.

## Building the Project
Before building the project the following information should be identified:
* The hostname (and port if required) for the ECR Manager. (Note: This should be the base context, which will then be appended with "/ecr-manager/ECR/" in the application.)
* The path the Pacer UI will be served at. For example "http://pacer.example.org" would be served at the root path `/`, while "http://example.org/pacer/" would mean the app is being served at `/pacer/`.

Additionally, you will need to install Node/NPM and the Angular CLI. For Node/NPM, please follow instructions at https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.
Once that is set up, you can install the Angular CLI with `npm install -g @angular/cli`. These
will be required to build the project.

Once you have installed all needed dependencies and established the information required, you can build the project
using the following steps. This may be performed in the RHEL environment itself or on another machine with the output copied into the
RHEL environment.
1) Clone the project locally from GitHub with: `git clone https://github.com/gt-health/pacer-ui.git`
2) Navigate into the repository folder (e.g., `cd pacer-ui`).
3) Install all packages with `npm install`.
4) In the `src/environments/environment.prod.ts` file, you should see an environment variable called `apiUrl`. Set this to your ECR Manager server host. Please remember that `/ecr-manager/ECR/` is appended by the application, so you should avoid ending the URL in a `/` and make sure the full path will be correct.
5) Build the project based on the path with the following:
  * For root (`/`): Simply run `ng build`. No additional configuration is required.
  * For a specific path (Example: `/pacer-ui/`): Run `ng build --base-href /pacer-ui/`, replacing `/pacer-ui/` with your actual path. This sets the base path for asset handling in the HTML files.
6) Using default settings, this will output the build to `./dist/pacer-ui/`. Checking that folder it should contain an `index.html` file along with various `.css` and `.js` files. 

## Deploying the Application
If you built the project locally, copy the contents of the `./dist/` folder to the remote RHEL server through your
preferred means. It is recommended to keep all files together with a clear directory name, such as by moving the local `dist/pacer-ui` files to your
remote home directory at `~/pacer-ui/`.


Assuming default settings for the Apache httpd server, copy the *contents* of the `./pacer-ui/` folder to `/var/www/html/` when using the root path. At this point,
assuming the server is running correctly (and all considerations such ports being open are configured), the page should be accessible through the user's browser.


Once deployment is confirmed, the user should test that the backend API url is functioning properly as well, ensuring data is returned to the UI if available on the
server. Navigating to an individual case will direct the user's browser to `/case-details/{id}`, wherein `{id}` is the ID of the selected case. At this point, refreshing
the page will likely cause a 404 error due to the user not hitting the Angular application directly. To enable directly accessing a route, additional configuration is
required in the Apache httpd server.

First, in the `/var/www/html/` directory, or wherever you are serving your static files from based on the path, create a file named `.htaccess`. The Angular
official documentation provides a basic means to configure the server to handle Angular routing, which can be found at: 
Based on this documentation, open the `.htaccess` file and insert the following:
```
RewriteEngine On 
# If an existing asset or directory is requested go to it as it is 
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR] 
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d 
RewriteRule ^ - [L] 
 
# If the requested resource doesn't exist, use index.html 
RewriteRule ^ /index.html
```
At this point, you should try the `/case-details/{id}` path again. If it still fails to load, it indicates that the server is likely denying access to certain
overrides in the `.htaccess` file that are required. To fix this issue, open the Apache configuration file. This is typically at `/etc/httpd/conf/httpd.conf`.
In this file, locate the section headed by the `<Directory "/var/www/html>` tag. With some default comments collapsed, it will likely look like the following:
```
# Further relax access to the default document root:
<Directory "/var/www/html">
    # // Comments Collapsed //
    Options Indexes FollowSymLinks

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   Options FileInfo AuthConfig Limit
    #
    AllowOverride None

    # // Comments Collapsed //
    Require all granted
</Directory>
```
The middle section here discussing the `.htaccess` overrides is what must be changed, from "None" to "All". (More specific settings can be configured for
security purposes as needed, but that is outside the scope of this guide.)
```
    AllowOverride All
```
After saving and exiting the file, you will need to restart the httpd server with: `service httpd restart`. At this point, accessing
the `/case-details/{id}` route should function as expected, loading the case with that ID.


## Troubleshooting
### Permissions and SELinux Settings
If the application built properly but the Apache error logs (default path of `/var/log/httpd/error_log`) report that the static files cannot
be accessed with error *AH00132*, you may need to fix the reset the context of the files as they likely originated in a home directory either
from the build or copy to the server. To do so, run `sudo restorecon -R /var/www/`.
