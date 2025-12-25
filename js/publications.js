// Fetch and render publications from Google Sheets TSV
async function loadPublications() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRXpOMPuQzSU3PesToBz0QYeGglUqefUuTHSp42b4baFEs0uNG4fe8wRGcM4BYvjhXeAQX6VezG3o1/pub?gid=203764231&single=true&output=tsv';
  const container = document.getElementById('publications-container');
  
  try {
    const response = await fetch(url);
    const tsv = await response.text();
    
    // Parse TSV data
    const rows = tsv.trim().split('\n').map(row => row.split('\t'));
    
    if (rows.length === 0) {
      container.innerHTML = '<p>No publications found.</p>';
      return;
    }
    
    // Create list
    const list = document.createElement('ul');
    list.className = 'publications-list';
    
    // Skip header row and create list items (skip first two columns: # and Type)
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i];
      const title = cells[2]; // Title is in the 3rd column
      const doi = cells.length > 4 ? cells[4] : ''; // DOI is in the 5th column
      
      if (!title) continue;
      
      const li = document.createElement('li');
      const text = document.createElement('span');
      text.textContent = title;
      li.appendChild(text);
      
      // Add DOI link if present
      if (doi && doi.trim().startsWith('http')) {
        const link = document.createElement('a');
        link.href = doi.trim();
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = ' <i class="fas fa-external-link-alt"></i> DOI';
        link.className = 'doi-link';
        li.appendChild(link);
      }
      
      list.appendChild(li);
    }
    
    container.innerHTML = '';
    container.appendChild(list);
  } catch (error) {
    console.error('Error loading publications:', error);
    container.innerHTML = '<p>Error loading publications. Please try again later.</p>';
  }
}

// Load publications when the page loads
document.addEventListener('DOMContentLoaded', loadPublications);
