document.addEventListener('DOMContentLoaded', function () {
    /*** MODAL FUNCTIONALITY ***/
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Modal Image">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');

    // Close Modal on X click
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal on Outside Click
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    /*** FOOTER DYNAMIC YEAR AND LAST MODIFIED DATE ***/
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

    /*** HAMBURGER MENU ***/
    const menu = document.querySelector('nav .menu');
    const hamburgerButton = document.querySelector('.hamburger');

    hamburgerButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        hamburgerButton.textContent = menu.classList.contains('open') ? '✖' : '☰';
    });

    /*** WAYFINDING ACTIVE PAGE HIGHLIGHT ***/
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('.menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage === href) {
            link.classList.add('active');
        }
    });

    /*** LAZY LOADING FOR IMAGES ***/
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /*** FETCH AND BUILD GALLERY ***/
    async function fetchGallery() {
        const galleryContainer = document.querySelector('.gallery-container');

        try {
            const response = await fetch('data/gallery.json');
            const data = await response.json();

            // Dynamically Add Images to Gallery
            galleryContainer.innerHTML = data.images
                .map(image => `
                    <img src="${image.src}" alt="${image.alt}" class="animate-on-scroll" loading="lazy">
                `)
                .join('');

            // Initialize Scroll Animations
            initializeScrollAnimations();
            attachModalToImages(); // Attach modal functionality to new images
        } catch (error) {
            console.error('Error loading gallery:', error);
            galleryContainer.innerHTML = '<p>Error loading gallery. Please try again later.</p>';
        }
    }

    // Attach Modal to Gallery Images
    function attachModalToImages() {
        const galleryImages = document.querySelectorAll('.gallery-container img');
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                modalImage.src = image.src;
                modal.style.display = 'flex';
            });
        });
    }

    /*** SCROLL ANIMATIONS ***/
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add 'visible' class for animation
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => observer.observe(element));
    }

    // Fetch gallery images on page load
    fetchGallery();
});
