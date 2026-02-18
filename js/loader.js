// Global Loader & Offline Status Manager
(function () {
    // 1. Create HTML Structure on execution
    const loaderHTML = `
    <div class="loader-overlay" id="global-loader">
        <div class="loader">
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__ball"></div>
        </div>
        <div class="offline-message" id="offline-msg">
            <span style="display:block; margin-bottom:5px; color:#6366f1; font-weight:bold;">CONNECTION LOST</span>
            You are currently offline
        </div>
    </div>`;

    // 2. Inject into Body
    function injectLoader() {
        if (document.getElementById('global-loader')) return;
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);

        const loader = document.getElementById('global-loader');
        const offlineMsg = document.getElementById('offline-msg');

        // Initial state: hidden offline message
        if (offlineMsg) offlineMsg.style.opacity = '0';

        // Check initialization state
        if (document.readyState === 'complete') {
            hideLoader(loader);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (navigator.onLine) hideLoader(loader);
                }, 800); // Minimum view time
            });
        }

        // Setup Network Listeners
        window.addEventListener('offline', () => {
            showOffline(loader, offlineMsg);
        });

        window.addEventListener('online', () => {
            hideOffline(loader, offlineMsg);
        });
    }

    function hideLoader(loader) {
        if (!navigator.onLine) return; // Don't hide if offline
        loader.classList.add('hidden');
    }

    function showOffline(loader, msg) {
        loader.classList.remove('hidden');
        loader.classList.add('offline');
        if (msg) msg.style.opacity = '1';
    }

    function hideOffline(loader, msg) {
        loader.classList.remove('offline');
        if (msg) msg.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }

    // Run immediately if DOM is ready, otherwise wait
    if (document.body) {
        injectLoader();
    } else {
        document.addEventListener('DOMContentLoaded', injectLoader);
    }
})();
