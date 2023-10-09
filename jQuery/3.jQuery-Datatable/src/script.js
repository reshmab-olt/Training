const itemsPerPage = 7;
let currentPage = 1;

const dataTable = $('#dataTable').DataTable({
    paging: true,
    pageLength: itemsPerPage,
});

function updateDataTable() {
    dataTable.page(currentPage - 1).draw(false);
}

function getTotalPages() {
    return Math.ceil(dataTable.rows().count() / itemsPerPage);
}

function updateSerialNumbers() {
    dataTable.rows().every(function serialNumber(rowIdx) {
        const data = this.data();

        data[0] = rowIdx + 1;
        this.data(data);
        return 0;
    });
}

function updatePaginationControls() {
    const totalPages = getTotalPages();

    const paginationContainer = $('#paginationContainer');

    paginationContainer.empty();

    const prevButton = $('<button>')
        .addClass('page-button')
        .text('Previous')
        .click(function () {
            if (currentPage > 1) {
                currentPage--;
                updateDataTable();
                updatePaginationControls();
            }
        });

        if (currentPage === 1) {
            prevButton.prop('disabled', true);
        }  

    paginationContainer.append(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = $('<button>')
            .addClass('page-button')
            .text(i)
            .click(function () {
                currentPage = i;
                updateDataTable();
                updatePaginationControls();
            });

        if (i === currentPage) {
            pageButton.addClass('active');
        }

        paginationContainer.append(pageButton);
    }

    const nextButton = $('<button>')
        .addClass('page-button')
        .text('Next')
        .click(function () {
            if (currentPage < totalPages) {
                currentPage++;
                updateDataTable();
                updatePaginationControls();
            }
        });
        if (currentPage === totalPages) {
            nextButton.prop('disabled', true);
        }

    paginationContainer.append(nextButton);
}

$('#prevPage').click(function (e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        updateDataTable();
        updatePaginationControls();
    }
});

$('#nextPage').click(function (e) {
    e.preventDefault();
    if (currentPage < getTotalPages()) {
        currentPage++;
        updateDataTable();
        updatePaginationControls();
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
                    item.city,
                    item.language,
                    item.title,
                    item.lccn,
                    item.state,
                ]);
            });

            dataTable.draw();
            updateSerialNumbers();

            const totalPages = getTotalPages();

            if (totalPages <= 1) {
                $('#paginationContainer').hide();
            } else {
                $('#paginationContainer').show();
                updatePaginationControls();
            }

            $('#searchInputLccn').val('');
            $('#searchInputFrequency').val('');
            $('#terms').val('');
        },
        error() {
            console.error('Error fetching data.');
        },
    });
});