import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CaseRecordDTO} from "../domain/case-record-dto";
import {PersonInfo} from "../domain/person-info";

@Injectable({
  providedIn: 'root'
})
export class PersonInfoService {
  private personInfo = new BehaviorSubject<PersonInfo>(null);
  personInfo$ = this.personInfo.asObservable();
  constructor() { }

  setPersonInfo(data: PersonInfo): void {
    this.personInfo.next(data);
  }

}
