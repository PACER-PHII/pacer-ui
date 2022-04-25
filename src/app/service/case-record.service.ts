import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor( private http: HttpClient ) { }

  getAll():  Observable<any> {
    return this.http.get(environment.apiUrl + '/ecr-manager/ECR').pipe(map((result: any) =>
        result as Object
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
