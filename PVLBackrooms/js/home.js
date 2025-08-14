const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
let sidebarMode = localStorage.getItem('sidebar-mode');

const enableSidebarMode = () =>{
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  
  localStorage.setItem('sidebar-mode', 'active');
}
const disableSidebarMode = () =>{
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  
  localStorage.setItem('sidebar-mode', null);
}
document.addEventListener('keydown', function(event) {
  if ((event.shiftKey) && event.key.toLowerCase() === 's') {
    if (sidebar.classList.contains('close')){
      sidebar.classList.toggle('close');
      toggleButton.classList.toggle('rotate');
      
      localStorage.setItem('sidebar-mode', 'active');
    }
    else {
      sidebar.classList.toggle('close');
      toggleButton.classList.toggle('rotate');

      localStorage.setItem('sidebar-mode', null);
    }
  }
});

if (sidebarMode === "active") enableSidebarMode();

function toggleSidebar(){
  sidebarMode = localStorage.getItem('sidebar-mode')
  if(sidebarMode !== 'active'){
    enableSidebarMode()
  }
  else{
    disableSidebarMode()
  }
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus();
  }
  
  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');
  
  if(sidebar.classList.contains('close')){
    toggleButton.classList.toggle('rotate');
    sidebar.classList.toggle('close');
  }
}

const customizeButton = document.getElementById('customize-btn');
const customizeMenu = document.getElementById('customize-menu');
const languageButton = document.getElementById('language-btn');
const languageMenu = document.getElementById('language-menu');
const infoButton = document.getElementById('info-btn');
const infoMenu = document.getElementById('info-menu');
const mainDiv = document.getElementById('main');

customizeButton.addEventListener('click', () =>{
  customizeButton.classList.toggle('closed');
  customizeMenu.classList.toggle('closed');

  if(!languageMenu.classList.contains('closed')){
    languageMenu.classList.toggle('closed');
    languageButton.classList.toggle('closed');
  }
  if(!infoMenu.classList.contains('closed')){
    infoMenu.classList.toggle('closed');
    infoButton.classList.toggle('closed');
  }
})
languageButton.addEventListener('click', () =>{
  languageButton.classList.toggle('closed');
  languageMenu.classList.toggle('closed');

  if(!infoMenu.classList.contains('closed')){
    infoMenu.classList.toggle('closed');
    infoButton.classList.toggle('closed');
  }
  if(!customizeMenu.classList.contains('closed')){
    customizeMenu.classList.toggle('closed');
    customizeButton.classList.toggle('closed');
  }
})
infoButton.addEventListener('click', () =>{
  infoButton.classList.toggle('closed');
  infoMenu.classList.toggle('closed');

  if(!languageMenu.classList.contains('closed')){
    languageMenu.classList.toggle('closed');
    languageButton.classList.toggle('closed');
  }
  if(!customizeMenu.classList.contains('closed')){
    customizeMenu.classList.toggle('closed');
    customizeButton.classList.toggle('closed');
  }
})
mainDiv.addEventListener('click', () =>{
  if(!languageMenu.classList.contains('closed')){
    languageMenu.classList.toggle('closed');
    languageButton.classList.toggle('closed');
  }
  if(!infoMenu.classList.contains('closed')){
    infoMenu.classList.toggle('closed');
    infoButton.classList.toggle('closed');
  }
  if(!customizeMenu.classList.contains('closed')){
    customizeMenu.classList.toggle('closed');
    customizeButton.classList.toggle('closed');
  }
})

let lightMode = localStorage.getItem('lightMode');
const themeSwitch = document.getElementById('theme-switch');

const enablelightMode = () => {
  document.body.classList.toggle('lightMode');
  localStorage.setItem('lightMode', 'active');
}

const disablelightMode = () => {
  document.body.classList.toggle('lightMode');
  localStorage.setItem('lightMode', null);
}

if(lightMode === "active") enablelightMode();

themeSwitch.addEventListener("click", () => {
  lightMode = localStorage.getItem('lightMode');
  if(lightMode !== "active"){
    enablelightMode();
  }
  else {
    disablelightMode();
  }
})

let setTheme = localStorage.getItem('setTheme');

function changeColor(id) {
  document.body.style.setProperty('--cor-destaque', document.getElementById(id).value);
  document.body.style.setProperty('--cor-fundo-tres', document.getElementById(id).value + '09');
  localStorage.setItem('setTheme', document.getElementById(id).value);
  updateOptions();
}

document.body.style.setProperty('--cor-fundo-tres', setTheme + '09');
document.body.style.setProperty('--cor-destaque', setTheme);

let setFontSize = localStorage.getItem('setFontSize');

function changeFontSize(id) {
  mainDiv.style.fontSize = document.getElementById(id).value;
  localStorage.setItem('setFontSize', document.getElementById(id).value);
  updateOptions();
}

mainDiv.style.fontSize = localStorage.getItem('setFontSize')

const themeOptions = document.querySelectorAll('.themeOptions .themes')
const fontSizeOptions = document.querySelectorAll('.fontSizeOptions .fontSize')

function updateOptions() {
  themeOptions.forEach(theme => {
    if (theme.value == localStorage.getItem('setTheme')) {
      theme.style.border = '2px solid var(--cor-texto)';
    }
    else {
      theme.style.border = '2px solid var(--cor-borda)';
    }
  })
  fontSizeOptions.forEach(fontSize => {
    if (fontSize.value == localStorage.getItem('setFontSize')) {
      fontSize.style.border = '2px solid var(--cor-destaque)';
    }
    else {
      fontSize.style.border = '2px solid var(--cor-borda)';
    }
  })
}

updateOptions()