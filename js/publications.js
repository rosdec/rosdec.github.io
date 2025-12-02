// Fetch and render publications from Google Sheets
async function loadPublications() {
  const url = 'https://docs.google.com/spreadsheets/d/1nzH-YRtDvAZ78ScHSQlTIqPIOdNqA8VZTFp1EVE41HA/gviz/tq?tqx=out:html&tq&';
  const container = document.getElementById('publications-container');
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Parse the HTML response
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    
    if (table) {
      // Clean up the table - remove Google's inline styles
      table.removeAttribute('style');
      table.className = 'publications-table';
      
      // Clean up all cells
      const allCells = table.querySelectorAll('td, th');
      allCells.forEach(cell => {
        cell.removeAttribute('style');
      });
      
      // Clean up rows
      const allRows = table.querySelectorAll('tr');
      allRows.forEach(row => {
        row.removeAttribute('style');
      });
      
      container.innerHTML = '';
      container.appendChild(table);
    } else {
      container.innerHTML = '<p>Unable to load publications.</p>';
    }
  } catch (error) {
    console.error('Error loading publications:', error);
    container.innerHTML = '<p>Error loading publications. Please try again later.</p>';
  }
}

// Load publications when the page loads
document.addEventListener('DOMContentLoaded', loadPublications);
