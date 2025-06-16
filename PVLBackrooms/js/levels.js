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
            item.style.display = 'block';

            // if (item.classList.contains('sublevel')) {
            //     item.style.display = 'none';
            // }
            i++;
        });
    }
}

function showAllAction() {
    showAll.style.display = 'none';
    homeDisplayTerm = false;
    items.forEach(item =>{ 
        item.style.display = 'block';
    })
}

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);

    const noResults = document.getElementById('no-results');
    let hasResults = false;

    if (value !== '') {
        clearSearch.style.display = 'block';
        
        items.forEach(item => {
            if (formatString(item.textContent).indexOf(value) !== -1) {
                item.style.display = 'block';

                hasResults = true;

                showAllAction();
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
                item.style.display = 'block';

                hasResults = true;
            }
        })
        if (hasResults) {
            noResults.style.display = 'none';
        }
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

    const levelFilter = optionLevel.value;
    const sublevelFilter = optionSublevel.value;

    item.forEach(item => {
        item.style.display = "block";
        
        const matchLevel = levelFilter === "all" || item.dataset.level == levelFilter;
        const matchSublevel = sublevelFilter === "all" || item.dataset.sublevel == sublevelFilter;

        if (matchLevel && matchSublevel) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    });
};

function filtersOptionsCancel() {
    optionLevel.value = "all";
    optionSublevel.value = "all";

    const item = document.querySelectorAll('.item');

    item.forEach(item => {
        item.style.display = "block";
    });
};