$(document).ready(function(){

    $("#RSModal").on("hidden.bs.modal", function () {
        $("#selectProvinsi").val("");
        $("#selectCity").val("").prop('disabled', true);
        $("#btnHospital").prop('disabled', true);
        $("#hospitalContainer").html("");
    });

    $("#RSDetail").on("hidden.bs.modal", function(){
        $("#hospitalDetail").html("");
    });

})