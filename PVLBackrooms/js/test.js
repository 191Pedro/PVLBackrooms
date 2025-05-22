const configButton = document.getElementById('config-btn');
const configMenu = document.getElementById('config-menu');
const infoButton = document.getElementById('info-btn');
const infoMenu = document.getElementById('info-menu');

configButton.addEventListener('click', () =>{
    configMenu.classList.toggle('closed')
    if(!infoMenu.classList.contains('closed')){
        infoMenu.classList.toggle('closed')
    }
})
infoButton.addEventListener('click', () =>{
    infoMenu.classList.toggle('closed')
    if(!configMenu.classList.contains('closed')){
        configMenu.classList.toggle('closed')
    }
})