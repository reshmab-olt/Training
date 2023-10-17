let currentPage = 1;
const rowsPerPage = 50;
let totalPages = 0;
const dataTable = $('#dataTable').DataTable({
    paging: false,
    dom: 'Bfrtip',
    buttons: [
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});
let currentActivePage = 1;

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
        $('#customPagination').hide;
    }

    if (searchValueFrequency) {
        searchUrl += `&frequency=${encodeURIComponent(searchValueFrequency)}`;
        $('#customPagination').hide;
    }

    if (searchValueTerm) {
        searchUrl += `&terms=${encodeURIComponent(searchValueTerm)}`;
        $('#customPagination').show;
        appendPageButtons();
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
            const totalDataLength = data.items.length;
            totalPages = Math.ceil(totalDataLength / rowsPerPage) * 8;
            $('#searchInputLccn').val('');
            $('#searchInputFrequency').val('');
            appendPageButtons();
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

function appendPageButtons() {
    $('#customPagination').empty();

    const prevVal = currentActivePage - 1;
    const prevButton = $('<button id="nextPageButton" class="page-button">Previous</button>').attr('value', prevVal);

    $('#customPagination').append(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = $(`<button id="pageButton${i}" class="page-button" value=${i}>${i}</button>`);
        $('#customPagination').append(button);
        if (currentActivePage == $(`#pageButton${i}`).text()) {
            $(`#pageButton${i}`).addClass('active-page')
        }
    }

    const nextVal = currentActivePage + 1;
    const nextButton = $('<button id="nextPageButton" class="page-button">Next</button>').attr('value', nextVal);

    $('#customPagination').append(nextButton);
    handlePageButtonClick();

    if (currentPage === 1) {
        prevButton.attr('disabled', true);
    }
    if (currentPage === totalPages) {
        nextButton.attr('disabled', true);
    }
}

function handlePageButtonClick() {
    $('.page-button').on('click', function () {
        pageNumber = parseInt($(this).val())
        currentActivePage = pageNumber;
        const prevButton = $('#prevPageButton');
        const nextButton = $('#nextPageButton');

        currentPage = pageNumber;
        updateURL(currentPage);
        fetchAndDisplayData();
        appendPageButtons();

        if (currentPage === 1) {
            prevButton.attr('disabled', true);
        } else {
            prevButton.removeAttr('disabled');
        }
        if (currentPage === totalPages) {
            nextButton.attr('disabled', true);
        } else {
            nextButton.removeAttr('disabled');
        }
    });
}