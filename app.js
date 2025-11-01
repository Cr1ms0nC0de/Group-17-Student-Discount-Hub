// ======== CONFIG ========

const AIRTABLE_BASE = "appIR5VPGJzHN9U9a"; // base ID
const TABLE_NAME = "Discounts"; // table name
const TOKEN = "patId6xLH6x0hv8hV.47242219be5e1e440c32407a55882f7a82009be491905c3eba3d284c0819915c" // personal access token

const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(TABLE_NAME)}`;

// ======== FUNCTIONS ========

// Show a temporary loading message
function showLoading() {
    const container = document.getElementById("discount-list");
    container.innerHTML = "<p class='placeholder'>Loading discounts...</p>";
}

// Show an error message if something goes wrong
function showError(message) {
    const container = document.getElementById("discount-list");
    container.innerHTML = `<p class='placeholder error'>⚠️ ${message}</p>`;
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
        const studentOnly = d["Student Only"] ? "Student Only: True" : "Student Only: False";
        const status = d["Current Status"] || "Unknown";
        const expiresAt = d["Expires At"] || "N/A";
        const daysLeft = d["Days Until Expiration"] !== undefined ? `${d["Days Until Expiration"]} days left` : "";

        const card = document.createElement("div");
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
        const validRecords = data.records.filter(r => r.fields.Title && r.fields.Title.trim() !== "");
        displayDiscounts(validRecords);
    } catch (error) {
        console.error("Error fetching data:", error);
        showError("Failed to load discounts. Please try again later.");
    }
}

//show the success message
function showSuccess(message){
    const msg = document.getElementById("success-message");
    if(msg){
        msg.textContent = message;
        msg.style.display = "block";
        setTimeout(() =>{
            msg.style.display = "none";
        }, 4000);
    }
}

//add a new discount to Airtable
async function addDiscount(title, description, url, category, tags){
    console.log("Attempting to send new Discount to Airtable:", {title, description});
    try{
        const fields={
            Title: title,
            Description: description,
            URL: url,
            Category: category,
            Tags: tags

        };
        console.log("Sending these fields:", fields);

        const response = await fetch(API_URL,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fields})
        });
        const responseText = await response.text();
        console.log("Airtable response:", responseText);

        if(!response.ok){
            console.error("Airtable error response:", responseText);
            throw new Error(`Airtable error ${response.status}: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Successfully added new discount to Airtable:", data);
        return data;
    }catch(error){
        console.error("Error in addDiscount:", error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const modal = document.getElementById("form-modal");
    const showButton = document.getElementById("show-form-btn");
    const closeButton = document.querySelector(".close-modal");

    //show the modal when the button is clicked
    if(showButton){
        showButton.addEventListener("click", function(){
            modal.style.display = "block";
        });
    }

    //close the modal when X is clicked
    if(closeButton){
        closeButton.addEventListener("click", function(){
            modal.style.display = "none";
        });
    }

    //close the modal when clicking outside of it
    window.addEventListener("click", function(event){
        if(event.target === modal){
            modal.style.display = "none";
        }
    });

    //submission handler
    const form = document.getElementById("add-form");

    if(form){
        form.addEventListener("submit", async (e) =>{
            e.preventDefault();

            //get the form values
            const title = document.getElementById("title").value.trim();
            const description = document.getElementById("description").value.trim();
            const url = document.getElementById("url").value.trim();
            const category = document.getElementById("category").value;
            const tags = document.getElementById("tags").value.trim();

            //simple validation
            if(!title || !description || !url || !category || !tags){
                alert("Please fill in all fields");
                return;
            }

            //disable the submit button
            const submitButton = form.querySelector('button[type="submit"]');
            if(submitButton){
                submitButton.disabled = true;
                submitButton.textContent = "Submitting";
            }

            try{
                //send discount to airtable
                console.log("Sending to Airtable");
                await addDiscount(title, description, url, category, tags);

                showSuccess("Discount submitted successfully");
                form.reset();

                //refresh list
                //await loadDiscounts();

                //close the modal after 2 secs
                setTimeout(() =>{
                    modal.style.display = "none";
                }, 2000);

            }catch(error){
                console.error("Error:", error);
                alert("Failed to submit discount: " + error.message);
            }finally{
                //re enable the submit button
                if(submitButton){
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit Discount";
                }
            }
        });
    }
});

// ======== INIT ========
loadDiscounts();