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
  });
});
const membersDiv = document.querySelector("#members");

async function fetchMemberData() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    //console.log(member);
    members.forEach(member => {
        const memberSection = document.createElement("section"); // Changed from <div> to <section>
        memberSection.classList.add('member-card'); // Optional: Keep the same class name
        memberSection.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h4>${member.name}</h4>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">website</a>
            
            `;
        membersDiv.append(memberSection);
    })
}
fetchMemberData();


// Toggle between Grid and List View
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const members = document.getElementById('members');

gridView.addEventListener('click', () => {
    members.className = 'grid';
});

listView.addEventListener('click', () => {
    members.className = 'list';
});
