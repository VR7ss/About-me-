// عناصر الصفحة
const splash = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const enterBtn = document.getElementById('enter-btn');
const audio = document.getElementById('my-audio');

// إخفاء شاشة الدخول وإظهار المحتوى عند النقر
enterBtn.addEventListener('click', () => {
    splash.style.display = 'none';
    mainContent.style.display = 'flex'; // flex لأنه في CSS المحتوى main-content يستخدم flex
    
    // زيادة عدد المشاهدات (اختياري)
    updateViews();
});

// دوال تشغيل الموسيقى
function playAudio() {
    audio.play().catch(e => console.log("صوت ما شغل", e));
}

function pauseAudio() {
    audio.pause();
}

// عداد المشاهدات (يحفظ العدد)
function updateViews() {
    const viewsElement = document.querySelector('.views');
    let views = localStorage.getItem('vr7_views') || 893;
    views = Number(views) + 1;
    localStorage.setItem('vr7_views', views);
    viewsElement.textContent = views;
}

// تعيين الوقت (نفس الموقع الأصلي)
window.onload = function() {
    // الوقت ثابت زي الموقع الأصلي
    console.log('موقع VR7 جاهز');
}
