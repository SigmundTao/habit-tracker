//New Habit Dialog
const addHabitDialog = document.getElementById('add-new-habit-dialog');
const addHabitBtn = document.getElementById('add-habit-btn');
const closeHabitDialogBtn = document.getElementById('close-modal-btn');
const habitColoursHolder = document.getElementById('habit-colours-holder');
const habitIconsHolder = document.getElementById('habit-icons-holder');
const submitHabitBtn = document.getElementById('submit-habit-btn');
const habitsContainer = document.getElementById('habits-container');

const habitIcons = [
    'art-icon.svg','banana-icon.svg','bed-icon.svg',
    'beer-can-icon.svg','bible-icon.svg','bible-icon2.svg',
    'blog-icon.svg','book-icon.svg',
    'boxing-icon.svg','broccoli-icon.svg','calculator-icon.svg',
    'cap-icon.svg','check-icon.svg','checkbox-icon.svg',
    'controller-icon.svg','cpu-icon.svg','doughnut-icon.svg',
    'fork-and-knife-icon.svg','fries-icon.svg','meat-icon.svg',
    'microphone-icon.svg','microscope-icon.svg','phone-icon.svg',
    'piggybank-icon.svg','pint-icon.svg','running-icon.svg',
    'shopping-cart-icon.svg','steak-icon.svg','student-icon.svg',
    'telescope-icon.svg','tennis-icon.svg','tools-icon.svg',
    'tv-icon.svg','video-display-icon.svg','volleyball-icon.svg',
    'walking-icon.svg','wallet-icon.svg','writing-icon.svg',
];

habitIcons.forEach(icon => {
    const div = document.createElement('div');
    div.id = icon.replace('.svg', '');
    div.classList.add('habit-icon');
    div.style.width = '15%';
    div.style.aspectRatio = '1';
    div.style.backgroundImage = `url('./svg-icons/${icon}')`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';
    
    div.addEventListener('click', () => {
        document.querySelectorAll('.habit-icon').forEach(i => i.classList.remove('selected-icon'));
        div.classList.add('selected-icon');
    })
    habitIconsHolder.appendChild(div);
})

const habitColours = [
    '#FF6F00',
    '#F44336',
    '#2196F3',
    '#283593', 
    '#000000',
    '#FFFFFF',
    '#2E7D32',
    '#9CCC65',
    '#FFEE58',
    '#9C27B0',
    '#E91E63',
    '#F48FB1',
];

habitColours.forEach(colour => {
    const div = document.createElement('div');
    div.id = colour;
    div.classList.add('habit-colour')
    div.style.width = '2vw'
    div.style.backgroundColor = colour;

    div.addEventListener('click', () => {
        document.querySelectorAll('.habit-colour').forEach(c => {
            c.classList.remove('selected-colour');
            div.classList.add('selected-colour');
        })
    })
    habitColoursHolder.appendChild(div)
})



const openHabitDialog = () => {
    addHabitDialog.showModal();
}

const closeHabitDialog = () => {
    addHabitDialog.close()
}

closeHabitDialogBtn.addEventListener('click', closeHabitDialog)
addHabitBtn.addEventListener('click', openHabitDialog);

// habit module creation
const habits = []; 
const habitModuleContainer = document.getElementById('habit-modules-container');

const loadHabits = () => {
    habitModuleContainer.innerHTML = ``;

    habits.forEach(habit => {
        const div = document.createElement('div');
        div.classList.add('habit-module');
        div.id = habit.title;

        const habitModuleHeader = document.createElement('div');
        habitModuleHeader.classList.add('habit-module-header');
        div.appendChild(habitModuleHeader);

        const trackerContainer = document.createElement('div');
        trackerContainer.classList.add('tracker-container');
        div.appendChild(trackerContainer);

        for(let i = 0; i < 30; i++){
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('module-checkbox');
            trackerContainer.appendChild(checkbox)
        }

        const habitIcon = document.createElement('div');
        habitIcon.classList.add('habit-module-icon');
        habitIcon.style.backgroundImage = `url('./svg-icons/${habit.icon}')`
        habitIcon.style.backgroundSize = 'contain';
        habitIcon.backgroundRepeat = 'no-repeat';
        habitIcon.style.backgroundPosition = 'center';
        habitModuleHeader.appendChild(habitIcon);

        const habitTitle =document.createElement('div');
        habitTitle.classList.add('habit-module-title');
        habitTitle.innerText = habit.title;
        habitModuleHeader.appendChild(habitTitle);
        
        habitModuleContainer.appendChild(div);
    })
}

const loadHabitBtn = document.getElementById('load-habits-btn');

loadHabitBtn.addEventListener('click', loadHabits);

const habitTitleInput = document.getElementById('new-habit-title');

const createHabit = () => {
    const title = habitTitleInput.value;
    const selectedColour = document.querySelector('.selected-colour');
    const selectedIcon = document.querySelector('.selected-icon');

    if (!title || !selectedColour || !selectedIcon){
        alert('Please enter a title, select an icon and select a colour');
        return;
    }

    if(habits.length >= 3){
        alert('You have ran out of free habits. Upgrade to premium for more.');
        return;
    }
    const colour = selectedColour.style.backgroundColor;
    const icon = selectedIcon.id + '.svg';

    const newHabit = {
        title,
        colour,
        icon,
    };

    habits.push(newHabit);
    closeHabitDialog();
    loadHabits();
}

submitHabitBtn.addEventListener('click', createHabit);

/* Calculate the day a date falls on*/