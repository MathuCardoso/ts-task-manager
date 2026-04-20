import type { Task } from "../models/Task.js";
import chalk from "chalk";
import fs from "fs";
import { getLastId, fDate } from "../utils/helper.js";

export class TaskManager {
    public static saveTask(title: string): void {
        const newTask: Task = {
            id: String((getLastId() ?? 0) + 1),
            title: title,
            status: "pending",
            createdAt: new Date(),
        };

        const savedTasksJson = fs.readFileSync("./data/tasks.json", "utf-8");
        if (!savedTasksJson) {
            const savedTasks: Task[] = [];
            savedTasks.push(newTask);
            fs.writeFileSync(
                "./data/tasks.json",
                JSON.stringify(savedTasks, null, 4),
            );
            return;
        }

        const savedTasks = JSON.parse(savedTasksJson);
        savedTasks.push(newTask);
        fs.writeFileSync(
            "./data/tasks.json",
            JSON.stringify(savedTasks, null, 4),
        );

        console.log(chalk.green("Task adicionada com sucesso!"));
    }

    public static listTasks(): void {
        const savedTasks: Task[] = JSON.parse(
            fs.readFileSync("./data/tasks.json", "utf-8"),
        );
        if (savedTasks.length <= 0) {
            console.log(chalk.red("Nenhuma task cadastrada."));
            return;
        }

        console.log(
            chalk.magentaBright("=-=-=-=-=-=-=-=-=-=") +
                chalk.magenta.bold("TASKS CADASTRADAS") +
                chalk.magentaBright("=-=-=-=-=-=-=-=-=-="),
        );
        savedTasks.forEach((task) => {
            const status =
                task.status == "pending"
                    ? chalk.yellow(task.status)
                    : chalk.green(task.status);

            console.log(`[${task.id}] ${task.title} - ${status}`);
            console.log(`Data: ${fDate(task.createdAt)}`);
            console.log("\n");
        });
    }

    public static checkTask(id: String) {
        const savedTasksJson = fs.readFileSync("./data/tasks.json", "utf-8");
        if (!savedTasksJson) {
            console.log("Nenhuma task cadastrada.");
            return;
        }

        const savedTasks: Task[] = JSON.parse(savedTasksJson);

        const index = savedTasks.findIndex((task) => task.id === id);

        if (index === -1) {
            console.log("Task não encontrada!");
            return;
        }
        const task = savedTasks[index];
        if (!task) {
            console.log("Task inválida!");
            return;
        }

        task.status = "done";

        fs.writeFileSync(
            "./data/tasks.json",
            JSON.stringify(savedTasks, null, 4),
            "utf-8",
        );
        console.log("Task marcada como 'done'.");
    }

    public static removeTask(id: string) {
        const savedTasks: Task[] = JSON.parse(
            fs.readFileSync("./data/tasks.json", "utf-8"),
        );
        if (savedTasks.findIndex((task) => task.id == id) === -1) {
            console.log("Nenhuma task encontrada.");
            return;
        }

        const updatedTasks: Task[] = savedTasks.filter(
            (task) => task.id !== id,
        );

        fs.writeFileSync(
            "./data/tasks.json",
            JSON.stringify(updatedTasks, null, 4),
        );
        console.log("Task removida com sucesso.");
    }

}
