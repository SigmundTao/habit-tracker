//New Habit Dialog
const addHabitDialog = document.getElementById('add-new-habit-dialog');
const addHabitBtn = document.getElementById('add-habit-btn');
const closeHabitDialogBtn = document.getElementById('close-modal-btn');
const habitColoursHolder = document.getElementById('habit-colours-holder');
const habitIconsHolder = document.getElementById('habit-icons-holder');
const submitHabitBtn = document.getElementById('submit-habit-btn');
const habitsContainer = document.getElementById('habits-container');
const habitTexturesHolder = document.getElementById('habit-textures-holder');

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];

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
    '#d32f2f',
    '#cddc39',
    '#aea1ff',
    '#795548',
    '#bf360c',
    '#d9e3f0',
    '#f47373',
    '#697689',
    '#37d67a',
    '#2ccce4',
    '#ff8a65',
];

habitColours.forEach(colour => {
    const div = document.createElement('div');
    div.id = colour;
    div.classList.add('habit-colour')
    div.style.backgroundColor = colour;

    div.addEventListener('click', () => {
        document.querySelectorAll('.habit-colour').forEach(c => {
            c.classList.remove('selected-colour');
            div.classList.add('selected-colour');
        })
    })
    habitColoursHolder.appendChild(div)
})

const habitBackgrounds = [
    'art-work1.jpg',
    'art-work2.jpg',
    'black-sand.jpg',
    'blue-paint.jpg',
    'brick.jpg',
    'Denim.jpg',
    'diagonal-lines.jpg',
    'granite.jpg',
    'grass.jpg',
    'ice.jpg',
    'marble.jpg',
    'purple-paint.jpg',
    'rainbow.jpg',
    'red-paint.jpg',
    'Wood.jpg',
];

habitBackgrounds.forEach(texture => {
    const div = document.createElement('div');
    div.id = texture;
    div.style.backgroundImage = `url('./Texture-images/${texture}')`;
    div.style.backgroundSize = 'cover';
    div.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';
    div.classList.add('habit-texture');

    div.addEventListener('click', () => {
        document.querySelectorAll('.habit-texture').forEach(t => {
            t.classList.remove('selected-texture');
            div.classList.add('selected-texture');
        });

        div.classList.add('selected-texture');
    });
    habitTexturesHolder.appendChild(div);
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
const weeklyHabitsContainer = document.getElementById('weekly-habits');

const loadHabits = () => {
    habitModuleContainer.innerHTML = ``;

    habits.forEach(habit => {
        const div = document.createElement('div');
        div.classList.add('habit-module');
        div.id = habit.title;
        div.style.backgroundImage = `url('./Texture-images/${habit.background}')`;
        div.style.backgroundSize = 'cover';
        div.backgroundRepeat = 'no-repeat';
        div.style.backgroundPosition = 'center';

        const habitModuleHeader = document.createElement('div');
        habitModuleHeader.classList.add('habit-module-header');
        div.appendChild(habitModuleHeader);

        const daysOfTheWeekDiv = document.createElement('div');
        daysOfTheWeekDiv.classList.add('module-days-holder');
        days.forEach(day => {
            const p = document.createElement('p');
            p.classList.add('day-of-the-week');
            p.innerText = day;
            daysOfTheWeekDiv.appendChild(p);
        });
        div.appendChild(daysOfTheWeekDiv);

        const trackerContainer = document.createElement('div');
        trackerContainer.classList.add('tracker-container');
        div.appendChild(trackerContainer);

        for(let i = 0; i < habit.startDayOfWeek; i++){
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('empty-day-cell');
            trackerContainer.appendChild(emptyCell);
        }

        for(let i = 0; i < 31; i++){
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('module-checkbox');

            const span = document.createElement('span');
            span.classList.add('checkmark');

            checkbox.addEventListener('change', () => {
                if(checkbox.checked = 'checked'){
                    span.style.backgroundColor = habit.color;
                }
            })

            const checkBoxDiv = document.createElement('div');
            checkBoxDiv.classList.add('checkbox-div');
            checkBoxDiv.appendChild(checkbox);
            checkBoxDiv.appendChild(span);

            trackerContainer.appendChild(checkBoxDiv);
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
    });

    weeklyHabitsContainer.innerHTML = ``;

    habits.forEach(habit => {
        const newHabit = document.createElement('div');
        newHabit.classList.add('weekly-habit');
        newHabit.style.backgroundImage = `url('./Texture-images/${habit.background}')`;
        newHabit.style.backgroundSize = 'cover';
        newHabit.backgroundRepeat = 'no-repeat';
        newHabit.style.backgroundPosition = 'center';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('weekly-habit-header');

        const titleIcon = document.createElement('div');
        titleIcon.style.backgroundImage = `url('./svg-icons/${habit.icon}')`;
        titleIcon.classList.add('weekly-habit-icon');
        titleIcon.style.backgroundSize = 'contain';
        titleIcon.style.backgroundPosition = 'center';
        titleIcon.style.backgroundRepeat = 'no-repeat';
        titleDiv.appendChild(titleIcon);

        const titleHeading = document.createElement('p');
        titleHeading.innerText = habit.title;
        titleHeading.classList.add('weekly-habit-title');
        titleDiv.appendChild(titleHeading);
        newHabit.appendChild(titleDiv);

        const checkboxHolder = document.createElement('div');
        checkboxHolder.classList.add('weekly-checkbox-holder');

        for(let i = 0; i < 7; i++){
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.accentColor = habit.color;
            checkbox.classList.add('weekly-habit-checkbox');
            checkboxHolder.appendChild(checkbox);
        };
        newHabit.appendChild(checkboxHolder);

        weeklyHabitsContainer.appendChild(newHabit);
    });
}

const habitTitleInput = document.getElementById('new-habit-title');

const createHabit = () => {
    const title = habitTitleInput.value;
    const selectedColour = document.querySelector('.selected-colour');
    const selectedIcon = document.querySelector('.selected-icon');
    const selectedTexture = document.querySelector('.selected-texture');

    if (!title || !selectedColour || !selectedIcon || !selectedTexture){
        alert('Please enter a title, select an icon, pick a colour and choose a background');
        return;
    }

    if(habits.length >= 5){
        alert('You have ran out of free habits. Upgrade to premium for more.');
        return;
    }
    const color = selectedColour.style.backgroundColor;
    const icon = selectedIcon.id + '.svg';
    const background = selectedTexture.id;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstOfMonth.getDay();
    const startDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const newHabit = {
        title,
        color,
        icon,
        background,
        startDayOfWeek,
        createdMonth: month,
        createdYear: year
    };

    habits.push(newHabit);
    closeHabitDialog();
    loadHabits();
}

submitHabitBtn.addEventListener('click', createHabit);

