## Stat-o-Matic

## Stat-O-Matic is a web application that allows users to view and compare the statistics of various soccer players. Users can select a player from a dropdown menu and view their statistics, including appearances, goals, assists, goals-per-match, and passes-per-minute.

## Features

Dynamic dropdown menu populated with data from a JSON file.
Display of player statistics and information, including their name, position, club badge, and player image.
Automatic calculation of goals-per-match and passes-per-minute statistics.
Responsive design that adjusts to different screen sizes.

---

## Technologies Used

HTML
CSS
JavaScript
JSON
Google Fonts
JavaScript Features

---

## Fetch API

## The Fetch API is used to load player data from a JSON file. The getData function fetches the data and returns a Promise that is resolved with the parsed JSON data.

## Event Listeners

## An event listener is added to the dropdown menu to detect changes in the selected player. When a new player is selected, the changePlayer function is called with the selected player's data as an argument.

## Template Literals

## Template literals are used to dynamically generate HTML content, such as the dropdown menu options and the player's name and position.

## Array Methods

## Array methods are used to manipulate the player data, including the findIndex method to find the index of the selected player, and the forEach method to create and append player images to the DOM.

## Conditional Statements

## Conditional statements are used to update the goals-per-match and passes-per-minute statistics based on the selected player's data.

## Error Handling

## Error handling is implemented using a try-catch block to catch and handle errors that may occur during the loading of player data.

## How to Run

run `git clone https://github.com/JJD1990/Player-Stats-Card.git`
To run the application, simply open the index.html file in a web browser.
