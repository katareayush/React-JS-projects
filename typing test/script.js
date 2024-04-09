const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer=0;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;

function loadParagraph(){
    const Paragraph =["A strong nation, like a strong person, can afford to be gentle, firm, thoughtful, and restrained. It can afford to extend a helping hand to others. It's a weak nation, like a weak person, that must behave with bluster and boasting and rashness and other signs of insecurity.",
    "There are three kinds of men. The one that learns by reading. The few who learn by observation. The rest of them have to pee on the electric fence for themselves.",
    "Never be afraid to raise your voice for honesty and truth and compassion against injustice and lying and greed. If people all over the world...would do this, it would change the earth.",
    "A candle loses nothing by lighting another candle",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "In the end, we will remember not the words of our enemies, but the silence of our friends",
    "The only thing necessary for the triumph of evil is for good men to do nothing",
    "We must accept finite disappointment, but never lose infinite hope",
    "The best way to find yourself is to lose yourself in the service of others",
    "The only limit to our realization of tomorrow will be our doubts of today",
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that",
    "The future belongs to those who believe in the beauty of their dreams",
    "The time is always right to do what is right",
    "Success is not final, failure is not fatal: It is the courage to continue that counts",
    "The only way to do great work is to love what you do",
    "In the middle of difficulty lies opportunity",
    "Believe you can and you're halfway there",
    "Your time is limited, don't waste it living someone else's life",
    "Strive not to be a success, but rather to be of value",
    "I attribute my success to this: I never gave or took any excuse",
    "You miss 100% of the shots you don't take",
    "The only limit to our realization of tomorrow is our doubts of today",
    "The best revenge is massive success"]

    const randomIndex = Math.floor(Math.random()*Paragraph.length);
    typingText.innerHTML='';
    for(const char of Paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=> input.focus());
    typingText.addEventListener('click',()=>input.focus());
    
}

function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);

    if(charIndex < char.length &&timeLeft >0){
        if(!isTyping){
            timer=setInterval(initTimer,1000);
            isTyping=true;
        }
        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');  
        }
        charIndex++;
        mistakes.innerText=mistake;
        cpm.innerText=charIndex-mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }


    function initTimer(){
        if(timeLeft>0){
            timeLeft--;
            time.innerText=timeLeft;
            const wpmVal= Math.round((charIndex-mistake)/5 / (maxTime-timeLeft)*60);
            wpm.innerText= wpmVal;
        }

        else{
            clearInterval(timer);
        }
       
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    time.innerText=timeLeft;
    input.value='';
    cpm.innerText=0;
    mistakes.innerText=0;


}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();
