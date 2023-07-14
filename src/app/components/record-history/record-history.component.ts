import {Component, OnInit, ViewChild} from '@angular/core';
import {CaseRecordService} from "../../service/case-record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonInfo} from "../../domain/person-info";
import {PersonInfoService} from "../../service/person-info.service";
import {UtilsService} from "../../service/utils.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CaseRecordStatus} from "../../domain/case-record-status";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


export class RecordHistoryTableView{
  source: string;
  status: CaseRecordStatus | string | null;
  date: Date;
  diagnosis: string;
  resource: any;
  sections: string[];
  constructor(record: any, utilsService){
    this.date = record.date;
    this.source = record.source?.toUpperCase();
    this.status = utilsService.getStatus(record?.data);
    this.diagnosis = utilsService.getDiagnosisDisplayValue(record?.data?.Patient?.Diagnosis);
    this.resource = record?.data;
  }
}

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecordHistoryComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  recordHistory: any;
  parsedRecordHistory: any;
  dataSource: MatTableDataSource<RecordHistoryTableView>;
  displayedColumns: string[] = ['source', 'date', 'status', 'diagnosis'];
  columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
  expandedRecord: any | null;
  selectedSections: { selected: boolean, name: string}[];
  sections: { selected: boolean, name: string }[];
  recordId = parseInt(this.route.snapshot.params['id']);

  constructor(
    private caseRecordService: CaseRecordService,
    private route: ActivatedRoute,
    private router: Router,
    private personInfoService: PersonInfoService,
    private utilsService: UtilsService
  ) {
  }

  getFilterSections(parsedRecordHistory): any {
    return Array.from(
      new Set(parsedRecordHistory.map(record => record.source))
    ).map(selection => {
      return {selected: true, name: selection}}
    )
  }

  ngOnInit(): void {
    this.caseRecordService.getRecordHistoryById(this.recordId).subscribe({
      next: value => {
        this.recordHistory = value;
        this.parsedRecordHistory= value.map(record => {
          return new RecordHistoryTableView(record, this.utilsService)
        });
        this.dataSource = new MatTableDataSource<RecordHistoryTableView>(this.parsedRecordHistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = function(data: any, filterValue: string) {
          return data.source
            .trim()
            .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
        };

        this.sections = this.getFilterSections(this.parsedRecordHistory);
        this.selectedSections = this.getFilterSections(this.parsedRecordHistory);
        },
      error: err => console.error(JSON.stringify(err))
    });

    this.caseRecordService.getRecordDetailsById(this.recordId).subscribe(
      (response: any) => {
        const personInfo = new PersonInfo(response, this.utilsService);
        this.personInfoService.setPersonInfo(personInfo);
      });
  }

  onQueryRecord() {

  }
  onSectionSelectionChange(selections) {
    let filter ='';
    const selected = selections.filter(selection => selection.selected).map(selection => selection.name);
    if(selected.length == 0){
      //If nothing is selected we compose a string which always returns 0 results.
      filter = selections.toString();
    }
    else if(selected.length != selections.length){
      filter = selected.join().split(',').join('')
    }
    this.dataSource.filter = filter;
  }

  onViewRecordDetails() {
    this.router.navigate(['/record-details', this.recordId]);
  }
}
