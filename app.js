// Music Setup
const tracks = [
    { file: "music/--.mp3", title: "--", artist: "--" },
];

let currentAudioIndex = 0;
let audio = new Audio();

let slider = document.getElementById("volumeSlider");

let setVolume = (value) => {
    audio.volume = value / 2;
};

if (slider) {
    slider.value = 0.1;

    slider.addEventListener("input", () => {
        setVolume(slider.value);
    });
}

setVolume(slider?.value ?? 0.1);

let displayCurrentTrackInfo = (index) => {
    let track = tracks[index];
    if (!track) return;

    //document.getElementById("currentTitle").textContent = track.title;
    //document.getElementById("currentArtist").textContent = track.artist;
};

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

let playNextTrack = () => {
    let nextIndex = (currentAudioIndex + 1) % tracks.length;
    playTrack(nextIndex);
};

audio.addEventListener("ended", playNextTrack);

// Cursor Setup
const pointer = document.createElement('div');
pointer.id = 'custom-pointer';
document.body.appendChild(pointer);

let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
let speed = 0.4;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX += distX * speed;
    ballY += distY * speed;

    pointer.style.left = ballX + "px";
    pointer.style.top = ballY + "px";

    requestAnimationFrame(animate);
}

animate();

// Start Website
window.addEventListener("click", () => {
    if (audio.paused) {
        let randomIndex = Math.floor(Math.random() * tracks.length);
        playTrack(randomIndex);
    }
}, { once: true });