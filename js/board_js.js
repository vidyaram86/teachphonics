	  const dragItems = document.querySelectorAll(".drag-item");
	  console.log("no of draggable items:",dragItems);
      const bottomSection = document.getElementById("bottomSection");
      const bottomSoundSection = document.getElementById("bottomSoundSection");

      const addBoxButton = document.getElementById("addBox");
      const addSoundBoxButton = document.getElementById("addBox_Sound");

      dragItems.forEach((item) => {
        item.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData(
            "text/plain",
            e.target.getAttribute("data-image")
          );
		  
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
	  