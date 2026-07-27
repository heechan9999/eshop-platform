/**
 * Eshop - Sağlık Bilgi Platformu (JavaScript Engine)
 * - Multi-language System (i18n) with LocalStorage & Auto Browser Detection
 * - Real-time Search & Tag Autofill
 * - Interactive UI (Mobile Nav, Active States, Smooth Transitions)
 * - Newsletter Subscription Form Validation & Toast Notification
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. 다국어 번역 데이터 사전 (i18n Dictionary)
    // -------------------------------------------------------------
    const translations = {
        tr: {
            // Header / Nav
            nav_home: "Ana Sayfa",
            nav_guide: "Bilgi Rehberi",
            nav_support: "Destek",
            nav_subscribe: "Abone Ol",

            // Hero Section
            hero_title: "Sağlık ürünleri hakkında güvenilir bilgiye <span class='red-text'>kolay erişim</span>",
            hero_desc: "Ürün içerikleri, kullanım detayları ve merak ettiklerinize hızlıca ulaşın.",
            search_placeholder: "Ürün adı, içerik, kategori veya konu ara...",
            search_btn: "Ara",
            popular: "Popüler aramalar:",

            // Main Cards
            card1_title: "Bilgi Rehberi",
            card1_desc: "Ürün içerikleri, kullanım alanları ve detaylı bilgiler.",
            card2_title: "Uzman Desteği",
            card2_desc: "Uzman ekibimize sorularınızı iletebilir, destek alabilirsiniz.",
            card3_title: "Favorilerim",
            card3_desc: "Önemli gördüğünüz içerikleri kaydedin, kolayca ulaşın.",
            card4_title: "Abone Ol",
            card4_desc: "Güncel içeriklerden ve yeni rehberlerden haberdar olun.",

            // Newsletter
            news_title: "Güncel içerikler ve yeni rehberlerden haberdar olmak için abone olun!",
            news_desc: "Sadece önemli bilgiler, spam yok.",
            email_placeholder: "E-posta adresiniz",
            sub_btn: "Abone Ol",
            sub_success: "Tebrikler! Bültenimize başarıyla abone oldunuz.",
            sub_error: "Lütfen geçerli bir e-posta adresi giriniz.",

            // Trust Features (Bottom)
            b1_title: "Tarafsız Bilgi",
            b1_desc: "Tüm içerikler bağımsız olarak hazırlanır ve düzenlenir.",
            b2_title: "Güvenilir Kaynak",
            b2_desc: "Bilgiler, bilimsel kaynaklar ve resmi verilerden derlenir.",
            b3_title: "Gizlilik Koruması",
            b3_desc: "Kişisel verileriniz güvenli bir şekilde korunur.",
            b4_title: "Kullanıcı Odaklı",
            b4_desc: "İhtiyaçlarınıza uygun, anlaşılır ve hızlı erişim.",

            // Footer
            footer_rights: "© 2026 Eshop Bilgi Platformu. Tüm hakları saklıdır.",
            f_about: "Hakkımızda",
            f_terms: "Kullanım Koşulları",
            f_privacy: "Gizlilik Politikası",
            f_contact: "İletişim",

            // Mobile Nav
            m_home: "Ana Sayfa",
            m_search: "Ara",
            m_support: "Destek",
            m_subscribe: "Abone Ol",
            m_profile: "Profil"
        },
        en: {
            // Header / Nav
            nav_home: "Home",
            nav_guide: "Guide",
            nav_support: "Support",
            nav_subscribe: "Subscribe",

            // Hero Section
            hero_title: "Easy access to <span class='red-text'>reliable information</span> about health products",
            hero_desc: "Reach product ingredients, usage details, and curiosities quickly.",
            search_placeholder: "Search product name, ingredient, category or topic...",
            search_btn: "Search",
            popular: "Popular searches:",

            // Main Cards
            card1_title: "Guide",
            card1_desc: "Product ingredients, usage areas and detailed info.",
            card2_title: "Expert Support",
            card2_desc: "Ask our expert team your questions and get support.",
            card3_title: "My Favorites",
            card3_desc: "Save content you find important and access it easily.",
            card4_title: "Subscribe",
            card4_desc: "Stay updated with current content and new guides.",

            // Newsletter
            news_title: "Subscribe to stay updated with latest content and guides!",
            news_desc: "Important info only, no spam.",
            email_placeholder: "Your email address",
            sub_btn: "Subscribe",
            sub_success: "Congratulations! You have successfully subscribed.",
            sub_error: "Please enter a valid email address.",

            // Trust Features (Bottom)
            b1_title: "Unbiased Info",
            b1_desc: "All content is prepared and edited independently.",
            b2_title: "Reliable Source",
            b2_desc: "Information is compiled from scientific & official sources.",
            b3_title: "Privacy Protection",
            b3_desc: "Your personal data is securely protected.",
            b4_title: "User-Centered",
            b4_desc: "Clear, fast and tailored access to your needs.",

            // Footer
            footer_rights: "© 2026 Eshop Info Platform. All rights reserved.",
            f_about: "About Us",
            f_terms: "Terms of Use",
            f_privacy: "Privacy Policy",
            f_contact: "Contact",

            // Mobile Nav
            m_home: "Home",
            m_search: "Search",
            m_support: "Support",
            m_subscribe: "Subscribe",
            m_profile: "Profile"
        },
        ko: {
            // Header / Nav
            nav_home: "홈",
            nav_guide: "정보 가이드",
            nav_support: "고객 지원",
            nav_subscribe: "구독하기",

            // Hero Section
            hero_title: "건강 제품에 대한 신뢰할 수 있는 정보에 <span class='red-text'>쉽게 접근</span>",
            hero_desc: "제품 성분, 사용법 및 궁금한 점을 빠르게 확인하세요.",
            search_placeholder: "제품명, 성분, 카테고리 또는 주제 검색...",
            search_btn: "검색",
            popular: "인기 검색어:",

            // Main Cards
            card1_title: "정보 가이드",
            card1_desc: "제품 성분, 사용 분야 및 상세 정보를 확인하세요.",
            card2_title: "전문가 지원",
            card2_desc: "전문가 팀에게 직접 문의하고 지원을 받으세요.",
            card3_title: "즐겨찾기",
            card3_desc: "중요한 내용을 저장하고 쉽게 찾아보세요.",
            card4_title: "구독하기",
            card4_desc: "최신 콘텐츠와 새로운 가이드 소식을 받아보세요.",

            // Newsletter
            news_title: "최신 콘텐츠와 가이드 소식을 받아보려면 구독하세요!",
            news_desc: "중요한 정보만 보내드립니다. 스팸은 없어요.",
            email_placeholder: "이메일 주소 입력",
            sub_btn: "구독하기",
            sub_success: "축하합니다! 뉴스레터 구독이 완료되었습니다.",
            sub_error: "올바른 이메일 주소를 입력해 주세요.",

            // Trust Features (Bottom)
            b1_title: "중립적인 정보",
            b1_desc: "모든 콘텐츠는 독립적이고 객관적으로 작성됩니다.",
            b2_title: "신뢰할 수 있는 출처",
            b2_desc: "과학적 출처와 공식 데이터를 기반으로 수집됩니다.",
            b3_title: "개인정보 보호",
            b3_desc: "귀하의 개인정보는 안전하게 보호됩니다.",
            b4_title: "사용자 중심",
            b4_desc: "필요에 맞는 명확하고 신속한 정보 접근성.",

            // Footer
            footer_rights: "© 2026 Eshop 정보 플랫폼. All rights reserved.",
            f_about: "회사 소개",
            f_terms: "이용 약관",
            f_privacy: "개인정보 처리방침",
            f_contact: "문의하기",

            // Mobile Nav
            m_home: "홈",
            m_search: "검색",
            m_support: "지원",
            m_subscribe: "구독",
            m_profile: "프로필"
        }
    };

    // -------------------------------------------------------------
    // 2. 언어 전환 핵심 엔진 (Language Switcher Engine)
    // -------------------------------------------------------------
    function getInitialLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('ko')) return 'ko';
        if (userLang.startsWith('en')) return 'en';
        return 'tr'; // 기본 터키어
    }

    let currentLang = localStorage.getItem('eshop_lang') || getInitialLanguage();

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('eshop_lang', lang);

        // 1) 텍스트 노드 업데이트 (data-lang 속성 대상)
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // 2) Input Placeholder 업데이트 (data-lang-placeholder 속성 대상)
        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // 3) 검색창 & 이메일 기본 Placeholder 대응
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) searchInput.placeholder = translations[lang].search_placeholder;

        const emailInput = document.querySelector('.sub-form input, .newsletter-form input');
        if (emailInput) emailInput.placeholder = translations[lang].email_placeholder;

        // 4) Select 박스 선택값 맞춤
        const langSelector = document.getElementById('language-selector');
        if (langSelector) langSelector.value = lang;

        // 5) HTML lang 속성 교체
        document.documentElement.lang = lang;
    }

    // 전역 함수로 등록 (HTML select태그의 onchange에서 호출 가능)
    window.changeLanguage = function() {
        const langSelector = document.getElementById('language-selector');
        if (langSelector) setLanguage(langSelector.value);
    };

    // 최초 실행시 저장된 언어/기본 언어 적용
    setLanguage(currentLang);

    // -------------------------------------------------------------
    // 3. 검색창 인터랙션 (Search Engine)
    // -------------------------------------------------------------
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    const tags = document.querySelectorAll('.popular-searches .tag, .tags span');

    function executeSearch() {
        if (!searchInput) return;
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `guide.html?q=${encodeURIComponent(query)}`;
        } else {
            searchInput.focus();
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', executeSearch);

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeSearch();
        });
    }

    // 연관 태그 클릭 시 검색창에 자동으로 글자 입력
    tags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = tag.innerText.trim();
                searchInput.focus();
            }
        });
    });

    // -------------------------------------------------------------
    // 4. 뉴스레터 구독 유효성 검사 및 토스트(Toast) 팝업
    // -------------------------------------------------------------
    const subForms = document.querySelectorAll('.sub-form, .newsletter-form');

    subForms.forEach(form => {
        form.addEventListener('submit', handleSubscribe);
        const btn = form.querySelector('button');
        if (btn) btn.addEventListener('click', handleSubscribe);
    });

    function handleSubscribe(e) {
        e.preventDefault();
        const form = e.target.closest('form') || e.target.closest('.sub-form') || e.target.closest('.newsletter-form');
        if (!form) return;

        const input = form.querySelector('input[type="email"]');
        if (!input) return;

        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            showToast(translations[currentLang].sub_success, 'success');
            input.value = '';
        } else {
            showToast(translations[currentLang].sub_error, 'error');
            input.focus();
        }
    }

    // 커스텀 토스트 메시지 생성기
    function showToast(message, type = 'info') {
        let toast = document.getElementById('eshop-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'eshop-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 85px;
                right: 25px;
                padding: 14px 24px;
                background: #0a2540;
                color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.25);
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            `;
            document.body.appendChild(toast);
        }

        toast.style.background = type === 'error' ? '#d32f2f' : '#0a2540';
        toast.innerText = message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 3200);
    }

    // -------------------------------------------------------------
    // 5. 모바일 하단 내비게이션 활성화 스위처
    // -------------------------------------------------------------
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});