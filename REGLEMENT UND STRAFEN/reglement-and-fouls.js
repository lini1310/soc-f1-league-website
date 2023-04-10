function showrules() {
    var x = document.getElementById("rulesarrow");
    var y = document.getElementById("rulespic");

    if (x.innerHTML === "↓") {
        x.innerHTML = "↑";
        y.style.display = "block";
    } else {
        x.innerHTML = "↓";
        y.style.display = "none";
    }
}

function showpenalty() {
    var x = document.getElementById("penaltyarrow");
    var y = document.getElementById("penaltypic");

    if (x.innerHTML === "↓") {
        x.innerHTML = "↑";
        y.style.display = "block";
    } else {
        x.innerHTML = "↓";
        y.style.display = "none";
    }
}