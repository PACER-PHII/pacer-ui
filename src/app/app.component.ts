import { Component } from '@angular/core';
import {Router} from "@angular/router";
import  packageInfo from 'package.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pacer-ui';
  version = packageInfo.version;
  constructor(
    private router: Router,
  ){}
  onSearchRecords() {
    this.router.navigate(['/']);
  }
}
