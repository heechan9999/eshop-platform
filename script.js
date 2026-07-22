const translations = {
    tr: {
        nav_home: "Ana Sayfa", nav_guide: "Bilgi Rehberi", nav_support: "Destek", nav_subscribe: "Abone Ol",
        hero_title: "Sağlık ürünleri hakkında güvenilir bilgiye <span class='red-text'>kolay erişim</span>",
        hero_desc: "Ürün içerikleri, kullanım detayları ve merak ettiklerinize hızlıca ulaşın.",
        search_btn: "Ara", popular: "Popüler aramalar:",
        card1_title: "Bilgi Rehberi", card1_desc: "Ürün içerikleri, kullanım alanları ve detaylı bilgiler.",
        card2_title: "Uzman Desteği", card2_desc: "Uzman ekibimize sorularınızı iletebilir, destek alabilirsiniz.",
        card3_title: "Favorilerim", card3_desc: "Önemli gördüğünüz içerikleri kaydedin, kolayca ulaşın.",
        card4_title: "Abone Ol", card4_desc: "Güncel içeriklerden ve yeni rehberlerden haberdar olun.",
        news_title: "Güncel içerikler ve yeni rehberlerden haberdar olmak için abone olun!",
        news_desc: "Sadece önemli bilgiler, spam yok.", sub_btn: "Abone Ol"
    },
    en: {
        nav_home: "Home", nav_guide: "Guide", nav_support: "Support", nav_subscribe: "Subscribe",
        hero_title: "Easy access to <span class='red-text'>reliable information</span> about health products",
        hero_desc: "Reach product ingredients, usage details, and curiosities quickly.",
        search_btn: "Search", popular: "Popular searches:",
        card1_title: "Guide", card1_desc: "Product ingredients and detailed info.",
        card2_title: "Expert Support", card2_desc: "Ask our expert team for support.",
        card3_title: "My Favorites", card3_desc: "Save important content easily.",
        card4_title: "Subscribe", card4_desc: "Stay updated with latest content.",
        news_title: "Subscribe to stay updated!",
        news_desc: "Important info only, no spam.", sub_btn: "Subscribe"
    },
    ko: {
        nav_home: "홈", nav_guide: "정보 가이드", nav_support: "고객 지원", nav_subscribe: "구독하기",
        hero_title: "건강 제품에 대한 신뢰할 수 있는 정보에 <span class='red-text'>쉽게 접근</span>",
        hero_desc: "제품 성분, 사용법 및 궁금한 점을 빠르게 확인하세요.",
        search_btn: "검색", popular: "인기 검색어:",
        card1_title: "정보 가이드", card1_desc: "제품 성분 및 상세 정보 제공.",
        card2_title: "전문가 지원", card2_desc: "전문가 팀에게 직접 문의하세요.",
        card3_title: "즐겨찾기", card3_desc: "중요한 내용을 쉽게 저장하세요.",
        card4_title: "구독하기", card4_desc: "최신 콘텐츠를 받아보세요.",
        news_title: "최신 정보를 받아보려면 구독하세요!",
        news_desc: "중요한 정보만 보내드립니다, 스팸 없어요.", sub_btn: "구독하기"
    }
};

function changeLanguage() {
    const lang = document.getElementById("language-selector").value;
    const elements = document.querySelectorAll("[data-lang]");
    
    elements.forEach(el => {
        const key = el.getAttribute("data-lang");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}