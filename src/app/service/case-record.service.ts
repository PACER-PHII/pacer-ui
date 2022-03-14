import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor( private http: HttpClient ) { }

  uriStr = 'http://yellowisland01.icl.gtri.org:8085'

  getAll():  Observable<any> {
    return this.http.get(this.uriStr + '/ecr-manager/ECR').pipe(map((result: any) =>
        result as Object
      ),
    );
  };

  getById(id: number):  Observable<any> {
    return this.http.get(this.uriStr + '/ecr-manager/ECR', {params: new HttpParams()
      .append('id', id)}).pipe(map((result: any) =>
        result as Object
      ),
    );
  };

}
