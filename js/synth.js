/**
 * Sends a note to the synth, and also highlights the note on keyboard
 * Aynth doesn't emit events so we have t manually hilight the keyboard
 */


const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function synthPlayAndHighlightRow(notesToPlay, notesToHighlight, duration = 0.5, delay = 0.5) {
    const now = Tone.now()
    console.log(notesToPlay, duration, delay)
    for (var i = 0; i < notesToPlay.length; i++) {
        synth.triggerAttackRelease(notesToPlay[i], duration, now + i * delay);
        highlightNoteTimeout(notesToHighlight[i], now + i * delay * 1000, duration * 1000);
    }
}

function highlightNoteTimeout(noteToHighlight, delay, duration) {
    setTimeout(function () {

        noteToHighlight.addClass("playing")
    }, delay);
    setTimeout(function () {

        noteToHighlight.removeClass("playing")
    }, delay + duration);
}