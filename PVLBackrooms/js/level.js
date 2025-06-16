const indexSection = document.getElementById('index-section');

indexSection.addEventListener('click', () => {
    console.log('Teste')
    indexSection.classList.toggle('opened');
});