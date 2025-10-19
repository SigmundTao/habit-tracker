# Habit Tracker v1.0 🔥

A minimalist habit tracking application built with vanilla JavaScript. Track your daily habits with streaks, multiple views, and persistent data storage.
---
[Live Demo](https://habit-tracker-beta-eight.vercel.app/)

## Features

- **Three View Modes**
  - Month View: Full calendar grid for the current month
  - Week View: Simplified weekly tracker starting from Sunday
  - Year View: Annual overview of all tracked habits

- **Streak Tracking**
  - Visual streak counter with flame icons
  - Automatic streak calculation
- **Habit Management**
  - Create unlimited habits
  - Edit habit names
  - Delete habits
  - Persistent data storage (localStorage)

- **Intuitive UI**
  - Custom checkbox styling
  - Responsive design
  - Clean, minimal interface
  - Easy navigation between views

---

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Custom styling and animations
- **Vanilla JavaScript** - Core functionality and logic
- **LocalStorage API** - Client-side data persistence

---

## Installation & Setup

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
```

2. **Open in browser**
```bash
   # Simply open index.html in your browser
   # No build process or dependencies required!
```

3. **Or use a local server (recommended)**
```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
```

4. **Access the app**
   - Open `http://localhost:8000` in your browser

---

## Usage

### Creating a Habit
1. Click the **"Add Habit"** button
2. Enter your habit name
3. Hit **"Create"**

### Tracking Progress
- **Month View**: Click any day's checkbox to mark it complete
- **Week View**: Check off today's progress quickly
- **Year View**: Review your consistency over time (view-only)

### Managing Habits
- **Edit**: Click the "Edit" button on any habit card
- **Delete**: Click the "X" button to remove a habit
- **Switch Views**: Use the dropdown at the top to change views

### Understanding Streaks
- 🔥 **Flame Icon**: Appears after 2+ consecutive days
- **Number**: Shows current streak length
- **Reset**: Streak resets to 0 if you miss a day

---

## Screenshots

### Month View
<img width="903" height="927" alt="Screenshot from 2025-10-19 17-39-37" src="https://github.com/user-attachments/assets/accd62cd-f2b5-4064-a8b9-75d357749ad3" />
*Full monthly calendar with custom checkboxes for each day*

### Week View
<img width="903" height="927" alt="Screenshot from 2025-10-19 17-41-12" src="https://github.com/user-attachments/assets/22d14f27-b8e6-4999-91da-f3c2c4ff9e6a" />
*Simplified weekly tracker for quick daily check-ins*

### Year View
<img width="903" height="927" alt="Screenshot from 2025-10-19 17-40-53" src="https://github.com/user-attachments/assets/53f7313c-bd07-4480-96ef-e934279e6a99" />
*Annual overview showing all months you've tracked*

---

## Future Features (v2.0 Roadmap)

- [ ] User authentication and cloud sync
- [ ] Multiple flame levels based on streak milestones
- [ ] Habit statistics dashboard (completion %, longest streak)
- [ ] Habit categories and color coding
- [ ] Export data (CSV, JSON)
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)
- [ ] Reminder notifications
- [ ] Habit templates library
- [ ] Social features (share streaks, compete with friends)

---

## What I Learned

Building this project taught me:

- **Data Structure Design**: Organizing nested habit data (year → month → days)
- **LocalStorage Management**: Persisting complex data structures
- **Date Manipulation**: Working with JavaScript Date API for calendars
- **State Management**: Keeping UI in sync with data changes
- **Streak Logic**: Implementing consecutive day counting algorithms
- **View Synchronization**: Maintaining data consistency across multiple views
- **DOM Manipulation**: Dynamic rendering of calendar grids
- **Event Delegation**: Efficient event handling for multiple checkboxes
---

## Development Notes

**Timeline**: Built in 10 days (Oct 10-20, 2025)

**Development Process**:
- Days 1-3: Initial design and week view implementation
- Days 4-6: Added yearly view and refactored data structure
- Days 7-8: Implemented streak counter with flame icons
- Days 9-10: Bug fixes, UI polish, and documentation

**Code Quality**:
- Vanilla JavaScript (no frameworks)
- No external dependencies
- Commented code for clarity
- Modular function structure

---

## Known Issues

- Streak counter doesn't persist across multiple devices (localStorage is device-specific)
- Year view doesn't handle habits created mid-year gracefully
- No data export functionality yet

*These will be addressed in v2.0*

---

## License

MIT License - feel free to use this project for learning or personal use.

---

## Author

**Tao Simon**
- GitHub: https://github.com/SigmundTao
