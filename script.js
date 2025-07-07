document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i;

  if (!name || !email || !message) {
    alert("⚠️ Please complete all fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("✉️ Invalid email address format.");
    return;
  }

  alert(`✅ Thank you, ${name}! Your message has been sent.`);
  this.reset();
});

function addImage() {
  const fileInput = document.getElementById("imageFile");
  const urlInput = document.getElementById("imageUrl");
  const gallery = document.getElementById("gallery");

  const file = fileInput.files[0];
  const url = urlInput.value.trim();
  let added = false;

  if (file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = "Uploaded Image";
    img.loading = "lazy";
    setupImageEvents(img);
    gallery.appendChild(img);
    added = true;
  }

  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "URL Image";
    img.loading = "lazy";
    setupImageEvents(img);
    gallery.appendChild(img);
    added = true;
  }

  if (!added) {
    alert("⚠️ Please upload a file or paste an image URL.");
    return;
  }

  fileInput.value = "";
  urlInput.value = "";
}

function setupImageEvents(img) {
  img.addEventListener("click", () => {
    document.getElementById("modalImg").src = img.src;
    document.getElementById("imageModal").style.display = "block";
  });

  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (confirm("❌ Do you want to remove this image?")) {
      img.remove();
    }
  });
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("imageModal").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("imageModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
