  let sampleData = [];  // will hold data from server

  // Current state
  let currentState = {
    page: 1,
    pageSize: 10,
    totalItems: 0,  // updated after data loads
    sortColumn: 'id',
    sortDirection: 'asc',
    searchQuery: '',
    dateRange: { start: null, end: null },
    dataType: 'all',
    statusFilter: 'all'
  };

  document.addEventListener('DOMContentLoaded', function() {
    fetch('getCertificates.php')
      .then(res => res.json())
      .then(data => {
        sampleData = data;
        currentState.totalItems = sampleData.length;
        renderTable();
        setupEventListeners();
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  });

  function renderTable() {
    // Filter and sort data based on current state
    let filteredData = filterData(sampleData);
    filteredData = sortData(filteredData);

    // Update totalItems for pagination info
    currentState.totalItems = filteredData.length;

    // Paginate data
    const paginatedData = paginateData(filteredData);

    // Update table
    const tbody = document.getElementById('dataBody');
    tbody.innerHTML = '';

    paginatedData.forEach(item => {
      const row = document.createElement('tr');

      // Determine status class
      const statusClass = `badge-${item.status}`;
      const typeDisplay = {
        'birth': 'Birth Certificate',
        'marriage': 'Marriage Certificate',
        'death': 'Death Certificate',
        'cenomar': 'Cenomar Certificate',
        'cenodeath': 'Cenodeath Certificate'
      }[item.type] || item.type;

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${typeDisplay}</td>
        <td>${formatDate(item.date)}</td>
        <td><span class="badge ${statusClass}">${capitalizeFirstLetter(item.status)}</span></td>
        <td>
          <button class="action-btn action-btn-view" data-id="${item.id}" data-action="view">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="action-btn action-btn-approve" data-id="${item.id}" data-action="approve">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="action-btn action-btn-reject" data-id="${item.id}" data-action="reject">
            <i class="fas fa-times"></i> Reject
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

    // Update pagination info
    updatePaginationInfo(currentState.totalItems);
  }

  // The rest of your helper functions (filterData, sortData, paginateData, updatePaginationInfo, setupEventListeners, formatDate, capitalizeFirstLetter) 
  // remain the same, just make sure they are inside this script tag

  // For example:
  function filterData(data) {
    return data.filter(item => {
      const matchesSearch = currentState.searchQuery === '' ||
        item.name.toLowerCase().includes(currentState.searchQuery.toLowerCase()) ||
        item.id.toString().includes(currentState.searchQuery) ||
        item.type.toLowerCase().includes(currentState.searchQuery.toLowerCase());

      const itemDate = new Date(item.date);
      const matchesDate = !currentState.dateRange.start ||
        (itemDate >= new Date(currentState.dateRange.start) &&
          itemDate <= new Date(currentState.dateRange.end));

      const matchesType = currentState.dataType === 'all' ||
        item.type === currentState.dataType;

      const matchesStatus = currentState.statusFilter === 'all' ||
        item.status === currentState.statusFilter;

      return matchesSearch && matchesDate && matchesType && matchesStatus;
    });
  }

  // (include all the rest of your functions here as before)
