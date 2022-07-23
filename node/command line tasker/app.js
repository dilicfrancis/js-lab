const yargs = require("yargs");
const taskHolder = require("./task-holder.js");

//Version after Yargs
yargs.version("1.0.1");

//add a note

yargs.command({
  command: "add",
  describe: "Adds an item",
  builder: {
    task: {
      describe: "Task to be added",
      demandOption: true,
      type: "string",
    },
    outcome: {
      describe: "Expected outcome",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    taskHolder.addTask(argv.task, argv.outcome);
  },
});

//remove a note

yargs.command({
  command: "remove",
  describe: "Removes a task",
  builder: {
    task: {
      describe: "Task to be removed",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    taskHolder.removeTask(argv.task);
  },
});

//Open a note

yargs.command({
  command: "all",
  describe: "View all tasks",
  handler(argv) {
    taskHolder.getTasks();
  },
});

// List notes
yargs.command({
  command: "select",
  describe: "Select a single task",
  builder: {
    task: {
      describe: "Selects a task",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    taskHolder.viewTask(argv.task);
  },
});

yargs.parse();

// add, remove, read, list
