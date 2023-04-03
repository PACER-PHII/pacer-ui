import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultsComponent } from './components/pages/search-results/search-results.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import { CaseDetailsComponent } from './components/pages/case-details/case-details.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    CaseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
