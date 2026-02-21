const form = document.getElementById("rsvpForm");
const guestFields = document.getElementById("guestFields");
const numGuestsSelect = document.getElementById("numGuests");
const thankyou = document.getElementById("thankyou");

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScHfxGporfkhd_GWmuOEdONPo8CXohalN3BTQeB7i5rzMjFSA/formResponse";

/* Generate guest fields */
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

/* Submit RSVP */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const data = new URLSearchParams();

  /* number attending */
  data.append("entry.2939965", numGuestsSelect.value);

  const nameIDs = [
    "entry.1396850333","entry.5116675","entry.1832249635",
    "entry.1801380376","entry.20805657","entry.109624582"
  ];

  const mealIDs = [
    "entry.1344606640","entry.804335858","entry.755827808",
    "entry.1658850171","entry.1473681465","entry.240742352"
  ];

  const allergyIDs = [
    "entry.1602887644","entry.1343283640","entry.618449741",
    "entry.1095222015","entry.339899103","entry.937683075"
  ];

  for (let i = 1; i <= 6; i++) {
    data.append(nameIDs[i-1], form[`name${i}`]?.value || "");
    data.append(mealIDs[i-1], form[`meal${i}`]?.value || "");
    data.append(allergyIDs[i-1], form[`allergy${i}`]?.value || "");
  }

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
  });

  form.style.display = "none";
  thankyou.style.display = "block";
});