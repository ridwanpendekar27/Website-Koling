const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const scrollDown = document.querySelector(".scroll-down");
let isOpened = false;

const openModal = () => {
  modal.classList.add("is-open");
  body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("is-open");
  body.style.overflow = "initial";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 3 && !isOpened) {
    isOpened = true;
    scrollDown.style.display = "none";
    openModal();
  }
});

modalButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

document.onkeydown = (evt) => {
  evt = evt || window.event;
  evt.keyCode === 27 ? closeModal() : false;
};

function goTo() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'rahmat@gmail.com' && password === 'rahmat123') {
      // Redirect ke halaman admin
      window.location.href = '/assets/page/admin.html';
  } else if (email === 'user@gmail.com' && password === 'user123') {
      // Redirect ke halaman user
      window.location.href = '/assets/page/user.html';
  } else {
      document.getElementById('message').textContent = 'Username atau password salah!';
  }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah submit form yang sebenarnya
  goTo();
});

