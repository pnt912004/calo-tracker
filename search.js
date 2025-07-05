// Search functionality
class FoodSearch {
  handleSearch(keyword) {
  const term = keyword.trim().toLowerCase();
  this.isSearching = term.length > 0;

  this.foodItems.forEach(item => {
    const nameElement = item.querySelector('.food-name');
    const name = nameElement?.textContent.toLowerCase() || '';

    if (name.includes(term)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  // Nếu bạn có div searchResults để hiển thị danh sách dưới dạng text
  if (this.searchResults) {
    if (!this.isSearching) {
      this.searchResults.classList.remove('show');
      this.searchResults.innerHTML = '';
      return;
    }

    const matches = Array.from(this.foodItems).filter(item => {
      const name = item.querySelector('.food-name')?.textContent.toLowerCase() || '';
      return name.includes(term);
    });

    if (matches.length > 0) {
      this.searchResults.innerHTML = matches.map(item => {
        const name = item.querySelector('.food-name').textContent;
        const calories = item.querySelector('.food-calories').textContent;
        return `
          <div class="search-result-item">
            <span class="search-result-name">${name}</span>
            <span class="search-result-calories">${calories}</span>
          </div>`;
      }).join('');
    } else {
      this.searchResults.innerHTML = `<div class="no-results">Không tìm thấy kết quả</div>`;
    }

    this.searchResults.classList.add('show');
  }
}
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.clearButton = document.getElementById('clearSearch');
    this.searchResults = document.getElementById('searchResults');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.foodItems = document.querySelectorAll('.food-item');
    
    this.currentFilter = 'all';
    this.isSearching = false;
    
    this.initEventListeners();
  
  }};


  initEventListeners() {
    // Search input events
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectFirstResult();
      }
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });
  
    // Clear search button
    this.clearButton.addEventListener('click', () => {
      this.clearSearch();
    });

    // Filter buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilter(e.target.dataset.filter);
      });
  })
};
document.addEventListener('DOMContentLoaded', () => {
  new FoodSearch();
});