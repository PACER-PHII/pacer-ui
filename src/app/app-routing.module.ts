import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecordDetailsComponent} from "./components/record-details/record-details.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";

const routes: Routes = [
  {
    path: '',
    component: SearchResultsComponent
  },
  {
    path: 'record-details/:id',
    component: RecordDetailsComponent
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
