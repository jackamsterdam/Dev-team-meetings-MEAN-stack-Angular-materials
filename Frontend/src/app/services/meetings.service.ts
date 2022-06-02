import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeetingModel } from '../models/meeting.model';
import { TeamModel } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }

  async getAllTeams(): Promise<TeamModel[]> {
    const teams = await firstValueFrom(this.http.get<TeamModel[]>(environment.teamsUrl))
    return teams
  }


  async getMeetingsByTeam(teamId: string): Promise<MeetingModel[]> {
    const meetings = await firstValueFrom(this.http.get<MeetingModel[]>(environment.meetingsByTeamUrl + teamId))
    return meetings
  }

  async addMeeting(meeting: MeetingModel): Promise<MeetingModel> {
    const addedMeeting = await firstValueFrom(this.http.post<MeetingModel>(environment.meetingsUrl, meeting))
    return addedMeeting
  }

  async deleteMeeting(_id: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.meetingsUrl + _id))

  }


}
