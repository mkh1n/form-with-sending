const submitBtn = document.querySelector('button[type="submit"]');
const state = {
  isValid:{
    'first-name': false,
    'last-name': false,
    'email': false,
    'phone_number': false,
  },
  errors: {
    'first-name': 'Имя должно быть не пустым и состоять только из букв.',
    'last-name': 'Фамилия должна быть не пустой и состоять только из букв.',
    'email': 'Некорректный имейл.',
    'phone_number': 'Некорректный номер телефона',
  },
}

function isAdult(birthdate) {
  const today = new Date();
  const birthdateObj = new Date(birthdate);
  const ageInMilliseconds = today - birthdateObj;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  return ageInYears >= 18;
}
function isValidPassword(password) {
  const hasUppercase = /[A-ZА-Я]/.test(password);
  const hasLowercase = /[a-zа-я]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()]/.test(password);

  return (
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSymbol &&
    password.length >= 8
  );
}
const validationRules = {
  'first-name': (inputEl) => {
    return (/^[а-яА-Яa-zA-Z]+$/.test(inputEl.value) && inputEl.value.length < 20);
  },
  'last-name': (inputEl) => {
    return (/^[а-яА-Яa-zA-Z]+$/.test(inputEl.value) && inputEl.value.length < 52);
  },
  'email': (inputEl) => {
    return (/^\S+@\S+\.\S+$/.test(inputEl.value));
  },
  'phone_number': (inputEl)=>{
    return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(inputEl.value))

  }
}
const renderValidation = (inputEl, isValid) => {
  if (isValid) {
    inputEl.classList.add('valid')
    inputEl.classList.remove('invalid')
    document.getElementById(`${inputEl.id}-message`).innerHTML = ''
    document.getElementById(`${inputEl.id}-message`).classList.remove('invalid')

  } else {
    inputEl.classList.remove('valid')
    inputEl.classList.add('invalid')
    document.getElementById(`${inputEl.id}-message`).innerHTML = state.errors[inputEl.id]
    document.getElementById(`${inputEl.id}-message`).classList.add('invalid')
  }
}
const validateForm = (inputEl) => {
  const isFieldValid = validationRules[inputEl.id](inputEl)
  state.isValid[inputEl.id] = isFieldValid
  submitBtn.disabled = !Object.values(state.isValid).every(Boolean);
  renderValidation(inputEl, isFieldValid)
}
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (e) => {
    validateForm(input);
  input.addEventListener('blur', (e)=>{
    validateForm(input);
  })
})
})

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const myFormData = new FormData(e.target);
  const alert = document.querySelector('.alert');
  document.querySelector('button[type="submit"]').disabled = true;
  document.querySelectorAll('input').forEach((el)=>{
    el.classList.remove('valid')
  })
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formDataObj);
  e.target.reset()
  console.log(response.data);
  alert.classList.add('activeAlert');
  setTimeout(()=>{
   alert.classList.remove('activeAlert');
  }, 3000)

})
