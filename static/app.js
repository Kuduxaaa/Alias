'use strict';
var mStatus = document.querySelector('.status');
var successButton = document.querySelector('.success_btn');
var failedButton = document.querySelector('.failed_btn');
var domTime = document.querySelector('.timeout');
var domScore = document.querySelector('.score');
var startButton = document.querySelector('.start_btn');
var domGroup = document.querySelector('.groupName');
var doc = document.documentElement;
var countdownstarted = false;
var time = 7;
var score;
var scores = {0:0,1:0};
var randomWords = [
  'ქურთუკი', 'ობობა', 'ნაცარი', 'ვირი', 'კედელი', 'ნარცისი', 'ღორი', 'ადამიანი', 'წინდა', 
  'პარლამენტი', 'ბორბალი', "საიდუმლო", "წყალი", "ქალთევზა", "დრო", "ცეცხლი", "ცა", "მიწა",
  "მშვილდისარი", "შარვალი", "ფანჯარა", "ტელევიზორი", 'გარემოსდაცვითი', 'მომაკვდინებელი', 
  'დაგეგმვა', 'რჩევა', 'მხეცი', 'ნათესავი', 'ბაზარი', 'არსება', 'დაკავშირება', 'თემა', 'სტაბილურობა', 
  'დემოკრატი', 'აღმოაჩინე', 'ბრძოლა', 'ფიზიკური', 'შემაჯამებელი', 'თვალები', 'პენსია', 'სკოლა', 
  'კომპრომისი', 'ბლოკი', 'მცდელობა', 'მსახიობი', 'დაქირავება', 'იდაყვი', 'კალამი', 'ინტერნეტი',
  'სამწვადე', 'კაცი', 'საჯაროობა', 'ტრაბახი', 'შეფასება', 'შეკრება', 'გამბედაობა', 'უზარმაზარი', 
  'კონსულტაცია', 'უზრუნველყოფა', 'ძილი', 'მეგობარი', 'უბედურება', 'მოზარდი', 'რეგიონი', 
  'ფირფიტა', 'კომპლექსი', 'გაგზავნა', 'მოძრაობა', 'ბეჭდვა', 'ტელეფონი', 'საყვარელი', 'იმედგაცრუება',
  'ვარსკვლავი', 'ნდობა', 'საბაბი', 'ბოდიში', 'თანამემამულე', 'სროლა', 'დგომა', 'მოულოდნელი', 
  'ეფექტური', 'ღობე', 'ფული', 'ყავა', 'ნაყინი', 'ცხენი', 'ყიდვა', 'ბუშტი', 'მგელი', 'ბალახი', 'მეუღლე',
  'უთო', 'დენი', 'საწოლი', 'მთა' 
];


function back() {
  return 'hash_changed :D';
}

function renderWord(){
  if (randomWords.length != 0){
    var randomIndex = Math.floor(Math.random() * randomWords.length);
    mStatus.innerText = randomWords[randomIndex];
    randomWords.splice(randomIndex,1);
  }
}

var group_one = prompt('მოუთითეთ პირველი ჯგუფის სახელი: ');
var group_two = prompt('მიუთითეთ მეორე ჯგუფის სახელი');
var first_group = group_one;
domGroup.innerText = 'ჯგუფი: ' + first_group;

function openFullscreen(){
  if (doc.requestFullscreen){
    doc.requestFullscreen();
  } else if (doc.webkitRequestFullscreen){
    doc.webkitRequestFullscreen();
  } else if (doc.msRequestFullscreen){
    doc.msRequestFullscreen();
  }
}

function startCountdown(){
  countdownstarted = true;
  var countDown = setInterval(function(){
    time--;
    var myAudio = new Audio('./static/timeout.mp3');
    domTime.innerText = time + 's';
    if (time <= 5 && time >= 1){
      myAudio.play();
    } 
    if (time === 0){
      time = 7;
      countdownstarted = false;
      if (first_group === group_one){
        first_group = group_two;
        score = scores[1];
      } else {
        first_group = group_one;
        score = scores[0];
      }
      
      domGroup.innerText = 'ჯგუფი: ' + first_group;
      domScore.innerText = 'ქულა; ' + score;
      startButton.style.display = "block";
      successButton.style.display = "none";
      failedButton.style.display = "none";
      clearInterval(countDown);
    }
  }, 1000);
}

function addScore(sc){
  if (first_group === group_one){
    scores[0] = sc;
  } else {
    scores[1] = sc;
  }
}

successButton.addEventListener('click', function(){
  if (randomWords.length != 0){
    var randomIndex = Math.floor(Math.random() * randomWords.length);
    mStatus.innerText = randomWords[randomIndex];
    randomWords.splice(randomIndex,1);
  } else {
    mStatus.innerText = "სიტყვები ამოიწურა :))";
  }
  new Audio('./static/success.mp3').play();
  if (first_group === group_one){  
    var index = 0;
  } else {
    var index = 1;
  }
  if (randomWords.length > 0){
    scores[index]++;
    domScore.innerText = 'ქულა: ' + scores[index];
    addScore(scores[index]);
  }
});


failedButton.addEventListener('click', function(){
  if (randomWords.length != 0){
    var randomIndex = Math.floor(Math.random() * randomWords.length);
    mStatus.innerText = randomWords[randomIndex];
    randomWords.splice(randomIndex,1);
  } else {
    mStatus.innerText = "სიტყვები ამოიწურა :))";
  }
  new Audio('./static/click.mp3').play();
});



startButton.addEventListener('click', function(){
  renderWord();
  openFullscreen();
  startButton.style.display = "none";
  successButton.style.display = "block";
  failedButton.style.display = "block";
  if (!countdownstarted){
    startCountdown();
  }
});
