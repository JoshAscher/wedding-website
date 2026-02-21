const form = document.getElementById("rsvpForm");
const guestFields = document.getElementById("guestFields");
const numGuestsSelect = document.getElementById("numGuests");
const thankyou = document.getElementById("thankyou");
const guestSection = document.getElementById("guestSection");
const mainGuestName = document.getElementById("mainGuestName");
const attendingRadios = document.getElementsByName("attending");

// Google Form submission URL
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScHfxGporfkhd_GWmuOEdONPo8CXohalN3BTQeB7i5rzMjFSA/formResponse";

// Replace these IDs with your actual Google Form entry IDs
const mainNameID = "entry.87250038";      // main guest name
const attendingID = "entry.600893801";     // attending yes/no
const guestCountID = "entry.2939965";             // number of attending guests
const nameIDs = ["entry.1396850333","entry.5116675","entry.1832249635","entry.1801380376","entry.20805657","entry.109624582"];
const mealIDs = ["entry.1344606640","entry.804335858","entry.755827808","entry.1658850171","entry.1473681465","entry.240742352"];
const allergyIDs = ["entry.1602887644","entry.1343283640","entry.618449741","entry.1095222015","entry.339899103","entry.937683075"];

// Show/hide guest fields based on attendance
attendingRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (document.getElementById("attendingYes").checked) {
      guestSection.style.display = "block";
    } else {
      guestSection.style.display = "none";
      guestFields.innerHTML = "";
    }
  });
});

// Generate dynamic guest fields
numGuestsSelect.addEventListener("change", () => {
  guestFields.innerHTML = "";
  const count = parseInt(numGuestsSelect.value);
  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.className = "guest-box";
    div.innerHTML = `
      <h3>Guest ${i}</h3>
      <label>Name</label>
      <input type="text" name="name${i}" required>
      <label>Meal Choice</label>
      <select name="meal${i}" required>
        <option value="">Select...</option>
        <option value="Meat">Meat</option>
        <option value="Fish">Fish</option>
        <option value="Vegetarian">Vegetarian</option>
      </select>
      <label>Allergies</label>
      <input type="text" name="allergy${i}">
    `;
    guestFields.appendChild(div);
  }
});

// Submit form
form.addEventListener("submit", e => {
  e.preventDefault();

  const params = new URLSearchParams();
  params.append(mainNameID, mainGuestName.value);

  const attending = document.querySelector('input[name="attending"]:checked').value;
  params.append(attendingID, attending);

  if (attending === "Yes") {
    const count = parseInt(numGuestsSelect.value);
    params.append(guestCountID, count);

    for (let i = 1; i <= count; i++) {
      params.append(nameIDs[i-1], form[`name${i}`].value || "");
      params.append(mealIDs[i-1], form[`meal${i}`].value || "");
      params.append(allergyIDs[i-1], form[`allergy${i}`].value || "");
    }
  }

  // Submit via invisible iframe
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = FORM_URL + "?" + params.toString();
  document.body.appendChild(iframe);

  form.style.display = "none";
  thankyou.style.display = "block";
});