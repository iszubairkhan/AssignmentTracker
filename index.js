        const subjectList = document.getElementById("subject-list");
        const semesterList = document.getElementById("semester-list");

        function updateSubjectNumbers() {
            const subjects = subjectList.querySelectorAll(".subject-row");
            subjects.forEach(function (subject, index) {
                subject.querySelector("input[type='text']").placeholder = `Subject ${index + 1}`;
            });
        }

        function updateSemesterNumbers() {
            const semesters = semesterList.querySelectorAll(".semester-row");
            semesters.forEach(function (semester, index) {
                semester.querySelector(".semester-sgpa").placeholder = `Semester ${index + 1} SGPA`;
            });
        }

        updateSubjectNumbers();
        updateSemesterNumbers();

        document.getElementById("add-subject").addEventListener("click", function () {
            const subject = document.createElement("div");
            subject.className = "subject-row";
            subject.innerHTML = `
                        <input type="text" placeholder="Subject">
                        <input class="credits" type="number" min="1" placeholder="Credits">
                        <select class="grade">
                    <option value="10">O (10)</option>
                    <option value="9">A+ (9)</option>
                    <option value="8">A (8)</option>
                    <option value="7">B+ (7)</option>
                    <option value="6">B (6)</option>
                    <option value="5">C (5)</option>
                    <option value="0">F (0)</option>
                </select>
            `;
            subjectList.appendChild(subject);
            updateSubjectNumbers();
        });

        document.getElementById("calculate-sgpa").addEventListener("click", function () {
            const credits = document.querySelectorAll(".credits");
            const grades = document.querySelectorAll(".grade");
            let totalCredits = 0;
            let totalPoints = 0;

            credits.forEach(function (credit, index) {
                const creditValue = Number(credit.value);
                if (creditValue > 0) {
                    totalCredits += creditValue;
                    totalPoints += creditValue * Number(grades[index].value);
                }
            });

            const result = document.getElementById("sgpa-result");
            result.textContent = totalCredits
                ? `Your SGPA is ${ (totalPoints / totalCredits).toFixed(2) }`
                : "Please enter at least one valid subject credit.";
        });

        document.getElementById("add-semester").addEventListener("click", function () {
            const semester = document.createElement("div");
            semester.className = "semester-row";
            semester.innerHTML = `
                        <input type="number" class="semester-sgpa" min="0" max="10" step="0.01" placeholder="SGPA">
                        <input type="number" class="semester-credits" min="1" placeholder="Total credits">
                    `;
            semesterList.appendChild(semester);
            updateSemesterNumbers();
        });

        document.getElementById("calculate-cgpa").addEventListener("click", function () {
            const sgpas = document.querySelectorAll(".semester-sgpa");
            const credits = document.querySelectorAll(".semester-credits");
            let totalCredits = 0;
            let totalPoints = 0;

            sgpas.forEach(function (sgpa, index) {
                const sgpaValue = Number(sgpa.value);
                const creditValue = Number(credits[index].value);
                if (sgpaValue >= 0 && sgpaValue <= 10 && creditValue > 0) {
                    totalCredits += creditValue;
                    totalPoints += sgpaValue * creditValue;
                }
            });

            const result = document.getElementById("cgpa-result");
            result.textContent = totalCredits
                ? `Your CGPA is ${ (totalPoints / totalCredits).toFixed(2) }`
                : "Please enter valid SGPA and credit values.";
        });
