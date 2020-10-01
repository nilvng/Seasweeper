const cardPuzzle = document.querySelector('.card-puzzle');
const startButton = document.querySelector('.start-button');
const checkButton = document.querySelector('.check-button');
startButton.addEventListener('click', () => generatePuzzle(16));
checkButton.addEventListener('click', checkit);


let cardPair = []
// let prefix = 'images/card-img'
// let postfix = '.jpg'
let images = []
function checkit(){
    const shuffleDiv = document.querySelector('.shuffle');
    fetch("https://picsum.photos/v2/list?page=2&limit=8")
    .then(response => response.json())
    .then(data => {
        images = [...data, ...data]
        console.log(images)
        console.log(data[0].url)
    })
}

function generatePuzzle(noCards){
    images.sort(() => Math.random() - 0.5)
    for (let index = 0; index < noCards; index++) {
        let card = document.createElement('div');
        card.classList.add("card");
        card.addEventListener('click', () => pickCard(card))
        card.addEventListener("transitionend", (e) => {
            if (cardPair.length == 2){
                validatePair();
                cardPair = [];
            }
        })

        let front = document.createElement('div');
        front.classList.add("front-card");
        front.innerText = "D1"
        card.appendChild(front)

        let back = document.createElement('img');
        back.classList.add("back-card");
        back.src = images[index].download_url
        card.appendChild(back) 

        cardPuzzle.appendChild(card);
    }
}

function pickCard(card){
    cardPair.push(card);
    console.log(cardPair)
    card.classList.toggle("is-flipped");
    if (cardPair.length == 2) {
        console.log("paired")

    }
}

function validatePair(){
    console.log(cardPair)
    let card1 = cardPair[0].querySelector(".back-card");
    let card2 = cardPair[1].querySelector(".back-card");
    console.log(card1.src);
    if (card1.src == card2.src) {
      cardPair[0].style.visibility = "hidden";
      cardPair[1].style.visibility = "hidden";
    } else {
      cardPair[0].classList.toggle("is-flipped");
      cardPair[1].classList.toggle("is-flipped");
    }
}