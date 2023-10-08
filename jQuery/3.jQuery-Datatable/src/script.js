
    var dataTable = $('#dataTable').DataTable({
        "paging": true, 
        "pageLength": 10,
        "dom": 'lrtip',
        "pagingType": "full_numbers" 
    });

    var currentPage = 1;
    var itemsPerPage = 10;
    var totalItems = 0;

    
    function updateTable(page) {
        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        dataTable.page(startIndex / itemsPerPage).draw(false);
        $('#currentPage').text(page);
        currentPage = page;

        var totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);
        $('#prevPage').prop('disabled', currentPage === 1);
        $('#nextPage').prop('disabled', currentPage === totalPage);
    }

    $('#nextPage').click(function () {
        var totalPage = Math.ceil(dataTable.rows().count() / itemsPerPage);
        if (currentPage < totalPage) {
            currentPage++;
            updateTable(currentPage);
        }
    });
    $('.page-button').click(function () {
        var page = parseInt($(this).text());
        updateTable(page);
    });

    $('#prevPage').click(function () {
        if (currentPage > 1) {
            currentPage--;
            updateTable(currentPage);
        }
    });

    $('.page-button').click(function () {
        var page = parseInt($(this).text());
        updateTable(page);
    });
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        var searchValue = $('#searchInput').val();
        $('#paginationContainer').show();
        $.ajax({
            url: 'https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json&lccn=' + searchValue,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                dataTable.clear();
                $.each(data.items, function (index, item) {
                    dataTable.row.add([
                        item.place_of_publication,
                        item.start_year,
                        item.publisher,
                        item.county,
                        item.edition,
                        item.frequency,
                        item.url,
                        item.id,
                        item.subject,
                        item.city,
                        item.language,
                        item.title,
                        item.holding_type,
                        item.end_year,
                        item.alt_title,
                        item.note,
                        item.lccn,
                        item.state,
                        item.place,
                        item.country,
                        item.type,
                        item.title_normal,
                        item.oclc
                    ]);
                });

                dataTable.draw();
            },
            error: function () {
                console.error('Error fetching data.');
            }
        });
    });

