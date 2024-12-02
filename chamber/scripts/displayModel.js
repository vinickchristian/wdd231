//non profit modal
const nonProfitModal = document.querySelector('#non-profit-modal');
const nonProfitModalOpenButton = document.querySelector('.non-profit-modal-open');
const nonProfitModalCloseButton = nonProfitModal.querySelector('.non-profit-modal-close');

nonProfitModalOpenButton.addEventListener('click', () => {
    nonProfitModal.showModal();
});

nonProfitModalCloseButton.addEventListener('click', () => {
    nonProfitModal.close();
});

nonProfitModal.addEventListener('click', (event) => {
    if (event.target === nonProfitModal) {
        nonProfitModal.close();
    }
});

//bronze modal
const bronzeModal = document.querySelector('#bronze-modal');
const bronzeModalOpenButton = document.querySelector('.bronze-modal-open');
const bronzeModalCloseButton = bronzeModal.querySelector('.bronze-modal-close');

bronzeModalOpenButton.addEventListener('click', () => {
    bronzeModal.showModal();
});

bronzeModalCloseButton.addEventListener('click', () => {
    bronzeModal.close();
});

bronzeModal.addEventListener('click', (event) => {
    if (event.target === bronzeModal) {
        bronzeModal.close();
    }
});

//silver modal
const silverModal = document.querySelector('#silver-modal');
const silverModalOpenButton = document.querySelector('.silver-modal-open');
const silverModalCloseButton = silverModal.querySelector('.silver-modal-close');

silverModalOpenButton.addEventListener('click', () => {
    silverModal.showModal();
});

silverModalCloseButton.addEventListener('click', () => {
    silverModal.close();
});

silverModal.addEventListener('click', (event) => {
    if (event.target === silverModal) {
        silverModal.close();
    }
});

//gold modal
const goldModal = document.querySelector('#gold-modal');
const goldModalOpenButton = document.querySelector('.gold-modal-open');
const goldModalCloseButton = goldModal.querySelector('.gold-modal-close');

goldModalOpenButton.addEventListener('click', () => {
    goldModal.showModal();
});

goldModalCloseButton.addEventListener('click', () => {
    goldModal.close();
});

goldModal.addEventListener('click', (event) => {
    if (event.target === goldModal) {
        goldModal.close();
    }
});

const timeStamp = document.querySelector('#timestamp');
timeStamp.value = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;