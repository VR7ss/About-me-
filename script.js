/* ============================================
   Bio Page — Script
   Audio Engine, Splash, Particles, Music Player
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- DOM Elements ----
    const splash = document.getElementById('splash');
    const enterBtn = document.getElementById('enterBtn');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const particlesContainer = document.getElementById('particles');

    // Music Player Elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const progressFill = document.getElementById('progressFill');
    const timeCurrent = document.getElementById('timeCurrent');
    const timeTotal = document.getElementById('timeTotal');
    const progressBar = document.querySelector('.progress-bar');

    // ---- Fade-in Elements ----
    const fadeElements = document.querySelectorAll('.fade-element');

    // ============================================
    // FLOATING PARTICLES GENERATOR
    // ============================================
    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            const duration = Math.random() * 12 + 8;
            particle.style.animationDuration = duration + 's';
            const delay = Math.random() * 15;
            particle.style.animationDelay = delay + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles(40);

    // ============================================
    // SPLASH SCREEN → ENTER
    // ============================================
    enterBtn.addEventListener('click', () => {
        splash.classList.add('hidden');

        bgMusic.volume = 0.4;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('muted');
                playPauseIcon.className = 'fas fa-pause';
            }).catch(() => {
                musicToggle.classList.add('muted');
                musicToggle.classList.remove('playing');
                playPauseIcon.className = 'fas fa-play';
            });
        }

        musicToggle.classList.add('visible');
        triggerFadeIns();
    });

    // ============================================
    // MUSIC TOGGLE (Volume Icon — Mute/Unmute)
    // ============================================
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('muted');
                musicToggle.querySelector('i').className = 'fas fa-volume-up';
                playPauseIcon.className = 'fas fa-pause';
            }).catch(() => { });
            return;
        }

        bgMusic.muted = !bgMusic.muted;

        if (bgMusic.muted) {
            musicToggle.classList.add('muted');
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('i').className = 'fas fa-volume-mute';
        } else {
            musicToggle.classList.remove('muted');
            musicToggle.classList.add('playing');
            musicToggle.querySelector('i').className = 'fas fa-volume-up';
        }
    });

    // ============================================
    // MUSIC PLAYER CONTROLS
    // ============================================

    // Play / Pause Button
    playPauseBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                playPauseIcon.className = 'fas fa-pause';
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('muted');
                musicToggle.querySelector('i').className = 'fas fa-volume-up';
            }).catch(() => { });
        } else {
            bgMusic.pause();
            playPauseIcon.className = 'fas fa-play';
            musicToggle.classList.remove('playing');
        }
    });

    // Update progress bar and time
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration) {
            const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = percent + '%';
            timeCurrent.textContent = formatTime(bgMusic.currentTime);
        }
    });

    // Set total time when metadata loads
    bgMusic.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(bgMusic.duration);
    });

    // Click on progress bar to seek
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            // RTL layout: right side is start
            const clickX = rect.right - e.clientX;
            const percent = clickX / rect.width;
            bgMusic.currentTime = percent * bgMusic.duration;
        });
    }

    // Format seconds to m:ss
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // ============================================
    // FADE-IN ANIMATION ENGINE
    // ============================================
    function triggerFadeIns() {
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 150 + (index * 120));
        });
    }

});