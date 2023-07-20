document.addEventListener('DOMContentLoaded', () => {

    //array of objects (with name and src property) for all the 4x4 = 16 block of images
    const cardsArray = [
        {
            name: 'angular',
            src: 'src/img/angular.jpg'
        },
        {
            name: 'backbone',
            src: 'src/img/backbone.jpg'
        },
        {
            name: 'ember',
            src: 'src/img/ember.jpg'
        },
        {
            name: 'javascript',
            src: 'src/img/javascript.jpg'
        },
        {
            name: 'jquery',
            src: 'src/img/jquery.jpg'
        },
        {
            name: 'react',
            src: 'src/img/react.jpg'
        },
        {
            name: 'svelte',
            src: 'src/img/svelte.jpg'
        },
        {
            name: 'vue',
            src: 'src/img/vue.jpg'
        },
        {
            name: 'angular',
            src: 'src/img/angular.jpg'
        },
        {
            name: 'backbone',
            src: 'src/img/backbone.jpg'
        },
        {
            name: 'ember',
            src: 'src/img/ember.jpg'
        },
        {
            name: 'javascript',
            src: 'src/img/javascript.jpg'
        },
        {
            name: 'jquery',
            src: 'src/img/jquery.jpg'
        },
        {
            name: 'react',
            src: 'src/img/react.jpg'
        },
        {
            name: 'svelte',
            src: 'src/img/svelte.jpg'
        },
        {
            name: 'vue',
            src: 'src/img/vue.jpg'
        }
    ]
    //to sort the cardsArray in random order
    cardsArray.sort(() => 0.5 - Math.random())
    console.log(cardsArray)

    //the grid class points to the div element which encapsulates the images
    const grid = document.querySelector('.grid')
    //the score id points to the span element in the scoreboard class div
    const scoreSpace = document.querySelector('#score')

    //this contains the name of the flipped image received from the cardsArray using the data-id
    //forced to contain at max 2 names
    let cardsChosen = []
    //this contains the data-id of the flipped image received from the cardsArray
    //forced to contain at max 2 id
    let cardsChosenIds = []
    let score = 0;

    function createBoard() {
        //loops for the number of objects inside the cardsArray and creates an img element with set of attributes and an event listener
        //which points to the flipCard function
        //each of these img elements are then appended to the grid class div
        for (let i = 0; i < cardsArray.length; i++) {
            const eachCard = document.createElement('img')
            eachCard.setAttribute('src', 'src/img/card-pic.jpg')
            eachCard.setAttribute('data-id', i.toString())
            eachCard.setAttribute('height', '200px')
            eachCard.setAttribute('width', '200px')
            eachCard.setAttribute('border-radius', '5px')
            //sets an event listener for 'click' on each of the image which fires the flipCard function
            eachCard.addEventListener('click', flipCard)
            grid.appendChild(eachCard)
        }
    }

    //'this' keyword is used to denote the img element for which the flipCard function is fired
    //and the data-id is received for that specific image element which is pushed to the cardsChosenIds array
    //and used to get the name property of the image and push into the cardsChosen array
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        console.log(cardsArray[cardId].name)
        cardsChosen.push(cardsArray[cardId].name)
        cardsChosenIds.push(cardId)
        console.log(cardsChosen + "  " + cardsChosenIds)
        //it sets the src of the specific img element to the respective src received from the cardsArray's src property
        this.setAttribute('src', cardsArray[cardId].src)
        //if cardsChosen array length becomes 2, which denotes that the user has flipped two cards
        //a setTimeout with a delay of 200ms fires the checkForMatch function
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 200)
        }
    }

    //it gets the nodelist of the img elements using the querySelectorAll
    //since the cardsChosenIds array will only contain 2 elements
    //their can we 3 cases
    //1->the user can select the same card 2 times
    //2->the user can select two similar cards
    //3->the user can select two non-similar cards
    //both the 0th and the 1st index of the cardsChosenIds are used to compare for the 1-case
    //both the 0th and the 1st index of the cardsChosen are used to compare for the 2-case under the else-if
    //else we just the flip back the images
    function checkForMatch() {
        const cardsBack = document.querySelectorAll('img')
        let firstSelection = cardsChosenIds[0]
        let secondSelection = cardsChosenIds[1]
        if(firstSelection === secondSelection) {
            alert('Don\'t choose the same card!!!')
            cardsBack[firstSelection].setAttribute('src', 'src/img/card-pic.jpg')
            cardsBack[secondSelection].setAttribute('src', 'src/img/card-pic.jpg')
        }
        else if(cardsChosen[0] === cardsChosen[1]) {
            //score is incremented by 10 points for each correct match
            score += 10
            alert('you have found a match')
            cardsBack[firstSelection].removeEventListener('click', flipCard)
            cardsBack[secondSelection].removeEventListener('click', flipCard)
        }
        else {
            cardsBack[firstSelection].setAttribute('src', 'src/img/card-pic.jpg')
            cardsBack[secondSelection].setAttribute('src', 'src/img/card-pic.jpg')

        }
        //if score hits 80
        if (score === 80) {
            scoreSpace.innerHTML = 'You Won!!! ' +
                'Score: ' + score
        }
        //if score < 80
        else {
            scoreSpace.innerHTML = 'Score: ' + score
        }
        //clear out the two cards selected arrays for the next pair of selection
        cardsChosen = []
        cardsChosenIds = []
    }

    // fires the logic of the code
    createBoard()

})