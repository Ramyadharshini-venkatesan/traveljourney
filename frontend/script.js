const API = "http://localhost:3000/places";

// Load journeys (for journey.html)
async function loadPlaces() {
  const placesList = document.getElementById("placesList");
  if (!placesList) return;

  const res = await fetch(API);
  const places = await res.json();
  placesList.innerHTML = "";

  places.forEach(p => {
    const div = document.createElement("div");
    div.className = "place-card";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : ""}
      <button data-id="${p.id}" class="delete-btn">❌ Delete</button>
    `;
    placesList.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadPlaces();
    });
  });
}

// Add journey (for add.html)
function setupForm() {
  const form = document.getElementById("placeForm");
  if (!form) return;

  const nameInput = document.getElementById("placeName");
  const descInput = document.getElementById("placeDesc");
  const imageInput = document.getElementById("placeImage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: nameInput.value,
      description: descInput.value,
      image: imageInput.value
    };

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Journey added ✅");
      form.reset();
      window.location.href = "journey.html";
    }
  });
}

setupForm();
loadPlaces();
