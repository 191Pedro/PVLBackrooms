let indexSection = document.getElementById('index-section');
let indexSectionTitle = document.getElementById('index-section-title');

indexSectionTitle.addEventListener('click', () => {
    indexSection.classList.toggle('opened');
});

function extraContent(button) {
    button.parentElement.classList.toggle('opened');   
}

window.onload = () => {
    const itemImg = document.querySelectorAll('.item img');

    itemImg.forEach(img => {
        img.src = '../imgs/levels/' + img.id + '.png';
        img.onload = () => {
            img.closest('.item').classList.remove('loading');
        }
    })
}