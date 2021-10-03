function adaptImg() {
    let basePixel = 16;

    setTimeout(() => { // на всякий случай, чтобы не было нулевых размеров 
        document.querySelectorAll("[adaptImg]").forEach(item => {
            let width = item.naturalWidth / basePixel;
            let height = item.naturalHeight / basePixel;

            if (width > 0) {
                item.style.width = `${width}rem`;
                //item.style.height = `${height}rem`;
            }
        });
    }, 50);
}

adaptImg();