

$(function () {
    console.log("init")
    createTonesBlock();
    createScalesBlock();
    createChordsBlock();
    createProgressionsBlock();
    $(".toggleBlacks").click(function () {
        toggleBlacks()
    });
    $(".toggleLetters").click(function () {
        toggleLetters()
    });
    $(".btcompact").click(function () {
        toggleCompact()
    });


});

/**
 * Create the notes, scales and chord blocks
 */

function createTonesBlock() {
    createNotes(".tones", tonesNotes);
    $(".tones .note").click(function () {
        $(".tones .active").removeClass("active");
        $(this).addClass("active")
        showLegalNotes();
    });

}

function createScalesBlock() {

    var c = $(".scales .row")

    for (var i = 0; i < dscales.length - 1; i++) {
        c.clone().appendTo(".scales .rows");
    }
    $(".scales .info").click(function () {
        console.log("next", $(this).next());
        playRow($(this).parent(), 0.5, 0.5);
    });
    for (var i = 0; i < dscales.length; i++) {
        $(".scales .rows .row:nth-of-type(" + (i + 1) + ") h3").text(dscales[i].name)
        createNotes(".scales .row:nth-of-type(" + (i + 1) + ")", scaleNotes[i]);
    }
    $(".scales .note").click(function () {
        $(".scales .notes .active").removeClass("active");
        $(this).addClass("active")
        showLegalNotes();
    });
    createVariants(".scales", dmodes)
    $(".scales ul li").click(function (e) {
        e.preventDefault();
        $(".scales ul .active").removeClass("active");
        $(".scales .notes .active").removeClass("active");
        $(this).addClass("active");
        $(".chords .note").removeClass("legal");
        $(".progressions .note").removeClass("legal");
        showLegalNotes();
    });
}




function createChordsBlock() {
    createVariants(".chords", dchordinversions);
    var c = $(".chords .row")
    for (var i = 0; i < 3; i++) {
        c.clone().appendTo(".chords .rows");
    }
    $(".chords .info").click(function () {
        playRow($(this).parent(), 0.5, 0);
    });
    for (var i = 0; i < 4; i++) {
        $(".chords .rows .row:nth-of-type(" + (i + 1) + ") h3").text(dchords[i].name)
        $(".chords .rows .row:nth-of-type(" + (i + 1) + ") .info").addClass(dchords[i].name)
        createNotes(".chords .row:nth-of-type(" + (i + 1) + ")", chordNotes[i]);
    }
    $(".chords ul li").click(function (e) {
        e.preventDefault();
        $(".chords ul .active").removeClass("active");
        $(this).addClass("active");
        showLegalNotes();
    });
}

function createProgressionsBlock() {

    let c = $(".progressions .row")
    let progressionkey = 0
    let romans = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

    for (var i = 0; i < dprogressions[0].details.pattern.length - 1; i++) {
        c.clone().appendTo(".progressions .rows");
    }
    $(".chords .info").click(function () {
        playRow($(this).parent(), 0.5, 0);
    });

    for (var i = 0; i < dprogressions[progressionkey].details.pattern.length; i++) {
        //dprogressions[progressionkey].details.pattern[i]
        $(".progressions .rows .row:nth-of-type(" + (i + 1) + ") h3").text(romans[i])
        createNotes(".progressions .row:nth-of-type(" + (i + 1) + ")", progressionNotes[i]);
    }

}

/**
 * 
 *The UI inside the blocks
 */



function createNotes(parent, arr) {
    //console.log(arr)
    for (var i = 0; i < 24; i++) {
        $(".notes", parent).append('<div class="note" data-midinote="' + dmidinotes[i] + '"><div class="letter">empty</div></div>')
        arr.push($(".notes .note:last-child", parent))
        for (var j = 0; j < dblacknotes.length; j++) {
            if (i == dblacknotes[j]) {
                arr[i].addClass("black");
            } else {
                $(".letter", arr[i]).text(dalphabet[i])
            }
        }
    }
}

function createVariants(parent, source) {
    for (var i = 0; i < source.length; i++) {
        $("ul", parent).append('<li class="variant"><a href="#">' + source[i].name + '</a></li>')
        $("ul li:first-child", parent).addClass("active")
    }
}





/**
 * Behaviors and interactions
 */


//This is messy as we have to use the root note and the mode to offset which notes in teh scale to display
function showLegalScaleNotes() {
    $(".scales .note").removeClass("legal")
    let root = $(".tones .note.active").index();
    for (var i = 0; i < dscales.length; i++) {
        let mode = $(".scales .variants li.active").index();
        for (var j = 0; j < dscales[i].details.pattern.length; j++) {
            let n = dscales[i].details.positions[(j + mode)]
            n += root;
            $(".scales .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + (n + 1) + ")").addClass("legal")
        }
    }

}


function showLegalNotes() {
    showLegalScaleNotes();
    if ($(".scales .note").hasClass("active")) {
        showLegalChordsNotes();
        showLegalProgressionNotes();
    }

}



function showLegalChordsNotes() {
    let inversion = dchordinversions[$(".chords .variants li.active").index()].details.pattern;
    $(".chords .note").removeClass("legal")
    for (var i = 0; i < dchords.length; i++) {
        var n = $(".scales .note.active").index() + 1
        for (var j = 0; j < 3; j++) {
            n += dchords[i].details.pattern[j]
            $(".chords .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + (n + inversion[j]) + ")").addClass("legal")
        }
    }
}


function showLegalProgressionNotes() {
    console.log("showegalprogre")
    $(".progressions .note").removeClass("legal")
    let inversion = dchordinversions[$(".chords .variants li.active").index()].details.pattern;
    let progressionkey = 0
    let activeScaleRow = $(".scales .note.active").parent().parent().parent().index();
    for (var i = 0; i < dprogressions[progressionkey].details.pattern.length; i++) {
        let n = $(".scales .note.active").index() + 1
        n += dscales[activeScaleRow].details.positions[i]
        for (var j = 0; j < dchords[0].details.pattern.length; j++) {
            p = dprogressions[progressionkey].details.pattern[i]
            n += dchords[p].details.pattern[j]
            $(".progressions .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + (n + inversion[j]) + ")").addClass("legal")
        }
    }
    let romans = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

    $(".progressions .info").removeClass("minor")
    $(".progressions .info").removeClass("major")
    $(".progressions .info").removeClass("augmented")
    $(".progressions .info").removeClass("diminished")
    for (var i = 0; i < dprogressions[progressionkey].details.pattern.length; i++) {
        let title = romans[i];
        switch (dprogressions[progressionkey].details.pattern[i]) {
            case 0:
                title = title.toUpperCase();
                break;
            case 2:
                title += "º"
                break;
            default:
                title = title;
        }
        $(".progressions .rows .row:nth-of-type(" + (i + 1) + ") h3").text(title)
        $(".progressions .rows .row:nth-of-type(" + (i + 1) + ") .info").addClass(dchords[dprogressions[progressionkey].details.pattern[i]].name)
    }

}


function playRow(parent, duration, delay) {
    let notesToPlay = [];
    let notesToHighlight = []
    $(".note", parent).each(function (index) {
        if ($(this).hasClass("legal")) {
            console.log(index + ": " + $(this).data("midinote"));
            notesToPlay.push($(this).data("midinote"))
            notesToHighlight.push($(this))
        }
    });
    synthPlayAndHighlightRow(notesToPlay, notesToHighlight, duration, delay)
}




