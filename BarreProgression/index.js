let state = 1;

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

nextButton.onclick = () => {
  if (state < 4) {
    const line = document.getElementById(`line-${state}`);
    const circle = document.getElementById(`circle-${state + 1}`);

    line.classList.add("filled");
    setTimeout(() => {
        circle.classList.add("filled");
    }, 500);
    state++;
  }
};

prevButton.onclick = () => {
  if (state > 1) {
    const line = document.getElementById(`line-${state - 1}`);
    const circle = document.getElementById(`circle-${state}`);
    
    circle.classList.remove("filled");
    setTimeout(() => {
        line.classList.remove("filled");
    }, 500);
    state--;
  }
};
