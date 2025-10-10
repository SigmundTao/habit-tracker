const addHabitDialog = document.getElementById('add-new-habit-dialog');
const addHabitBtn = document.getElementById('add-habit-btn');
const closeHabitDialogBtn = document.getElementById('close-modal-btn');
const habitColoursHolder = document.getElementById('habit-colours-holder');
const habitIconsHolder = document.getElementById('habit-icons-holder');
const submitHabitBtn = document.getElementById('submit-habit-btn');
const habitsContainer = document.getElementById('habits-container');

const habits = [];
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
    div.style.width = '30%';
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

let numberOfHabits = 0;

const createNewHabit = () => {
    const newHabit = `{
        id:'',
        title : ${document.getElementById('new-habit-title').value},
        duration : ${document.getElementById('habit-duration').value},
        color : ${document.querySelector('.selected-colour').id},
        icon : ${document.querySelector('.selected-icon')},
    }`;

    habits.push(newHabit);
}

const openHabitDialog = () => {
    addHabitDialog.showModal();
}

const loadHabits = () => {
    habits.forEach(habit => {

    })
}

closeHabitDialogBtn.addEventListener('click', () => {
    addHabitDialog.close();
})
addHabitBtn.addEventListener('click', openHabitDialog);