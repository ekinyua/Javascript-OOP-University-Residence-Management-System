# University Residence Management System

## Description
This project is a simple web-based application that simulates a University Residence Management System. It allows users to add residences (dorm rooms and apartments), add students, assign students to residences, calculate rents, and submit maintenance requests.

## Features
- Add new residences (dorm rooms or apartments)
- Add new students
- Assign students to residences
- Calculate rents for all residences
- Submit maintenance requests

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## File Structure
- `index.html`: The main HTML file containing the structure of the web page
- `styles.css`: CSS file for styling the HTML elements
- `index.js`: JavaScript file containing all the logic for the application

## How to Use
1. Clone this repository to your local machine.
2. Open the `index.html` file in a web browser.
3. Use the provided interface to:
   - Add residences (provide name, address, size/bedrooms, and type)
   - Add students (provide name, ID, and gender)
   - Assign students to residences using the dropdown menus
   - Calculate rents for all added residences
   - Submit maintenance requests for students

## Code Structure
The JavaScript code uses ES6 classes to model the different entities in the system:
- `Residence`: Base class for all types of residences
- `DormRoom`: Extends `Residence`, specifically for dorm rooms
- `Apartment`: Extends `Residence`, specifically for apartments
- `Student`: Represents a student
- `MaintenanceRequest`: Represents a maintenance request submitted by a student
-  Utility functions: `saveToLocalStorage` and `loadFromLocalStorage` for local storage

## Future Improvements
- Implement data persistence ( backend database)
- Add form validation for input fields
- Implement a more sophisticated rent calculation system
- Add a feature to view and manage existing maintenance requests
- Improve the UI/UX with a more polished design