const searchInput = document.getElementById('search');
const clearSearch = document.getElementById('icon-clear');

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);

    const items = document.querySelectorAll('.items .item');
    const noResults = document.getElementById('no_results');
    let hasResults = false;

    if (value !== '') {
        clearSearch.style.display = 'block';
        
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
        items.forEach(item => item.style.display = 'block');
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
const optionOperation = document.getElementById("filter-per-operation");
const optionSector = document.getElementById("filter-per-sector");
const optionLevel = document.getElementById("filter-per-level");

filtersBtn.addEventListener('click', () =>{
    filtersMenu.classList.toggle('opened');
})

function filtersOptionsConfirm(){
    const item = document.querySelectorAll('.item');

    const operationFilter = optionOperation.value;
    const sectorFilter = optionSector.value;
    const levelFilter = optionLevel.value;

    item.forEach(item =>{
        item.style.display = "block";
        
        const matchOperation = operationFilter === "all" || item.dataset.operation == operationFilter;
        const matchSector = sectorFilter === "all" || item.dataset.sector == sectorFilter;
        const matchLevel = levelFilter === "all" || item.dataset.level == levelFilter;

        if (matchOperation && matchSector && matchLevel) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    });
}

function filtersOptionsCancel(){
    const operationFilter = optionOperation.value;
    const sectorFilter = optionSector.value;
    const levelFilter = optionLevel.value;

    optionOperation.value = "all";
    optionSector.value = "all";
    optionLevel.value = "all";
    
    const item = document.querySelectorAll('.item');

    item.forEach(item =>{
        item.style.display = "block";
    });
}