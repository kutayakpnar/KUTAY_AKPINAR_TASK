(() => {
    // storage keys for products and favorites
    const STORAGE_KEYS = {
        PRODUCTS: 'eb_products',
        FAVORITES: 'eb_favorites'
    };

    console.log('starting up...');

    function init() {
        console.log('checking page...');
        if (!isHomePage()) {
            console.log("wrong page");
            return;
        }
        console.log('looks good, proceeding');
        makeHTML();
        addStyles();
        addListeners();
        getData();
        console.log('done setting up carousel');
    }

    // check if we're on the right page
    function isHomePage() {
        console.log('hostname:', window.location.hostname);
        console.log('path:', window.location.pathname);
        
        const isEbebek = window.location.hostname === "www.e-bebek.com";
        const isLocal = window.location.hostname.includes("127.0.0.1") || window.location.hostname.includes("localhost");
        
        if (isEbebek) {
            return (window.location.pathname === "/" || window.location.pathname === "/anasayfa");
        } else if (isLocal) {
            return (window.location.pathname === "/" || window.location.pathname === "/index.html");
        }
        
        console.log('unknown host');
        return false;
    }

    // render the main HTML structure
    function makeHTML() {
        console.log('building html...');
        
        const html = `
            <div class="banner">
                <div class="eb-carousel-header">
                    <div class="banner__titles">
                        <h2 class="title-primary">Sizin İçin Seçtiklerimiz</h2>
                    </div>
                </div>
                <div class="container">
                    <div class="eb-carousel-track"></div>
                </div>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', html);
        console.log('html done');

        // add navigation arrows
        const carouselContainer = document.querySelector('.banner');
        console.log('adding arrows...');
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow prev';
        prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow next';
        nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';

        carouselContainer.appendChild(prevBtn);
        carouselContainer.appendChild(nextBtn);
        console.log('arrows added');
    }

    // add all the styling
    function addStyles() {
        console.log('adding css...');
        
        const css = `
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

            .banner {
                box-sizing: border-box;
                color: rgb(33, 39, 56);
                display: block;
                font-family: 'Quicksand', sans-serif;
                font-size: 11px;
                font-weight: 400;
                height: 682.234px;
                line-height: 17.6px;
                text-align: start;
                text-size-adjust: 100%;
                unicode-bidi: isolate;
                width: 1320px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                margin: 0 auto;
                position: relative;
                overflow: hidden;
            }

            .eb-carousel-header {
                box-sizing: border-box;
                color: rgb(33, 39, 56);
                display: inline;
                font-family: 'Quicksand', sans-serif;
                font-size: 11px;
                font-weight: 500;
                height: auto;
                line-height: 17.6px;
                text-align: start;
                text-size-adjust: 100%;
                width: auto;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .banner__titles {
                align-items: center;
                background-color: rgb(254, 246, 235);
                border-top-left-radius: 35px;
                border-top-right-radius: 35px;
                box-sizing: border-box;
                color: rgb(33, 39, 56);
                display: flex;
                font-family: 'Quicksand', sans-serif;
                font-size: 11px;
                font-weight: 700;
                height: 83.9531px;
                justify-content: space-between;
                line-height: 17.6px;
                padding-bottom: 25px;
                padding-left: 67px;
                padding-right: 67px;
                padding-top: 25px;
                text-align: start;
                text-size-adjust: 100%;
                unicode-bidi: isolate;
                width: 1290px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                margin-bottom: 40px;
            }

            .title-primary {
                box-sizing: border-box;
                color: rgb(242, 142, 0);
                display: block;
                font-family: 'Quicksand', sans-serif;
                font-size: 30.6px;
                font-weight: 700;
                height: 33.9531px;
                line-height: 33.966px;
                margin-block-end: 0px;
                margin-block-start: 0px;
                margin-bottom: 0px;
                margin-inline-end: 0px;
                margin-inline-start: 0px;
                margin-left: 0px;
                margin-right: 0px;
                margin-top: 0px;
                text-align: start;
                text-size-adjust: 100%;
                unicode-bidi: isolate;
                width: auto;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .container {
                width: 100%;
                padding: 0;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
            }
            
            .eb-carousel-track {
                display: flex;
                gap: 20px;
                overflow: hidden;
                scroll-behavior: smooth;
                padding: 0;
                margin: 0;
                width: 100%;
            }
            
            .product-card {
                width: 242px;
                min-width: 242px;
                height: 480px;
                background: #fff;
                border-radius: 12px;
                padding: 16px;
                position: relative;
                display: flex;
                flex-direction: column;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: border-color 0.2s ease;
                border: 2px solid transparent;
                box-sizing: border-box;
            }
            
            .product-card:hover {
                border-color: rgb(242, 142, 0);
            }

            .product-image-container {
                position: relative;
                width: 100%;
                height: 240px;
                margin-bottom: 12px;
            }

            .product-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .badge-container {
                position: absolute;
                top: 8px;
                left: 8px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                z-index: 1;
            }

            .badge {
                background: #FF6B35;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .badge.star-product {
                background: #FFB800;
            }

            .badge.cok-satan {
                background: #FF6B35;
                color: white;
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: 'Poppins', sans-serif;
            }

            .badge.yildiz-urun {
                background: #FFB800;
                color: white;
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: 'Poppins', sans-serif;
            }

            .favorite-btn {
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
                box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 4px 0px;
                box-sizing: border-box;
                color: rgb(0, 123, 255);
                cursor: pointer;
                display: block;
                font-family: 'Poppins', sans-serif;
                font-size: 12px;
                font-weight: 400;
                height: 50px;
                line-height: 19.2px;
                position: absolute;
                right: 15px;
                text-align: start;
                text-size-adjust: 100%;
                top: 10px;
                unicode-bidi: isolate;
                user-select: none;
                width: 50px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                border: none;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .favorite-btn .heart-icon {
                width: 24px;
                height: 24px;
            }

            .favorite-btn.active .heart-icon {
                color: rgb(242, 142, 0);
            }

            .media-badges {
                position: absolute;
                bottom: -4px;
                left: 0;
                display: flex;
                gap: 4px;
                z-index: 1;
            }

            .media-badge {
                background: rgba(0,0,0,0.6);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 11px;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .product-brand {
                display: none; /* Brand'i gizliyoruz çünkü title içinde göstereceğiz */
            }

            .product-title {
                margin-bottom: 8px;
                height: 36px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-word;
            }

            .product-title .brand,
            .product-title .description {
                box-sizing: border-box;
                color: rgb(125, 125, 125);
                cursor: pointer;
                display: inline;
                font-family: 'Poppins', sans-serif;
                font-size: 12.24px;
                height: auto;
                line-height: 14.96px;
                text-align: start;
                text-size-adjust: 100%;
                user-select: none;
                width: auto;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .product-title .brand {
                font-weight: 700;
            }

            .product-title .description {
                font-weight: 500;
            }

            .rating-container {
                display: flex;
                align-items: center;
                gap: 4px;
                margin-bottom: 8px;
            }

            .stars {
                display: flex;
                gap: 1px;
            }

            .star {
                color: #FFD700;
                font-size: 14px;
            }

            .rating-count {
                color: #666;
                font-size: 12px;
            }

            .price-container {
                margin-top: 4px;
                margin-bottom: 8px;
            }

            .price-row {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;
            }

            .original-price {
                text-decoration: line-through;
                font-weight: 500;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                color: rgb(125, 125, 125);
            }

            .discount-badge {
                color: rgb(67, 176, 42);
                font-weight: 700;
                font-family: 'Poppins', sans-serif;
                font-size: 12px;
            }

            .current-price {
                box-sizing: border-box;
                color: rgb(125, 125, 125);
                cursor: pointer;
                display: block;
                font-family: 'Poppins', sans-serif;
                font-size: 22.44px;
                font-weight: 600;
                height: 35.8906px;
                line-height: 35.904px;
                text-align: start;
                text-size-adjust: 100%;
                user-select: none;
                width: 196px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .current-price.discounted {
                color: rgb(67, 176, 42);
                font-weight: 700;
            }

            .campaign-badge {
                background: #4BB788;
                color: white;
                font-family: 'Poppins', sans-serif;
                font-size: 11.016px;
                font-weight: 500;
                line-height: 14.96px;
                margin-top: auto;
                margin-bottom: 12px;
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                text-align: center;
                width: fit-content;
            }

            .add-to-cart {
                width: 100%;
                background: rgb(254, 246, 235);
                color: rgb(242, 142, 0);
                border: none;
                border-radius: 8px;
                padding: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
                font-family: 'Poppins', sans-serif;
            }

            .add-to-cart:hover {
                background: rgb(242, 142, 0);
                color: white;
            }

            .carousel-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 48px;
                height: 48px;
                background: rgb(254, 246, 235);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                z-index: 2;
                transition: all 0.2s ease;
            }

            .carousel-arrow.prev {
                left: 15px;
            }

            .carousel-arrow.next {
                right: 15px;
            }

            .carousel-arrow:hover {
                background: white;
            }

            .carousel-arrow svg {
                width: 24px;
                height: 24px;
            }

            .carousel-arrow svg path {
                fill: rgb(242, 142, 0);
            }

            @media (max-width: 1200px) {
                .banner {
                    width: 100%;
                    max-width: 1200px;
                    padding: 0 20px;
                    box-sizing: border-box;
                }

                .banner__titles {
                    width: 100%;
                    padding: 20px 40px;
                }

                .title-primary {
                    font-size: 28px;
                }

                .eb-carousel-track {
                    padding: 0 20px;
                }

                .carousel-arrow {
                    display: none;
                }
            }

            @media (max-width: 768px) {
                .banner {
                    width: 100%;
                    height: auto;
                    padding: 0 16px;
                }

                .banner__titles {
                    padding: 16px 20px;
                    border-radius: 20px 20px 0 0;
                    margin-bottom: 20px;
                }

                .title-primary {
                    font-size: 22px;
                    line-height: 28px;
                    height: auto;
                }

                .container {
                    overflow: hidden;
                }

                .eb-carousel-track {
                    gap: 12px;
                    padding: 0 16px;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .eb-carousel-track::-webkit-scrollbar {
                    display: none;
                }

                .product-card {
                    width: calc((100vw - 44px) / 2);
                    min-width: calc((100vw - 44px) / 2);
                    max-width: 170px;
                    height: 400px;
                    scroll-snap-align: start;
                    flex-shrink: 0;
                }

                .product-image-container {
                    height: 160px;
                }

                .favorite-btn {
                    width: 40px;
                    height: 40px;
                    right: 12px;
                    top: 8px;
                }

                .favorite-btn .heart-icon {
                    width: 20px;
                    height: 20px;
                }

                .badge.cok-satan,
                .badge.yildiz-urun {
                    font-size: 9px;
                    padding: 4px 6px;
                }

                .product-title .brand,
                .product-title .description {
                    font-size: 11px;
                    line-height: 13px;
                }

                .current-price {
                    font-size: 18px;
                    height: auto;
                    line-height: 22px;
                }

                .original-price {
                    font-size: 12px;
                }

                .discount-badge {
                    font-size: 10px;
                }

                .campaign-badge {
                    font-size: 10px;
                    padding: 3px 6px;
                }

                .add-to-cart {
                    font-size: 12px;
                    padding: 8px;
                }

                .carousel-arrow {
                    display: none;
                }
            }

            @media (max-width: 480px) {
                .banner {
                    padding: 0 12px;
                }

                .banner__titles {
                    padding: 12px 16px;
                    margin-bottom: 16px;
                }

                .title-primary {
                    font-size: 18px;
                    line-height: 24px;
                }

                .eb-carousel-track {
                    gap: 10px;
                    padding: 0 12px;
                }

                .product-card {
                    width: calc((100vw - 34px) / 2);
                    min-width: calc((100vw - 34px) / 2);
                    max-width: 160px;
                    height: 380px;
                    padding: 12px;
                }

                .product-image-container {
                    height: 140px;
                    margin-bottom: 8px;
                }

                .product-title {
                    height: 32px;
                    margin-bottom: 6px;
                }

                .product-title .brand,
                .product-title .description {
                    font-size: 10px;
                    line-height: 12px;
                }

                .rating-container {
                    margin-bottom: 6px;
                }

                .star {
                    font-size: 12px;
                }

                .rating-count {
                    font-size: 10px;
                }

                .current-price {
                    font-size: 16px;
                    line-height: 20px;
                }

                .price-container {
                    margin-bottom: 6px;
                }

                .campaign-badge {
                    font-size: 9px;
                    margin-bottom: 8px;
                }
            }

            /* Tablet landscape */
            @media (min-width: 769px) and (max-width: 1024px) {
                .banner {
                    width: 100%;
                    max-width: 1024px;
                    padding: 0 24px;
                }

                .banner__titles {
                    padding: 20px 32px;
                }

                .title-primary {
                    font-size: 26px;
                }

                .product-card {
                    width: 200px;
                    min-width: 200px;
                    height: 420px;
                }

                .product-image-container {
                    height: 180px;
                }

                .eb-carousel-track {
                    gap: 16px;
                    padding: 0 24px;
                }
            }

            /* Large screens */
            @media (min-width: 1400px) {
                .banner {
                    max-width: 1400px;
                }

                .banner__titles {
                    width: 1330px;
                    padding: 25px 80px;
                }

                .title-primary {
                    font-size: 32px;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    };

    // set up click handlers and scrolling stuff
    function addListeners() {
        console.log('setting up events...');
        
        const track = document.querySelector('.eb-carousel-track');
        const prevButton = document.querySelector('.carousel-arrow.prev');
        const nextButton = document.querySelector('.carousel-arrow.next');
        let currentScroll = 0;
        
        console.log('found track:', track);
        console.log('buttons:', prevButton, nextButton);
        
        // calculate card sizes based on screen
        function getCardWidth() {
            const screenWidth = window.innerWidth;
            console.log('screen width:', screenWidth);
            
            if (screenWidth <= 480) {
                // mobile: 2 cards fit
                const calculatedWidth = (screenWidth - 34) / 2;
                console.log('mobile width:', calculatedWidth);
                return calculatedWidth;
            }
            if (screenWidth <= 768) {
                // tablet: also 2 cards
                const calculatedWidth = (screenWidth - 44) / 2;
                console.log('tablet width:', calculatedWidth);
                return calculatedWidth;
            }
            if (screenWidth <= 1024) {
                console.log('small desktop: 200');
                return 200;
            }
            console.log('large desktop: 242');
            return 242;
        }

        function getGap() {
            const screenWidth = window.innerWidth;
            let gap;
            if (screenWidth <= 480) gap = 10;
            else if (screenWidth <= 768) gap = 12;
            else if (screenWidth <= 1024) gap = 16;
            else gap = 20;
            
            console.log('gap:', gap);
            return gap;
        }

        function getCardsPerView() {
            const screenWidth = window.innerWidth;
            let cardsPerView;
            if (screenWidth <= 768) {
                cardsPerView = 2; // mobile: exactly 2 cards
            } else if (screenWidth <= 1024) {
                cardsPerView = 3;
            } else {
                cardsPerView = Math.floor(track.clientWidth / (getCardWidth() + getGap()));
            }
            console.log('cards per view:', cardsPerView);
            return cardsPerView;
        }

        const cardWidth = getCardWidth();
        const gap = getGap();
        const cardsPerView = getCardsPerView();
        const scrollAmount = cardsPerView * (cardWidth + gap);
        
        console.log('final calc - width:', cardWidth, 'gap:', gap, 'scroll:', scrollAmount);

        // show/hide arrows based on scroll position
        function updateArrowVisibility() {
            console.log('updating arrows...');
            
            // hide arrows on mobile/tablet
            if (window.innerWidth <= 1200) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';

                console.log('hiding arrows for mobile');
                return;
            }

            if (track.scrollWidth <= track.clientWidth) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';

                // I check no scrolling needed
                console.log('no scrolling needed');
                return;
            }
            
            const showPrev = currentScroll > 0;
            const showNext = currentScroll < track.scrollWidth - track.clientWidth;
            
            prevButton.style.display = showPrev ? 'flex' : 'none';
            nextButton.style.display = showNext ? 'flex' : 'none';
            
            console.log('arrows - prev:', showPrev, 'next:', showNext);
        }

        prevButton.addEventListener('click', () => {
            const visibleCards = getCardsPerView();
            const maxScroll = track.scrollWidth - (visibleCards * (cardWidth + gap));
            currentScroll = Math.max(0, currentScroll - scrollAmount);
            currentScroll = Math.round(currentScroll / scrollAmount) * scrollAmount;
            track.scrollTo({ left: currentScroll, behavior: 'smooth' });
            updateArrowVisibility();
        });

        nextButton.addEventListener('click', () => {
            const visibleCards = getCardsPerView();
            const maxScroll = track.scrollWidth - (visibleCards * (cardWidth + gap));
            currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
            currentScroll = Math.round(currentScroll / scrollAmount) * scrollAmount;
            track.scrollTo({ left: currentScroll, behavior: 'smooth' });
            updateArrowVisibility();
        });

        track.addEventListener('scroll', () => {
            currentScroll = track.scrollLeft;
            updateArrowVisibility();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            updateArrowVisibility();
        });

        // Enhanced touch scrolling for mobile with snap behavior
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;

        if (window.innerWidth <= 768) {
            // Touch events for mobile
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });

            track.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            track.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                
                const swipeDistance = touchStartX - touchEndX;
                const threshold = 50; // Minimum swipe distance
                
                if (Math.abs(swipeDistance) > threshold) {
                    if (swipeDistance > 0) {
                        // Swipe left - next
                        const visibleCards = getCardsPerView();
                        const maxScroll = track.scrollWidth - track.clientWidth;
                        currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
                    } else {
                        // Swipe right - previous
                        currentScroll = Math.max(0, currentScroll - scrollAmount);
                    }
                    
                    // Snap to nearest card group
                    currentScroll = Math.round(currentScroll / scrollAmount) * scrollAmount;
                    track.scrollTo({ left: currentScroll, behavior: 'smooth' });
                }
            }, { passive: true });

            // Mouse events for desktop testing
            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                touchStartX = e.pageX - track.offsetLeft;
                track.style.cursor = 'grabbing';
                e.preventDefault();
            });

            track.addEventListener('mouseleave', () => {
                isDragging = false;
                track.style.cursor = 'grab';
            });

            track.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                track.style.cursor = 'grab';

                // I check mouseup
                touchEndX = e.pageX - track.offsetLeft;

                // I check swipe distance
                const swipeDistance = touchStartX - touchEndX;
                const threshold = 50;
                
                if (Math.abs(swipeDistance) > threshold) {
                    if (swipeDistance > 0) {
                        const maxScroll = track.scrollWidth - track.clientWidth;
                        currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
                    } else {
                        currentScroll = Math.max(0, currentScroll - scrollAmount);
                    }
                    
                    currentScroll = Math.round(currentScroll / scrollAmount) * scrollAmount;
                    track.scrollTo({ left: currentScroll, behavior: 'smooth' });
                }
            });

            track.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });
        }

        // İlk yüklemede ok görünürlüğünü güncelle
        setTimeout(updateArrowVisibility, 100);
    };

    // load products from API or cache
    async function getData() {
        console.log('loading products...');
        
        // check cache first
        const cachedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        console.log('checking cache...');
        
        if (cachedProducts) {
            console.log('found cached data');
            const products = JSON.parse(cachedProducts);

            // I check cached data
            console.log('cached count:', products.length);

            showProducts(products);
            return;
        }

        // no cache, hit the API
        console.log('no cache, calling API...');
        try {
            const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
            console.log('response status:', response.status);
            
            const products = await response.json();

            // I check products count
            console.log('got products, count:', products.length);
            
            // save to cache for next time    
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

            // I check saved to cache
            console.log('saved to cache');
            
            showProducts(products);
            console.log(products);
        } catch (error) {
            console.error('Ürünler yüklenirken hata oluştu:', error);
            console.log('error:', error.message);
        }
    }

    // get favorites from storage
    function loadFavs() {
        console.log('getting favs...');
        const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const result = favorites ? JSON.parse(favorites) : [];
        console.log('current favs:', result);
        return result;
    }

    // toggle favorite status
    function flipFav(id) {
        console.log('flipping fav for:', id);
        
        const favorites = loadFavs();
        const index = favorites.indexOf(id);
        console.log('current index:', index);
        
        if (index === -1) {
            // add to favorites
            favorites.push(id);
            console.log('added to favs');
        } else {
            // remove from favorites
            favorites.splice(index, 1);
            console.log('removed from favs');
        }
        
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        console.log('updated favs:', favorites);
        return index === -1;
    }

    // render all products to the page
    function showProducts(products) {
        console.log('rendering', products.length, 'products...');
        
        const track = document.querySelector('.eb-carousel-track');
        console.log('track for rendering:', track);
        
        // create cards using for loop instead of forEach
        for (let i = 0; i < products.length; i++) {
            console.log('creating card', i + 1, ':', products[i].name);
            const card = buildCard(products[i]);
            track.appendChild(card);
        }
        
        console.log('done rendering products');
    }

    // render the product card here
    function buildCard(product) {
        console.log('building card for:', product.id, product.name);
        
        let unused = true; // not sure if this matters
        
        // make the whole card clickable
        const link = document.createElement('a');
        link.href = product.url || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        console.log('link setup for:', product.url);

        const card = document.createElement('div');
        card.className = 'product-card';

        console.log('card container done');

        // add badges - "ÇOK SATAN" and "YILDIZ ÜRÜN"
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'badge-container';

        console.log('badge container created');
        
        const bestseller = document.createElement('div');
        bestseller.className = 'badge cok-satan';
        bestseller.textContent = 'ÇOK SATAN';
        badgeContainer.appendChild(bestseller);

        console.log('bestseller badge done');

        const starProduct = document.createElement('div');
        starProduct.className = 'badge yildiz-urun';
        starProduct.textContent = 'YILDIZ ÜRÜN';

        badgeContainer.appendChild(starProduct);

        console.log('star badge done');

        card.appendChild(badgeContainer);

        // heart button for favorites
        console.log('making fav button...');
        const favBtn = document.createElement('button');
        favBtn.className = 'favorite-btn';
        
        const favorites = loadFavs();
        const isFavorite = favorites.includes(product.id);


        console.log('fav status:', isFavorite);
        
        // create heart SVG
        const heartIcon = document.createElement('img');
        heartIcon.className = 'heart-icon';
        heartIcon.alt = 'heart';
        
        // manually setting the SVG data here
        const heartSvg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill="${isFavorite ? 'rgb(242, 142, 0)' : 'none'}" 
                  stroke="${isFavorite ? 'rgb(242, 142, 0)' : 'currentColor'}" 
                  stroke-width="2"/>
            </svg>
        `;
        heartIcon.src = 'data:image/svg+xml,' + encodeURIComponent(heartSvg);
        console.log('heart created with state:', isFavorite);
        
        favBtn.appendChild(heartIcon);
        
        // handle favorite clicks
        favBtn.onclick = (e) => {
            console.log('fav clicked for:', product.id);
            e.preventDefault();

            e.stopPropagation();
            
            const isNowFavorite = flipFav(product.id);
            console.log('new fav state:', isNowFavorite);
            
            // update heart icon
            const newHeartSvg = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill="${isNowFavorite ? 'rgb(242, 142, 0)' : 'none'}" 
                      stroke="${isNowFavorite ? 'rgb(242, 142, 0)' : 'currentColor'}" 
                      stroke-width="2"/>
                </svg>
            `;
            heartIcon.src = 'data:image/svg+xml,' + encodeURIComponent(newHeartSvg);
            favBtn.classList.toggle('active', isNowFavorite);
            // I check heart update
            console.log('heart updated');
        };
        card.appendChild(favBtn);

        // Product image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container';

        const img = document.createElement('img');
        img.className = 'product-image';

        img.src = product.img;
        img.alt = product.name;

        imageContainer.appendChild(img);

        // I need to add video/ar badges
        const mediaBadges = document.createElement('div');
        mediaBadges.className = 'media-badges';
        if (Math.random() > 0.5) {
            const videoBadge = document.createElement('div');
            videoBadge.className = 'media-badge';

            videoBadge.textContent = 'VİDEO';

            mediaBadges.appendChild(videoBadge);
        }
        if (Math.random() > 0.5) {
            const arBadge = document.createElement('div');
            arBadge.className = 'media-badge';


            arBadge.textContent = 'AR';
            mediaBadges.appendChild(arBadge);
        }
        imageContainer.appendChild(mediaBadges);
        card.appendChild(imageContainer);

        //brand element
        const brand = document.createElement('div');
        brand.className = 'product-brand';

        brand.style.display = 'none';
        card.appendChild(brand);

        
        const title = document.createElement('div');

        title.className = 'product-title';
        
        // I combine brand and description
        title.innerHTML = `
            <span class="brand">${product.brand}</span> - 
            <span class="description">${product.name}</span>
        `;

        card.appendChild(title);

        // Yıldızlar ve değerlendirme
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'rating-container';
        
        const stars = document.createElement('div');
        stars.className = 'stars';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');

            star.className = 'star';

            star.textContent = '★';
            stars.appendChild(star);

        }
        ratingContainer.appendChild(stars);

        const ratingCount = document.createElement('span');
        ratingCount.className = 'rating-count';
        ratingCount.textContent = '(328)';

        ratingContainer.appendChild(ratingCount);
        console.log(ratingContainer);   
        
        card.appendChild(ratingContainer);

        // Fiyat container'ı
        const priceContainer = document.createElement('div');
        priceContainer.className = 'price-container';

        if (product.original_price > product.price) {
            const priceRow = document.createElement('div');
            priceRow.className = 'price-row';
            
            const originalPrice = document.createElement('span');
            originalPrice.className = 'original-price';
            originalPrice.textContent = product.original_price.toLocaleString('tr-TR', { 
                style: 'currency', 
                currency: 'TRY',

                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            const discount = Math.round(100 - (product.price / product.original_price * 100));
            const discountBadge = document.createElement('span');
            discountBadge.className = 'discount-badge';
            //I need to add discount badge
            discountBadge.textContent = `%${discount} İndirim`;
            
            priceRow.appendChild(originalPrice);
            priceRow.appendChild(discountBadge);
            
            priceContainer.appendChild(priceRow);
        }

        const currentPrice = document.createElement('div');
        currentPrice.className = 'current-price';
        if (product.original_price > product.price) {
            currentPrice.classList.add('discounted');
        }
        currentPrice.textContent = product.price.toLocaleString('tr-TR', { 
            style: 'currency', 
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        priceContainer.appendChild(currentPrice);

        card.appendChild(priceContainer);

        // Campaign badge
        const campaignBadge = document.createElement('div');
        campaignBadge.className = 'campaign-badge';
        campaignBadge.textContent = product.campaign || '3 Al 2 Öde';
        card.appendChild(campaignBadge);

        // Add to cart button
        const addToCart = document.createElement('button');
        addToCart.className = 'add-to-cart';
        addToCart.textContent = 'Sepete Ekle';

        addToCart.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Sepete ekleme işlemi burada yapılacak
        };
        card.appendChild(addToCart);

        // add click event to the card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.add-to-cart')) {

                window.open(product.url, '_blank');
            }
        });

        // putting it all together
        link.appendChild(card);

        console.log('card done for:', product.name);
        return link;
    }

    // start everything up
    console.log('calling init...');
    init();
    console.log(''); // empty log
    console.log('script done');
})();

