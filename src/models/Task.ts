import type { TaskStatus } from "./TaskStatus.js"

export type Task = {
    id: string,
    title: string,
    status: TaskStatus
    createdAt: Date
}
