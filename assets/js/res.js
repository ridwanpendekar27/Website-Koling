function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
}

document.getElementById('menu-toggle').addEventListener('click', function () {
var navList = document.getElementById('nav-list');
navList.classList.toggle('active');
this.classList.toggle('hidden');
});

document.getElementById('close-menu').addEventListener('click', function (){
var navList = document.getElementById('nav-list');
navList.classList.remove('active');
document.getElementById('menu-toggle').classList.remove('hidden');
});

