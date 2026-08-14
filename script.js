const form = document.getElementById("postForm");
const statusBox = document.getElementById("status");
const tableBody = document.getElementById("tableBody");
const submitButton = document.getElementById("submitBtn");
const emptyState = document.getElementById("emptyState");
const recordCount = document.getElementById("recordCount");

let totalRecords = 0;


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");


    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    const postData = {
        title: name,
        body: message,
        userId: email
    };


    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Sending...";
    statusBox.textContent = "Connecting to API...";


    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(postData)
            }
        );


        if (!response.ok) {
            throw new Error("Unable to submit data");
        }


        const apiData = await response.json();


        totalRecords++;


        const newRow = document.createElement("tr");


        newRow.innerHTML = `
            <td>${apiData.id}</td>
            <td>${apiData.title}</td>
            <td>${email}</td>
            <td>${apiData.body}</td>
        `;


        tableBody.appendChild(newRow);


        emptyState.style.display = "none";


        recordCount.textContent =
            `${totalRecords} ${totalRecords === 1 ? "Record" : "Records"}`;


        statusBox.textContent =
            "✓ Information submitted successfully.";


        form.reset();

    }

    catch (error) {

        console.error("POST API Error:", error);

        statusBox.textContent =
            "✕ Unable to submit data. Please try again.";

    }

    finally {

        submitButton.disabled = false;

        submitButton.querySelector("span").textContent =
            "Send Data";
    }

});