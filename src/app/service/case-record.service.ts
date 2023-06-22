import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CaseRecordDTO} from "../domain/case-record-dto";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor( private http: HttpClient ) { }

  getAll():  Observable<CaseRecordDTO[]> {
    return this.http.get(environment.apiUrl + '/ecr-manager/ECR').pipe(map((resultList: any) =>
        resultList.map(result => new CaseRecordDTO(result))
      ),
    );
  };

  getById(id: number):  Observable<any> {
    return this.http.get(environment.apiUrl + '/ecr-manager/ECR', {params: new HttpParams()
      .append('id', id)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

}
