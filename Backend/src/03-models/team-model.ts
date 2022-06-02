import { Document, model, Schema } from "mongoose";

//1. Interface describing Team:
export interface ITeamModel extends Document {
    name: string
}

//2. Schema describing Team:
const TeamSchema = new Schema<ITeamModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
})

// 3. Team Model:
export const TeamModel = model<ITeamModel>('TeamModel', TeamSchema, 'teams')