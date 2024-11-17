import cron from "node-cron"

export class SchedulerService {
    async scheduleTask(cronExpression: string, task: () => void) {
        cron.schedule(cronExpression, task)
    }
}