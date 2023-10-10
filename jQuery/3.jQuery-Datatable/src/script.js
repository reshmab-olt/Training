
let currentPage = 1;
const rowsPerPage = 50; 
const dataTable = $('#dataTable').DataTable({
    paging: false,
    dom: 'Bfrtip', // Include the 'B' for Buttons
    buttons: [
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

function updateSerialNumbers() {
    dataTable.rows().every(function serialNumber(rowIdx) {
        const data = this.data();
        data[0] = rowIdx + 1 + (currentPage - 1) * rowsPerPage;
        this.data(data);
        return 0;
    });
}

function fetchAndDisplayData() {
    const searchValueLccn = $('#searchInputLccn').val();
    const searchValueFrequency = $('#searchInputFrequency').val();
    const searchValueTerm = $('#terms').val();
    let searchUrl = 'https://chroniclingamerica.loc.gov/search/titles/results/?format=json';
  
    if (searchValueLccn) {
      searchUrl += `&lccn=${encodeURIComponent(searchValueLccn)}`;
    }
  
    if (searchValueFrequency) {
      searchUrl += `&frequency=${encodeURIComponent(searchValueFrequency)}`;
    }
  
    if (searchValueTerm) {
      searchUrl += `&terms=${encodeURIComponent(searchValueTerm)}`;
    }
  
    searchUrl += `&page=${currentPage}`;

    if (!searchValueLccn && !searchValueFrequency) {
        $('#customPagination').show();
    } else {
        $('#customPagination').hide();
    }
  
    $.ajax({
        url: searchUrl,
        type: 'GET',
        dataType: 'json',
        success(data) {
            dataTable.clear().draw();

            $.each(data.items, (index, item) => {
                dataTable.row.add([
                    index + 1,
                    item.place_of_publication,
                    item.start_year,
                    item.publisher,
                    item.frequency,
                    item.city,
                    item.language,
                    item.title,
                    item.lccn,
                    item.state,
                ]);
            });

            dataTable.draw();
            updateSerialNumbers();

            if (totalPages <= 1) {
                $('#customPagination').hide();
            } else {
                $('#customPagination').show();
                
            }

            $('#searchInputLccn').val('');
            $('#searchInputFrequency').val('');
            $('#terms').val('');
        },
        error() {
            console.error('Error fetching data.');
        },
    });
  } 

$('#searchForm').submit((e) => {
    e.preventDefault();
    fetchAndDisplayData();  
});

function updateURL(pageNumber) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    window.history.pushState({}, '', url.toString());
  }

function handlePageButtonClick(pageNumber) {
    currentPage = pageNumber;
    updateURL(currentPage);
    fetchAndDisplayData();
  }

  $('#oneButton').click(() => handlePageButtonClick(1));
  $('#twoButton').click(() => handlePageButtonClick(2));
  $('#threeButton').click(() => handlePageButtonClick(3));
  $('#fourButton').click(() => handlePageButtonClick(4));
  $('#fiveButton').click(() => handlePageButtonClick(5));
  $('#sixButton').click(() => handlePageButtonClick(6));
  $('#sevenButton').click(() => handlePageButtonClick(7));
  $('#eightButton').click(() => handlePageButtonClick(8));


    
