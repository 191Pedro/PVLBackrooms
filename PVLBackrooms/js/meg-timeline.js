const ageOptions = document.getElementById('age-selection');
const items = document.querySelectorAll('.items .item');
const description = document.querySelectorAll('.age-description');

function ageOptionsFunction() {
    description.forEach(description => {
        if (description.dataset.age === ageOptions.value) {
            description.style.display = 'flex'
        }
        else {
            description.style.display = 'none'
        }
    });
    items.forEach(item => {
        if (item.dataset.age === ageOptions.value) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    });
};

ageOptions.addEventListener('change', ()=> {
    ageOptionsFunction();
})

ageOptionsFunction();

let indexSection = document.getElementById('index-section');
let indexSectionTitle = document.getElementById('index-section-title');

indexSectionTitle.addEventListener('click', () => {
    indexSection.classList.toggle('opened');
});