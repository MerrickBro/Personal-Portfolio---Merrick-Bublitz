// --== Music Setup ==--
const tracks = [
    { file: "music/--.mp3", title: "--", artist: "--" },
];
let currentAudioIndex = 0;

// Create audio element
let audio = new Audio();

// Volume Control
let slider = document.getElementById("volumeSlider");

let setVolume = (value) => {
    audio.volume = value / 2;
};

// Initialize slider and set volume
if (slider) {
    slider.value = 0.1;

    slider.addEventListener("input", () => {
        setVolume(slider.value);
    });
}

setVolume(slider?.value ?? 0.1);

// Current Track Display
let displayCurrentTrackInfo = (index) => {
    let track = tracks[index];
    if (!track) return;

    //document.getElementById("currentTitle").textContent = track.title;
    //document.getElementById("currentArtist").textContent = track.artist;
};

// Play the first track on page load
let playTrack = (index) => {
    let track = tracks[index];
    if (!track) return;
    
    currentAudioIndex = index;
    
    audio.pause();
    audio.currentTime = 0;
    
    audio.src = track.file;
    
    audio.play().catch(e => console.log("Click page to play"));
    
    displayCurrentTrackInfo(index);
};

// Play next track when current one ends
let playNextTrack = () => {
    let nextIndex = (currentAudioIndex + 1) % tracks.length;
    playTrack(nextIndex);
};

// Play the next track when the current one ends
audio.addEventListener("ended", playNextTrack);



// --== Hand and Visual Setup ==--
const visual = document.getElementById("visual");
const pointer = document.createElement('div');
pointer.id = 'custom-pointer';
document.body.appendChild(pointer);

// Variables for cursor and tilt smoothing
let mouseX = 0, mouseY = 0;
let destX = 0, destY = 0;
let visualY = 0;
let cursorSpeed = 0.4;
let tiltSpeed = 0.3;

// Update mouse position on movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animation loop for cursor and tilt smoothing
function animate() {
    // Cursor smoothing
    let distX = mouseX - destX;
    let distY = mouseY - destY;
    destX += distX * cursorSpeed;
    destY += distY * cursorSpeed;

    // Update pointer position
    pointer.style.left = destX + "px";
    pointer.style.top = destY + "px";

    // Visual tilt
    if (visual) {
        // Calculate tilt based on vertical mouse position
        let centerY = window.innerHeight / 2;
        let targetY = mouseY - centerY;
        
        // Smoothly transition visualY towards targetY
        visualY += (targetY - visualY) * tiltSpeed;
        
        // Calculate rotation and translation based on visualY
        let rotationX = (visualY / centerY) * 20;
        let translateY = (visualY / centerY) * 200;
        
        // Apply rotation and translation to the visual element
        visual.style.transform = `rotateX(${-rotationX}deg) translateY(${-translateY}px)`;
    }

    requestAnimationFrame(animate);
}

// Start the animation loop
animate();



// --== Start Website ==--
window.addEventListener("click", () => {
    if (audio.paused) {
        let randomIndex = Math.floor(Math.random() * tracks.length);
        playTrack(randomIndex);
    }
}, { once: true });