// --== Music Setup ==--
const tracks = [
    { file: "music/Ambient 1.mp3", title: "Ambient 1", artist: "lunarcama" },
    { file: "music/Ambient 2.mp3", title: "Ambient 2", artist: "lunarcama" },
    { file: "music/Ambient 3.mp3", title: "Ambient 3", artist: "lunarcama" },
    { file: "music/Company.mp3", title: "Company", artist: "lunarcama" },
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

    document.getElementById("currentTitle").textContent = track.title;
    document.getElementById("currentArtist").textContent = track.artist;
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

// Play next track
let nextTrack = () => {
    let nextIndex = (currentAudioIndex + 1) % tracks.length;
    playTrack(nextIndex);
};

// Play previous track
let prevTrack = () => {
    let prevIndex = (currentAudioIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
};

// Toggle play/pause
let togglePlay = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};

// Play the next track when the current one ends
audio.addEventListener("ended", nextTrack);



// --== Hand and Visual Setup ==--
const visual = document.getElementById("visual");
const pointer = document.createElement('div');
pointer.id = 'custom-pointer';
document.body.appendChild(pointer);

// Variables for cursor and tilt smoothing
let mouseX = 0, mouseY = 0;
let destX = 0, destY = 0;
let visualY = 0;
let visualX = 0;
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
        let centerX = window.innerWidth / 2;
        let targetX = mouseX - centerX;

        // Smoothly transition visualY towards targetY
        visualY += (targetY - visualY) * tiltSpeed;
        visualX += (targetX - visualX) * tiltSpeed;

        // Calculate rotation and translation based on visualY
        let rotationX = (visualY / centerY) * 20;
        let translateY = (visualY / centerY) * 300;
        let rotationY = (visualX / centerX) * 20;
        let translateX = (visualX / centerX) * 200;

        // Apply rotation and translation to the visual element
        visual.style.transform = `rotateX(${-rotationX}deg) translateY(${-translateY}px) rotateY(${rotationY}deg) translateX(${-translateX}px)`;
    }

    requestAnimationFrame(animate);
}

// Start the animation loop
animate();



// --== Simple Screen Switching ==--
let currentScreen = "startingScreen";

let screenSwitch = (targetScreen) => {
    document.getElementById(currentScreen).className = "inactive";
    document.getElementById(targetScreen).className = "active";
    currentScreen = targetScreen;
}

// Simple button hover effect
let buttons = document.querySelectorAll("button, a");
let contactButtons = document.querySelectorAll("#contactLine a");
for (let button of buttons) {
    if (Array.from(contactButtons).includes(button)) continue;
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#01fc01b0";
        button.style.color = "#fff";
    });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "transparent";
        button.style.color = "inherit";
    });
}

// --== Start Website ==--
// Separate audio element for ambience
let ambienceAudio = new Audio("assets/LC Ship Ambience.flac");
ambienceAudio.loop = true;
ambienceAudio.volume = 0.05;

window.addEventListener("click", () => {
    if (audio.paused) {
        let randomIndex = Math.floor(Math.random() * tracks.length);
        screenSwitch("menuScreen");
        playTrack(randomIndex);
        ambienceAudio.play().catch(e => console.log("Click page to play ambience"));
    }
}, { once: true });