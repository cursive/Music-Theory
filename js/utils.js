function colorAlpha(aColor, alpha) {
    var c = color(aColor);
    return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}


function resetChords() {
    $(".chords .note.active").removeClass("active");
}

function resetScales() {
    $(".scales .note.active").removeClass("active");
}


function getModeByName() {
    for (prop in dmodes) {
        //console.log("fdfds", prop);
        if (dmodes[prop].name === "Dorian") {
            console.log(dmodes[prop].details.pattern)
        }
    }
}


