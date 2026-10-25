const subjList = document.getElementById("subj-list");
const semList = document.getElementById("sem-list");

function addSubj() {
    const num = subjList.children.length + 1;
    const subj = document.createElement("div");

    subj.className = "subj-row";
    subj.innerHTML =
        '<input type="text" placeholder="Subject ' + num + '">' +
        '<input class="creds" type="number" min="1" placeholder="Credits">' +
        '<select class="grade">' +
        '<option value="10">O (10)</option>' +
        '<option value="9">A+ (9)</option>' +
        '<option value="8">A (8)</option>' +
        '<option value="7">B+ (7)</option>' +
        '<option value="6">B (6)</option>' +
        '<option value="5">C (5)</option>' +
        '<option value="0">F (0)</option>' +
        '</select>';

    subjList.appendChild(subj);
}

function calcSGPA() {
    const creds = document.getElementsByClassName("creds");
    const grades = document.getElementsByClassName("grade");
    let totalCreds = 0;
    let totalPts = 0;

    for (let i = 0; i < creds.length; i++) {
        const cred = Number(creds[i].value);

        if (cred > 0) {
            totalCreds = totalCreds + cred;
            totalPts = totalPts + cred * Number(grades[i].value);
        }
    }

    if (totalCreds > 0) {
        document.getElementById("sgpa-res").textContent =
            "Your SGPA is " + (totalPts / totalCreds).toFixed(2);
    } else {
        document.getElementById("sgpa-res").textContent =
            "Please enter at least one valid subject credit.";
    }
}

function addSem() {
    const num = semList.children.length + 1;
    const sem = document.createElement("div");

    sem.className = "sem-row";
    sem.innerHTML =
        '<input type="number" class="sem-sgpa" min="0" max="10" step="0.01" placeholder="Semester ' +
        num +
        ' SGPA">' +
        '<input type="number" class="sem-creds" min="1" placeholder="Total credits">';

    semList.appendChild(sem);
}

function calcCGPA() {
    const sgpas = document.getElementsByClassName("sem-sgpa");
    const creds = document.getElementsByClassName("sem-creds");
    let totalCreds = 0;
    let totalPts = 0;

    for (let i = 0; i < sgpas.length; i++) {
        const sgpa = Number(sgpas[i].value);
        const cred = Number(creds[i].value);

        if (sgpa >= 0 && sgpa <= 10 && cred > 0) {
            totalCreds = totalCreds + cred;
            totalPts = totalPts + sgpa * cred;
        }
    }

    if (totalCreds > 0) {
        document.getElementById("cgpa-res").textContent =
            "Your CGPA is " + (totalPts / totalCreds).toFixed(2);
    } else {
        document.getElementById("cgpa-res").textContent =
            "Please enter valid SGPA and credit values.";
    }
}

document.getElementById("add-subj").onclick = addSubj;
document.getElementById("calc-sgpa").onclick = calcSGPA;
document.getElementById("add-sem").onclick = addSem;
document.getElementById("calc-cgpa").onclick = calcCGPA;
