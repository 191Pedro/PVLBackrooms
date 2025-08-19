const html = {
    get(element) {
        return document.querySelector(element);
    },
    getAll(element) {
        return document.querySelectorAll(element);
    }
}

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

function filtersOptionsCancel() {
    optionEntity.value = "all";
    optionNature.value = "any";
    optionIntellect.value = "any";
    optionSize.value = "any";
    calculateFilters();
};

function extraContent(button) {
    button.parentElement.classList.toggle('opened');   
}

const filtersBtn = html.get('#filters-btn');
const filtersMenuClose = html.get('#filters-menu-close');
const filtersMenu = html.get('#filters-menu');

filtersBtn.addEventListener('click', () =>{ filtersMenuToggle() });
filtersMenuClose.addEventListener('click', () => { filtersMenuToggle() });

function filtersMenuToggle() {
    filtersBtn.classList.toggle('opened');
    filtersMenu.classList.toggle('opened');
}

const clearSearchIcon = html.get('#icon-clear');
clearSearchIcon.addEventListener('click', clearSearch);

function clearSearch() {
    searchInput.value = '';
    calculateFilters();
}

const optionEntity = html.get('#filter-per-entity');
optionEntity.addEventListener('change', calculateFilters);
const optionNature = html.get('#filter-per-nature');
optionNature.addEventListener('change', calculateFilters);
const optionIntellect = html.get('#filter-per-intellect');
optionIntellect.addEventListener('change', calculateFilters);
const optionSize = html.get('#filter-per-size');
optionSize.addEventListener('change', calculateFilters);

const searchInput = html.get('#search');
searchInput.addEventListener('input', calculateFilters);

const itemsData = html.getAll('.items .item');
const data = Array.from(itemsData);
let dataFiltered = data;

function calculateFilters() {
    const displayingEntity = html.get('#displaying-entities');
    displayingEntity.textContent = optionEntity.selectedOptions[0].textContent;
    const displayingNature = html.get('#displaying-nature');
    displayingNature.textContent = optionNature.selectedOptions[0].textContent;
    const displayingIntellect = html.get('#displaying-intellect');
    displayingIntellect.textContent = optionIntellect.selectedOptions[0].textContent;
    const displayingSize = html.get('#displaying-size');
    displayingSize.textContent = optionSize.selectedOptions[0].textContent;
    
    const selectedEntity = optionEntity.value;
    const selectedNature = optionNature.value;
    const selectedIntellect = optionIntellect.value;
    const selectedSize = optionSize.value;
    const searchValue = formatString(searchInput.value);

    dataFiltered = data
        .filter(item => (item.dataset.entity == selectedEntity) || (selectedEntity == 'all'))
        .filter(item => (item.dataset.nature == selectedNature) || (selectedNature == 'any'))
        .filter(item => (item.dataset.intellect == selectedIntellect) || (selectedIntellect == 'any'))
        .filter(item => (item.dataset.size == selectedSize) || (selectedSize == 'any'))
        .filter(item => (formatString(item.textContent).includes(searchValue)) || (searchValue == ''));
    
    state.totalPage = Math.ceil(dataFiltered.length / state.perPage);
    state.page = 1;

    const noResults = html.get('#no-results');
    noResults.style.display = 'none';
    if (dataFiltered.length == 0) {
        noResults.style.display = 'flex';
    }
    clearSearchIcon.style.display = 'none';
    if (searchInput.value !== '') {
        clearSearchIcon.style.display = 'flex';
    }

    update();
}

const cardsDetails = document.getElementById('show-details');
let detailsVisible = true;

cardsDetails.addEventListener('click', () => {
    cardsDetails.classList.toggle('actived');
    
    detailsVisible = !detailsVisible;
    update();
})

let perPage = 12;

const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(dataFiltered.length / perPage),
    maxVisibleButtons: 5
}

const controls = {
    next() {
        state.page++;

        const lastPage = state.page > state.totalPage;
        if (lastPage) {
            state.page--;
        }
    },
    prev() {
        state.page--;

        if (state.page < 1) {
            state.page++;
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1;
        }

        state.page = +page;
        
        if (page > state.totalPage) {
            state.page = state.totalPage;
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1);
            update();
        })
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage);
            update();
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update();
        })
        html.get('.next').addEventListener('click', () => {
            controls.next();
            update();
        })
    }
}

const list = {
    update() {
        data.forEach(item => {
            item.style.display = 'none';
            const description = item.querySelectorAll('p');
            description.forEach(detail => {
                detail.style.display = 'block';
            })
            if (!detailsVisible) {
                description.forEach(detail => {
                    detail.style.display = 'none';
                })
            }
        })

        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;
        
        const paginatedItems = dataFiltered.slice(start, end);

        paginatedItems.forEach(item => {
            item.style.display = 'flex';
        })

        const displayingPage = html.get('#displaying-page');
        if (state.totalPage > 0) displayingPage.textContent = `${state.page} de ${state.totalPage}`;
        if (state.totalPage == 0) displayingPage.textContent = `0 de 0`;
    }
}

const buttons = {
    element: html.get('.pagination .numbers'),
    create(number) {
        const button = document.createElement('button');

        button.innerHTML = number;

        if(state.page == number) {
            button.classList.add('active');
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText;

            controls.goTo(page);
            update();
        })

        buttons.element.appendChild(button);
    },
    update() {
        buttons.element.innerHTML = '';
        const { maxLeft, maxRight } = buttons.calculateMaxVisible();

        for(let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page);
        }
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state;
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2));

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = maxVisibleButtons;
        }
        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1);
            maxRight = state.totalPage;

            if (maxLeft < 1) maxLeft = 1;
        }

        return { maxLeft, maxRight };
    }
}

function update() {
    list.update(),
    buttons.update()
}

function init() {
    update(),
    controls.createListeners(),
    calculateFilters()
}

init();