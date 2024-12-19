document.addEventListener('DOMContentLoaded', function () {
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

    // Open Modal when clicking an image
    const galleryImages = document.querySelectorAll('.gallery-container img');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modalImage.src = image.src;
            modal.style.display = 'flex';
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
