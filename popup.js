const habitList = document.getElementById("habit-list");
const addHabitButton = document.getElementById("add-habit");
const newHabitInput = document.getElementById("new-habit");
const messageBox = document.getElementById("message-box");
const imageBox = document.getElementById("image-box");

// Load habits and start date from storage
function loadHabits() {
  chrome.storage.local.get(["habits", "startDate"], (data) => {
    const habits = data.habits || [];
    const startDate = data.startDate || null;
    renderHabits(habits);
    if (startDate) {
      const currentDay = calculateDaysSinceStart(startDate);
      showCongratulatoryMessage(currentDay);
    }
  });
}

// Calculate days since the start date
function calculateDaysSinceStart(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = today - start;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to start from day 1
}

// Render habits in the popup
function renderHabits(habits) {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const habitItem = document.createElement("div");
    habitItem.className = "habit-item";
    habitItem.innerHTML = `
      <span>${habit.name} (${habit.streak} days)</span>
      <button class="complete-btn" data-index="${index}">Complete</button>
    `;
    habitList.appendChild(habitItem);
  });

  // Attach event listeners to "Complete" buttons
  document.querySelectorAll(".complete-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      completeHabit(index);
    });
  });
}

// Add a new habit
addHabitButton.addEventListener("click", () => {
  const habitName = newHabitInput.value.trim();
  if (habitName) {
    chrome.storage.local.get("habits", (data) => {
      const habits = data.habits || [];
      habits.push({ name: habitName, streak: 0 });
      chrome.storage.local.set({ habits });
      loadHabits();
      newHabitInput.value = "";
    });
  }
});

// Complete a habit and increase its streak
function completeHabit(index) {
  chrome.storage.local.get(["habits", "startDate"], (data) => {
    const habits = data.habits || [];
    const startDate = data.startDate || null;
    
    if (habits[index]) {
      habits[index].streak++;
      chrome.storage.local.set({ habits });

      // Update current day and check milestone
      let currentDay = calculateDaysSinceStart(startDate);
      chrome.storage.local.set({ currentDay });

      showCongratulatoryMessage(currentDay);
      loadHabits(); // Reload habit list after update
    }
  });
}

// Show congratulatory messages and display custom memes/images
function showCongratulatoryMessage(day) {
  const message = document.createElement("p");
  const image = document.createElement("img");
  messageBox.innerHTML = ''; // Clear any existing message
  imageBox.innerHTML = ''; // Clear any existing image

  if (day === 1) {
    message.textContent = "Good job on your first day!";
    image.src = "images/first-day-meme.jpg"; // Add your meme image for day 1
  } else if (day === 3) {
    message.textContent = "Kop Bro! Keep cooking";
    image.src = "images/day-3-meme.jpg"; // Add your meme image for day 3
  } else {
    message.textContent = `Congratulations! You made it to day ${day}!`;
    image.src = "images/ending-meme.jpg"; // Add your meme image for the last day
  }

  messageBox.appendChild(message);
  imageBox.appendChild(image);
}

// Initialize (on extension load)
loadHabits();

// Set custom start date (this could be done in your extension's settings)
function setStartDate(date) {
  chrome.storage.local.set({ startDate: date }, () => {
    console.log("Start date set:", date);
loadHabits(); 
  }
  )
}
// Example: Set start date manually for testing (you can remove this part later)
setStartDate("2024-11-01"); // Set your custom start date here
