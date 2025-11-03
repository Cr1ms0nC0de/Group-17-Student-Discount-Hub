// ======== CONFIG ========

const AIRTABLE_BASE = "appIR5VPGJzHN9U9a"; // base ID
const TABLE_NAME = "Discounts"; // table name
const TOKEN = "patId6xLH6x0hv8hV.47242219be5e1e440c32407a55882f7a82009be491905c3eba3d284c0819915c"; // personal access token

const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(TABLE_NAME)}`;

// ======== FUNCTIONS ========

// Show a temporary loading message (kept as-is to avoid theme changes)
function showLoading() {
  const container = document.getElementById("discount-list");
  container.innerHTML = "<p class='placeholder'>Loading discounts...</p>";
}

// Show an error message if something goes wrong (kept as-is)
function showError(message) {
  const container = document.getElementById("discount-list");
  container.innerHTML = `<p class='placeholder error'>⚠️ ${message}</p>`;
  // Optional toast if helper is present (won't affect theme)
  if (window.showToast) {
    window.showToast("error", "Failed to load", message);
  }
}

// Display all discount cards on the page
function displayDiscounts(records) {
  const container = document.getElementById("discount-list");
  container.innerHTML = ""; // clear any old content

  if (records.length === 0) {
    container.innerHTML = "<p class='placeholder'>No discounts found.</p>";
    return;
  }

  records.forEach(record => {
    const d = record.fields;

    const title = d.Title || "Untitled Discount";
    const description = d.Description || "No description provided.";
    const url = d.URL ? `<a href="${d.URL}" target="_blank">View Offer</a>` : "";
    const category = d.Category || "General";
    const tags = d.Tags ? d.Tags.split(",").map(t => `<span class="tag">${t.trim()}</span>`).join(" ") : "";
    const studentOnly = d["Student Only"] ? "Student Exclusive" : "";
    const status = d["Current Status"] || "Unknown";
    const expiresAt = d["Expires At"] || "N/A";
    const daysLeft = d["Days Until Expiration"] !== undefined ? `${d["Days Until Expiration"]} days left` : "";

    const card = document.createElement("div");
    // keep team’s class naming — this is what your CSS/HTML expect
    card.className = `discount-card ${status.toLowerCase()}`;

    card.innerHTML = `
      <h3>${title}</h3>
      <p class="description">${description}</p>
      <p class="meta">
        <strong>Category:</strong> ${category}<br>
        ${studentOnly ? `<strong>${studentOnly}</strong><br>` : ""}
        ${expiresAt !== "N/A" ? `<strong>Expires:</strong> ${expiresAt} (${daysLeft})<br>` : ""}
        <strong>Status:</strong> <span class="status ${status.toLowerCase()}">${status}</span>
      </p>
      <div class="tags">${tags}</div>
      <p class="offer-link">${url}</p>
    `;
    container.appendChild(card);
  });

  // === ABDUL: wire up the detail popup AFTER cards exist in the DOM ===
  try {
    const cards = Array.from(container.querySelectorAll(".discount-card"));
    if (window.attachDetailHandlers && cards.length) {
      // Pass the same records array we just rendered
      window.attachDetailHandlers(cards, records);
    }
    // Optional toast (only if helper exists)
    if (window.showToast) {
      window.showToast("success", "Loaded", "Discounts updated.");
    }
  } catch (e) {
    console.warn("ABDUL: detail view not wired:", e);
  }
}

// Load data from Airtable
async function loadDiscounts() {
  showLoading();

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    // keep current behavior: show any record with a non-empty Title
    const validRecords = data.records.filter(r => r.fields.Title && r.fields.Title.trim() !== "");
    displayDiscounts(validRecords);
  } catch (error) {
    console.error("Error fetching data:", error);
    showError("Failed to load discounts. Please try again later.");
  }
}

// ======== INIT ========
loadDiscounts();
