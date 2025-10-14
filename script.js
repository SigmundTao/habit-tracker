const closeHabitDialogBtn = document.getElementById('close-habit-dialog-btn');
const habitDialog = document.getElementById('habit-dialog');
const habitTitleInput = document.getElementById('habit-title-input');
const createHabitBtn = document.getElementById('create-habit-btn');
const habitHolder = document.getElementById('habit-holder');
const addHabitBtn = document.getElementById('add-habit-btn');

//open and close habit dialog
const openHabitDialog = () => {
  habitDialog.showModal();
}

const closeHabitDialog = () => {
  habitDialog.close();
}

addHabitBtn.addEventListener('click', openHabitDialog);
closeHabitDialogBtn.addEventListener('click', closeHabitDialog);
////////////////////////////////////////////////////////
//                 Habit Logic                       //
//////////////////////////////////////////////////////


const habits = JSON.parse(localStorage.getItem('habits') || '[]');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const abbreviatedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//Habit Rendering
const renderHabits = () => {
  habitHolder.innerHTML = ``;
  habits.forEach(habit => {
    const now = new Date();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const habitElement = document.createElement('div');
    habitElement.classList.add('habit-element');
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
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('day-checkbox');
      checkbox.checked = isChecked;
      dayElement.appendChild(checkbox);
      daysHolder.appendChild(dayElement);
    })
    habitElement.appendChild(daysHolder);
    habitHolder.appendChild(habitElement);
    console.log(habits);
  });
};

//Habit Creation

function daysInMonth(month, year){
  return new  Date(year, month, 0).getDate();
};

const createNewHabit = () => {
  const habitTitle = habitTitleInput.value;
  const now = new Date();
  const monthIndex = now.getMonth();
  const month = months[monthIndex];
  const year = now.getFullYear();

  const habit = {
    title : habitTitle,
    data : {
      [year] : {
        [month] : {}

        },
      },
    };

  const numberOfDaysInMonth = daysInMonth(monthIndex + 1, year);

  for(let i = 1; i < numberOfDaysInMonth + 1; i++){
    habit.data[year][month][i] = false;
  }

  habits.push(habit);
  localStorage.setItem('habits', JSON.stringify(habits));
  closeHabitDialog();
  renderHabits();
}

createHabitBtn.addEventListener('click', createNewHabit);

renderHabits();