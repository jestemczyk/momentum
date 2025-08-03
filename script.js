const userNameInput = document.querySelector(".greeting input");
const bgLeftArrow = document.getElementById("left-arrow");
const bgRightArrow = document.getElementById("right-arrow");
let bgCounter = localStorage.momentumBgCounter ? JSON.parse(localStorage.momentumBgCounter) : 1;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];

function onloadFunction(){
    greetingTime();
    insertUserName(userNameInput);
    getNewTime();
    getRandomQuote();
    changeBg();
}

function getNewTime(){
   let time = new Date(); 
   let hours = String(time.getHours());
   let minutes = String(time.getMinutes());
   let seconds = String(time.getSeconds());

   document.querySelector(".time-hours").textContent = hours.length > 1 ? hours : "0" + hours;
   document.querySelector(".time-minutes").textContent = minutes.length > 1 ? minutes : "0" + minutes;
   document.querySelector(".time-seconds").textContent = seconds.length > 1 ? seconds : "0" + seconds;
   document.querySelector(".date-day-of-week").textContent = daysOfWeek[time.getDay()] + ",";
   document.querySelector(".date-month").textContent = monthsNames[time.getMonth()];
   document.querySelector(".date-day-date").textContent = time.getDate();

}

function greetingTime(){
    const timeWords = ["Night","Night","Night","Night","Night","Night","Morning","Morning","Morning","Morning","Morning","Afternoon","Afternoon","Afternoon","Afternoon","Afternoon","Afternoon","Evening","Evening","Evening","Evening","Evening","Evening","Night"];
    let time = new Date();
    document.querySelector(".greeting-frase").innerText = `${timeWords[time.getHours()]},`;
    

}

function insertUserName(inpt){
    inpt.value = localStorage.momentumUserName ? JSON.parse(localStorage.momentumUserName) : '';
}

async function getRandomQuote(){

    try {
        const response = await fetch("./json/quotes.json");
        if(!response.ok){
            throw new error("Something went wrong with a quotes.json file");
        }
        const quotes = await response.json();
        insertRandomQuote(quotes);
        
    } catch (err) {
        console.error(err.message);
    };
    
}

function insertRandomQuote(quotes){
    const quotesList = quotes.quotes_list;
    let randomNumber = Math.floor(Math.random() * 59);
    console.log(quotesList);
    document.querySelector(".quote-text").innerText = `"${quotesList[randomNumber].quote}"`;
    document.querySelector(".quote-author").innerText = quotesList[randomNumber].author;
}

function changeBg(){
    const timeKeyWords = ["night","night","night","night","night","night","morning","morning","morning","morning","morning","afternoon","afternoon","afternoon","afternoon","afternoon","afternoon","evening","evening","evening","evening","evening","evening","night"];
    let time = new Date();
    let currKeyWord = timeKeyWords[time.getHours()];
    document.querySelector("body").style.backgroundImage = `url(./css/imgs/background-imgs/${currKeyWord}/${currKeyWord}-picture-${bgCounter}.jpg)`;

    localStorage.momentumBgCounter = JSON.stringify(bgCounter);

}

function bgLeft(){
    bgCounter = bgCounter > 1 ? bgCounter - 1 : bgCounter;
    changeBg();
}

function bgRight(){
    bgCounter = bgCounter < 4 ? bgCounter + 1 : bgCounter;
    changeBg();
}

onloadFunction();

setInterval(() => {
    greetingTime();
    getNewTime();    
}, 1000);

userNameInput.addEventListener("keyup", () => {
    localStorage.momentumUserName = JSON.stringify(userNameInput.value);
});

document.addEventListener("click", e => {
    if(e.target === document.querySelector(".sect3-reload")){
        getRandomQuote();
    }

    if(e.target === bgLeftArrow){
        bgLeft();
    }else if(e.target === bgRightArrow){
        bgRight();
    }
});