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
    document.getElementById('show-contact-info').addEventListener('click', toggleContactInfo);
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
    newColumn.style.scale = Math.min(Math.max((index / numCols), -1), 1);
    //newColumn.style.scale = (index >= 5) ? index / numCols : (index / numCols)
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

const toggleContactInfo = () => {
    const contactInfo = document.getElementById('contact-info');
    if(contactInfo.classList.contains('hidden')){
        const address = "ngm01_contact";
        const domain = "protonmail.com";
        const email = `${address}@${domain}`
        if(contactInfo.childElementCount < 1) {
            let addy = document.createElement('p');
            addy.id = "addy";
            addy.textContent = email;
            contactInfo.appendChild(addy);
            document.getElementById('toggle-text').textContent = 'hide';
        }
        //contactInfo.style.animation = 'reveal 4s steps(1000, end)';
        contactInfo.classList.remove('hidden');
    } else {
        contactInfo.classList.add('hidden');
        document.getElementById('addy').remove();
        document.getElementById('toggle-text').textContent = 'view';
    }

}

const hideContactInfo = () => {

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