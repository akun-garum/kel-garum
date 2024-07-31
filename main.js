function showImage(src, alt){
    $("#imgPopUp").show();
    $("#srcImgPopUp").attr('src', src);
    $("#captionImgPopUp").html(alt);
}

function closeImage() {
    $("#imgPopUp").hide();
}