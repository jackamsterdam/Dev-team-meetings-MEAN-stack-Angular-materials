import { Component, OnInit } from '@angular/core';
import { MeetingModel } from 'src/app/models/meeting.model';
import { TeamModel } from 'src/app/models/team.model';
import { MeetingsService } from 'src/app/services/meetings.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {
  teams: TeamModel[]
  meetings: MeetingModel[]

  constructor(private notify: NotifyService, private meetingsService: MeetingsService) { }

  async ngOnInit() {
    try {
      this.teams = await this.meetingsService.getAllTeams()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async getMeetings(event: Event) {
    try {
      const teamId = (event.target as HTMLSelectElement).value
      this.meetings = await this.meetingsService.getMeetingsByTeam(teamId)
    } catch (err: any) {
      this.notify.error(err)
    }

  }

  async deleteThisCard(_id: string) {
    try {
      const ok = confirm('Are you sure?')
      if (!ok) return
      await this.meetingsService.deleteMeeting(_id)
      this.notify.success('Meeting has been deleted')
      const indexToDelete = this.meetings.findIndex(m => m._id === _id)
      this.meetings.splice(indexToDelete, 1)

    } catch (err: any) {
      this.notify.error(err)
    }
  }
}
