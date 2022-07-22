const cards = document.querySelectorAll('.card');
const start = document.querySelector('.button-start');
const placar = document.querySelector('.placar');
const error = document.querySelector('.error');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let acertos = 0;
let erros = 0;
start.addEventListener('click', startGame)

//função para virar carta

function startGame(){
    placar.innerHTML = `Acertos: 0`;
    error.innerHTML = `Erros : 0`;
    start.innerHTML = `restart`;
    start.classList.remove("button-start");
    start.classList.add("restart");
    const restart = document.querySelector('.restart');
    restart.addEventListener('click',reset)

        function flipCard() {
            if(lockBoard) return;
            if(this === firstCard) return;
        
            this.classList.add('flip');
            if(!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                return;
            }
        
            secondCard = this;
            hasFlippedCard = false;
            checkForMatch();
        }
        
        //função que checa se as cartas são iguais
        function checkForMatch() {
            if(firstCard.dataset.card === secondCard.dataset.card) {
                disableCards();
                acertos += 1;
                placar.innerHTML = `Acertos: ${acertos}`

                if(acertos === 6){
                    window.alert(`Fim de Jogo!!! \n Total de acerto: ${acertos}\n Total de erros: ${erros} \n Pontuação: ${(acertos*5) - erros}`);
                }

                return;
            }

        
            unflipCards();
        }
        
        //função que desabilita as cartas
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        
            resetBoard();
        }
        
        //funcão que desvira as cartas
        function unflipCards() {
            lockBoard = true;
        
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                erros += 1;
                error.innerHTML = `Erros : ${erros}`;
                resetBoard();
            }, 800);
        }
        
        //função que reseta o tabuleiro
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }
        
        //função que embaralha as cartas
        (function shuffle() {
            cards.forEach((card) => {
                let ramdomPosition = Math.floor(Math.random() * 12);
                card.style.order = ramdomPosition;
            })
        })();
        
        //adiciona evento de clique na carta
        cards.forEach((card) => {
            card.addEventListener('click', flipCard)
        });

}

function reset(){
   window.location.reload(false);
}