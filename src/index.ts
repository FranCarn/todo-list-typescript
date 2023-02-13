import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.getElementById('list') as HTMLUListElement;
const form = document.getElementById('new-task-form') as HTMLFormElement;
const input = document.getElementById('new-task-title') as HTMLInputElement;
const deleteAll = document.getElementById('deleteTasks') as HTMLButtonElement;

const loadTasks = (): Task[] => {
  const tasksJSON = localStorage.getItem('TASKS');
  if (!tasksJSON) return [];
  return JSON.parse(tasksJSON);
};

const refreshTaskInfo = () => {
  list.innerHTML = '';
  tasks.forEach((taskInfo, i) => {
    const deleteTask = document.createElement('button');
    deleteTask.classList.add('deleteTask');
    deleteTask.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
    deleteTask.title = 'Delete task';
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = 'Task done';

    const span = document.createElement('span');
    span.textContent = taskInfo.title;
    const li = document.createElement('li');
    if (taskInfo.completed) {
      checkbox.checked = true;
      span.classList.add('done');
    }
    // Listeners
    deleteTask.addEventListener('click', () => {
      tasks.splice(i, 1);
      saveTasks(tasks);
      refreshTaskInfo();
    });

    checkbox.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        tasks[i].completed = true;
      } else {
        tasks[i].completed = false;
      }
      saveTasks(tasks);
      refreshTaskInfo();
    });
    // Append to DOM
    li.appendChild(span).classList.add('textTask');
    li.appendChild(div);
    div.appendChild(checkbox).classList.add('taskDone');
    div.appendChild(deleteTask);
    div.classList.add('actionContainer');
    list.appendChild(li).classList.add('listTask');
    saveTasks(tasks);
  });
};

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  refreshTaskInfo();
  input.value = '';
});

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
};

// Detele All Tasks

deleteAll.addEventListener('click', () => {
  if (!tasks.length) return;
  tasks = [];
  saveTasks(tasks);
  refreshTaskInfo();
});
let tasks: Task[] = loadTasks();
refreshTaskInfo();
