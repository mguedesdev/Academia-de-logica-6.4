const checkin = document.querySelector('.inputCheckin');  
const checkout = document.querySelector('.inputCheckout'); 
const bedroom = document.querySelectorAll('.bedroom'); 
const select = document.querySelector('.nPessoas'); 
const textArea = document.querySelector('.obs'); 
const btnSubmit = document.querySelector('#submit-btn');
const btnClear = document.querySelector('#clear-btn');
const ol = document.querySelector('ol');

function getQuarto(){
  for (let i = 0; i <bedroom.length; i++) {
    if (bedroom[i].checked) {
      return bedroom[i].value;
    }
  }
}

function getPessoas(){
  return select.options[select.selectedIndex].value;
}

function getData(value){
  const valueDate = value + 'T03:00:00.000Z'
  data = new Date(valueDate)
  dataFormatada = data.toLocaleDateString('pt-BR') ; 
  return dataFormatada;
}


function addItemList(e){
  e.preventDefault()
  const li = document.createElement('li');
  const pQuarto = document.createElement('p');
  const pObs = document.createElement('p');
  li.innerText = 'Reserva para o dia ' + getData(checkin.value) + ' até o dia ' + getData(checkout.value);
  pQuarto.innerText = 'Quarto ' + getQuarto() + ' - Para ' + getPessoas() + ' pessoas ';
  pObs.innerText = 'Obs: ' + textArea.value;
  li.appendChild(pQuarto);
  li.appendChild(pObs);
  ol.appendChild(li);
  saveLocalStorage();
}
btnSubmit.addEventListener('click', addItemList)

function clearOl(){
  ol.innerHTML = '';
  saveLocalStorage();
}
btnClear.addEventListener('click', clearOl);

function saveLocalStorage(){
  localStorage.setItem('lista', ol.innerHTML)
}

function loadLocalStorage(){
  const load = localStorage.getItem('lista');
  if (load) {
    ol.innerHTML = load;
  }
}

window.onload = loadLocalStorage;