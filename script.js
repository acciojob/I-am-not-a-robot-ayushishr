//your code here
const imageUrls = [
  "url_to_image_1",
  "url_to_image_1",
  "url_to_image_2",
  "url_to_image_3",
  "url_to_image_4",
  "url_to_image_5",
];

let selectedImages = [];
let selectedIndexes = [];

function renderImages() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  const randomIndexes = generateRandomIndexes(6);
  selectedIndexes = randomIndexes.slice(0, 5);
  const repeatIndex = randomIndexes[5];

  for (let i = 0; i < randomIndexes.length; i++) {
    const img = document.createElement("img");
    img.src = imageUrls[randomIndexes[i]];
    img.className = "img" + (i + 1);

    img.addEventListener("click", () => {
      if (selectedImages.length === 2) {
        return;
      }

      if (!selectedIndexes.includes(i)) {
        return;
      }

      if (selectedImages.includes(i)) {
        return;
      }

      selectedImages.push(i);
      img.classList.add("selected");

      if (selectedImages.length === 2) {
        document.getElementById("verify").style.display = "inline";
      }
    });

    imageContainer.appendChild(img);
  }

  // Reset the state
  selectedImages = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").textContent = "";
}

function generateRandomIndexes(max) {
  const indexes = [];

  while (indexes.length < max) {
    const randomIndex = Math.floor(Math.random() * max);

    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  return indexes;
}

function resetState() {
  selectedImages = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").textContent = "";

  const selectedImagesElements = document.getElementsByClassName("selected");
  while (selectedImagesElements.length > 0) {
    selectedImagesElements[0].classList.remove("selected");
  }
}

function verifySelection() {
  const para = document.getElementById("para");
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }

  document.getElementById("verify").style.display = "none";
}

// Event listener for the Reset button
document.getElementById("reset").addEventListener("click", resetState);

// Event listener for the Verify button
document.getElementById("verify").addEventListener("click", verifySelection);

// Initial render
renderImages();
