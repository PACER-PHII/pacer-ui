import {Component, OnInit} from '@angular/core';
import {CaseRecordService} from "../../service/case-record.service";
import {ActivatedRoute} from "@angular/router";
import {PersonInfo} from "../../domain/person-info";
import {PersonInfoService} from "../../service/person-info.service";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.scss']
})
export class RecordHistoryComponent implements OnInit {
  recordHistory: any;

  constructor(
    private caseRecordService: CaseRecordService,
    private route: ActivatedRoute,
    private personInfoService: PersonInfoService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    const recordId = parseInt(this.route.snapshot.params['id']);
    this.caseRecordService.getRecordHistoryById(recordId).subscribe({
      next: value => this.recordHistory = value,
      error: err => console.error(JSON.stringify(err))
    });
    this.caseRecordService.getRecordDetailsById(recordId).subscribe(
      (response: any) => {
        const personInfo = new PersonInfo(response, this.utilsService);
        this.personInfoService.setPersonInfo(personInfo);
      });
  }

}
