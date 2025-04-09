const xbox = document.querySelector('.xbox-side');
const playstation = document.querySelector('.ps5-side');

xbox.addEventListener('mouseenter', () => {
    console.log('Xbox hover');
    xbox.classList.add('hover-xbox');
    playstation.classList.add('hover-xbox');
});

xbox.addEventListener('mouseleave', () => {
    xbox.classList.remove('hover-xbox');
    playstation.classList.remove('hover-xbox');
});

playstation.addEventListener('mouseenter', () => {
    playstation.classList.add('hover-ps5');
    xbox.classList.add('hover-ps5');
});

playstation.addEventListener('mouseleave', () => {
    playstation.classList.remove('hover-ps5');
    xbox.classList.remove('hover-ps5');
});
