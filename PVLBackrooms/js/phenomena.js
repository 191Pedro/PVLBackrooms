const searchInput = document.getElementById('search');
const clearSearch = document.getElementById('icon-clear');
const showAll = document.getElementById('show-all');
const items = document.querySelectorAll('.items .item')
let homeDisplayTerm = true;

homeDisplay();

function homeDisplay() {
    if (homeDisplayTerm = true) {
        let i = 0
        items.forEach(item => {
            if (i >= 8) {
                return;
            }
            item.style.display = 'flex';
            i++;
        });
    }
}

function showAllAction() {
    showAll.style.display = 'none';
    homeDisplayTerm = false;
    items.forEach(item =>{ 
        item.style.display = 'flex';
    })
}

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);

    const noResults = document.getElementById('no-results');
    let hasResults = false;

    if (value !== '') {
        clearSearch.style.display = 'flex';
        
        showAllAction();
        
        items.forEach(item => {
            if (formatString(item.textContent).indexOf(value) !== -1) {
                item.style.display = 'flex';

                hasResults = true;
            }
            else {
                item.style.display = 'none';
            }
        });
        
        if (hasResults) {
            noResults.style.display = 'none';
        }
        else {
            noResults.style.display = 'flex';
        }
    }
    else {
        noResults.style.display = 'none';

        clearSearch.style.display = 'none';
    }

    clearSearch.addEventListener('click', () =>{
        clearSearch.style.display = 'none';
        event.target.value = '';
        items.forEach(item => {

            if (formatString(item.textContent)) {
                item.style.display = 'flex';

                hasResults = true;
                noResults.style.display = 'none';
            }
        })
    })
});

function formatString(value) {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
      event.preventDefault();
      searchInput.focus();
    }
});

const filtersBtn = document.getElementById('filters-btn');
const filtersMenu = document.getElementById('filters-menu');
const optionLevel = document.getElementById("filter-per-level");
const optionSublevel = document.getElementById("filter-per-sublevel");

filtersBtn.addEventListener('click', () =>{
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
})

function filtersOptionsConfirm() {
    showAllAction();
    const item = document.querySelectorAll('.item');

    item.forEach(item => {
        item.style.display = "flex";
        
        const matchLevel = optionLevel.value === "all" || item.dataset.level == optionLevel.value;
        const matchSublevel = optionSublevel.value === "all" || item.dataset.sublevel == optionSublevel.value;

        if (matchLevel && matchSublevel) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    });
};

function filtersOptionsCancel() {
    showAllAction();

    optionLevel.value = "all";
    optionSublevel.value = "all";

    const item = document.querySelectorAll('.item');

    item.forEach(item => {
        item.style.display = "flex";
    });
};

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