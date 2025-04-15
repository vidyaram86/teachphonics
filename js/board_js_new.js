const dragItems = document.querySelectorAll(".drag-item");
console.log("no of draggable items:", dragItems);
const bottomSection = document.getElementById("bottomSection");
const bottomSoundSection = document.getElementById("bottomSoundSection");

const addBoxButton = document.getElementById("addBox");
const addSoundBoxButton = document.getElementById("addBox_Sound");

dragItems.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.getAttribute("data-image"));
  });
  
  // Add touchstart event for mobile
  item.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const dataImage = e.target.getAttribute("data-image");

    item.dataset.touchData = dataImage;
    item.dataset.startX = touch.clientX;
    item.dataset.startY = touch.clientY;

    // Optional: Add visual feedback for the drag
    item.style.opacity = "0.5";
  });

  item.addEventListener("touchend", () => {
    item.style.opacity = "1";
  });
  
});

function enableDrop(box) {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.style.backgroundColor = "#f0f8ff";
  });

  box.addEventListener("dragleave", () => {
    box.style.backgroundColor = "#ffffff";
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData("text/plain");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.addEventListener("click", () => {
      img.remove();
    });
    box.innerHTML = "";
    box.appendChild(img);
    box.style.backgroundColor = "#ffffff";
  });
    // Handle touchend for mobile
  box.addEventListener("touchend", (e) => {
    const touch = e.changedTouches[0];
    const dragItem = document.querySelector('[data-touch-data]');
    if (!dragItem) return;

    const startX = parseInt(dragItem.dataset.startX, 10);
    const startY = parseInt(dragItem.dataset.startY, 10);
    const distanceX = Math.abs(touch.clientX - startX);
    const distanceY = Math.abs(touch.clientY - startY);

    if (distanceX < 10 && distanceY < 10) {
      const imageUrl = dragItem.dataset.touchData;
      const img = document.createElement("img");
      img.src = imageUrl;
      img.addEventListener("click", () => {
        img.remove();
      });
      box.innerHTML = "";
      box.appendChild(img);
      box.style.backgroundColor = "#ffffff";
    }
  });
  
} 
  
  
addBoxButton.addEventListener("click", () => {
  const newDropBox = document.createElement("div");
  newDropBox.classList.add("drop-box");
  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-box");
  removeButton.addEventListener("click", () => {
    newDropBox.remove();
  });
  newDropBox.appendChild(removeButton);
  enableDrop(newDropBox);
  bottomSection.insertBefore(newDropBox, addBoxButton);
});

addSoundBoxButton.addEventListener("click", () => {
  const newDropBox = document.createElement("div");
  newDropBox.classList.add("drop-box");
  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-box");
  removeButton.addEventListener("click", () => {
    newDropBox.remove();
  });
  newDropBox.appendChild(removeButton);
  enableDrop(newDropBox);
  bottomSoundSection.insertBefore(newDropBox, addSoundBoxButton);
});











document.querySelectorAll(".drop-box").forEach(enableDrop);
