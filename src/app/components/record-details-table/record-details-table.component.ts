import {Component, Input} from '@angular/core';
import { TableValues } from "../record-details/record-details.component";

@Component({
  selector: 'app-record-details-table',
  templateUrl: './record-details-table.component.html',
  styleUrls: ['./record-details-table.component.css']
})
export class RecordDetailsTableComponent {
  @Input() tableData: TableValues[];
}
