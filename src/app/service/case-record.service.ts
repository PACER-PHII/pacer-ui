import { Injectable } from '@angular/core';
import {Observable, map, repeat, takeWhile, takeLast} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CaseRecordDTO} from "../domain/case-record-dto";
import {UtilsService} from "./utils.service";
import {EnvironmentHandlerService} from "./environment-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private environmentHandler: EnvironmentHandlerService) { }

  getCaseRecordsList():  Observable<CaseRecordDTO[]> {
    return this.http.get(this.environmentHandler.getBaseApiURL() + 'ecr-manager/ECR').pipe(map((resultList: any) =>
        resultList.map(result => new CaseRecordDTO(result, this.utilsService))
      ),
    );
  };

  getRecordDetailsById(recordId: number):  Observable<any> {
    return this.http.get(this.environmentHandler.getBaseApiURL() + 'ecr-manager/ECR', {params: new HttpParams()
      .append('id', recordId)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  getRecordHistoryById(recordId: number):  Observable<any> {
    return this.http.get(this.environmentHandler.getBaseApiURL() + "ecr-manager/ECRhistory", {params: new HttpParams()
        .append('id', recordId)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  triggerRecord(recordId: number):  Observable<any> {
    return this.http.post(this.environmentHandler.getBaseApiURL() + "ecr-manager/trigger?id=" + recordId, '').pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  checkSecondaryTriggerResult(recordId: number): Observable<any>{
    let attempts = 0;
    const THREE_MINUTES = 36;
    const TENS_SECONDS = 10000;
    return this.getRecordDetailsById(recordId).pipe(
      repeat({delay: TENS_SECONDS}),
      takeWhile(data => ((attempts++ <= THREE_MINUTES) && data.Status == "R"), true),
      takeLast(1),
    )
  }

  checkInitialTriggerResult(recordId: number): Observable<any>{
    return this.getRecordDetailsById(recordId)
  }

  downloadExcelFile() {
    const a = document.createElement('a')
    a.href = this.environmentHandler.getBaseApiURL() + "ecr-manager/exportCSV"
    a.download = this.environmentHandler.getBaseApiURL().split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  private checkResult(data) {
    //TODO verify that trigger results in status "Ready"
    return data.Status === "R";
  }
}
