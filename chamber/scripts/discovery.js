function checkLastVisited() {

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const storedDateStr = localStorage.getItem("dateLastVisited");

    let welcomeMessage = "";

    console.log("Stored Last Visited Date:" + storedDateStr);

    if (storedDateStr === null) {
        //never visited
        welcomeMessage = "Welcome! Let us know if you have any questions.";
    } else {
        const storedDate = new Date(storedDateStr);
        const timeDiff = new Date() - storedDate;
        // const timeDiff = 186400000;

        if (timeDiff < oneDayInMilliseconds) {
            welcomeMessage = "Back so soon! Awesome!";
        } else {
            const daysCount = Math.ceil(timeDiff / oneDayInMilliseconds);
            if (daysCount === 1) {
                welcomeMessage = `You last visited ${daysCount} day ago.`;
            } else {
                welcomeMessage = `You last visited ${daysCount} days ago.`;
            }
        }
    }

    document.querySelector('#welcome-message').textContent = welcomeMessage;
}

function storeDateVisited() {
    localStorage.setItem("dateLastVisited", new Date().toString());
}

checkLastVisited();
storeDateVisited();