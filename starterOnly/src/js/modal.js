const modalbg = document.querySelector(".bground");
// modalButtons contains the responsive button as well
const modalButtons = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

const launchModal = () => {modalbg.style.display = "block";}
const closeModal = () => {modalbg.style.display = "none";}

// modal events trigger
modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalBtn.addEventListener("click", closeModal);  