const userNameInput = document.querySelector(".greeting input");
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthsNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];



function getNewTime(){
   let time = new Date(); 
   let hours = String(time.getHours());
   let minutes = String(time.getMinutes());
   let seconds = String(time.getSeconds());

   document.querySelector(".time-hours").textContent = hours.length > 1 ? hours : "0" + hours;
   document.querySelector(".time-minutes").textContent = minutes.length > 1 ? minutes : "0" + minutes;
   document.querySelector(".time-seconds").textContent = seconds.length > 1 ? seconds : "0" + seconds;
   document.querySelector(".date-day-of-week").textContent = daysOfWeek[time.getDay() - 1] + ",";
   document.querySelector(".date-month").textContent = monthsNames[time.getMonth()];
   document.querySelector(".date-day-date").textContent = time.getDate();

}

function greetingTime(){
    const timeWords = ["Night","Night","Night","Night","Night","Night","Morning","Morning","Morning","Morning","Morning","Afternoon","Afternoon","Afternoon","Afternoon","Afternoon","Afternoon","Evening","Evening","Evening","Evening","Evening","Evening","Night"];
    let time = new Date();
    document.querySelector(".greeting-frase").innerText = `${timeWords[time.getHours()]},`;
    

}

function insertUserName(inpt){
    inpt.value = localStorage.userName ? JSON.parse(localStorage.userName) : '';
}

greetingTime();
insertUserName(userNameInput);

getNewTime();
setInterval(() => {
    getNewTime();    
}, 1000);

userNameInput.addEventListener("keyup", () => {
    localStorage.userName = JSON.stringify(userNameInput.value);
});