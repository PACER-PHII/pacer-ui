import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CaseRecordService} from "../../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})

export class CaseDetailsComponent implements OnInit {

  caseId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;

  constructor(
    private route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private responsive: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.getCaseDetails(this.caseId);

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
    this.caseRecordService.getById(caseId).subscribe(
      (response: any) => {
        this.caseDetails = response;
      }
    );
  }

  scroll(element: HTMLDivElement) {
    element.scrollIntoView();
  }
}
