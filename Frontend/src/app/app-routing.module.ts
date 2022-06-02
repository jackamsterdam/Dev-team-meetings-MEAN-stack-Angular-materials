import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddMeetingComponent } from './components/meetings-area/add-meeting/add-meeting.component';
import { MeetingListComponent } from './components/meetings-area/meeting-list/meeting-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: "meeting-list", component: MeetingListComponent },
  { path: 'add-meeting', component: AddMeetingComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
