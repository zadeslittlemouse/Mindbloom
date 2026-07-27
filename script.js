function saveAnswers(pageName, nextPage) {
    const selects = document.querySelectorAll("select");

    selects.forEach((select, index) => {
        localStorage.setItem(pageName + (index + 1), select.value);
    });

    window.location.href = nextPage;
}

function finishAssessment() {
    // These must match exactly the first argument you pass to saveAnswers()
    const pages = [
        "mood",
        "anxiety",
        "relation",
        "self",
        "purpose",
        "pressure",
        "resilience",
        "energy"
    ];

    // true  = positive question (higher number = better)
    // false = negative question (higher number = worse → we reverse it)
    const positive = [
        // Mood
        false, false, true, false,
        // Anxiety
        false, false, true, false,
        // Relationships
        true, false, true, false,
        // Self-esteem
        true, false, true, false,
        // Purpose
        true, false, true, false,
        // Pressure
        true, false, true, false,
        // Resilience
        true, true, false, true,
        // Energy
        true, false, false, true
    ];

    let total = 0;
    let questionIndex = 0;

    pages.forEach(page => {
        for (let i = 1; i <= 4; i++) {
            let answer = Number(localStorage.getItem(page + i));

            // If the value is missing, treat as middle (2)
            if (isNaN(answer)) answer = 2;

            if (positive[questionIndex]) {
                total += answer;
            } else {
                total += (4 - answer);
            }

            questionIndex++;
        }
    });

    // Max possible score = 32 questions × 4 = 128
    let percentage = Math.round((total / 128) * 100);
    localStorage.setItem("score", percentage);

    window.location.href = "overall.html";
}