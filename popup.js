document.addEventListener('DOMContentLoaded', function () {
    // Load existing reminders from storage
    chrome.storage.sync.get(['reminders'], function (result) {
      const reminders = result.reminders || [];
      const reminderList = document.getElementById('reminder-list');
  
      reminders.forEach(function (reminder) {
        const listItem = document.createElement('li');
        listItem.textContent = reminder;
        reminderList.appendChild(listItem);
      });
    });
  
    // Add a new reminder
    document.getElementById('add-button').addEventListener('click', function () {
      const input = document.getElementById('reminder-input');
      const reminderText = input.value.trim();
  
      if (reminderText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = reminderText;
        document.getElementById('reminder-list').appendChild(listItem);
  
        // Save the reminder to storage
        chrome.storage.sync.get(['reminders'], function (result) {
          const reminders = result.reminders || [];
          reminders.push(reminderText);
          chrome.storage.sync.set({ reminders: reminders });
        });
  
        // Clear the input
        input.value = '';
      }
    });
  });
  