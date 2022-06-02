import { TeamModel } from "./team.model"

export class MeetingModel {
    _id: string 
    room: string
    description: string
    startDate: Date
    endDate: Date
    teamId: string
    team: TeamModel
}