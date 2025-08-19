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
    optionGenre.value = "all";
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

const optionGenre = html.get('#filter-per-genre');
optionGenre.addEventListener('change', calculateFilters);

const searchInput = html.get('#search');
searchInput.addEventListener('input', calculateFilters);

const itemsData = html.getAll('.items .item');
const data = Array.from(itemsData);
let dataFiltered = data;

function calculateFilters() {
    const displayingGenre = html.get('#displaying-genre');
    displayingGenre.textContent = optionGenre.selectedOptions[0].textContent;
    
    const selectedGenre = optionGenre.value;
    const searchValue = formatString(searchInput.value);

    dataFiltered = data
        .filter(item => (item.dataset.genre == selectedGenre) || (selectedGenre == 'all'))
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

let perPage = 20;

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