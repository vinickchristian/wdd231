// Get the current year and last modified date
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

    // Hamburger menu toggle
    const menu = document.querySelector('nav .menu');
    const hamburgerButton = document.querySelector('.hamburger');

    hamburgerButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        hamburgerButton.textContent = menu.classList.contains('open') ? '✖' : '☰';
    });
      // Wayfinding effect for active navigation link
      const path = window.location.pathname;
      const currentPage = path.substring(path.lastIndexOf('/') + 1);
      const navLinks = document.querySelectorAll('.menu a');
      
      navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (currentPage === href) {
              link.classList.add('active');
          }
  
      // Initial display of all courses
      filterCourses('all');
  });

    // Initial display of all courses
    filterCourses('all');
});

// Course List Array
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];
// Calculate total credits
const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

// Display total credits in the appropriate HTML element
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('totalCredits').textContent = `Credits: ${totalCredits}`;
});

// Display Courses Based on Filter
function displayCourses(filter) {
    const courseGrid = document.getElementById("course-grid");
    courseGrid.innerHTML = '';

    courses.filter(course => filter === 'all' || course.subject === filter)
           .forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        courseCard.classList.add(course.completed ? 'completed' : 'incomplete');
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
        
        <li><strong>Status:</strong> ${course.completed ? 'Completed' : 'Incomplete'}</li>
    `;
}

// Filter Courses
function filterCourses(filter) {
    displayCourses(filter);
}
