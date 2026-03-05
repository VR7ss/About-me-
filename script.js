// عناصر الصفحة
const splash = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const enterBtn = document.getElementById('enter-btn');
const viewerSpan = document.getElementById('viewer-count');
const audio = document.getElementById('my-audio');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');

// 1. تفعيل زر الدخول
enterBtn.addEventListener('click', () => {
    splash.style.display = 'none';
    mainContent.style.display = 'block';
    updateViewerCount();
});

// 2. عدّاد المشاهدات
function updateViewerCount() {
    let count = localStorage.getItem('viewerCount') || 0;
    count = Number(count) + 1;
    localStorage.setItem('viewerCount', count);
    viewerSpan.textContent = count;
}

// 3. دوال مشغل الصوت
function playAudio() {
    audio.play().catch(error => {
        console.log("تعذر تشغيل الصوت:", error);
        alert("لم نتمكن من تشغيل الصوت. يرجى التأكد من أن الرابط لملف صوتي صالح.");
    });
}

function pauseAudio() {
    audio.pause();
}

// 4. تحديث وقت الصوت (اختياري - إذا أردت الوقت الحقيقي)
audio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audio.duration);
    durationSpan.textContent = duration;
});

audio.addEventListener('timeupdate', () => {
    const current = formatTime(audio.currentTime);
    currentTimeSpan.textContent = current;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// تعيين القيم الافتراضية للوقت (كما في الصورة)
currentTimeSpan.textContent = '0:01';
durationSpan.textContent = '2:44';
