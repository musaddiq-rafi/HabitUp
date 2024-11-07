const habitList = document.getElementById("habit-list");
const addHabitButton = document.getElementById("add-habit");
const newHabitInput = document.getElementById("new-habit");

// Load habits from storage
function loadHabits() {
  chrome.storage.local.get("habits", (data) => {
    const habits = data.habits || [];
    console.log("Loaded habits:", habits); // Debugging log
    renderHabits(habits);
  });
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
      chrome.storage.local.set({ habits }, () => {
        console.log("Habit added:", habitName); // Debugging log
        loadHabits();
      });
      newHabitInput.value = "";
    });
  }
});

// Complete a habit and increase its streak
function completeHabit(index) {
  chrome.storage.local.get("habits", (data) => {
    const habits = data.habits || [];
    if (habits[index]) {  // Ensure habit exists
      habits[index].streak++;
      chrome.storage.local.set({ habits }, () => {
        console.log("Habit completed:", habits[index]); // Debugging log
        loadHabits();
      });
    } else {
      console.warn("Habit not found at index:", index); // Debugging log
    }
  });
}

// Initialize
loadHabits();
