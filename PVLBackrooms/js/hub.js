const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
let sidebarMode = localStorage.getItem('sidebar-mode');

const enableSidebarMode = () =>{
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  
  closeAllSubMenus();

  localStorage.setItem('sidebar-mode', 'active');
}
const disableSidebarMode = () =>{
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  
  closeAllSubMenus();

  localStorage.setItem('sidebar-mode', null);
}

if(sidebarMode === "active") enableSidebarMode();

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

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

const languageButton = document.getElementById('language-btn');
const languageMenu = document.getElementById('language-menu');
const infoButton = document.getElementById('info-btn');
const infoMenu = document.getElementById('info-menu');
const paletteButton = document.getElementById('palette-btn');
const paletteMenu = document.getElementById('palette-menu');
const mainDiv = document.getElementById('main');

languageButton.addEventListener('click', () =>{
  languageButton.classList.toggle('closed');
  languageMenu.classList.toggle('closed');

  if(!infoMenu.classList.contains('closed')){
    infoMenu.classList.toggle('closed');
    infoButton.classList.toggle('closed');
  }
  if(!paletteMenu.classList.contains('closed')){
    paletteMenu.classList.toggle('closed');
    paletteButton.classList.toggle('closed');
  }
})

infoButton.addEventListener('click', () =>{
  infoButton.classList.toggle('closed');
  infoMenu.classList.toggle('closed');

  if(!languageMenu.classList.contains('closed')){
    languageMenu.classList.toggle('closed');
    languageButton.classList.toggle('closed');
  }
  if(!paletteMenu.classList.contains('closed')){
    paletteMenu.classList.toggle('closed');
    paletteButton.classList.toggle('closed');
  }
})

paletteButton.addEventListener('click', () =>{
  paletteButton.classList.toggle('closed');
  paletteMenu.classList.toggle('closed');

  if(!languageMenu.classList.contains('closed')){
    languageMenu.classList.toggle('closed');
    languageButton.classList.toggle('closed');
  }
  if(!infoMenu.classList.contains('closed')){
    infoMenu.classList.toggle('closed');
    infoButton.classList.toggle('closed');
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
  if(!paletteMenu.classList.contains('closed')){
    paletteMenu.classList.toggle('closed');
    paletteButton.classList.toggle('closed');
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

const themeOptTurtle = document.getElementById('theme-turtle');
const themeOptRoses = document.getElementById('theme-roses');
let setTheme = localStorage.getItem('setTheme');

const themeTurtle = () => {
  document.body.classList.remove('themeRoses', 'themeVioletNeon');
  document.body.classList.add('themeTurtle');
  localStorage.setItem('setTheme', 'themeTurtle');
}
const themeRoses = () => {
  document.body.classList.remove('themeTurtle', 'themeVioletNeon');
  document.body.classList.add('themeRoses');
  localStorage.setItem('setTheme', 'themeRoses');
}
const themeVioletNeon = () => {
  document.body.classList.remove('themeTurtle', 'themeRoses');
  document.body.classList.add('themeVioletNeon');
  localStorage.setItem('setTheme', 'themeVioletNeon');
}

if(setTheme === 'themeTurtle'){
  themeTurtle();
}
else if(setTheme === 'themeRoses'){
  themeRoses();
}
else if(setTheme === 'themeVioletNeon'){
  themeVioletNeon();
}

function setThemeFunction(nameTheme){
  setTheme = localStorage.getItem('setTheme');
  if (nameTheme == 1){
    themeTurtle();
  }
  else if (nameTheme == 2){
    themeRoses();
  }
  else if (nameTheme == 3){
    themeVioletNeon();
  }
}


// function setThemeTurtle(){
//   console.log('tema tartaruga')
//   setTheme = localStorage.getItem('setTheme')
//   localStorage.setItem('setTheme', 'themeTurtle')
//   if(setTheme == 'themeTurtle'){
//     document.body.classList.remove('themeRoses')
//     document.body.classList.add('themeTurtle')
//   }
// }
// function setThemeRoses(){
//   console.log('tema rosas')
//   setTheme = localStorage.getItem('setTheme')
//   localStorage.setItem('setTheme', 'themeRoses')
//   if(setTheme == 'themeRoses'){
//     document.body.classList.remove(('themeTurtle'))
//     document.body.classList.add('themeRoses')
//   }
// }

// if(setTheme == 'themeTurtle'){
//   setThemeTurtle()
// }
// else if(setTheme == 'themeRoses'){
//   setThemeRoses()
// }

// const setThemeTurtle = () => {
//   document.body.classList.remove('themeRoses')
//   document.body.classList.add('themeTurtle')
// }

// const setThemeRoses = () => {
//   document.body.classList.remove('themeTurtle')
//   document.body.classList.add('themeRoses')
// }

// themeOptTurtle.addEventListener('click', () =>{
//   themeSet = localStorage.getItem('themeSet')
//   if(themeSet !== "turtle"){
//     setThemeTurtle();
//   }
//   else if(themeSet !== "roses"){
//     setThemeRoses()
//   }
// })
// themeOptRoses.addEventListener('click', () =>{
//   themeSet = localStorage.getItem('themeSet')
// })