import {Component, Input, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-record-details-container',
  templateUrl: './record-details-container.component.html',
  styleUrls: ['./record-details-container.component.css']
})
export class RecordDetailsContainerComponent {
  @Input() caseDetails;
  @Input() recordHistory;
  @Input() expandCollapseBtnsVisible: boolean = true;

  @ViewChild(MatAccordion) accordion: MatAccordion;



}
