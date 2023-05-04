
//setup the UI each section is called a block
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
 * Create the notes, scales, chord  and chord progression blocks/sections
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
        $(".scales .rows .row:nth-of-type(" + (i + 1) + ") h3").text(dscales[i].name + " scale")
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



//draw the notes on the keyboard for any section

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

//draw the variants for the scale modes and chord inversions picker
function createVariants(parent, source) {
    for (var i = 0; i < source.length; i++) {
        $("ul", parent).append('<li class="variant"><a href="#">' + source[i].name + '</a></li>')
        $("ul li:first-child", parent).addClass("active")
    }
}





/**
 * Behaviors and interactions
 * 
 * This part of the code is all about highlghting the notes on the keyboard for each section when a user clicks a not in a section above it
 * We refer to the data in model.js to know which notes to highlight
 */


//Called whenver a user clicks on a note, and is used to run down each section and highlight the releated notes
function showLegalNotes() {
    showLegalScaleNotes();
    if ($(".scales .note").hasClass("active")) {
        showLegalChordsNotes();
        showLegalProgressionNotes();
    }

}

//Highlight the related Scale notes on keyboard
//For scales we also have to use the modes to offset the root note
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
    $(".scales .row:nth-of-type(1) .info h3").text($(".tones .note.active .letter").text() + " Major")
    $(".scales .row:nth-of-type(2) .info h3").text($(".tones .note.active .letter").text() + " Minor")

}




//highlight the related notes in the Chords section when you pick a note in the Scales section
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

//highlight the related notes in the Progressions section when you pick a note in the Scales section
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

//play the audio and highlight the notes in the Scales section when you click the play button
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




