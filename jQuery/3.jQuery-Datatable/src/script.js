let dataTable;

dataTable = $('#dataTable').DataTable({
    "paging": true,
    "pageLength": 10,
    "dom": 'lrtip',
    "pagingType": "full_numbers"
});

let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;

function updateTable(page) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    dataTable.page(startIndex / itemsPerPage).draw(false);
    $('#currentPage').text(page);
    currentPage = page;

    let totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);

    $('#prevPage').prop('disabled', currentPage === 1);
    $('#nextPage').prop('disabled', currentPage === totalPage);
    updateSerialNumbers();
}

function updateSerialNumbers() {
    dataTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
        let data = this.data();

        data[0] = rowIdx + 1;
        this.data(data);
    });
}

$('#nextPage').click(function () {
    let totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);

    if (currentPage < totalPage) {
        currentPage++;
        updateTable(currentPage);
    }
});
$('.page-button').click(function () {
    let page = parseInt($(this).text());

    updateTable(page);
});

$('#prevPage').click(function () {
    if (currentPage > 1) {
        currentPage--;
        updateTable(currentPage);
    }
});

$('#searchForm').submit(function (e) {
    e.preventDefault();

    let searchValueLccn = $('#searchInputLccn').val();
    let searchValueFrequency = $('#searchInputFrequency').val();
    let searchUrl = 'https://chroniclingamerica.loc.gov/search/titles/results/?format=json';

    if (!searchValueLccn && !searchValueFrequency) {
        $('#paginationContainer').hide();
        dataTable.clear().draw();
        return;
    }

    if (searchValueLccn) {
        searchUrl += '&lccn=' + encodeURIComponent(searchValueLccn);
    }

    if (searchValueFrequency) {
        searchUrl += '&frequency=' + encodeURIComponent(searchValueFrequency);
    }

    $('#paginationContainer').show();

    $.ajax({
        url: searchUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            dataTable.clear().draw();

            $.each(data.items, function (index, item) {
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
        },
        error: function () {
            console.error('Error fetching data.');
        }
    });
});