const url = "https://pollapi.it3.iktim.no";
var prev_poll_name = null
var current_poll_name = null

// Update the poll on reload
window.onload = updatePoll();
// Update the poll every 2 seconds
setInterval(async function() {updatePoll()}, 2000)

async function updatePoll() {
    await fetch(url + "/poll").then(
        response => {return response.json()
    }).then(data => {

        // Verify poll names
        if (data.name != current_poll_name) { // New poll
            prev_poll_name = current_poll_name;
            current_poll_name = data.name;
            localStorage.setItem("has_voted", true);
        }

        createPollHtml(data);

        // Update poll title
        let title = this.document.getElementById("poll_title");
        title.innerHTML = data.name;
    });
}

async function castVote(name) {
    if (!canVote) return;

    await fetch(url + "/vote", {
        method: "POST",
        body: JSON.stringify({
            name: name,
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(data => {
        localStorage.setItem("has_voted", false);
    });
}

function canVote() {
    if (localStorage.getItem("has_voted") == false || localStorage.getItem("has_voted") == null) return true;
    if (localStorage.getItem("prev_poll_name") != prev_poll_name || localStorage.getItem("prev_poll_name") == null) return true;
    return false;
}

function createPollHtml(poll_data) {
    let container = document.getElementById("poll_container");

    // Remove all children of container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Add new data
    for (index in poll_data.cells) {
        let cell_data = poll_data.cells[index];
        
        let btn = document.createElement("button");
        btn.innerHTML = cell_data.name;
        btn.className = "poll_cell";
        btn.onclick = function () {
            castVote(this.innerHTML);
        }

        container.appendChild(btn);
    }
}