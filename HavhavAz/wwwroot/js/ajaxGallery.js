var ajax_gallery_path = "";
var af_token = $('input[name=__RequestVerificationToken]').val();

$('[aria-controls="gallery"]').click(function (e) {

    var id = $(this).attr("href").split("-")[2];
    var gallery_loader = document.getElementById("gallery-loader-" + id);

    if (!isNullOrEmpty(gallery_loader)) {

        AjaxCall("/Home/LoadGalleryAjax", af_token, { path: `/${ajax_gallery_path}/${id}` }, false, "", function (result) {
            gallery_loader.remove();
            $("#nav-gallery-" + id).html(result);
            $(".html5lightbox").html5lightbox();
        });
    }
});