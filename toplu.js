// toplu.js - HIZLI YÜKLENEN VERSİYON

(function() {
    'use strict';
    
    console.time('🚀 Sistem yükleme süresi');
    
    // DOSYA YOLLARI
    const scripts = {
        buttons: 'sehir-butonlari.js',
        dropdown: 'dropdown-menu.js'
    };
    
    // CSS'yi HEMEN ekle (render blocking'i önle)
    const addGlobalStyles = () => {
        const style = document.createElement('style');
        // SADECE KRİTİK CSS (Above the Fold)
        style.textContent = `
            /* KRİTİK CSS - İlk görünen kısım */
            .sehir-butonlari-container {
                background: #f0f0f0;
                padding: 0;
                border-bottom: 2px solid #ddd;
                width: 100%;
            }
            
            .sehir-butonlari-wrapper {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 100%;
                margin: 0;
                padding: 0;
                gap: 0;
            }
            
            .sehir-btn {
                background: white;
                border: none;
                border-right: 1px solid #ddd;
                color: #230564;
                font-weight: bold;
                cursor: pointer;
                font-size: 14px;
                padding: 15px 5px;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .sehir-btn:last-child { border-right: none; }
            .sehir-btn:hover { background: #230564; color: white; }
            .sehir-btn.active { background: #230564; color: white; }
            
            /* GERİ KALAN CSS (lazy load) */
        `;
        document.head.insertBefore(style, document.head.firstChild);
        
        // GERİ KALAN CSS'yi ASENKRON yükle
        setTimeout(() => {
            const nonCriticalStyle = document.createElement('style');
            nonCriticalStyle.textContent = `
                .sehir-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #ffcc00;
                }
                
                .sehir-adi-header {
                    color: white !important;
                    font-weight: 700;
                    display: inline;
                }
                
                .dropdown-menu-container {
                    background: #f8f9fa;
                    padding: 20px;
                    border-bottom: 2px solid #ddd;
                    text-align: center;
                }
                
                .dropdown-menu-wrapper { max-width: 500px; margin: 0 auto; }
                
                .dropdown-menu-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #230564;
                    font-weight: 600;
                    font-size: 16px;
                }
                
                .dropdown-menu-select {
                    width: 100%;
                    padding: 12px 15px;
                    border: 2px solid #230564;
                    border-radius: 8px;
                    background: white;
                    color: #230564;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                }
                
                /* RESPONSIVE - lazy */
                @media (max-width: 480px) {
                    .sehir-btn { font-size: 12px; height: 50px; padding: 10px 3px; }
                    .header h1 { font-size: 20px; }
                    .dropdown-menu-container { padding: 15px; }
                    .dropdown-menu-select { padding: 10px 12px; font-size: 14px; }
                }
                
                @media (min-width: 769px) {
                    .sehir-btn { font-size: 16px; height: 70px; padding: 20px 10px; }
                    .header h1 { font-size: 28px; }
                }
            `;
            document.head.appendChild(nonCriticalStyle);
        }, 100); // 100ms sonra yükle
    };
    
    // SCRIPT YÜKLEYİCİ - ASENKRON ve DEFER
    const loadScript = (src, isCritical = false) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            
            if (!isCritical) {
                script.async = true; // ASENKRON yükle
            }
            
            script.onload = () => {
                console.log(`✅ ${src} yüklendi`);
                resolve(true);
            };
            
            script.onerror = () => {
                console.warn(`⚠️ ${src} yüklenemedi`);
                resolve(false); // Hata olsa bile devam et
            };
            
            document.body.appendChild(script); // HEAD değil, BODY sonuna
        });
    };
    
    // HTML YAPISINI HIZLI OLUŞTUR
    const setupBasicHTML = () => {
        // Container yoksa HIZLICA oluştur
        if (!document.querySelector('.container')) {
            const container = document.createElement('div');
            container.className = 'container';
            container.style.cssText = 'max-width:900px;margin:0 auto;background:white;';
            document.body.appendChild(container);
        }
        
        // Header yoksa HIZLICA oluştur
        if (!document.querySelector('.header')) {
            const header = document.createElement('div');
            header.className = 'header';
            header.style.cssText = 'background:#230564;color:white;padding:20px;text-align:center;';
            header.innerHTML = '<h1>SARIGÖZOĞLU <span id="header-sehir-adi">AKSARAY</span></h1>';
            document.querySelector('.container').prepend(header);
        }
    };
    
    // PARALEL YÜKLEME - Tüm script'leri aynı anda yükle
    const loadAllScriptsParallel = async () => {
        console.log('⚡ Scriptler paralel yükleniyor...');
        
        // Tüm script'leri AYNI ANDA başlat
        const loadPromises = [
            loadScript(scripts.buttons, true),  // Butonlar kritik
            loadScript(scripts.dropdown, false) // Dropdown async
        ];
        
        // Hepsi bitsin diye bekleme, ilk bitenle devam et
        const results = await Promise.allSettled(loadPromises);
        
        console.log('📦 Script yükleme tamamlandı');
        return results.some(r => r.status === 'fulfilled');
    };
    
    // SİSTEMİ BAŞLAT - HIZLI
    const startSystem = async () => {
        console.log('🎯 Sistem HIZLI başlatılıyor...');
        
        // 1. KRİTİK CSS'yi HEMEN ekle
        addGlobalStyles();
        
        // 2. TEMEL HTML'yi HEMEN oluştur
        setupBasicHTML();
        
        // 3. SCRIPT'leri PARALEL yükle (async)
        setTimeout(async () => {
            await loadAllScriptsParallel();
            
            // Sistem hazır event'i (gecikmeli)
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent('sehirSistemiHazir'));
                console.timeEnd('🚀 Sistem yükleme süresi');
                console.log('⚡ Sistem HIZLI yüklendi!');
            }, 300);
            
        }, 50); // 50ms sonra başlat
    };
    
    // HEMEN BAŞLAT - DOMContentLoaded bekleme
    if (document.readyState === 'loading') {
        // DOM yüklenirken başlat (daha hızlı)
        document.addEventListener('DOMContentLoaded', startSystem);
        
        // DOM yüklenmeden önce butonları göster
        const earlyButtons = document.createElement('div');
        earlyButtons.className = 'sehir-butonlari-container';
        earlyButtons.innerHTML = `
            <div class="sehir-butonlari-wrapper">
                <button class="sehir-btn active">AKSARAY</button>
                <button class="sehir-btn">BURSA</button>
                <button class="sehir-btn">MANİSA</button>
                <button class="sehir-btn">KOCAELİ</button>
            </div>
        `;
        
        // Header'dan hemen sonra ekle (script'ler yüklenmeden)
        const header = document.querySelector('.header') || document.body;
        if (header.nextSibling) {
            header.parentNode.insertBefore(earlyButtons, header.nextSibling);
        } else {
            header.parentNode.appendChild(earlyButtons);
        }
        
    } else {
        // Sayfa zaten yüklendi, HEMEN başlat
        startSystem();
    }
    
    // PERFORMANS İZLEME
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('📊 Performans Metrikleri:');
        console.log('- DOM yükleme:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
        console.log('- Sayfa yükleme:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        console.log('- Tüm süre:', perfData.duration, 'ms');
    });
    
})();
