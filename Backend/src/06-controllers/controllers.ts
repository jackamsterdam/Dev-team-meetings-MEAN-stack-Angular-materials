import express, { NextFunction, Request, Response } from 'express'
import { MeetingModel } from '../03-models/meeting-model'
import logic from '../05-logic/logic'

const router = express.Router()

//http://localhost:3001/api/teams/
router.get('/teams', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teams = await logic.getAllTeams()
        response.json(teams)
    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/meetings-by-team/62969ee1c05d55310aba99b2
router.get('/meetings-by-team/:teamId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teamId = request.params.teamId
        const meetings = await logic.getMeetingsByTeam(teamId)
        response.json(meetings)

    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/meetings/
router.post('/meetings', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting = new MeetingModel(request.body)
        const addedMeeting = await logic.addMeeting(meeting)
        response.status(201).json(addedMeeting)

    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/meetings/:_id
router.delete('/meetings/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await logic.deleteMeeting(_id)
        response.sendStatus(204)

    } catch (err: any) {
        next(err)
    }
})

export default router 