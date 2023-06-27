import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

export interface TableValues{
  keys: string[];
  label: string;
  value?: string;
}

export class SimpleKeyValue{
  key: string;
  value: string;
  constructor(key, value){
    this.key = key;
    this.value = value;
  }
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
  expansionPanelData
  tableData: any;

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;
  collection = [];

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
        // this.recordDetailsSection.forEach(
        //   section => section.tableData?.forEach(element => {
        //     let value = response;
        //     for (const key of element.keys) {
        //       value = value[key] ;
        //     }
        //     element.value = value || '';
        //   }));
        this.caseDetails = response;
        this.getProviderData(response)
      }
    );
  }

  getProviderData(response) {
    let nestedArrayList = []
    console.log()
    delete response.Id;
    for (const key in response) {
      // console.log(key);
      // console.log(response[key]);
      if (key === "Patient") {
        for (const key in response.Patient) {
          response[key] = response.Patient[key]
        }
      }
      if (!Array.isArray(response[key])) {
        let array: any[] = [];
        array.push(response[key])
        response[key] = array;
      }
      response[key]?.forEach(provider => {
     //   console.log(key);
        let arrayList: any[] = [];
        for (const key in provider) {
          if (key == 'ID') {
            const value = `${provider[key]?.type} ${provider[key]?.value}`
            const object = new SimpleKeyValue(key, value);
            arrayList.push(object);
          } else {
            const object = new SimpleKeyValue(key, provider[key]);
            arrayList.push(object);
          }

        }
        console.log(arrayList)
        nestedArrayList.push(arrayList);
        // console.log(key);
        this.tableData = {data: nestedArrayList, expanded: false, title: key};

      });
      console.log(this.tableData);
    }
    // response.Provider.forEach(provider => {
    //   let arrayList: any[] = [];
    //   for (const key in provider) {
    //     if(key != 'ID'){
    //       const object = new SimpleKeyValue(key, provider[key]);
    //       arrayList.push(object);
    //     }
    //     else {
    //       const value = `${provider[key]?.type} ${provider[key]?.value}`
    //       const object = new SimpleKeyValue(key, value);
    //       arrayList.push(object);
    //     }
    //   }
    //   nestedArrayList.push(arrayList);
    //   this.tableData = {data:nestedArrayList, expanded: false, title: 'Provider'};
    // });

  }

  scroll(element: HTMLDivElement) {
    element.scrollIntoView();
  }

  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }
}
