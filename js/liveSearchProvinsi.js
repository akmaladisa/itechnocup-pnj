$(document).ready(function() {
    $("#searchProvinsi").on("keyup", function() {
        
        let value = $(this).val().toLowerCase();

        $('.provinsi-card').filter(function() {
            $(this).toggle($(this).find('h5').text().toLowerCase().indexOf(value) > -1)
        });

    });
});
