import { Request,Response } from "express";
import { SchedulerService } from "../services/scheduler.service";

export class SchedulerController {
    private scheduler: SchedulerService;

    constructor() {
        this.scheduler = new SchedulerService();
    }

    async scheduleTask(req:Request, res: Response){
        const {cronExpression } = req.body
        const result: any = await this.scheduler.scheduleTask(
            cronExpression,
            () => {console.log(`Task scheduled: ${new Date()}`)
        }
        )
        if (result) {
            res.status(200).send({
                message: "Task scheduled successfully",
                status: res.statusCode,
            })
        } else {
            res.status(400).send({
                message: "Failed to schedule task",
                status: res.statusCode,
            })
        }
    }
}