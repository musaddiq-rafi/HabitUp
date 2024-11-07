# HabitUP

**Version**: 1.0  
**Description**: A simple Chrome extension for tracking habits, setting goals, and celebrating progress.

## Overview

HabitUP is a lightweight Chrome extension designed to help you build and maintain healthy habits by tracking daily goals and showing encouraging messages and memes along the way.

## Features

- **Add Habits**: Create new habits with a target number of days.
- **Track Progress**: Update your progress by marking days as complete.
- **Motivational Messages**: Receive messages and memes to keep you motivated on specific milestone days.
- **Delete Habits**: Easily remove habits after completion or if no longer needed.
- **Storage Integration**: Stores your habits locally, so you can pick up where you left off.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing the HabitUP files.

## Usage

1. Click on the HabitUP extension icon in the Chrome toolbar.
2. Enter a habit name and the total number of days you want to track.
3. Click **Add Habit** to save it to your list.
4. Each day, click **Done** to mark a habit day as complete and see motivational messages.
5. Use the **Delete** button to remove a habit if needed.

## Folder Structure

- `manifest.json`: The manifest file that defines the extension’s properties.
- `popup.html`: The main HTML file for the extension's popup.
- `popup.js`: JavaScript for handling habit logic and user interactions.
- `styles.css`: CSS for styling the popup interface.
- `memes/`: A folder containing memes for specific milestone days.

## Contributing

Feel free to submit issues or pull requests if you’d like to contribute to HabitUP.

## License

This project is licensed under the MIT License.
