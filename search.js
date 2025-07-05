// Search functionality
class FoodSearch {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.clearButton = document.getElementById('clearSearch');
    this.searchResults = document.getElementById('searchResults');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.foodItems = document.querySelectorAll('.food-item');
    
    this.currentFilter = 'all';
    this.isSearching = false;
    
    this.initEventListeners();
  }

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
    });

    // Close search results when clicking outside