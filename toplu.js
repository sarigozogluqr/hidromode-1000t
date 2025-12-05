// toplu.js - Tüm sistemleri birleştiren ana dosya
// Kullanım: <script src="toplu.js"></script>

(function() {
    'use strict';
    
    console.log('Şehir Sistemi başlatılıyor...');
    
    // DOSYA YOLLARI
    const scripts = {
        buttons: 'sehir-butonlari.js',
        dropdown: 'dropdown-menu.js',
        updater: 'sehir-guncelleme.js'
    };
    
    // HATA YÖNETİMİ
    const handleError = (error, component) => {
        console.error(`${component} hatası:`, error);
        return false;
    };
    
    // CSS EKLEME (tüm stiller burada)
    const addGlobalStyles = () => {
        try {
            const style = document.createElement('style');
            style.textContent = `
                /* ŞEHİR BUTONLARI */
                .sehir-butonlari-container {
                    background: #f0f0f0;
                    padding: 15px;
                    border-bottom: 2px solid #ddd;
                    text-align: center;
                }
                .sehir-butonlari-wrapper {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .sehir-btn {
                    padding: 12px 25px;
                    background: white;
                    border: 2px solid #230564;
                    border-radius: 8px;
                    color: #230564;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 16px;
                    font-family: inherit;
                    transition: all 0.3s;
                }
                .sehir-btn:hover {
                    background: #230564;
                    color: white;
                    transform: translateY(-2px);
                }
                .sehir-btn.active {
                    background: #230564;
                    color: white;
                    box-shadow: 0 4px 10px rgba(35, 5, 100, 0.3);
                }
                .sehir-adi-header {
                   color: white !important; /* SARIDAN BEYAZA DEĞİŞTİ */
                font-weight: 700;
                /* Logo değil, sadece metin */
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
                }
                .dropdown-menu-select:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(35, 5, 100, 0.2);
                }
                
                /* İÇERİK ALANI */
                .sehir-icerik-container {
                    padding: 30px;
                }
                .sehir-icerik-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 15px;
                    margin-top: 20px;
                }
                .sehir-dosya-btn {
                    display: block;
                    background: #230564;
                    color: white;
                    text-decoration: none;
                    padding: 16px 20px;
                    border-radius: 10px;
                    font-weight: 500;
                    transition: all 0.3s;
                    text-align: center;
                }
                .sehir-dosya-btn:hover {
                    background: #1a044a;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
            `;
            document.head.appendChild(style);
            console.log('✅ CSS stilleri eklendi');
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
                console.log(`${src} yüklendi`);
                resolve(true);
            };
            script.onerror = () => {
                console.error(`${src} yüklenemedi`);
                reject(new Error(`${src} yüklenemedi`));
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
                document.body.appendChild(container);
            }
            
            // Header yoksa oluştur
            const container = document.querySelector('.container');
            if (!document.querySelector('.header')) {
                const header = document.createElement('div');
                header.className = 'header';
                header.innerHTML = `
                    <div class="header-content">
                        <h1>SARIGÖZOĞLU <span id="header-sehir-adi">AKSARAY</span></h1>
                    </div>
                `;
                container.prepend(header);
            }
            
            console.log('HTML yapısı kontrol edildi');
            return true;
        } catch (error) {
            return handleError(error, 'HTML yapısı kontrolü');
        }
    };
    
    // SIRALI YÜKLEME
    const loadScriptsInOrder = async () => {
        try {
            // 1. CSS ekle
            addGlobalStyles();
            
            // 2. HTML yapısını kontrol et
            checkHTMLStructure();
            
            // 3. Script'leri sırayla yükle
            console.log('Scriptler yükleniyor...');
            
            // Önce şehir butonları
            await loadScript(scripts.buttons);
            
            // Kısa bekleme
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Sonra dropdown
            await loadScript(scripts.dropdown);
            
            // Kısa bekleme
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // En son güncelleyici
            await loadScript(scripts.updater);
            
            console.log('Tüm scriptler yüklendi');
            return true;
            
        } catch (error) {
            console.error('Script yükleme hatası:', error);
            return false;
        }
    };
    
    // SİSTEMİ BAŞLAT
    const startSystem = async () => {
        console.log('Sistem başlatılıyor...');
        
        try {
            const loaded = await loadScriptsInOrder();
            
            if (loaded) {
                // Sistem hazır event'i gönder
                setTimeout(() => {
                    const event = new CustomEvent('sehirSistemiHazir');
                    document.dispatchEvent(event);
                    console.log('Şehir Sistemi hazır!');
                }, 500);
            } else {
                console.error('Sistem tam olarak yüklenemedi');
            }
            
        } catch (error) {
            console.error('Sistem başlatma hatası:', error);
        }
    };
    
    // SAYFA HAZIR OLUNCA BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSystem);
    } else {
        // Sayfa zaten yüklendi
        setTimeout(startSystem, 100);
    }
    
    // GLOBAL ERİŞİM İÇİN
    window.SehirSistemi = {
        yenidenBaslat: startSystem,
        yukleniyor: true
    };
    
})();
