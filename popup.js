
var isEligible = true;
let todayKey = 'shiftTimer'
  + new Date().toLocaleDateString();
let defaultShiftDelection = 9;
let shiftHoursKey = localStorage.getItem('shiftHours');

if (!shiftHoursKey) {
  localStorage.setItem('shiftHours', defaultShiftDelection);
} else {
  defaultShiftDelection = shiftHoursKey;
  document.getElementById('shiftSelection').value = shiftHoursKey;
}


checkShiftStarted();


function checkShiftStarted() {

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  let previousDayKey = 'shiftTimer'
    + currentDate.toLocaleDateString();

  let localVal = localStorage.getItem(previousDayKey)

  if (localVal) {
    localStorage.removeItem(localVal);
  }


  let todayLocalVal = localStorage.getItem(todayKey);

  if (todayLocalVal) {
    todayLocalVal = JSON.parse(todayLocalVal);
    console.log("todayLocalVal", todayLocalVal)
    this.setShiftTimer('start-time', new Date(todayLocalVal.start));
    this.setShiftTimer('end-time', new Date(todayLocalVal.end));
    this.setMarkIn();
  }

}

function setShiftTimer(element, time) {
  console.log("element", element, time)
  document.getElementById(element).innerHTML = time.toLocaleTimeString();
}



function shiftSelection(val) {

  let todayKey = 'shiftHours';

  localStorage.setItem(todayKey, val);
  shiftHoursKey = val;
  // let endTime = new Date(new Date().setHours(new Date().getHours() + parseInt(val))).toLocaleTimeString();
  // document.getElementById('end-time').innerHTML = endTime;

}


function startShift() {
  if (!isEligible) return;

  this.setShiftTimer('start-time', new Date());

  let getLocalValue = localStorage.getItem(todayKey);

  let endTime = new Date(new Date().setHours(new Date().getHours() + parseInt(defaultShiftDelection)));
  console.log("end time", endTime, defaultShiftDelection)
  this.setShiftTimer('end-time', endTime);


  let timeObj = {
    start: new Date().getTime(),
    end: endTime.getTime()
  }

  console.log({ timeObj })

  if (!getLocalValue) {
    localStorage.setItem(todayKey, JSON.stringify(timeObj));
    this.setMarkIn();
  }
}

function setMarkIn() {
  let btn = document.getElementById('disbale-btn').style;
  btn.pointerEvents = 'none';
  btn.backgroundColor = 'grey';
  btn.opacity = 0.8;
  isEligible = false;
  this.isEligible = false;
}

function toggleSetting(flag) {
  document.getElementById('setting-popup').style.display = flag
} 