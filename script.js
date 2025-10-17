const closeHabitDialogBtn = document.getElementById('close-habit-dialog-btn');
const habitDialog = document.getElementById('habit-dialog');
const habitTitleInput = document.getElementById('habit-title-input');
const createHabitBtn = document.getElementById('create-habit-btn');
const habitHolder = document.getElementById('habit-holder');
const addHabitBtn = document.getElementById('add-habit-btn');
const editHabitDialog = document.getElementById('edit-habit-dialog');
const editHabitTitleInput = document.getElementById('edit-habit-title');
const closeEditDialogBtn = document.getElementById('close-edit-dialog-btn');
const saveChangesBtn = document.getElementById('save-changes-btn');
const viewDropdown = document.getElementById('view-selector');

//open and close habit dialog
function openDialog(element){
  element.showModal();
};

function closeDialog(element){
  element.close();
};

addHabitBtn.addEventListener('click', () => {openDialog(habitDialog)});
closeHabitDialogBtn.addEventListener('click', () => {closeDialog(habitDialog)});
closeEditDialogBtn.addEventListener('click', () => {closeDialog(editHabitDialog)});

//////////////////////////////////////////////////////
//                 Habit Logic                      //
//////////////////////////////////////////////////////

const habits = JSON.parse(localStorage.getItem('habits') || '[]');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const abbreviatedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//Edit & Save habits
let selectedHabit;
const editHabit = () => {
  selectedHabit = editHabitTitleInput.value;
}

const saveHabit = (habitIndex) => {
  habits[habitIndex].title = editHabitTitleInput.value
}

saveChangesBtn.addEventListener('click', () => {
  const habitIndex = habits.findIndex(h => h.title === selectedHabit);
  saveHabit(habitIndex);
  renderHabits(viewDropdown.value);
  localStorage.setItem('habits', JSON.stringify(habits));
  closeDialog(editHabitDialog);
})

//Monthly Habit Rendering
const renderMonthView = () => {
  habitHolder.innerHTML = ``;
  habits.forEach(habit => {
    const now = new Date();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const habitElement = document.createElement('div');
    habitElement.classList.add('habit-element');
    habitElement.id = habit.title;
    habitElement.addEventListener('click', () => {
      document.querySelectorAll('.habit-element').forEach(element => {
        element.classList.remove('selected-habit-element');
      })
      habitElement.classList.add('selected-habit-element');
    })
    const habitTitle = document.createElement('div');
    habitTitle.classList.add('habit-title');
    habitTitle.innerText = habit.title;

    const habitMonth = document.createElement('div');
    habitMonth.classList.add('habit-month');
    habitMonth.innerText = `${month} ${year}`

    const habitHeader = document.createElement('div');
    habitHeader.classList.add('habit-header');
    habitHeader.appendChild(habitTitle);
    habitHeader.appendChild(habitMonth);
    habitElement.appendChild(habitHeader);

    const daysOfTheWeek = document.createElement('div');
    daysOfTheWeek.classList.add('days-of-the-week');
    abbreviatedDays.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.innerText = day;
      dayDiv.classList.add('day-div');
      daysOfTheWeek.appendChild(dayDiv);
    })
    habitElement.appendChild(daysOfTheWeek);

    const daysHolder = document.createElement('div');
    daysHolder.classList.add('days-holder');

    const startOfMonth = new Date(`${month} 1, ${year}`);

    const firstDayOfMonth = startOfMonth.getDay();
    if(firstDayOfMonth != 0){
      for(let i = 0; i < firstDayOfMonth; i++){
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty-day-div');
        daysHolder.appendChild(emptyDay);
      }
    }
    
    Object.entries(habit.data[year][month]).forEach(([day, isChecked]) => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day-element');
      dayElement.id = day;

      const customCheckbox = document.createElement('span');
      customCheckbox.classList.add('custom-checkbox');
      if (isChecked){customCheckbox.classList.add('checked')};

      dayElement.appendChild(customCheckbox);
      daysHolder.appendChild(dayElement);

      customCheckbox.addEventListener('click', () => {
        const habitIndex = habits.findIndex(h => h.title === habit.title);

        if(habitIndex !== -1) {
          const currentState = habit.data[year][month][dayElement.id];
          const newState = !currentState;
          
          // Update the data
          habit.data[year][month][dayElement.id] = newState;
          customCheckbox.classList.toggle('checked');
          
          if(newState === true) {
            const clickedDate = new Date(dayElement.id);
            completedHabit(habits[habitIndex], clickedDate);
          }
          
          localStorage.setItem('habits', JSON.stringify(habits));
          renderMonthView();
        }
      });
    });

    const habitBtnHolder = document.createElement('div');
    habitBtnHolder.classList.add('habit-btn-holder');

    const removeHabitBtn = document.createElement('button');
    removeHabitBtn.innerText = 'X';
    removeHabitBtn.classList.add('remove-habit-btn');
    removeHabitBtn.addEventListener('click', () => {
      const habitIndex = habits.findIndex(h => h.title === habit.title);

      if (habitIndex !== -1){
        habits.splice(habitIndex, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderMonthView();
      };
    })

    const editHabitBtn = document.createElement('button');
    editHabitBtn.classList.add('edit-habit-btn');
    editHabitBtn.innerText = 'Edit';
    editHabitBtn.addEventListener('click', () => {
      selectedHabit = habit.title;
      editHabitTitleInput.value = selectedHabit;
      editHabitDialog.showModal();
    });

    // Streak display for month view
    const streakContainer = document.createElement('div');
    streakContainer.classList.add('month-view-streak-container');
    const streakDisplay = document.createElement('div');
    streakDisplay.classList.add('month-view-streak-display');
    streakDisplay.innerText = habit.streak || 0;
    streakContainer.appendChild(streakDisplay);

    habitBtnHolder.appendChild(removeHabitBtn);
    habitBtnHolder.appendChild(streakContainer);
    habitBtnHolder.appendChild(editHabitBtn);

    habitElement.appendChild(daysHolder);
    habitElement.appendChild(habitBtnHolder);

    habitHolder.appendChild(habitElement);
    console.log(habits);
  });
};

//Habit Creation
function daysInMonth(month, year){
  return new Date(year, month, 0).getDate();
};

const createNewHabit = () => {
  const habitTitle = habitTitleInput.value;
  const now = new Date();
  const monthIndex = now.getMonth();
  const month = months[monthIndex];
  const year = now.getFullYear();

  const habit = {
    title : habitTitle,
    streak : 0,
    lastCompletedDate: null,
    data : {
      [year] : {
        [month] : {}
      },
    },
  };

  const numberOfDaysInMonth = daysInMonth(monthIndex + 1, year);

  for(let i = 1; i < numberOfDaysInMonth + 1; i++){
    const dayID = `${month} ${i}`
    habit.data[year][month][dayID] = false;
  }

  habits.push(habit);
  localStorage.setItem('habits', JSON.stringify(habits));
  closeDialog(habitDialog);
  renderHabits(viewDropdown.value);

  habitTitleInput.value = '';
};

createHabitBtn.addEventListener('click', createNewHabit);

// Render Weekly Habit View
const renderWeekView = () => {
  habitHolder.innerHTML = '';

  const weeklyHabitCard = document.createElement('div');
  weeklyHabitCard.classList.add('weekly-habit-card');

  const now = new Date();
  const year = now.getFullYear();
  
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const dateHeader = document.createElement('div');
  dateHeader.classList.add('weekly-date-header');
  
  const daysHolder = document.createElement('div');
  daysHolder.classList.add('weekly-days-holder');
  
  abbreviatedDays.forEach(dayName => {
    const dayDiv = document.createElement('div');
    dayDiv.innerText = dayName;
    dayDiv.classList.add('weekly-view-day');
    daysHolder.appendChild(dayDiv);
  })
  
  const datesHolder = document.createElement('div');
  datesHolder.classList.add('weekly-dates-holder');
  
  const weekDates = [];
  for(let i = 0; i < 7; i++){
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  
  weekDates.forEach(date => {
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('weekly-date-div');
    dateDiv.innerText = date.getDate();
    datesHolder.appendChild(dateDiv);
  })

  dateHeader.appendChild(daysHolder);
  dateHeader.appendChild(datesHolder);
  weeklyHabitCard.appendChild(dateHeader);
  
  habits.forEach(habit => {
    const habitDiv = document.createElement('div');
    habitDiv.classList.add('weekly-habit-row');

    const habitTitle = document.createElement('div');
    habitTitle.classList.add('weekly-habit-view-title');
    habitTitle.innerText = habit.title;

    const weeklyCheckboxHolder = document.createElement('div');
    weeklyCheckboxHolder.classList.add('weekly-checkbox-holder');

    weekDates.forEach(date => {
      const dayNum = date.getDate();
      const monthName = months[date.getMonth()];
      const yearNum = date.getFullYear();
      const dayID = `${monthName} ${dayNum}`;
      
      const weeklyCheckbox = document.createElement('span');
      weeklyCheckbox.classList.add('weekly-checkbox');
      weeklyCheckbox.dataset.day = dayID;

      if(habit.data && 
         habit.data[yearNum] && 
         habit.data[yearNum][monthName] && 
         habit.data[yearNum][monthName][dayID]){
        weeklyCheckbox.classList.add('checked');
      }

      weeklyCheckbox.addEventListener('click', () => {
        const habitIndex = habits.findIndex(h => h.title === habit.title);

        if(habitIndex !== -1) {
          if(!habits[habitIndex].data[yearNum]){
            habits[habitIndex].data[yearNum] = {};
          }
          if(!habits[habitIndex].data[yearNum][monthName]){
            habits[habitIndex].data[yearNum][monthName] = {};
          }
          if(habits[habitIndex].data[yearNum][monthName][dayID] === undefined){
            habits[habitIndex].data[yearNum][monthName][dayID] = false;
          }
          
          const currentState = habits[habitIndex].data[yearNum][monthName][dayID];
          const newState = !currentState;
          habits[habitIndex].data[yearNum][monthName][dayID] = newState;
          weeklyCheckbox.classList.toggle('checked');
          
          if(newState === true) {
            completedHabit(habits[habitIndex], date);
          }
          
          localStorage.setItem('habits', JSON.stringify(habits));
          renderWeekView();
        }
      });

      weeklyCheckboxHolder.appendChild(weeklyCheckbox);
    })

    // Streak display for week view
    const streakContainer = document.createElement('div');
    streakContainer.classList.add('weekly-streak-container');
    const streakDisplay = document.createElement('div');
    streakDisplay.classList.add('weekly-streak-display');
    streakDisplay.innerText = habit.streak || 0;
    streakContainer.appendChild(streakDisplay);

    const editWeeklyHabitBtn = document.createElement('button');
    editWeeklyHabitBtn.classList.add('edit-weekly-habit-btn');
    editWeeklyHabitBtn.innerText = 'Edit';
    editWeeklyHabitBtn.addEventListener('click', () => {
      selectedHabit = habit.title;
      editHabitTitleInput.value = selectedHabit;
      editHabitDialog.showModal();
    })

    const removeWeeklyHabitBtn = document.createElement('button');
    removeWeeklyHabitBtn.classList.add('remove-weekly-habit-btn');
    removeWeeklyHabitBtn.innerText = 'X';
    removeWeeklyHabitBtn.addEventListener('click', () => {
      const habitIndex = habits.findIndex(h => h.title === habit.title);

      if(habitIndex !== -1){
        habits.splice(habitIndex, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderWeekView();
      }
    })

    habitDiv.appendChild(habitTitle);
    habitDiv.appendChild(weeklyCheckboxHolder);
    habitDiv.appendChild(streakContainer);
    habitDiv.appendChild(editWeeklyHabitBtn);
    habitDiv.appendChild(removeWeeklyHabitBtn);

    weeklyHabitCard.appendChild(habitDiv);
  })

  habitHolder.appendChild(weeklyHabitCard);
};

// Render Yearly Habit View
const renderYearView = () => {
  habitHolder.innerHTML = ``;

  const now = new Date();
  const year = now.getFullYear();
  const yearCard = document.createElement('div');
  yearCard.classList.add('year-card');

  const yearTitle = document.createElement('div');
  yearTitle.classList.add('year-title');
  yearTitle.innerText = year;

  const habitSelect = document.createElement('select');
  habitSelect.classList.add('yearly-habit-select');
  habits.forEach(habit => {
    const option = document.createElement('option');
    option.classList.add('yearly-habit-option');
    option.id = habit.title;
    option.innerText = habit.title;
    habitSelect.appendChild(option);
  });

  const monthsHolder = document.createElement('div');
  monthsHolder.classList.add('months-holder');

  habitSelect.addEventListener('change', () => renderYearHabit(habitSelect.value, year, monthsHolder));

  // Streak display for year view
  const streakContainer = document.createElement('div');
  streakContainer.classList.add('year-view-streak-container');
  const streakDisplay = document.createElement('div');
  streakDisplay.classList.add('year-view-streak-display');
  const currentHabit = habits.find(h => h.title === habitSelect.value);
  streakDisplay.innerText = currentHabit ? (currentHabit.streak || 0) : 0;
  streakContainer.appendChild(streakDisplay);

  const header = document.createElement('div');
  header.classList.add('year-view-header');
  header.appendChild(habitSelect);
  header.appendChild(streakContainer);
  header.appendChild(yearTitle);

  yearCard.appendChild(header);
  yearCard.appendChild(monthsHolder);
  habitHolder.appendChild(yearCard);

  renderYearHabit(habitSelect.value, year, monthsHolder);
};

const renderYearHabit = (habitTitle, year, monthsHolder) => {
  monthsHolder.innerHTML = '';

  const habitIndex = habits.findIndex(h => h.title === habitTitle);

  // Update streak display in year view
  const streakDisplay = document.querySelector('.year-view-streak-display');
  if(streakDisplay) {
    streakDisplay.innerText = habits[habitIndex].streak || 0;
  }

  Object.keys(habits[habitIndex].data[year]).forEach((month) => {
    const monthCard = document.createElement('div');
    monthCard.classList.add('month-card');

    const monthTitle = document.createElement('div');
    monthTitle.classList.add('month-title');
    monthTitle.innerText = month;

    const daysHolder = document.createElement('div');
    daysHolder.classList.add('year-view-monthly-days-holder');
    
    monthCard.appendChild(monthTitle);
    monthCard.appendChild(daysHolder);

    Object.entries(habits[habitIndex].data[year][month]).forEach(([day, isChecked]) => {
      const dayCheckbox = document.createElement('span');
      dayCheckbox.classList.add('year-view-day-checkbox');
      dayCheckbox.id = day;
      if(isChecked){
        dayCheckbox.classList.add('year-checked');
      };

      daysHolder.appendChild(dayCheckbox);
    })

    monthsHolder.appendChild(monthCard);
  });
};

viewDropdown.addEventListener('change', () => {
  if(viewDropdown.value === 'Month'){
    renderMonthView();
  } else if(viewDropdown.value === 'Week'){
    renderWeekView();
  } else if(viewDropdown.value === 'Year'){
    renderYearView();
  }
});

const renderHabits = (view) => {
  if(view === 'Month'){
    renderMonthView();
  } else if(view === 'Week'){
    renderWeekView();
  } else if(view === 'Year'){
    renderYearView();
  }
}

/* Streak functionality */
const completedHabit = (habit, date) => {
  const year = date.getFullYear();
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const dayID = `${monthName} ${day}`;

  habit.data[year][monthName][dayID] = true;

  const today = new Date().toDateString();
  const lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate).toDateString() : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();

  if(lastCompleted === yesterdayString){
    habit.streak++;
  } else if(lastCompleted === today){
  
  } else {
    habit.streak = 1;
  }
  
  habit.lastCompletedDate = today;
};

const checkStreaksOnLoad = () => {
  const today = new Date().toDateString();

  habits.forEach(habit => {
    const lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate).toDateString() : null;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastCompleted !== yesterdayString && lastCompleted !== today){
      habit.streak = 0;
    }
  });

  localStorage.setItem('habits', JSON.stringify(habits));
};

window.addEventListener('DOMContentLoaded', checkStreaksOnLoad);

renderHabits(viewDropdown.value);