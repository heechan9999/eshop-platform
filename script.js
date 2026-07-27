/**
 * ============================================================================
 * MediFinder & EShop Platform - Production-Grade Enterprise Controller
 * Architecture: Modular, Event-Driven, Performance-Optimized Vanilla JS
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements Caching ---
    const elements = {
        mobileToggle: document.querySelector('.mobile-menu-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        searchInput: document.querySelector('.search-input'),
        searchBtn: document.querySelector('.search-btn'),
        categoryCards: document.querySelectorAll('.category-card'),
        filterChips: document.querySelectorAll('.filter-chip'),
        productCards: document.querySelectorAll('.product-card'),
        detailButtons: document.querySelectorAll('.action-detail-btn'),
        languageSelect: document.querySelector('.language-select'),
        toast: document.getElementById('toastNotification') || createToastElement()
    };

    // --- 2. Mobile Navigation Toggle ---
    if (elements.mobileToggle && elements.navMenu) {
        elements.mobileToggle.addEventListener('click', () => {
            const isOpen = elements.navMenu.style.display === 'flex';
            elements.navMenu.style.display = isOpen ? 'none' : 'flex';
            elements.navMenu.style.flexDirection = 'column';
            elements.navMenu.style.position = 'absolute';
            elements.navMenu.style.top = '100%';
            elements.navMenu.style.left = '0';
            elements.navMenu.style.width = '100%';
            elements.navMenu.style.backgroundColor = 'var(--bg-surface)';
            elements.navMenu.style.padding = '1.5rem';
            elements.navMenu.style.boxShadow = 'var(--shadow-lg)';
            elements.navMenu.style.borderBottom = '1px solid var(--border-light)';
        });
    }

    // --- 3. Dynamic Search System ---
    const performSearch = () => {
        const query = elements.searchInput.value.trim().toLowerCase();
        let matchCount = 0;

        elements.productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const subtitle = card.querySelector('.product-subtitle').textContent.toLowerCase();
            const desc = card.querySelector('.product-desc').textContent.toLowerCase();

            if (title.includes(query) || subtitle.includes(query) || desc.includes(query)) {
                card.style.display = 'flex';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        showToast(`검색 결과: ${matchCount}개의 항목을 찾았습니다.`);
    };

    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', performSearch);
    }

    if (elements.searchInput) {
        elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // --- 4. Category Filtering ---
    elements.categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            elements.categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const categoryName = card.querySelector('.category-name').textContent;
            showToast(`${categoryName} 카테고리를 불러왔습니다.`);
        });
    });

    // --- 5. Filter Chips Interaction ---
    elements.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            elements.filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filterValue = chip.textContent;
            showToast(`필터 적용: ${filterValue}`);
        });
    });

    // --- 6. Modal Popup System ---
    function createModalHTML() {
        if (document.getElementById('dynamicModal')) return;

        const modalHTML = `
            <div class="modal-overlay" id="dynamicModal">
                <div class="modal-container">
                    <button class="modal-close-btn" id="modalCloseBtn">&times;</button>
                    <div id="modalContentBody">
                        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">상세 정보</h2>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">선택하신 항목에 대한 상세 성분, 복용 가이드 및 주의사항 전문입니다.</p>
                        <div style="background-color: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
                            <strong style="display: block; color: var(--primary); margin-bottom: 0.5rem;">💡 핵심 안내 사항</strong>
                            <p style="font-size: 0.9rem; color: var(--text-main);">임산부, 영유아 또는 기저질환자가 복용할 경우 반드시 전문 의사 또는 약사와 상담을 거쳐야 합니다.</p>
                        </div>
                        <button class="search-btn" id="modalActionConfirmBtn" style="width: 100%; border-radius: var(--radius-sm); justify-content: center;">확인 완료</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('dynamicModal');
        const closeBtn = document.getElementById('modalCloseBtn');
        const confirmBtn = document.getElementById('modalActionConfirmBtn');

        const closeModal = () => {
            modal.classList.remove('open');
        };

        closeBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }

    createModalHTML();
    const modalElement = document.getElementById('dynamicModal');

    elements.detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalElement) {
                modalElement.classList.add('open');
            }
        });
    });

    // --- 7. Toast Notification System ---
    function createToastElement() {
        let toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
        return toast;
    }

    function showToast(message) {
        if (!elements.toast) {
            elements.toast = document.getElementById('toastNotification');
        }
        elements.toast.textContent = message;
        elements.toast.classList.add('show');

        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    // --- 8. Language Selector Event ---
    if (elements.languageSelect) {
        elements.languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.options[e.target.selectedIndex].text;
            showToast(`언어가 변경되었습니다: ${selectedLang}`);
        });
    }
});