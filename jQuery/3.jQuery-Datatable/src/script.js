$(document).ready(function () {
    var table = $("table").DataTable();
  
    $("#submitButton").click(function (e) {
        e.preventDefault();
        var searchTerm = $("#searchInput").val();
  
        $.ajax({
            url: "https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json&page=5",
            type: "GET",
            dataType: "json",
            data: { lccn: searchTerm },
            success: function (data) {
                var filteredData = data.items.filter(function (item) {
                    return (item.lccn.includes(searchTerm) );      
                });

                dataTable.rows.add(filteredData).draw();
                
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
  });
  