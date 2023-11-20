document.addEventListener('DOMContentLoaded', function () {
  var isEligible = true;
  var todayKey = 'shiftTimer' + new Date().toLocaleDateString();
  var defaultShiftDelection = 540;
  var shiftHoursKey = localStorage.getItem('shiftHours');
  var startButton = document.getElementById('disable-btn');
  var settingIcon = document.getElementById('setting-icon');
  var closeButton = document.getElementById('close-icon');
  var shiftSelectionElement = document.getElementById('shiftSelection');
  var settingPopup = document.getElementById('setting-popup');
  var intervalId = null;
  if (!shiftHoursKey) {
    localStorage.setItem('shiftHours', defaultShiftDelection);
  } else {
    defaultShiftDelection = shiftHoursKey;
  }



  self.addEventListener('button', function (event) {
    if (event.action === 'Open') {
      // something(event.notification.data) // UUID
      console.log("We are here")
    }
    event.notification.close()
  })


  initialLoad();

  function initialLoad() {
    // setTimeout(() => {
    showNotification();
    // }, 3000);
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    var previousDayKey = 'shiftTimer' + currentDate.toLocaleDateString();
    var localVal = localStorage.getItem(previousDayKey);

    if (localVal) {
      localStorage.removeItem(localVal);
    }

    var todayLocalVal = localStorage.getItem(todayKey);

    if (todayLocalVal) {
      todayLocalVal = JSON.parse(todayLocalVal);
      console.log("todayLocalVal", todayLocalVal)
      setShiftTimer('start-time', new Date(todayLocalVal.start));
      setShiftTimer('end-time', new Date(todayLocalVal.end));
      if (todayLocalVal.end) {
        startTimeLeftTimer(todayLocalVal.end);
      }
      setMarkIn();
    }
  }

  function setShiftTimer(element, time) {
    document.getElementById(element).textContent = time.toLocaleTimeString();
  }

  function startTimeLeftTimer(endTime) {
    endTime = new Date(endTime).getTime();

    let intervalTimer = 300;
    let color;
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(function () {
      intervalTimer = 1000;
      let currentTime = new Date().getTime();

      if (endTime > currentTime) {
        currentTime = endTime - currentTime;
        color = 'red';
      } else {
        currentTime = currentTime - endTime;
        color = 'green';
      }

      const hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      let element = document.getElementById('shift-time-left');
      element.innerHTML = formattedTime
      element.style.color = color;
    }, intervalTimer);

  }




  function shiftSelection(val) {
    let shiftHrsKey = 'shiftHours';
    localStorage.setItem(shiftHrsKey, val);
    defaultShiftDelection = val;

    let key = localStorage.getItem(todayKey);
    console.log("key", key)

    if (key) {
      key = JSON.parse(key);

      var endTime = new Date(new Date().setMinutes(new Date(key.start).getMinutes() + parseInt(defaultShiftDelection)));
      key.end = endTime.getTime()
      console.log("key inside", key)
      localStorage.setItem(todayKey, JSON.stringify(key));
      initialLoad();
    }
  }

  function startShift() {
    if (!isEligible) return;
    setShiftTimer('start-time', new Date());

    var getLocalValue = localStorage.getItem(todayKey);
    var endTime = new Date(new Date().setMinutes(new Date().getMinutes() + parseInt(defaultShiftDelection)));
    setShiftTimer('end-time', endTime);

    var timeObj = {
      start: new Date().getTime(),
      end: endTime.getTime()
    }

    if (!getLocalValue) {
      localStorage.setItem(todayKey, JSON.stringify(timeObj));
      setMarkIn();
      initialLoad();
    }
  }

  function setMarkIn() {
    var btn = startButton.style;
    btn.pointerEvents = 'none';
    btn.backgroundColor = '#59b459';
    btn.opacity = 0.8;
    isEligible = false;
  }

  function toggleSetting(flag) {
    settingPopup.style.display = flag;
    shiftSelectionElement.value = defaultShiftDelection;
  }

  startButton.addEventListener('click', startShift);
  settingIcon.addEventListener('click', function () {
    toggleSetting('block');
  });
  closeButton.addEventListener('click', function () {
    toggleSetting('none');
  });
  shiftSelectionElement.addEventListener('change', function (event) {
    shiftSelection(event.target.value);
  });
});
