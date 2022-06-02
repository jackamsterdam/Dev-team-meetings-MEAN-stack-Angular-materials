import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingModel } from 'src/app/models/meeting.model';
import { TeamModel } from 'src/app/models/team.model';
import { MeetingsService } from 'src/app/services/meetings.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  meeting = new MeetingModel
  teams: TeamModel[]
  constructor(private notify: NotifyService, private meetingsService: MeetingsService, private router: Router) { }

  async ngOnInit() {
    try {
      this.teams = await this.meetingsService.getAllTeams()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async add() {
    try {
      await this.meetingsService.addMeeting(this.meeting)
      this.notify.success('Meeting has been added')
      this.router.navigateByUrl('/meeting-list')
    } catch (err: any) {
      this.notify.error(err)
    }
  }

}
