# PacerUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Installation instructions for the UI

## Windows IIS installation instructions:
 A detailed instructions of how to deploy angular app on IIS server can be found here: https://levelup.gitconnected.com/how-to-deploy-angular-app-to-an-iis-web-server-complete-setup-337997486423

1. Download Microsoft Remote Desktop
2. Login with you username and password credentials to [http://yellowisland01.icl.gtri.org](http://yellowisland01.icl.gtri.org). Hint: your username should be in the format: `gtri username`+`a`, there `a` is a character appended to your username.
3. Open the IIS manager. You can do so by typing "iis man" in the searchbar.
4. Find the pacerui deployment directory, and open a terminal at the location.
5. Pull the code from the github repository [https://github.com/gt-health/pacer-ui.git](https://github.com/gt-health/pacer-ui.git)
6. Install the app using `npm install`.
7. Locate the `angular.json` and modify the dist path (the line: "outputPath": "dist/pacer-ui"), folder to current folder (which is the directory from which IIS is launching the app).
8. Build the app using `ng build`.
6. Verify the app is running pointing your browser to [http://localhost:8080](http://localhost:8080]) (or the port configured to serve the webapp).
Note: you don't need to restart the server for the changes to take effect.

## Apache installation instructions:

1. From the apache config file find where the dist folder from which the app is served. It should be something like: `/var/www/dist`
2. Open a terminal at the folder.
3. Clone the github repository from [https://github.com/gt-health/pacer-ui.git](https://github.com/gt-health/pacer-ui.git)
4. Install the app using `npm install`.
5. Locate the `angular.json` and modify the dist path (the line: "outputPath": "dist/pacer-ui"), folder to current folder.
6. Build the file using `ng build`
7. Restart the apache server.
8. Verify that the app is running by pointing the browser to [http://localhost:8080](http://localhost:8080]), or the port configured to serve the web app.
Note: You must restart the Apache server in order for the changes to take effect.
