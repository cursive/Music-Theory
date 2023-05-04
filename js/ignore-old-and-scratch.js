

function showLegalModeNotes(offset) {
    console.log("offset", offset)
    console.log(dmodes[offset].details.pattern.length)
    $(".scales .note").removeClass("legal")

    for (var i = 0; i < dmodes[offset].details.pattern.length; i++) {
        offset += dmodes[offset].details.pattern[i]
    }
    for (var i = 0; i < dscales.length; i++) {
        var n = $(".tones .note.active").index() + 1 + offset
        console.log("--", n)
        for (var j = 0; j < dscales[i].details.pattern.length; j++) {
            $(".scales .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + n + ")").addClass("legal")
            n += dmodes[offset].details.pattern[j]
        }
    }

}

// function createModesBlock() {
//     createNotes(".scales", scaleNotes);
//     $(".scales .note").click(function () {
//         $(".scales .notes .active").removeClass("active");
//         $(this).addClass("active")
//         showLegalChordsNotes()
//     });
//     for (var i = 0; i < dmodes.length; i++) {
//         $(".scales ul").append('<li class="variant">' + dmodes[i].name + '</li>')
//         $(".scales ul li:first-child").addClass("active")
//     }

//     $(".scales ul li").click(function () {
//         $(".scales ul .active").removeClass("active");
//         $(".scales .notes .active").removeClass("active");
//         $(this).addClass("active")
//         showLegalScaleNotes(dscaleNotes, $(this).index())
//     });

// }