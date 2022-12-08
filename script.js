(function() {

window.onload = function() {

    // TODO: create a bunch of columns at page load -- DONE
    // they need to be scaled -- DONE
    // they need to be staggered from left to right -- IN PROGRESS
    //      - stoa of attalos for reference: https://www.flickr.com/photos/jlascar/4517779606
    //      - NB: columns are 'farther apart' when 'nearer' to viewer, 'closer together' when 'further away'

    
    let main = document.getElementById('main');
    generateColumns(10);
    main.onwheel = takeAStroll;
};

const state = {}

const methods = {
    generateColumns: generateColumns,
    //takeAStroll: takeAStroll
}


function generateColumns (numCols = 10) {
    let columnContainer = document.getElementById('column-container');
    for(let i = numCols; i > 0; i--) {
        let newColumn = generateOneColumn(i, numCols);
        columnContainer.appendChild(newColumn);
    }
}

function generateOneColumn(index, numCols) {
    let newColumn = document.createElement('div');
    newColumn.style.scale = index / numCols;
    //newColumn.style.left = `-${numCols - index}rem`;
    newColumn.classList.add('column');
    return newColumn;
}

const takeAStroll = (event) => {
    event.preventDefault();
    let columns = document.querySelectorAll('.column');
    let delta = event.deltaY ? event.deltaY : event.deltaX;

    columns.forEach((column, idx) => {
        let scale = parseFloat(column.style.scale) + (delta * -0.01);
        column.style.scale = `${scale}`;
        column.style.transform = `translateZ(${scale})`
    })
}

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


})()