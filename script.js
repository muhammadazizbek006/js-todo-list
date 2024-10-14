// Elementlarni tanlash
const [firstNameInput, lastNameInput, phoneInput, addBtn, todoList] = 
['first-name', 'last-name', 'phone', 'add-btn', 'todo-list'].map(id => document.getElementById(id));

// Mahalliy xotiradan yuklash
document.addEventListener('DOMContentLoaded', () => getTodos().forEach(renderTodo));

// Vazifa qo'shish
addBtn.addEventListener('click', () => {
  const [firstName, lastName, phone] = [firstNameInput, lastNameInput, phoneInput].map(input => input.value.trim());
  if (!firstName || !lastName || !phone) return;

  renderTodo({ firstName, lastName, phone });
  saveToLocalStorage({ firstName, lastName, phone });
  [firstNameInput, lastNameInput, phoneInput].forEach(input => input.value = '');
});

// Vazifani boshqarish
todoList.addEventListener('click', e => {
  if (e.target.classList.contains('complete-btn')) {
    e.target.closest('li').classList.toggle('completed');
  } else if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    li.remove();
    removeFromLocalStorage(li.dataset.name);
  }
});

// Mahalliy xotira bilan ishlash
const getTodos = () => JSON.parse(localStorage.getItem('todos') || '[]');
const saveToLocalStorage = todo => {
  const todos = [...getTodos(), todo];
  localStorage.setItem('todos', JSON.stringify(todos));
};
const removeFromLocalStorage = name => {
  const todos = getTodos().filter(t => `${t.firstName} ${t.lastName}` !== name);
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Vazifani ekranga chiqarish
function renderTodo({ firstName, lastName, phone }) {
  const li = document.createElement('li');
  li.dataset.name = `${firstName} ${lastName}`;
  li.innerHTML = `
    ${firstName} ${lastName}
    <div>
      <span>${phone}</span>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">❌</button>
    </div>
  `;
  todoList.appendChild(li);
}
