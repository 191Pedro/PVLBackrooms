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
        items.forEach(item => item.style.display = 'flex');
        noResults.style.display = 'none';

        clearSearch.style.display = 'none';
    }

    clearSearch.addEventListener('click', () =>{
        clearSearch.style.display = 'none';
        event.target.value = null;
        items.forEach(item => {

            if (formatString(item.textContent)) {
                item.style.display = 'flex';

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