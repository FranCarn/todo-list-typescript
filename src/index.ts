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

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) return;

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  addListItem(newTask);
});

const addListItem = (task: Task) => {};
