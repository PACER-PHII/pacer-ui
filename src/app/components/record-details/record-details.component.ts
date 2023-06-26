import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

export interface TableValues{
  keys: string[];
  label: string;
  value?: string;
}

export interface RecordDetailsSection{
  sortOrder: number;
  displayName: string;
  expanded: boolean;
  tableData: TableValues[];
}

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})

export class RecordDetailsComponent implements OnInit {

  panelOpenState: boolean;

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;

  //This is configuration array for the sections showed
  recordDetailsSection: RecordDetailsSection[] = [
    { sortOrder: 0, displayName: "Provider",          expanded: false,
      tableData: [
        { keys: ['Provider', 'Name'], label: "Name" },
        { keys: ['Provider', 'Phone'], label: "Phone" },
        { keys: ['Provider', 'Country'], label: "Country" },
        { keys: ['Provider', 'Phone'], label: "Phone" },
        { keys: ['Provider', 'Email'], label: "Email" },
        { keys: ['Provider', 'Facility'], label: "Facility" },
        { keys: ['Provider', 'Fax'], label: "Fax" },
      ]
    },
    { sortOrder: 1, displayName: "Facility",          expanded: false,
      tableData:[],
    },
    { sortOrder: 2, displayName: "Identifying Info",  expanded: false,
      tableData:[],
    },
    { sortOrder: 3, displayName: "Guardian",          expanded: false,
      tableData:[],
    },
    { sortOrder: 4, displayName: "Immunization",      expanded: false,
      tableData:[],
    },
    { sortOrder: 5, displayName: "Dates",             expanded: false,
      tableData:[],
    },
    { sortOrder: 6, displayName: "Diagnostics",       expanded: false,
      tableData:[],
    },
    { sortOrder: 7, displayName: "Medication",        expanded: false,
      tableData:[],
    },
    { sortOrder: 8, displayName: "Lab Results",       expanded: false,
      tableData:[],
    },
    { sortOrder: 9, displayName: "Symptoms",          expanded: false,
      tableData:[],
    },
  ];


  constructor(
    private route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private responsive: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCaseDetails(this.recordId);

    this.responsive.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Medium,
      Breakpoints.Small,
    ])
      .subscribe(result => {

        this.isLargeScreenMode = true;

        if (result.matches) {
          this.isLargeScreenMode = false;
        }

      });
  }

  getCaseDetails(caseId: number): void{
    this.caseRecordService.getRecordDetailsById(caseId).subscribe(
      (response: any) => {
        console.log(response);
        this.recordDetailsSection.forEach(
          section => section.tableData?.forEach(element => {
            let value = response;
            for (const key of element.keys) {
              value = value[key] ;
            }
            element.value = value || '';
          }));
        this.caseDetails = response;
      }
    );
  }

  scroll(element: HTMLDivElement) {
    element.scrollIntoView();
  }

  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }
}
