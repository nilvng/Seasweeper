const cardPuzzle = document.querySelector('.card-puzzle');
const modeOption = document.querySelector('.mode-settings')

modeOption.addEventListener('change',createPuzzle)

let cardPair = []

function createMatrix(max){
    let matrix = []
    for (let i = 1; i <= max; i++) {
        matrix.push(i)
    }
}

function createPuzzle(){
    setScore(0)
    cardPuzzle.textContent = ''
    getImages(modeOption.value)
    .then(images => {
        images.sort(() => Math.random() - 0.5)
        creatCards(images, modeOption.value)
    })
    .catch(e => alert(e))
}

async function getImages(width){
    let res = await fetch(`https://picsum.photos/v2/list?page=2&limit=${width**2/2}`)
    let data = await res.json()
    return [...data, ...data]
}

function creatCards(images, width){
    for (let index = 0; index < width * width; index++) {
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
    card.classList.toggle("is-flipped");
}

function validatePair(){
    let card1 = cardPair[0].querySelector(".back-card");
    let card2 = cardPair[1].querySelector(".back-card");

    if (card1.src == card2.src) {
      cardPair[0].style.visibility = "hidden";
      cardPair[1].style.visibility = "hidden";
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
