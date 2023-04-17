const columns = document.querySelectorAll('.col')
const getRandomColor = () => {
    let randomColor = ''
    const colorValues = '0123456789ABCDEF'

    for (let i=0; i<6; i++) {
        randomColor += colorValues[Math.floor(Math.random() * colorValues.length)]
    }
    return randomColor
}

const changeLock = function (lock) {
    lock.classList.toggle("button--open");
    lock.classList.toggle("button--close");
}

document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    evt.code === "Space" ? updateColor() : false  
})

document.addEventListener('click', (evt) => {
    evt.target.tagName === "BUTTON" ? changeLock(evt.target) : false  
    evt.target.tagName === "DIV" ? updateColor() : false
})

const setTextColor = function (text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

const saveNewHash = function(colors) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    })
    .join('-')
}

const updateColor = function(isInitial) {
    const hash = document.location.hash

    const hashArray = hash.substring(1).split('-').map((col) => {return '#' + col})
    console.log (hashArray)
    
    const colors = [];

    columns.forEach((column, index) => {
        const isLocked = column.querySelector('.button').classList.contains('button--close')
        const newColor = '#' + getRandomColor()

        if (isInitial && hash.length > 1) {
            column.style.backgroundColor = hashArray[index]
            column.querySelector('.title').textContent = hashArray[index]
            return
        } 
        
        if (isLocked) {
            colors.push(column.querySelector('.title').textContent)
            return
        }

        colors.push(newColor)
        column.style.backgroundColor = newColor;
        column.querySelector('.title').textContent = newColor;
        
        setTextColor(column.querySelector('.title'), newColor);
    })

    saveNewHash(colors)
}

updateColor(true);


