#!/usr/bin/env node
import { TaskManager } from "./services/TaskManager.js";
import { Command } from "commander";

function main() {
    const program = new Command();
    program
        .name("task-cli")
        .description("Simple CLI for task management")
        .version("1.0.0");

    program
        .command("add <title>")
        .action((title) => TaskManager.saveTask(title))
        .description("Add a new task.");

    program
        .command("list")
        .action(() => TaskManager.listTasks())
        .description("List all tasks.");

    program
        .command("done <id>")
        .action((id) => TaskManager.checkTask(id))
        .description("Change task status to 'done'.");

    program
        .command("remove <id>")
        .action((id) => TaskManager.removeTask(id))
        .description("Remove a task.");

    program.parse();
}

main();
