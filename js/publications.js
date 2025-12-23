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
    
    // Create table
    const table = document.createElement('table');
    table.className = 'publications-table';
    
    // Create header row (skip the first row if it contains headers)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    rows[0].forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body rows
    const tbody = document.createElement('tbody');
    for (let i = 1; i < rows.length; i++) {
      const tr = document.createElement('tr');
      const cells = rows[i];
      
      cells.forEach((cellData, index) => {
        const td = document.createElement('td');
        
        // If this is the last column and contains a URL, make it a link
        if (index === cells.length - 1 && cellData && cellData.trim().startsWith('http')) {
          const link = document.createElement('a');
          link.href = cellData.trim();
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.innerHTML = '<i class="fas fa-external-link-alt"></i> Link';
          td.appendChild(link);
        } else {
          td.textContent = cellData;
        }
        
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    
    container.innerHTML = '';
    container.appendChild(table);
  } catch (error) {
    console.error('Error loading publications:', error);
    container.innerHTML = '<p>Error loading publications. Please try again later.</p>';
  }
}

// Load publications when the page loads
document.addEventListener('DOMContentLoaded', loadPublications);
