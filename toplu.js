// toplu.js - Tüm sistemleri birleştiren ana dosya
// Kullanım: <script src="toplu.js"></script>

(function() {
    'use strict';
    
    console.log('🚀 Şehir Sistemi başlatılıyor (URL yönlendirmeli)...');
    
    // DOSYA YOLLARI - sehir-guncelleme.js KALDIRILDI
    const scripts = {
        buttons: 'sehir-butonlari.js',
        dropdown: 'dropdown-menu.js'
        // sehir-guncelleme.js ARTIK YOK - URL yönlendirme var
    };
    
    // HATA YÖNETİMİ
    const handleError = (error, component) => {
        console.error(`❌ ${component} hatası:`, error);
        return false;
    };
    
    // CSS EKLEME (tüm stiller burada)
  // toplu.js - CSS kısmını TAMAMEN şu şekilde değiştirin:

const addGlobalStyles = () => {
    try {
        const style = document.createElement('style');
        style.textContent = `
            /* ŞEHİR BUTONLARI - 4 BUTON YAN YANA TAM GENİŞLİK */
            .sehir-butonlari-container {
                background: #f0f0f0;
                padding: 0; /* PADDING KALDIR (tam genişlik için) */
                border-bottom: 2px solid #ddd;
                width: 100%;
            }
            
            .sehir-butonlari-wrapper {
                display: grid;
                grid-template-columns: repeat(4, 1fr); /* 4 EŞİT SÜTUN */
                width: 100%;
                margin: 0;
                padding: 0;
                gap: 0; /* BUTONLAR ARASINDA BOŞLUK YOK */
            }
            
            .sehir-btn {
                background: white;
                border: none;
                border-right: 1px solid #ddd; /* BUTONLARI AYIRAN ÇİZGİ */
                color: #230564;
                font-weight: bold;
                cursor: pointer;
                font-size: 14px;
                font-family: inherit;
                transition: all 0.3s;
                padding: 15px 5px; /* YÜKSEKLİK SABİT, YAN PADDING AZ */
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%; /* TAM GENİŞLİK */
                height: 60px; /* SABİT YÜKSEKLİK */
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            /* SON BUTONDA SAĞ ÇİZGİ OLMASIN */
            .sehir-btn:last-child {
                border-right: none;
            }
            
            .sehir-btn:hover {
                background: #230564;
                color: white;
            }
            
            .sehir-btn.active {
                background: #230564;
                color: white;
                position: relative;
            }
            
            /* AKTİF BUTON ALT ÇİZGİ */
            .sehir-btn.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #ffcc00; /* SARI VURGU */
            }
            
            .sehir-adi-header {
                color: white !important;
                font-weight: 700;
                display: inline;
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            /* DROPDOWN MENÜ */
            .dropdown-menu-container {
                background: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #ddd;
                text-align: center;
            }
            .dropdown-menu-wrapper {
                max-width: 500px;
                margin: 0 auto;
            }
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
                transition: all 0.3s;
            }
            .dropdown-menu-select:hover {
                border-color: #1a044a;
            }
            .dropdown-menu-select:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(35, 5, 100, 0.2);
            }
            
            /* RESPONSIVE DÜZENLEMELER */
            
            /* KÜÇÜK MOBİL (0-480px) - YAZILARI KÜÇÜLT */
            @media (max-width: 480px) {
                .sehir-btn {
                    font-size: 12px;
                    height: 50px;
                    padding: 10px 3px;
                }
                .header h1 {
                    font-size: 20px;
                }
                .dropdown-menu-container {
                    padding: 15px;
                }
                .dropdown-menu-select {
                    padding: 10px 12px;
                    font-size: 14px;
                }
            }
            
            /* ÇOK KÜÇÜK EKRAN (0-320px) - 4 BUTON YİNE YAN YANA */
            @media (max-width: 320px) {
                .sehir-btn {
                    font-size: 11px;
                    height: 45px;
                    padding: 8px 2px;
                }
            }
            
            /* BÜYÜK EKRAN (769px+) - YAZILARI BÜYÜT */
            @media (min-width: 769px) {
                .sehir-btn {
                    font-size: 16px;
                    height: 70px;
                    padding: 20px 10px;
                }
                .header h1 {
                    font-size: 28px;
                }
            }
            
            /* TABLET (481-768px) - ORTA BOY */
            @media (min-width: 481px) and (max-width: 768px) {
                .sehir-btn {
                    font-size: 14px;
                    height: 60px;
                    padding: 15px 5px;
                }
                .header h1 {
                    font-size: 24px;
                }
            }
            
            /* GENEL MOBİL OPTİMİZASYONLARI */
            @media (max-width: 768px) {
                .container {
                    border-radius: 10px;
                    margin: 10px;
                    max-width: calc(100% - 20px);
                }
                .header {
                    padding: 20px;
                }
            }
            
            /* İÇERİK ALANI */
            .sehir-icerik-container {
                padding: 30px;
            }
            .sehir-icerik-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 12px;
                margin-top: 20px;
            }
            .sehir-dosya-btn {
                display: block;
                background: #230564;
                color: white;
                text-decoration: none;
                padding: 14px 18px;
                border-radius: 8px;
                font-weight: 500;
                transition: all 0.3s;
                text-align: center;
                font-size: 14px;
            }
            .sehir-dosya-btn:hover {
                background: #1a044a;
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }
            
            /* MOBİLDE HOVER ETKİSİNİ KALDIR */
            @media (hover: none) and (pointer: coarse) {
                .sehir-btn:hover {
                    transform: none;
                }
                .sehir-dosya-btn:hover {
                    transform: none;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ CSS stilleri eklendi (4 buton yan yana)');
        return true;
    } catch (error) {
        return handleError(error, 'CSS ekleme');
    }
};
    
    // SCRIPT YÜKLEYİCİ
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log(`✅ ${src} yüklendi`);
                resolve(true);
            };
            script.onerror = () => {
                console.error(`❌ ${src} yüklenemedi`);
                // Hata olsa bile devam et
                resolve(false);
            };
            document.head.appendChild(script);
        });
    };
    
    // HTML YAPISINI KONTROL ET
    const checkHTMLStructure = () => {
        try {
            // Container yoksa oluştur
            if (!document.querySelector('.container')) {
                const container = document.createElement('div');
                container.className = 'container';
                container.style.cssText = `
                    max-width: 900px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    overflow: hidden;
                `;
                document.body.appendChild(container);
                console.log('⚠️ Container oluşturuldu');
            }
            
            // Header yoksa oluştur
            const container = document.querySelector('.container');
            if (!document.querySelector('.header')) {
                const header = document.createElement('div');
                header.className = 'header';
                header.style.cssText = `
                    background: #230564;
                    color: white;
                    padding: 30px;
                    text-align: center;
                `;
                header.innerHTML = `
                    <div class="header-content">
                        <h1>SARIGÖZOĞLU <span id="header-sehir-adi">AKSARAY</span></h1>
                    </div>
                `;
                container.prepend(header);
                console.log('⚠️ Header oluşturuldu');
            }
            
            console.log('✅ HTML yapısı kontrol edildi');
            return true;
        } catch (error) {
            return handleError(error, 'HTML yapısı kontrolü');
        }
    };
    
    // SIRALI YÜKLEME - sehir-guncelleme.js YOK
    const loadScriptsInOrder = async () => {
        try {
            // 1. CSS ekle
            addGlobalStyles();
            
            // 2. HTML yapısını kontrol et
            checkHTMLStructure();
            
            // 3. Script'leri sırayla yükle
            console.log('📦 Scriptler yükleniyor...');
            
            // Önce şehir butonları (EN ÖNEMLİSİ)
            console.log('1. Şehir butonları yükleniyor...');
            const buttonsLoaded = await loadScript(scripts.buttons);
            
            if (!buttonsLoaded) {
                console.warn('⚠️ Şehir butonları yüklenemedi, devam ediliyor...');
            }
            
            // Kısa bekleme (butonların oluşması için)
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Sonra dropdown menü
            console.log('2. Dropdown menü yükleniyor...');
            const dropdownLoaded = await loadScript(scripts.dropdown);
            
            if (!dropdownLoaded) {
                console.warn('⚠️ Dropdown menü yüklenemedi');
            }
            
            // sehir-guncelleme.js ARTIK YOK - URL yönlendirme var
            
            console.log('✅ Gerekli scriptler yüklendi');
            return true;
            
        } catch (error) {
            console.error('❌ Script yükleme hatası:', error);
            return false;
        }
    };
    
    // SİSTEMİ BAŞLAT
    const startSystem = async () => {
        console.log('🎯 Sistem başlatılıyor...');
        
        try {
            const loaded = await loadScriptsInOrder();
            
            if (loaded) {
                // Sistem hazır event'i gönder
                setTimeout(() => {
                    const event = new CustomEvent('sehirSistemiHazir', {
                        detail: {
                            timestamp: new Date(),
                            version: '2.0',
                            features: ['şehir-butonları', 'dropdown-url-yönlendirme']
                        }
                    });
                    document.dispatchEvent(event);
                    console.log('🎉 Şehir Sistemi hazır! (URL yönlendirmeli)');
                    
                    // Ek bilgi
                    console.log('📋 Sistem Özellikleri:');
                    console.log('- 4 şehir butonu (AKSARAY, BURSA, MANİSA, KOCAELİ)');
                    console.log('- Dropdown menü ile makina seçimi');
                    console.log('- Direkt URL yönlendirmesi');
                    console.log('- Responsive tasarım');
                    
                }, 800);
            } else {
                console.warn('⚠️ Sistem tam olarak yüklenemedi, ancak çalışıyor olabilir');
                
                // Yine de hazır event'i gönder
                setTimeout(() => {
                    document.dispatchEvent(new CustomEvent('sehirSistemiHazir'));
                }, 1000);
            }
            
        } catch (error) {
            console.error('❌ Sistem başlatma hatası:', error);
        }
    };
    
    // SAYFA HAZIR OLUNCA BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSystem);
    } else {
        // Sayfa zaten yüklendi
        console.log('⚡ Sayfa zaten yüklendi, sistem başlatılıyor...');
        setTimeout(startSystem, 100);
    }
    
    // GLOBAL ERİŞİM İÇİN
    window.SehirSistemi = {
        yenidenBaslat: startSystem,
        yukleniyor: true,
        versiyon: '2.0-url-yonlendirme',
        ozellikler: ['şehir-butonları', 'dropdown-url-yönlendirme']
    };
    
    // Hata yakalama (global)
    window.addEventListener('error', function(e) {
        console.error('🌍 Global hata:', e.error);
    });
    
})();
