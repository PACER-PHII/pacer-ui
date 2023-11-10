import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import { RecordDetailsComponent } from './components/record-details/record-details.component';
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
import { RecordHistoryComponent } from './components/record-history/record-history.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { IdentityInfoComponent } from './components/widgets/identity-info/identity-info.component';
import { HealthcareProvidersComponent } from './components/widgets/healthcare-providers/healthcare-providers.component';
import {AppConstants} from "./providers/app-constants";
import { FacilityDataComponent } from './components/widgets/facility-data/facility-data.component';
import { GuardiansInfoComponent } from './components/widgets/guardians-info/guardians-info.component';
import { ImmunizationHistoryComponent } from './components/widgets/immunization-history/immunization-history.component';
import { MedicationsProvidedComponent } from './components/widgets/medications-provided/medications-provided.component';
import { LabDataComponent } from './components/widgets/lab-data/lab-data.component';
import {DateValuePipe} from "./pipes/date-value.pipe";
import { DiagnosisComponent } from './components/widgets/diagnosis/diagnosis.component';
import { SymptomsComponent } from './components/widgets/symptoms/symptoms.component';
import { RecordDetailsContainerComponent } from './components/record-details-container/record-details-container.component';
import {FormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ConfigService} from "./service/config.service";

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    RecordDetailsComponent,
    RecordHistoryComponent,
    PersonInfoComponent,
    IdentityInfoComponent,
    HealthcareProvidersComponent,
    FacilityDataComponent,
    GuardiansInfoComponent,
    ImmunizationHistoryComponent,
    MedicationsProvidedComponent,
    LabDataComponent,
    DateValuePipe,
    DiagnosisComponent,
    SymptomsComponent,
    RecordDetailsContainerComponent,
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
        MatSnackBarModule,
        MatExpansionModule,
        MatCheckboxModule,
        FormsModule,
        MatProgressBarModule
    ],
  providers: [
    AppConstants,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
