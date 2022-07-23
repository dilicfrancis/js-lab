const chalk = require("chalk");
const fs = require("fs");

const saveTask = (task) => {
  const taskJSON = JSON.stringify(task);
  fs.writeFileSync("task-store.json", taskJSON);
  // test save
  const testSave = fs.readFileSync("task-store.json").toString();
  testSave === taskJSON
    ? console.log(chalk.green.inverse("save successful"))
    : console.log(chalk.red.inverse("something went wrong"));
};

const loadTasks = () => {
  try {
    const taskFile = fs.readFileSync("task-store.json").toString();
    const taskData = JSON.parse(taskFile);
    return taskData;
  } catch (e) {
    return [];
  }
};

const addTask = (task, outcome) => {
  const tasks = loadTasks();

  const doubleEntry = tasks.find((t) => t.task === task);
  if (doubleEntry) {
    console.log(chalk.red("This task already exists!"));
    return;
  }
  tasks.push({ task, outcome });
  console.log(chalk.green("task created"));
  saveTask(tasks);
};

const removeTask = (task) => {
  const tasks = loadTasks();

  const doubleEntry = tasks.find((t) => t.task === task);
  if (!doubleEntry) {
    console.log(chalk.red("This task doesn't exist!"));
    return;
  }

  const filteredTasks = tasks.filter((t) => t.task !== task);
  console.log(chalk.yellow("task was deleted"));
  saveTask(filteredTasks);
};

const getTasks = () => {
  const tasks = loadTasks();
  console.log(chalk.magenta.bold("--::Your Tasks::--"));
  tasks.map((t) =>
    console.log(chalk.green.italic(t.task + ": ") + chalk.yellow(t.outcome))
  );
};

const viewTask = (task) => {
  const tasks = loadTasks();
  const selection = tasks.find((t) => t.task === task);
  if (!selection) {
    console.log(chalk.red.italic("This task isn't in your log."));
    return;
  }
  console.log(
    chalk.green.bold.inverse(selection.task) +
      " >> " +
      chalk.yellow(selection.outcome)
  );
};

module.exports = {
  getTasks,
  addTask,
  removeTask,
  viewTask,
};
