import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonInfo} from "../../domain/person-info";
import {PersonInfoService} from "../../service/person-info.service";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit{
  personInfo: PersonInfo;
  constructor( private personInfoService: PersonInfoService, public route:ActivatedRoute){};
  ngOnInit(): void {
    this.personInfoService.personInfo$.subscribe({next: value=> this.personInfo = value})
  }

}
