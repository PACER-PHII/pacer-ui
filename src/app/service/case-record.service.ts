import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordService {

  constructor( private http: HttpClient ) { }

  getCases(
    filter?: string,
    sortOrder?: string,
    sortBy?: string,
    pageNumber?: number,
    pageSize?: number):  Observable<any> {

    const filterParam: string = filter || '';
    const sortOrderParam: string = sortOrder || 'asc';
    const sortByParam: string = sortBy || 'specimenCollectionDate';
    const pageNumberParam: number = pageNumber || 0;
    const pageSizePram: number = pageSize || 10;

    return this.http.get('/api/person-list', {
      params: new HttpParams()
        .append('filter', filterParam)
        .append('sortBy', sortByParam)
        .append('sortOrder', sortOrderParam)
        .append('pageNumber', pageNumberParam)
        .append('pageSize', pageSizePram)
    }).pipe(map((result: any) =>
        result as Object
      ),
    );
  };
}
