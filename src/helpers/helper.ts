import fs from "fs";

export function getLastId(): number | null {
    const savedTasksJson = fs.readFileSync("./data/tasks.json", "utf-8");

    if (!savedTasksJson) return null;

    const savedTasks = JSON.parse(savedTasksJson);

    if (!savedTasks) return null;

    const lastTask = savedTasks[savedTasks.length - 1];

    if (lastTask) {
        return Number(lastTask.id) ?? null;
    }

    return null;
}

export function fDate(stringDate: Date): String {
    const date: Date = new Date(stringDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
