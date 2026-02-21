const form = document.getElementById("rsvpForm");
const guestFields = document.getElementById("guestFields");
const numGuestsSelect = document.getElementById("numGuests");
const thankyou = document.getElementById("thankyou");

// Google Form submission base URL (replace "viewform" with "formResponse")
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScHfxGporfkhd_GWmuOEdONPo8CXohalN3BTQeB7i5rzMjFSA/formResponse";

// Entry IDs
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

const guestCountID = "entry.2939965";

/* Generate dynamic guest fields */
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
        <option value="Meat">Braised beef brisket</option>
        <option value="Fish">Balsamic glazed salmon</option>
        <option value="Vegan">Balsamic glazed salmon</option>
        <option value="Kid's meal">Kid's meal (ages 0-10): Chicken fingers</option>
      </select>

      <label>Allergies</label>
      <input type="text" name="allergy${i}">
    `;
    guestFields.appendChild(div);
  }
});

/* Submit RSVP using invisible iframe (reliable for Google Forms) */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const count = parseInt(numGuestsSelect.value);

  const params = new URLSearchParams();
  params.append(guestCountID, count);

  for (let i = 1; i <= count; i++) {
    params.append(nameIDs[i-1], form[`name${i}`].value || "");
    params.append(mealIDs[i-1], form[`meal${i}`].value || "");
    params.append(allergyIDs[i-1], form[`allergy${i}`].value || "");
  }

  // Create invisible iframe to submit
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = FORM_URL + "?" + params.toString();
  document.body.appendChild(iframe);

  form.style.display = "none";
  thankyou.style.display = "block";
});