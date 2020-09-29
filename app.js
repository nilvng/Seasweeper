const cardPuzzle = document.querySelector('.card-puzzle');
const startButton = document.querySelector('.start-button');
const checkButton = document.querySelector('.check-button');

startButton.addEventListener('click', () => generatePuzzle(16));
checkButton.addEventListener('click', checkit);

let cardPair = []

function checkit(){
    cardPuzzle.childNodes[2].style.border = '5px solid white'
}

function generatePuzzle(noCards){
    for (let index = 0; index < noCards; index++) {
        let card = document.createElement('div');
        card.classList.add("card");
        card.addEventListener('click', () => pickCard(card))

        let front = document.createElement('div');
        front.classList.add("front-card");
        front.innerText = "D1"
        card.appendChild(front)

        let back = document.createElement('img');
        back.classList.add("back-card");
        back.src = "./shuhua.jpg"
        card.appendChild(back) 

        cardPuzzle.appendChild(card);
    }
}

function pickCard(card){
    cardPair.push(card)
    card.classList.toggle("is-flipped");
    card.addEventListener("transitionend", e =>{
        validatePair()
    })
}

function validatePair(){
    if (cardPair.length == 2) {
      if (cardPair[0].src == cardPair[1].src) {
        cardPair[0].style.visibility = "hidden";
        cardPair[1].style.visibility = "hidden";
      }
      cardPair = [];
    }
}