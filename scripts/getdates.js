// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date of the HTML file
const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();

// Update the copyright year in the footer
document.getElementById('currentyear').textContent = currentYear;

// Update the last modified date in the footer
document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('nav .menu');
    const hamburgerButton = document.querySelector('.hamburger');

    hamburgerButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        hamburgerButton.textContent = menu.classList.contains('open') ? '✖' : '☰';
    });
});
// Course List Array
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming...', technology: ['Python'], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web...', technology: ['HTML', 'CSS'], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more organized...', technology: ['Python'], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes...', technology: ['C#'], completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience in Web Fundamentals...', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience with Dynamic Web...', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
];

// Display Courses Based on Filter
function displayCourses(filter) {
    const courseGrid = document.getElementById("course-grid");
    courseGrid.innerHTML = '';

    courses.filter(course => filter === 'all' || course.subject === filter)
           .forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.textContent = `${course.subject} ${course.number}`;
        courseCard.onclick = () => showCourseDetails(course);
        courseGrid.appendChild(courseCard);
    });
}

// Show Course Details
function showCourseDetails(course) {
    const courseWorkList = document.getElementById("course-work-list");
    courseWorkList.innerHTML = `
        <li><strong>${course.subject} ${course.number}</strong>: ${course.title}</li>
        <li><strong>Credits:</strong> ${course.credits}</li>
        <li><strong>Description:</strong> ${course.description}</li>
        <li><strong>Technologies:</strong> ${course.technology.join(', ')}</li>
    `;
}

// Initial Display of All Courses
function filterCourses(filter) {
    displayCourses(filter);
}

// Display all courses on load
filterCourses('all');