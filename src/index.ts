import { TaskManager } from "./services/TaskManager.js";

function main() {
    const command = process.argv[2];
    const value = process.argv[3];

    switch (command) {
        case "add":
            if (!value) {
                console.log("Insira o título da task.");
                return;
            }
            TaskManager.saveTask(value);
            break;
        case "list":
            TaskManager.listTasks();
            break;
        case "done":
            {
                if (!value) {
                    console.log("Insira o id da task.");
                    return;
                }
                TaskManager.checkTask(value);
            }
            break;
        case "remove":
            {
                if (!value) {
                    console.log("Insira o id da task.");
                    return;
                }
                TaskManager.removeTask(value);
            }
            break;
        default:
            if (!command) {
                console.log("Insira um comando.");
            } else {
                console.log("Comando inválido.");
            }

            console.log(`Comandos disponíveis: 
- add "<título>"
- list
- done <id>
- remove <id>`);
            return;
    }
}

main();
