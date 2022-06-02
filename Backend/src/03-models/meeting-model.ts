import { Document, model, Schema } from "mongoose";
import { TeamModel } from "./team-model";

//1. Model interface describing the data in the model:
export interface IMeetingModel extends Document {
    room: string
    description: string
    startDate: Date
    endDate: Date
    teamId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const MeetingSchema = new Schema<IMeetingModel>({
    room: {
        type: String,
        required: [true, "Missing room"],
        minlength: [2, "Room too short"],
        maxlength: [100, "Room too long"],
        trim: true,
        unique: true

    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [100, "Description too long"],
        trim: true

    },
    startDate: {
        type: Date,
        required: [true, "Missing start date"],
    },
    endDate: {
        type: Date,
        required: [true, "Missing end date"],
    },
    teamId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
})

//Virtual Fields: 
MeetingSchema.virtual('team', {
    ref: TeamModel,
    localField: 'teamId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const MeetingModel = model<IMeetingModel>('MeetingModel', MeetingSchema, 'meetings')

