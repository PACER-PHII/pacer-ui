import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchResultsComponent} from "./components/pages/search-results/search-results.component";
import {CaseDetailsComponent} from "./components/pages/case-details/case-details.component";
import {RecordHistoryComponent} from "./components/record-history/record-history.component";

const routes: Routes = [
  {
    path: '',
    component: SearchResultsComponent
  },
  {
    path: 'case-details/:id',
    component: CaseDetailsComponent
  },
  {
    path: 'record-history/:id',
    component: RecordHistoryComponent
  },
  { // Do not add any paths below this point, this path MUST ALWAYS be the last path!
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
