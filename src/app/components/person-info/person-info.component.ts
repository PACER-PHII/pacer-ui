import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent {

  constructor(private router: Router){};
  onViewRecordHistory() {
   // this.router.navigate(['/record-history', this.recordId]);
  }
}
