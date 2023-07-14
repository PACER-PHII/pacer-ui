import { Injectable } from '@angular/core';
import {Observable, map, repeat, take, filter, range, retryWhen, takeWhile, takeLast} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CaseRecordDTO} from "../domain/case-record-dto";
import {UtilsService} from "./utils.service";
import {CaseRecordStatus} from "../domain/case-record-status";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor( private http: HttpClient, private utilsService: UtilsService ) { }

  getCaseRecordsList():  Observable<CaseRecordDTO[]> {
    return this.http.get(environment.apiUrl + '/ecr-manager/ECR').pipe(map((resultList: any) =>
        resultList.map(result => new CaseRecordDTO(result, this.utilsService))
      ),
    );
  };

  getRecordDetailsById(recordId: number):  Observable<any> {
    return this.http.get(environment.apiUrl + '/ecr-manager/ECR', {params: new HttpParams()
      .append('id', recordId)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  getRecordHistoryById(recordId: number):  Observable<any> {
    return this.http.get(environment.apiUrl + "/ecr-manager/ECRhistory", {params: new HttpParams()
        .append('id', recordId)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  triggerRecord(recordId: number):  Observable<any> {
    return this.http.post(environment.apiUrl + "/ecr-manager/trigger?id=" + recordId, '').pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  checkTriggerResult(recordId: number): Observable<any>{
    let attempts = 0;
    const THREE_MINUTES = 360;
    const ONE_SECOND = 1000;
    return this.getRecordDetailsById(recordId).pipe(
      repeat({delay: ONE_SECOND}),
      takeWhile(data => (attempts++ <= 2) || data.Status !== "R"),
      takeLast(1),
      map(data => data.Status),
    )
  }

  downloadExcelFile() {
    const a = document.createElement('a')
    a.href = environment.apiUrl + "/ecr-manager/exportCSV"
    a.download = environment.apiUrl.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  private checkResult(data) {
    //TODO verify that trigger results in status "Ready"
    return data.Status === "R";
  }
}
