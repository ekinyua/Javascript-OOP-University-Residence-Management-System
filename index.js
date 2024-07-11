// Base class for all types of residences
class Residence {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.isOccupied = false; // tracks whether the residence is occupied
    }

    // marks residence as occupied
    occupy() {
        this.isOccupied = true;
    }

    // marks residence as vacant
    vacate() {
        this.isOccupied = false;
    }
}

// DormRoom class, inheriting from Residence
class DormRoom extends Residence {
    constructor(name, address, squareFootage) {
        super(name, address); // initialize parent class properties
        this.squareFootage = squareFootage;
    }

    // calculates the rent for the dorm room based on its size
    calculateRent() {
        return this.squareFootage * 0.5; // $0.5 per square foot
    }
}

// Apartment class inheriting from Residence
class Apartment extends Residence {
    constructor(name, address, numberOfBedrooms) {
        super(name, address);
        this.numberOfBedrooms = numberOfBedrooms;
    }

    // Calculates the rent for the apartment based on the number of bedrooms
    calculateRent() {
        const baseRent = 500;
        return baseRent + (this.numberOfBedrooms * 200);
    }
}

// student class
class Student {
    constructor(name, studentId, gender) {
        this.name = name; // student name
        this.studentId = studentId; // student Id
        this.gender = gender; // student gender
        this.assignedResidence = null; // residence assigned to the student, if any
    }

    // Assigns a residence to the student and marks it as occupied
    assignResidence(residence) {
        this.assignedResidence = residence;
        residence.occupy();
    }

    // Creates and returns a new maintenance request for the student
    submitMaintenanceRequest(description) {
        return new MaintenanceRequest(description, this);
    }
}

// Represents a maintenance request submitted by a student
class MaintenanceRequest {
    constructor(description, student) {
        this.description = description;    // Description of the maintenance issue
        this.student = student;            // The student who submitted the request
        this.status = 'submitted';         // Current status of the request
        this.assignedEmployee = null;      // The employee assigned to handle the request (if any)
    }

    // Assigns an employee to the request and updates its status
    assignEmployee(employee) {
        this.assignedEmployee = employee;
        this.status = 'in progress';
    }

    // Marks the request as completed
    completeRequest() {
        this.status = 'completed';
    }
}

// Represents an employee who can be assigned to maintenance requests
class Employee {
    constructor(name, employeeId) {
        this.name = name;            // The employee's name
        this.employeeId = employeeId;// The employee's unique ID
    }
}

// initializing arrays after all classes are declared
let residences = loadFromLocalStorage('residences') || [];
let students = loadFromLocalStorage('students') || [];
let maintenanceRequests = loadFromLocalStorage('maintenanceRequests') || [];

// Functions
function addResidence() {
    let name = document.getElementById('residenceName').value;
    let address = document.getElementById('residenceAddress').value;
    let size = document.getElementById('residenceSize').value;
    let type = document.getElementById('residenceType').value;

    if (type === 'dorm') {
        residences.push(new DormRoom(name, address, parseInt(size)));
    } else {
        residences.push(new Apartment(name, address, parseInt(size)));
    }

    saveToLocalStorage('residences', residences);
    log(`Added ${type}: ${name}`);
    updateResidenceSelect();
}

function addStudent() {
    let name = document.getElementById('studentName').value;
    let id = document.getElementById('studentId').value;
    let gender = document.getElementById('studentGender').value;

    let student = new Student(name, id, gender);
    students.push(student);

    saveToLocalStorage('students', students);
    log(`Added student: ${name}`);
    updateStudentSelects();
}

function assignResidence() {
    let studentIndex = document.getElementById('studentSelect').value;
    let residenceIndex = document.getElementById('residenceSelect').value;

    if (studentIndex !== '' && residenceIndex !== '') {
        let student = students[studentIndex];
        let residence = residences[residenceIndex];

        student.assignResidence(residence);
        saveToLocalStorage('students', students);
        saveToLocalStorage('residences', residences);
        log(`Assigned ${student.name} to ${residence.name}`);
    }
}

function calculateAllRents() {
    residences.forEach(residence => {
        let rent = residence.calculateRent();
        log(`Rent for ${residence.name}: $${rent}`);
    });
}

function submitMaintenanceRequest() {
    let studentIndex = document.getElementById('studentSelectMaintenance').value;
    let description = document.getElementById('maintenanceDescription').value;

    if (studentIndex !== '' && description) {
        let student = students[studentIndex];
        let request = student.submitMaintenanceRequest(description);
        maintenanceRequests.push(request);

        saveToLocalStorage('maintenanceRequests', maintenanceRequests);
        log(`Maintenance request submitted by ${student.name}: ${description}`);
    }
}

function updateResidenceSelect() {
    let select = document.getElementById('residenceSelect');
    select.innerHTML = '';
    residences.forEach((residence, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = residence.name;
        select.appendChild(option);
    });
}

function updateStudentSelects() {
    let selects = ['studentSelect', 'studentSelectMaintenance'];
    selects.forEach(selectId => {
        let select = document.getElementById(selectId);
        select.innerHTML = '';
        students.forEach((student, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = student.name;
            select.appendChild(option);
        });
    });
}

function log(message) {
    document.getElementById('output').innerHTML += message + '<br>';
}

// Utility functions for local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Load initial data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    updateResidenceSelect();
    updateStudentSelects();
});
