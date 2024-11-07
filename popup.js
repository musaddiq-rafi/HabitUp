const habitList = document.getElementById("habit-list");
const addHabitButton = document.getElementById("add-habit");
const newHabitInput = document.getElementById("new-habit");
const messageBox = document.getElementById("message-box");
const imageBox = document.getElementById("image-box");

// Load habits from storage
function loadHabits() {
  chrome.storage.local.get("habits", (data) => {
    const habits = data.habits || [];
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
      <button class="done-btn" data-index="${index}">Done</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    habitList.appendChild(habitItem);
  });

  // Attach event listeners to "Done" buttons
  document.querySelectorAll(".done-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      completeHabit(index);
    });
  });

  // Attach event listeners to "Delete" buttons
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      deleteHabit(index);
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
// Complete a habit and increase its streak
function completeHabit(index) {
    chrome.storage.local.get("habits", (data) => {
      const habits = data.habits || [];
      
      if (habits[index]) {
        habits[index].streak++; // Increase streak by 1 day for each "Done"
        console.log("Updated streak:", habits[index].streak); // Log new streak value
        chrome.storage.local.set({ habits }, () => {
          console.log("Storage updated with new streak");
          
          // Show message after storage update
          showCongratulatoryMessage(habits[index].streak);
          
          // Reload habit list after storage update
          loadHabits();
        });
      } else {
        console.log("Habit not found at index:", index); // Log if habit is missing
      }
    });
  }
  

// Delete a habit
function deleteHabit(index) {
  chrome.storage.local.get("habits", (data) => {
    let habits = data.habits || [];
    
    if (habits[index]) {
      habits.splice(index, 1); // Remove the habit from the array
      chrome.storage.local.set({ habits });
      loadHabits(); // Reload habit list after update
    }
  });
}

// Show congratulatory messages and display custom memes/images
function showCongratulatoryMessage(day) {
    const messageBox = document.getElementById("message-box");
    const imageBox = document.getElementById("image-box");
  
    if (!messageBox || !imageBox) {
      console.error("messageBox or imageBox is not found in the DOM.");
      return;
    }
  
    const message = document.createElement("p");
    const image = document.createElement("img");
    
    messageBox.innerHTML = ''; // Clear any existing message
    imageBox.innerHTML = ''; // Clear any existing image
  
    if (day === 1) {
      message.textContent = "Good job on your first day!";
      image.src = "memes/dbac2460-e3a4-48e3-8ba4-bb0530aa9850_text.gif"; // Replace with your meme for day 1
    } else if (day === 3) {
      message.textContent = "Kop Bro! Keep cooking";
      image.src = "memes/letHimCook.jpeg"; // Replace with your meme for day 3
    } else {
      message.textContent = `Congratulations! You made it to day ${day}!`;
      image.src = "memes/finished_meme.jpeg"; // Replace with your meme for the last day
    }
  
    messageBox.appendChild(message);
    imageBox.appendChild(image);
  }
  

// Initialize (on extension load)
loadHabits();
