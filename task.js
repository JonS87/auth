const siginBtn = document.getElementById('signin__btn');
const form = document.forms.signin__form;
const xhr = new XMLHttpRequest();
const ls = localStorage.getItem('id');

if (ls) {
  document.querySelector('.signin').classList.remove('signin_active');
  document.querySelector('.welcome').classList.add('welcome_active');

  document.getElementById('user_id').textContent = ls;
} 

siginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      const response = JSON.parse(xhr.responseText);
      if (response['success']) {
        document.querySelector('.signin').classList.remove('signin_active');
        document.querySelector('.welcome').classList.add('welcome_active');

        localStorage.setItem('id', response['user_id']);
        document.getElementById('user_id').textContent = response['user_id'];
      } else {
        alert('Неверный логин/пароль');
      }
    }
  });

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
  const formData = new FormData(form);
  xhr.send(formData);
});