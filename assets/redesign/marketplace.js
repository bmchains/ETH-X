const toolbar = document.querySelector('.toolbar');
const filters = Array.from(document.querySelectorAll('[data-filter]'));
const search = document.querySelector('#search');
const cards = Array.from(document.querySelectorAll('[data-category]'));
const results = document.querySelector('#results');
let category = 'all';

function updateCatalog() {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;
  for (const card of cards) {
    const matchesCategory = category === 'all' || category === card.dataset.category;
    const matchesQuery = card.textContent.toLowerCase().includes(query);
    card.hidden = !matchesCategory || !matchesQuery;
    if (!card.hidden) visibleCount += 1;
  }

  results.textContent = visibleCount
    ? `${visibleCount} ${visibleCount === 1 ? 'collectible' : 'collectibles'}`
    : 'No collectibles match your search.';
}

for (const button of filters) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
    updateCatalog();
  });
}
search.addEventListener('input', updateCatalog);
updateCatalog();
toolbar.hidden = false;
results.hidden = false;

const copy = document.querySelector('#copy');
const copyStatus = document.querySelector('#copy-status');
if (navigator.clipboard) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#address').textContent);
      copyStatus.textContent = 'Contract address copied.';
    } catch {
      copyStatus.textContent = 'Copy failed. Select the address above to copy it manually.';
    }
  });
}
