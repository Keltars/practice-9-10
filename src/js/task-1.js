// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

import { refs } from './refs';
import { STORAGE_KEY } from './data';
import { USER_DATA } from './data';

const { email, password, button } = refs.loginForm.elements;

refs.loginForm.addEventListener('submit', onLoginFormSubmit);

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedData) {
  email.value = savedData.email;
  password.value = savedData.password;
  button.textContent = 'Logout';
  email.disabled = true;
  password.disabled = true;
}

function onLoginFormSubmit(event) {
  event.preventDefault();
  const isUserDataValid =
    email.value.trim() !== USER_DATA.email ||
    password.value.trim() !== USER_DATA.password;

  if (isUserDataValid) {
    alert('Email or Password invalid');
    return;
  }

  if (button.textContent === 'Logout') {
    button.textContent = 'Login';
    email.disabled = false;
    password.disabled = false;
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(USER_DATA));
  button.textContent = 'Logout';
  email.disabled = true;
  password.disabled = true;
}
