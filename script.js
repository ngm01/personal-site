window.onload = () => {

    // TODO: create a bunch of columns at page load -- DONE
    // they need to be scaled -- DONE
    // they need to be staggered from left to right -- IN PROGRESS
    //      - stoa of attalos for reference: https://www.flickr.com/photos/jlascar/4517779606
    //      - NB: columns are 'farther apart' when 'nearer' to viewer, 'closer together' when 'further away'

    const generateColumns = (numCols = 10) => {
        let columnContainer = document.getElementById('column-container');
        for(let i = numCols; i > 0; i--) {
            let newColumn = document.createElement('div');
            newColumn.style.scale = i / numCols;
            newColumn.style.left = `${numCols - (i)}rem`;
            newColumn.classList.add('column');
            columnContainer.appendChild(newColumn);
        }
    }

    const takeAStroll = (event) => {
        event.preventDefault();
    
        //scale += event.deltaY * -0.01;
    
        let columns = document.querySelectorAll('.column');

        columns.forEach((column, idx) => {
            let scale = parseFloat(column.style.scale) + (event.deltaY * -0.01);
            let currentLeft = getCurrentLeft(column);
            let newLeft = currentLeft + (1 * event.deltaY);
            if(column.style.scale < 0) {
                //column.style.display = 'hidden';
            } else {
                // set a minmax on this for now??
                column.style.scale = scale;
                //column.style.left = newLeft + 'px';
            }
        });
    }
    
    let columnContainer = document.getElementById('column-container');
    generateColumns(10);
    columnContainer.onwheel = takeAStroll;
};

/*
    HELPER FUNCTIONS
*/

const calculateInitialLeft = (numCols, currentCol) => {
    
}


const getCurrentLeft = (col) => {
    let computedLeft = getComputedStyle(col).left;
    let styledLeft = col.style.left;
    return styledLeft.length === 0 ? styleToNumeric(computedLeft) : styleToNumeric(styledLeft);
}

const styleToNumeric = (styleValue, unit) => {
    return parseFloat(styleValue.replace(unit, ''));
}