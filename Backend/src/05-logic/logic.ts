import { IMeetingModel, MeetingModel } from './../03-models/meeting-model';
import { TeamModel } from './../03-models/team-model';
import ErrorModel from "../03-models/error-model"
import { ITeamModel } from "../03-models/team-model"


async function getAllTeams():Promise<ITeamModel[]> {
    return TeamModel.find().exec()
}

async function getMeetingsByTeam(teamId: string):Promise<IMeetingModel[]> {
    return MeetingModel.find({teamId}).populate('team').exec()
}

async function addMeeting(meeting: IMeetingModel):Promise<IMeetingModel> {
   const errors = meeting.validateSync()
   if (errors) throw new ErrorModel(400, errors.message)
   return meeting.save()
}


async function deleteMeeting(_id: string):Promise<void> {
    const deletedProduct = await MeetingModel.findByIdAndDelete(_id).exec()
    if (!deletedProduct) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}


export default {
    getAllTeams,
    getMeetingsByTeam,
    addMeeting,
    deleteMeeting
}