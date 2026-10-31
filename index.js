let cards = document.getElementsByClassName("card");
let filters = document.getElementsByClassName("filter");
let currentFilter = "all";

function updateProgress() {
    let completed = 0;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute("data-status") === "submitted") {
            completed++;
        }
    }

    document.getElementById("count").textContent =
        "Completed: " + completed + " / " + cards.length;

    if (cards.length > 0) {
        document.getElementById("bar").style.width =
            completed / cards.length * 100 + "%";
    } else {
        document.getElementById("bar").style.width = "0%";
    }
}

function showCards() {
    for (let i = 0; i < cards.length; i++) {
        let status = cards[i].getAttribute("data-status");

        if (currentFilter === "all" || currentFilter === status) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function addCardEvents(card) {
    let statusbtn = card.querySelector(".status");
    let removebtn = card.querySelector(".remove");

    statusbtn.onclick = function () {
        if (card.getAttribute("data-status") === "submitted") {
            card.setAttribute("data-status", "pending");
            statusbtn.textContent = "Pending";
            statusbtn.classList.remove("done");
        } else {
            card.setAttribute("data-status", "submitted");
            statusbtn.textContent = "Submitted";
            statusbtn.classList.add("done");
        }

        updateProgress();
        showCards();
    };

    removebtn.onclick = function () {
        card.remove();
        cards = document.getElementsByClassName("card");
        updateProgress();
        showCards();
    };
}

for (let i = 0; i < cards.length; i++) {
    addCardEvents(cards[i]);
}

for (let i = 0; i < filters.length; i++) {
    filters[i].onclick = function () {
        for (let j = 0; j < filters.length; j++) {
            filters[j].classList.remove("active");
        }

        this.classList.add("active");
        currentFilter = this.getAttribute("data-filter");
        showCards();
    };
}

document.getElementById("add-form").onsubmit = function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let subject = document.getElementById("subject").value;
    let due = document.getElementById("due").value;
    let credit = document.getElementById("credit").value;
    let description = document.getElementById("description").value;
    let card = document.createElement("article");

    card.className = "card";
    card.setAttribute("data-status", "pending");
    card.innerHTML =
        '<span class="tag">' + subject + '</span>' +
        '<h2>' + title + '</h2>' +
        '<p>' + description + '</p>' +
        '<div class="details">' +
        '<span>Due: ' + due + '</span>' +
        '<span>Credit: ' + credit + '</span>' +
        '</div>' +
        '<button class="status">Pending</button>' +
        '<button class="remove">Remove</button>';

    document.querySelector(".cards").appendChild(card);
    addCardEvents(card);
    cards = document.getElementsByClassName("card");
    document.getElementById("add-form").reset();
    updateProgress();
    showCards();
};

updateProgress();
