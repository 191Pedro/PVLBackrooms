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
            if (i >= 8){
                return;
            }
            item.style.display = 'block';
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

        showAllAction();
        
        items.forEach(item => {
            if (formatString(item.textContent).indexOf(value) !== -1) {
                item.style.display = 'block';

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

const cardsDetails = document.getElementById('show-details');
let detailsVisible = true;

function DetailsToggle() {
    cardsDetails.classList.toggle('actived');
    detailsVisible = !detailsVisible;
    items.forEach(item =>{ 
        const description = item.querySelectorAll('p');
        if (description) {
            description.forEach(description => {
                description.style.display = detailsVisible ? 'block' : 'none';
            })
        }
    })
}

const filtersBtn = document.getElementById('filters-btn');
const filtersMenu = document.getElementById('filters-menu');
const filtersMenuClose = document.getElementById('filters-menu-close');
const optionItem = document.getElementById("filter-per-item");
const optionType = document.getElementById("filter-per-type");
const optionTrade = document.getElementById("filter-per-trade");

filtersBtn.addEventListener('click', () => {
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
})
filtersMenuClose.addEventListener('click', () => {
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
})

function filtersOptionsConfirm() {
    showAllAction();
    const item = document.querySelectorAll('.item');

    item.forEach(item =>{
        item.style.display = "block";
        
        const matchItem = optionItem.value === "all" || item.dataset.item == optionItem.value;
        const matchType = optionType.value === "all" || item.dataset.type.includes(optionType.value);
        const matchTrade = optionTrade.value === "all" || item.dataset.trade == optionTrade.value;

        if (matchItem && matchType && matchTrade) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    });

    const noResults = document.getElementById('no-results');
    noResults.style.display = 'none';
}

function filtersOptionsCancel() {
    showAllAction();
    
    optionItem.value = "all";
    optionType.value = "all";
    optionTrade.value = "all";

    const item = document.querySelectorAll('.item');

    item.forEach(item =>{
        item.style.display = "block";
    });
}

let indexSection = document.getElementById('index-section');
let indexSectionTitle = document.getElementById('index-section-title');

indexSectionTitle.addEventListener('click', () => {
    indexSection.classList.toggle('opened');
});