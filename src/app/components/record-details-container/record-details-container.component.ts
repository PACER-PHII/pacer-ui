import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-record-details-container',
  templateUrl: './record-details-container.component.html',
  styleUrls: ['./record-details-container.component.css']
})
export class RecordDetailsContainerComponent {
  @Input() caseDetails;
  @Input() recordHistory;
}
