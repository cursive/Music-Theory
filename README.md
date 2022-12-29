# Harmony
 Waves



- Assign each mine to a note so that the gaps between the notes of a scale are represnted temporally too
- Maybe global/loal is when you turn on a global, any channel you move sync all the other channels
🚨 Theta is a continuously increaign number, that why it's dangeorus to manipulate it

Bugs
- Notes range cannot exceed 127, need to chop it down, adn adjust the range slider accordingly
- Need to figure out sinewave period (do I do how amny notes per priod?)

Features
- Multi channel out
- Physical controls
- Drums
- One gui panel per sinewave



Todo
- Do away scopeMin and scope max
- Scope min is nw our mode selector and moves the rang eof notes
- Scope max is how many notes in the range

Approach 2
- Therer are 7 notes in a major or minor scale
- So each period is an octave, containing 7 blobs
- The theta shoud cycle between 12 modes/offset
- So when we play the note, we play +/- the offset
- Notes belong to the mines not, not the blob
- Think of the mine horzon as the string, and the blobs as finers


Apporaoach one 1
- Nates: All notes in the key across all octaves
- Horizon: One mine for each note in the key
- Mine X pos screewndith/notes length 
- Use sliders to adjsut extremties of what notes ot play
- Blobes out of scope are grey, and don't explode mines or play music
[••••••••••••••••••••••••••••••••] All the notes are on screen 
•••••••[••••••••••••••••••]••••••• Min max dims the unused ones
Speed changes vertical speed


[0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 93, 95, 96, 98, 100, 101, 103, 105, 107, 108, 110, 112, 113, 115, 117, 119]


