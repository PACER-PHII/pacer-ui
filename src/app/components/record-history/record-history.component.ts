import {Component, OnInit} from '@angular/core';
import {CaseRecordService} from "../../service/case-record.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.css']
})
export class RecordHistoryComponent implements OnInit {
  recordHistory: any;
  recordId = parseInt(this.route.snapshot.params['id']);
  constructor(
    private caseRecordService: CaseRecordService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(): void {
    this.caseRecordService.getRecordHistoryById(this.recordId).subscribe({
      next: value => this.recordHistory = value,
      error: err => console.error(JSON.stringify(err))
    })
  }

}
