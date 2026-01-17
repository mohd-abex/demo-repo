const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

async function loadTodos() {
  // Intentional bug: wrong endpoint - should be /api/todos
  const res = await fetch('/todos');
  if (!res.ok) {
    console.warn('Could not load todos, status', res.status);
    return;
  }
  const todos = await res.json();
  render(todos);
}

function render(todos) {
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.className = 'todo';
    const span = document.createElement('span');
    span.textContent = t.text;
    if (t.done) span.classList.add('done');
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'btn';
    del.onclick = async () => {
      // Intentional mismatch: backend expects /api/todos/remove/<id>
      await fetch('/api/todos/' + t.id, { method: 'DELETE' });
      loadTodos();
    };
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  input.value = '';
  loadTodos();
};

loadTodos();
