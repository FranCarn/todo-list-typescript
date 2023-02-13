import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const loadTasks = (): Task[] => {
  const tasksJSON = localStorage.getItem('TASKS');
  if (!tasksJSON) return [];
  return JSON.parse(tasksJSON);
};

const addListItem = (task: Task) => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list.append(item);
};

const list = document.getElementById('list') as HTMLUListElement;
const form = document.getElementById('new-task-form') as HTMLFormElement;
const input = document.getElementById('new-task-title') as HTMLInputElement;

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

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
  addListItem(newTask);
  input.value = '';
  saveTasks();
});

const saveTasks = () => {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
};
