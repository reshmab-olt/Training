$(document).ready(function () {
    var dataTable = $('table').DataTable({
        columns: [
            { data: 'place_of_publication' },
            { data: 'start_year' },
            { data: 'publisher' },
            { data: 'county' },
            { data: 'edition' },
            { data: 'frequency' },
            { data: 'url' },
            { data: 'id' },
            { data: 'subject' },
            { data: 'city' },
            { data: 'language' },
            { data: 'title' },
            { data: 'holding_type' },
            { data: 'end_year' },
            { data: 'alt_title' },
            { data: 'note' },
            { data: 'lccn' },
            { data: 'state' },
            { data: 'place' },
            { data: 'country' },
            { data: 'type' },
            { data: 'title_normal' },
            { data: 'oclc' },
        ]
    });

    $('#searchButton').on('click', function () {
        var searchId = $('#searchId').val();

        dataTable.clear().draw();

        $.ajax({
            url: "https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json&page=5",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var filteredData = data.items.filter(function (item) {
                    return (searchId === "" || item.id.includes(searchId) || item.type.includes(searchId));
                       
                });

                dataTable.rows.add(filteredData).draw();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});
