var cardsArray = [
    {
        'name': 'CSS',
        'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true'
    },
    {
        'name': 'HTML',
        'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true'
    },
    {
        'name': 'jQuery',
        'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true'
    },
    {
        'name': 'JS',
        'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true'
    },
    {
        'name': 'Node',
        'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true'
    },
    {
        'name': 'Photo Shop',
        'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true'
    },
    {
        'name': 'PHP',
        'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true'
    },
    {
        'name': 'Python',
        'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true'
    },
    {
        'name': 'Ruby',
        'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true'
    },
    {
        'name': 'Sass',
        'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true'
    },
    {
        'name': 'Sublime',
        'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true'
    },
    {
        'name': 'Wordpress',
        'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true'
    },
];

let gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(() => {
    return 0.5 - Math.random();
})



const game = document.querySelector('#game-board');
const grid = document.createElement('section');

grid.classList.add('grid');
game.appendChild(grid);

const getImages = () => {
    gameGrid.forEach((allCard) => {
        console.log(allCard)
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = allCard.name;
        // card.style.backgroundImage = `url(${allCard.img})`;
        // grid.appendChild(card);
        let front = document.createElement('div');
        front.classList.add('front');

        let back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${allCard.img})`;
        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    })
}

getImages();

let firstGuess = '';
let secondGuess = '';

let count = 0;
let previousTarget = null;
let delay = 1200;




let match = () => {
    let selected = document.querySelectorAll('.selected');
    selected.forEach((select) => {
        select.classList.add('match');
        console.log(select)
    })
}


let resetGuess = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    

    let selected = document.querySelectorAll('.selected');
    selected.forEach((select) => {
        select.classList.remove('selected');
    })
}



const clickCard = (event) => {
    let clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget ||
        clicked.parentNode.classList.contains('match')
        || clicked.parentNode.classList.contains('selected')) {
        return;
    }

    if (count < 2) {
        count++;
        // clicked.classList.add('selected');
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess != '' && secondGuess != '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuess, delay);
            } else {
                setTimeout(resetGuess, delay);
            }
        }
        previousTarget = clicked;
    }
}

grid.addEventListener('click', clickCard);