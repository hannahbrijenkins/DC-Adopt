function showImage(fileInput) {
    let files = fileInput.files;
    for(let i = 0; i < files.length; i++) {
        let file = files[i];
        var imageType = /image.*/;
        if(!file.type.match(imageType)) {
            continue;
        }
        let img = document.getElementById(`thumbnail`);
        img.file = file;
        let reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}