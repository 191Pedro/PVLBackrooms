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

        items.forEach(item => {
            item.style.display = 'flex';
        })
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
const filtersMenuClose = document.getElementById('filters-menu-close');
const filtersMenu = document.getElementById('filters-menu');
const optionGenre = document.getElementById('filter-per-genre');

filtersBtn.addEventListener('click', () =>{
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
})
filtersMenuClose.addEventListener('click', () => {
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
})

optionGenre.addEventListener('change', () => {
    filtersOptionsConfirm();
})

function filtersOptionsConfirm() {
    showAllAction();

    const item = document.querySelectorAll('.item');

    item.forEach(item => {
        item.style.display = 'flex';
        
        const matchGenre = optionGenre.value === 'all' || item.dataset.genre == optionGenre.value;

        if (matchGenre) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    });

    const noResults = document.getElementById('no-results');
    noResults.style.display = 'none';
};

function filtersOptionsCancel() {
    showAllAction();

    optionGenre.value = 'all';

    const item = document.querySelectorAll('.item');

    item.forEach(item => {
        item.style.display = 'flex';
    });
};

function extraContent(button) {
    button.parentElement.classList.toggle('opened');   
}