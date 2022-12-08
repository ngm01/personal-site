const takeAStroll = (event) => {
    event.preventDefault();

    //scale += event.deltaY * -0.01;

    let columns = document.querySelectorAll('.column');

    columns.forEach((column, idx) => {
        let scale = parseFloat(column.style.scale) + (event.deltaY * -0.01);
        let currentLeft = getCurrentLeft(column);
        let newLeft = (currentLeft + (1 * event.deltaY));
        //if(idx === 0) console.log("scale:", scale);
        if(column.style.scale < 0) {
            column.remove();
        } else {
            column.style.transform = `scaleZ(${event.deltaY})`;
            //column.style.left = `${(newLeft)}px`;
            if(event.deltaY > 0) {
                column.style.animation = `goForwards 4s 1 linear normal forwards`;    
            } else {
                column.style.animation = `goBackwards 4s 1 linear normal forwards`;
            }
        }
    });
}