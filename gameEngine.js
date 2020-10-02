const cardPuzzle = document.querySelector('.card-puzzle');
const modeOption = document.querySelector('.mode-settings')
const flipSound = new Audio("./card-flip.mp3")
const correctSound = new Audio("./correct.mp3")

modeOption.addEventListener('change',() => createPuzzle(modeOption.value))

let cardPair = []

createPuzzle(modeOption.value)

function createPuzzle(width){
    // Set every attribute to default value to start a new round
    setScore(0)
    cardPuzzle.textContent = ''
    let pokeID = []

    // Set the puzzle screen width match the mode value
    cardPuzzle.style.gridTemplateRows = `repeat(${width}, ${40/width}rem)`
    cardPuzzle.style.gridTemplateColumns = `repeat(${width}, ${40/width}rem)`

    // Generate the matrix which value is the pokeID from 1 - number of poke needed for that mode
    for (let i = 1; i <= Math.floor(width * width / 2); i++) {
        pokeID.push(i)
    }
    pokeID = [...pokeID, ...pokeID]
    pokeID.sort(() => Math.random() - 0.5).forEach((val,i) => {
        renderCard(val, i)
    })
}

function renderCard(val, i){
        let card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("id", i)
        card.addEventListener('click', () => pickCard(card))
        // Special event listener used to activate a function after the transition for that card is done
        card.addEventListener("transitionend", (e) => {
            if (cardPair.length == 2){
                validatePair();
                cardPair = []; 
            }
        })

        let front = document.createElement('img');
        front.classList.add("front-card");
        front.src = "https://www.iconfinder.com/data/icons/card-games/48/Paul-28-512.png"
        card.appendChild(front)

        let back = document.createElement('img');
        back.classList.add("back-card");
        back.srcset = `https://pokeres.bastionbot.org/images/pokemon/${val}.png`
        card.appendChild(back) 

        cardPuzzle.appendChild(card);
}

function pickCard(card){
    if (cardPair.includes(card)) return ;
    cardPair.push(card);
    flipSound.play()
    card.classList.toggle("is-flipped");

}

function validatePair(){
    let card1 = cardPair[0].querySelector(".back-card");
    let card2 = cardPair[1].querySelector(".back-card");

    if (card1.srcset == card2.srcset) {
      cardPair[0].style.visibility = "hidden";
      cardPair[1].style.visibility = "hidden";
      correctSound.play()
      setScore(10)
    } else {
      cardPair[0].classList.toggle("is-flipped");
      cardPair[1].classList.toggle("is-flipped");
          setScore(-2)
    }
}

function setScore(value){
    const scoreVal = document.querySelector('.score-value')
    if (value == 0 ){
        scoreVal.innerText = 0
    } else if (
        value < 0 && scoreVal.innerText > 0 ||
        value > 0){
    scoreVal.innerText = parseInt(scoreVal.innerText) + value
    }
}