
# Intro
- I built this as a POC to test out generating music theory algorythimcally, and to get feedback from musicians. 
- I'm not doing any templating, and the UI is either hard coded in the html file, or generated using jQuery
- It's at breaking point and I want to move to vue.js so that I can build everytihng in a modular and scalable way

# Main files
- **index.html** has each section hard coded into it. 
- **model.js** stores the the patterns for scales, chords and chord progressions, think of it as the core  music theory patterns
- **main.js** where most of the code lives for drawing the UI and handling interactions
- **synth.js** is used for generating audio
- **ui.js** is a control panel for presenting the UI differently, disabled for now
- **utils.js** are some generic js utilities

# Bugs
- Fix which root note of the scale is seelcted