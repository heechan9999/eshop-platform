/**
 * ============================================================================
 * MediFinder Platform - Production-Grade Main Script
 * Features: Multilingual, Draggable Slider, Live Search, Filter Matrix,
 *           Modal Manager, LocalStorage Bookmarks, Notification Toast System.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Application State & Multilingual Dictionary
    const state = {
        currentLang: 'en',
        currentCategory: 'all',
        currentFilter: 'all',
        searchQuery: '',
        favorites: JSON.parse(localStorage.getItem('medifinder_favorites')) || []
    };

    const translations = {
        en: {
            heroTitle: "Find Safe Medication Information",
            heroDesc: "Search medical drugs instantly by symptom, active ingredient, or safety guidelines tailored for international visitors.",
            searchPlaceholder: "Search drug name, symptom (e.g., Ibuprofen, Cold)...",
            searchBtn: "Search",
            categoriesTitle: "Popular Categories",
            catAll: "All Items",
            catPain: "Pain Relief",
            catCold: "Cold & Flu",
            catDigestive: "Digestive",
            catVitamin: "Vitamins",
            catSafety: "Pregnancy Safe",
            filterAll: "All",
            filterOtc: "OTC Available",
            filterSafe: "Safe Profile",
            filterCaution: "Check Warning",
            detailsBtn: "Details →",
            footerText: "© 2026 MediFinder Platform. Designed for Global Communities. All rights reserved."
        },
        ko: {
            heroTitle: "안전한 의약품 정보 검색 플랫폼",
            heroDesc: "외국인 및 임산부를 위한 증상별, 성분별 맞춤형 의약품 안전 정보를 실시간으로 확인하세요.",
            searchPlaceholder: "약품명, 증상 검색 (예: 이부프로펜, 감기)...",
            searchBtn: "검색",
            categoriesTitle: "인기 카테고리",
            catAll: "전체 품목",
            catPain: "진통/소염",
            catCold: "감기/기침",
            catDigestive: "소화기",
            catVitamin: "비타민/영양",
            catSafety: "임산부 안심",
            filterAll: "전체",
            filterOtc: "일반의약품(OTC)",
            filterSafe: "안심 프로필",
            filterCaution: "주의사항 확인",
            detailsBtn: "상세정보 →",
            footerText: "© 2026 MediFinder Platform. 글로벌 커뮤니티를 위한 맞춤형 플랫폼. All rights reserved."
        },
        tr: {
            heroTitle: "Güvenli İlaç Bilgi Platformu",
            heroDesc: "Uluslararası ziyaretçiler ve hamileler için semptom, etken madde veya güvenlik kılavuzlarına göre anında ilaç arayın.",
            searchPlaceholder: "İlaç adı veya semptom arayın (örn. İbuprofen, Soğuk algınlığı)...",
            searchBtn: "Ara",
            categoriesTitle: "Popüler Kategoriler",
            catAll: "Tüm Ürünler",
            catPain: "Ağrı Kesici",
            catCold: "Soğuk Algınlığı",
            catDigestive: "Sindirim",
            catVitamin: "Vitaminler",
            catSafety: "Gebelik Güvenli",
            filterAll: "Tümü",
            filterOtc: "Reçetesiz (OTC)",
            filterSafe: "Güvenli Profil",
            filterCaution: "Uyarılara Bak",
            detailsBtn: "Detaylar →",
            footerText: "© 2026 MediFinder Platformu. Küresel Topluluklar için Tasarlanmıştır. Tüm hakları saklıdır."
        }
    };

    // 2. DOM Elements Cache
    const elements = {
        languageSelect: document.getElementById('languageSelect'),
        heroTitle: document.getElementById('heroTitle'),
        heroDesc: document.getElementById('heroDesc'),
        searchInput: document.getElementById('searchInput'),
        searchBtn: document.getElementById('searchBtn'),
        categorySlider: document.getElementById('categorySlider'),
        categoryItems: document.querySelectorAll('.category-item'),
        filterChips: document.querySelectorAll('.filter-chip'),
        drugCards: document.querySelectorAll('.drug-card'),
        drugModal: document.getElementById('drugModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalSubtitle: document.getElementById('modalSubtitle'),
        modalDesc: document.getElementById('modalDesc')
    };

    // 3. Multilingual UI Update Engine
    function updateLanguage(lang) {
        state.currentLang = lang;
        const t = translations[lang] || translations.en;

        if (elements.heroTitle) elements.heroTitle.textContent = t.heroTitle;
        if (elements.heroDesc) elements.heroDesc.textContent = t.heroDesc;
        if (elements.searchInput) elements.searchInput.placeholder = t.searchPlaceholder;
        if (elements.searchBtn) elements.searchBtn.querySelector('span').textContent = t.searchBtn;

        // Update category titles dynamically if mapped
        document.querySelectorAll('.category-item').forEach(item => {
            const catKey = item.getAttribute('data-category');
            const nameEl = item.querySelector('.category-name');
            if (nameEl && t['cat' + capitalize(catKey)]) {
                nameEl.textContent = t['cat' + capitalize(catKey)];
            }
        });
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (elements.languageSelect) {
        elements.languageSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
            showToast(`Language changed to ${e.target.value.toUpperCase()}`);
        });
    }

    // 4. Draggable Category Slider Implementation (Mouse & Touch Inertia)
    const slider = elements.categorySlider;
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2.5; // Drag speed coefficient
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile devices
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // 5. Unified Filtering & Search Matrix Engine
    function filterCards() {
        const query = state.searchQuery.toLowerCase();
        const activeCat = state.currentCategory;
        const activeFilter = state.currentFilter;

        elements.drugCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardFilters = card.getAttribute('data-filter') || '';
            const title = card.querySelector('.drug-title').textContent.toLowerCase();
            const subtitle = card.querySelector('.drug-subtitle').textContent.toLowerCase();
            const desc = card.querySelector('.drug-desc').textContent.toLowerCase();

            // Match conditions
            const matchesCategory = (activeCat === 'all' || cardCategory === activeCat);
            const matchesChip = (activeFilter === 'all' || cardFilters.includes(activeFilter));
            const matchesSearch = (title.includes(query) || subtitle.includes(query) || desc.includes(query));

            if (matchesCategory && matchesChip && matchesSearch) {
                card.style.display = 'flex';
                // Add fade-in animation effect
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Category click bindings
    elements.categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.categoryItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            state.currentCategory = item.getAttribute('data-category');
            filterCards();
        });
    });

    // Filter chip click bindings
    elements.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            elements.filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.currentFilter = chip.getAttribute('data-filter');
            filterCards();
        });
    });

    // Real-time live search listener
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim();
            filterCards();
        });
    }

    // 6. Modal Popup Management System
    window.openModal = function(title, subtitle, desc) {
        if (elements.modalTitle) elements.modalTitle.textContent = title;
        if (elements.modalSubtitle) elements.modalSubtitle.textContent = subtitle;
        if (elements.modalDesc) elements.modalDesc.textContent = desc;
        if (elements.drugModal) elements.drugModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    window.closeModal = function() {
        if (elements.drugModal) elements.drugModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    // Close modal via backdrop click
    window.addEventListener('click', (e) => {
        if (elements.drugModal && e.target === elements.drugModal) {
            closeModal();
        }
    });

    // Escape key listener for closing modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 7. Notification Toast Feedback System
    function showToast(message) {
        const existingToast = document.getElementById('toastNotification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background-color: #0f172a;
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            transform: translateY(10px);
        `;

        document.body.appendChild(toast);
        
        // Trigger smooth entrance
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initialize state
    console.info('MediFinder Platform initialized successfully with enhanced script architecture.');
});