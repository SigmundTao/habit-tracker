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
  selectedHabit = edihabitTitleInput.value;
}

const saveHabit = (habitIndex) => {
  habits[habitIndex].title = editHabitTitleInput.value
}

saveChangesBtn.addEventListener('click', () => {
  const habitIndex = habits.findIndex(h => h.title === selectedHabit);
  saveHabit(habitIndex);
  renderHabits();
  localStorage.setItem('habits', JSON.stringify(habits));
  closeDialog(editHabitDialog);
})

//Habit Rendering
const renderHabits = () => {
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
      daysHolder.appendChild(dayElement);+

      dayElement.addEventListener('click', () => {
        const habitIndex = habits.findIndex(h => h.title === habit.title);

        if(habitIndex !== -1) {
          const currentState  = habit.data[year][month][dayElement.id];
          habit.data[year][month][dayElement.id] = !currentState;
          customCheckbox.classList.toggle('checked');
          localStorage.setItem('habits', JSON.stringify(habits));
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
        renderHabits();
      };
    })

    const editHabitBtn = document.createElement('button');
    editHabitBtn.innerText = 'Edit';
    editHabitBtn.addEventListener('click', () => {
      selectedHabit = habit.title;
      editHabitTitleInput.value = selectedHabit;
      editHabitDialog.showModal();
    });

    habitBtnHolder.appendChild(removeHabitBtn);
    habitBtnHolder.appendChild(editHabitBtn);

    habitElement.appendChild(daysHolder);
    habitElement.appendChild(habitBtnHolder);

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
    const dayID = `${month} ${i}`
    habit.data[year][month][dayID] = false;
  }

  habits.push(habit);
  localStorage.setItem('habits', JSON.stringify(habits));
  closeDialog(habitDialog);
  renderHabits();
}

createHabitBtn.addEventListener('click', createNewHabit);

renderHabits();