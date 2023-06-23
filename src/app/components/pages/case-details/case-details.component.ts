import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})

export class CaseDetailsComponent implements OnInit {

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;

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
