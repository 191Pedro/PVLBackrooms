const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);

    const items = document.querySelectorAll('.items .item');
    const noResults = document.getElementById('no_results');
    let hasResults = false;

    console.log(items)

    if (value !== '') {
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
        } else {
            noResults.style.display = 'block';
        }

    } else {
        items.forEach(item => item.style.display = 'flex');
        noResults.style.display = 'none';
    }
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