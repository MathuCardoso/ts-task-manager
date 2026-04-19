import type { Task } from "../models/Task.js";
import fs from 'fs';

export class TaskManager {

    public static saveTask(title: string, ): void {
        const newTask: Task = {
            id: String((this.getLastId() ?? 0) + 1),
            title: title,
            status: "pendent",
            createdAt: new Date()
        };
        
        const savedTasksJson = fs.readFileSync("./data/tasks.json", 'utf-8');
        if(!savedTasksJson) {
            const savedTasks: Task[] = [];
            savedTasks.push(newTask);
            fs.writeFileSync("./data/tasks.json", JSON.stringify(savedTasks, null, 4));
            return;
        }

        const savedTasks = JSON.parse(savedTasksJson);
        savedTasks.push(newTask);
        fs.writeFileSync("./data/tasks.json", JSON.stringify(savedTasks, null, 4));

        console.log("Task adicionada com sucesso!");
    }

    public static listTasks(): void {
        const savedTasks: Task[] = JSON.parse(fs.readFileSync("./data/tasks.json", 'utf-8'));
        if(savedTasks.length <= 0) {
            console.log("Nenhuma task cadastrada.");
            return;
        }
        console.log("=-=-=-=-=-=-=-=-=-=TASKS CADASTRADAS=-=-=-=-=-=-=-=-=-=")
        savedTasks.forEach((task, index) => {
            console.log(`${index+1} - ${task.title}`);
            console.log(`Status: ${task.status}`);
            console.log(`Data: ${this.fDate(task.createdAt)}`);
            console.log("\n")
        })
    }

    public static checkTask(id: String) {
        const savedTasksJson = fs.readFileSync("./data/tasks.json", "utf-8");   
        if(!savedTasksJson) {
            console.log("Nenhuma task cadastrada.");
            return;
        }

        const savedTasks: Task[] = JSON.parse(savedTasksJson);

        const index = savedTasks.findIndex(task => task.id === id);

        if(index === -1) {
            console.log("Task não encontrada!");
            return;
        }
        const task = savedTasks[index];
        if(!task) {
            console.log("Task inválida!");
            return;
        }

        task.status = "done";

        fs.writeFileSync("./data/tasks.json", 
        JSON.stringify(savedTasks, null, 4), 
        'utf-8');
        console.log("Task marcada como 'done'.")
    }

    public static removeTask(id: string) {
        const savedTasks: Task[] = JSON.parse(
            fs.readFileSync("./data/tasks.json", "utf-8")
        );
        if((savedTasks.findIndex(task => task.id == id)) === -1) {
            console.log("Nenhuma task encontrada.");
            return;
        }

        const updatedTasks: Task[] = savedTasks.filter(task => task.id !== id)

        fs.writeFileSync("./data/tasks.json", JSON.stringify(updatedTasks, null, 4));
        console.log("Task removida com sucesso.");
    }

    public static getLastId(): number | null {
        const savedTasksJson = fs.readFileSync("./data/tasks.json", "utf-8");

        if(!savedTasksJson)
            return null;

        const savedTasks = JSON.parse(savedTasksJson);

        if(!savedTasks)
            return null;

        const lastTask = savedTasks[savedTasks.length - 1];

        if(lastTask) {
            return Number(lastTask.id) ?? null
        }

        return null;
    }


    public static fDate(stringDate: Date): String {
        const date: Date = new Date(stringDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth()+1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

