const dataTable = $('#dataTable').DataTable();

let currentPage = 1;
let itemsPerPage = 10;

function updateSerialNumbers() {
  dataTable.rows().every(function serialNumber(rowIdx) {
    const data = this.data();

    data[0] = rowIdx + 1;
    this.data(data);
    return 0;
  });
}

function updateTable(page) {
  const startIndex = (page - 1) * itemsPerPage;

  dataTable.page(startIndex / itemsPerPage).draw(false);
  $('#currentPage').text(page);
  currentPage = page;

  const totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);

  if (totalPage <= 1 || dataTable.rows().count() <= itemsPerPage) {
    $('#paginationContainer').hide();
  } else {
    $('#paginationContainer').show();
  }

  $('#prevPage').prop('disabled', currentPage === 1);
  $('#nextPage').prop('disabled', currentPage === totalPage);
  updateSerialNumbers();
}

$('#nextPage').click(() => {
  const totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);

  if (currentPage < totalPage) {
    currentPage++;
    updateTable(currentPage);
  }
});
$('.page-button').click(function () {
  const page = parseInt($(this).text());

  updateTable(page);
});

$('#prevPage').click(() => {
  if (currentPage > 1) {
    currentPage--;
    updateTable(currentPage);
  }
});

$('#searchForm').submit((e) => {
  e.preventDefault();

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

  itemsPerPage = 10;

  $('#paginationContainer').show();

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
          item.id,
          item.subject,
          item.city,
          item.language,
          item.title,
          item.lccn,
          item.state,
          item.country,
        ]);
      });

      dataTable.draw();
      updateSerialNumbers();
      $('#searchInputLccn').val('');
      $('#searchInputFrequency').val('');
      $('#terms').val('');

      if (dataTable.rows().count() <= itemsPerPage) {
        $('#paginationContainer').hide();
      }
    },
    error() {
      console.error('Error fetching data.');
    },
  });
});