document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const enterBtn = document.getElementById('enterBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('i');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const trackName = document.getElementById('trackName');
    const progressFill = document.getElementById('progressFill');
    const timeCurrent = document.getElementById('timeCurrent');
    const timeTotal = document.getElementById('timeTotal');
    const bgVideo = document.getElementById('bgVideo');

    let isMusicPlaying = false;
    let currentTrackIndex = 0;
    const tracks = [
        { name: 'Track 1', src: '1m.mp3' }, // Assuming 1m.mp3 is the first track
        // Add more tracks here if available
    ];

    // Function to play video and handle potential autoplay issues
    const playVideo = (videoElement) => {
        videoElement.muted = true;
        videoElement.play().catch(error => {
            console.log('Video autoplay failed:', error);
            // Fallback for browsers that block autoplay even with muted
            // You might want to show a play button to the user here
        });
    };

    // Initial video play attempt
    document.querySelectorAll('video').forEach(playVideo);

    // Play video on user interaction (for some mobile browsers)
    document.addEventListener('click', () => {
        document.querySelectorAll('video').forEach(playVideo);
    }, { once: true });

    // Splash screen logic
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            if (splash) {
                splash.classList.add('hidden'); // Add a class to hide the splash screen
                // Optionally, remove the splash screen from DOM after animation
                splash.addEventListener('transitionend', () => splash.remove());
            }
            // Start background music if not already playing
            if (!isMusicPlaying) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicIcon.classList.remove('fa-volume-mute');
                    musicIcon.classList.add('fa-volume-up');
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                }).catch(error => {
                    console.log('Music autoplay failed:', error);
                    // Handle cases where music autoplay is blocked
                    isMusicPlaying = false;
                    musicIcon.classList.remove('fa-volume-up');
                    musicIcon.classList.add('fa-volume-mute');
                    playPauseIcon.classList.remove('fa-pause');
                    playPauseIcon.classList.add('fa-play');
                });
            }
        });
    }

    // Music toggle logic
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicIcon.classList.remove('fa-volume-mute');
                    musicIcon.classList.add('fa-volume-up');
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                }).catch(error => {
                    console.log('Music play failed on toggle:', error);
                    isMusicPlaying = false;
                    musicIcon.classList.remove('fa-volume-up');
                    musicIcon.classList.add('fa-volume-mute');
                    playPauseIcon.classList.remove('fa-pause');
                    playPauseIcon.classList.add('fa-play');
                });
            } else {
                bgMusic.pause();
                isMusicPlaying = false;
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            }
        });
    }

    // Music player controls
    const loadTrack = (index) => {
        if (tracks[index]) {
            bgMusic.src = tracks[index].src;
            trackName.textContent = tracks[index].name;
            if (isMusicPlaying) {
                bgMusic.play();
            } else {
                bgMusic.load(); // Load the track without playing
            }
        }
    };

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
                isMusicPlaying = true;
            } else {
                bgMusic.pause();
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                isMusicPlaying = false;
            }
            // Sync music toggle icon with play/pause state
            if (isMusicPlaying) {
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            } else {
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            loadTrack(currentTrackIndex);
        });
    }

    // Update progress bar and time
    bgMusic.addEventListener('timeupdate', () => {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressFill.style.width = `${progress}%`;

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        };

        timeCurrent.textContent = formatTime(bgMusic.currentTime);
        if (!isNaN(bgMusic.duration)) {
            timeTotal.textContent = formatTime(bgMusic.duration);
        }
    });

    bgMusic.addEventListener('ended', () => {
        // Play next track automatically or loop current track
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    // Initial track load
    loadTrack(currentTrackIndex);

    // Handle fade-in elements
    const fadeElements = document.querySelectorAll('.fade-element');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add a CSS class to hide the splash screen initially
    const style = document.createElement('style');
    style.textContent = `
        .splash.hidden {
            opacity: 0;
            visibility: hidden;
            transition: opacity 1s ease-out, visibility 1s ease-out;
        }
    `;
    document.head.append(style);
});
