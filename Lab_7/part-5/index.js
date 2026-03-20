let position = 0;
const moveObj = document.getElementById("moved");

document.getElementById("right").onclick = () => {
  position += 100;
  moveObj.style.transform = `translateX(${position}px)`;
};

document.getElementById("left").onclick = () => {
  position -= 100;
  moveObj.style.transform = `translateX(${position}px)`;
};
