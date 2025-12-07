// sehir-sistemi-tek.js - TÜM SİSTEM (BUTON + DROPDOWN + İÇERİK)
(() => {
    'use strict';
    
    // === 1. DEĞİŞKENLER VE AYARLAR ===
    let currentCity = 'aksaray';
    const cities = ['aksaray', 'bursa', 'manisa', 'kocaeli'];
    
    // Dropdown verileri
    const cityMachines = {
        aksaray: [
            { name: "1000T Pres", url: "index.html" },
            { name: "2000T Pres", url: "hidromode-2000t.html" },
            { name: "5000T Pres", url: "5000t-pres.html" },
            { name: "6000T Pres", url: "6000t-pres.html" },
            { name: "SMG Pres", url: "smg-pres.html" },
            { name: "Stenhoj", url: "sthenhoj.html" },
            { name: "Gazaltı-1-2-3", url: "gazalti-1-2-3.html" }
        ],
        bursa: [
            { name: "CNC Programları", url: "bursa-cnc.html" },
            { name: "Kalite Kontrol", url: "bursa-kalite.html" },
            { name: "Üretim Hattı", url: "bursa-uretim.html" },
            { name: "Makina Bakım", url: "bursa-bakim.html" }
        ],
        manisa: [
            { name: "Ofis Otomasyon", url: "manisa-ofis.html" },
            { name: "Yönetim Paneli", url: "manisa-panel.html" },
            { name: "Raporlama Sistemi", url: "manisa-rapor.html" },
            { name: "Güvenlik Yazılımları", url: "manisa-guvenlik.html" }
        ],
        kocaeli: [
            { name: "IoT Sistemleri", url: "kocaeli-iot.html" },
            { name: "Akıllı Şehir", url: "kocaeli-akilli-sehir.html" },
            { name: "AR-GE Projeleri", url: "kocaeli-arge.html" },
            { name: "İnovasyon", url: "kocaeli-inovasyon.html" }
        ]
    };
    
    // === 2. CSS ENJEKTE ET (SADECE 1 KERE) ===
    function injectCSS() {
        if (document.getElementById('sehir-css')) return;
        
        const css = `
            /* ŞEHİR BUTONLARI */
            .sehir-butonlari-container {
                background: #f0f0f0;
                padding: 15px;
                border-bottom: 2px solid #ddd;
            }
            
            .sehir-butonlari-wrapper {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .sehir-btn {
                padding: 10px 20px;
                background: white;
                border: 2px solid #230564;
                border-radius: 6px;
                color: #230564;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                min-width: 100px;
            }
            
            .sehir-btn:hover {
                background: #e6e6ff;
            }
            
            .sehir-btn.active {
                background: #230564;
                color: white;
                box-shadow: 0 2px 8px rgba(35, 5, 100, 0.2);
            }
            
            /* DROPDOWN MENÜ */
            .dropdown-container {
                background: #f8f9fa;
                padding: 15px 20px;
                border-bottom: 2px solid #ddd;
            }
            
            .dropdown-wrapper {
                max-width: 500px;
                margin: 0 auto;
            }
            
            .dropdown-label {
                display: block;
                margin-bottom: 8px;
                color: #230564;
                font-weight: 600;
                font-size: 14px;
            }
            
            .dropdown-select {
                width: 100%;
                padding: 10px 12px;
                border: 2px solid #230564;
                border-radius: 6px;
                background: white;
                color: #230564;
                font-size: 14px;
                cursor: pointer;
            }
            
            /* HEADER ŞEHİR ADI */
            .header-city {
                color: #ffcc00;
                font-weight: 700;
                margin-left: 5px;
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'sehir-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // === 3. HTML YAPISINI OLUŞTUR (SIRALI) ===
    function createHTMLStructure() {
        const container = document.querySelector('.container');
        if (!container) return false;
        
        const header = document.querySelector('.header');
        if (!header) return false;
        
        // 1. Header'daki şehir adı için span ekle
        const headerTitle = header.querySelector('h1');
        if (headerTitle && !headerTitle.querySelector('.header-city')) {
            const citySpan = document.createElement('span');
            citySpan.className = 'header-city';
            citySpan.id = 'header-city-name';
            citySpan.textContent = 'AKSARAY';
            headerTitle.appendChild(citySpan);
        }
        
        // 2. Şehir butonlarını ekle (header'dan SONRA)
        const buttonsHTML = `
            <div class="sehir-butonlari-container" id="city-buttons">
                <div class="sehir-butonlari-wrapper">
                    <button class="sehir-btn active" data-city="aksaray">AKSARAY</button>
                    <button class="sehir-btn" data-city="bursa">BURSA</button>
                    <button class="sehir-btn" data-city="manisa">MANİSA</button>
                    <button class="sehir-btn" data-city="kocaeli">KOCAELİ</button>
                </div>
            </div>
        `;
        
        // 3. Dropdown'ı ekle (butonlardan SONRA)
        const dropdownHTML = `
            <div class="dropdown-container" id="city-dropdown">
                <div class="dropdown-wrapper">
                    <label class="dropdown-label" id="dropdown-label">AKSARAY Makina Seçin:</label>
                    <select class="dropdown-select" id="machine-select">
                        <option value="">Makina seçin...</option>
                    </select>
                </div>
            </div>
        `;
        
        // Header'dan sonra butonları ve dropdown'ı ekle
        header.insertAdjacentHTML('afterend', buttonsHTML + dropdownHTML);
        
        return true;
    }
    
    // === 4. DROPDOWN'U DOLDUR ===
    function populateDropdown(cityId) {
        const select = document.getElementById('machine-select');
        const label = document.getElementById('dropdown-label');
        
        if (!select || !label) return;
        
        // Temizle ve varsayılan ekle
        select.innerHTML = '<option value="">Makina seçin...</option>';
        
        // Şehrin makinelerini ekle
        const machines = cityMachines[cityId] || [];
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.url;
            option.textContent = machine.name;
            select.appendChild(option);
        });
        
        // Label'ı güncelle
        const cityName = document.querySelector(`[data-city="${cityId}"]`)?.textContent || cityId.toUpperCase();
        label.textContent = `${cityName} Makina Seçin:`;
    }
    
    // === 5. EVENT HANDLER'LARI KUR ===
    function setupEventHandlers() {
        // 1. Şehir butonları için DELEGATION (performans için)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sehir-btn')) {
                const cityId = e.target.dataset.city;
                const cityName = e.target.textContent;
                
                // Aktif butonu değiştir
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.toggle('active', btn === e.target);
                });
                
                // Header'daki şehir adını güncelle
                const headerCity = document.getElementById('header-city-name');
                if (headerCity) headerCity.textContent = cityName;
                
                // Dropdown'ı güncelle
                currentCity = cityId;
                populateDropdown(cityId);
                
                // İçerik güncelleme event'i
                updateContent(cityId);
            }
        });
        
        // 2. Dropdown değişimi
        const dropdown = document.getElementById('machine-select');
        if (dropdown) {
            dropdown.addEventListener('change', function() {
                if (this.value) {
                    // 100ms sonra yönlendir (animasyon için zaman)
                    setTimeout(() => {
                        window.location.href = this.value;
                    }, 100);
                }
            });
        }
    }
    
    // === 6. İÇERİĞİ GÜNCELLE (MEVCUT SAYFA İÇERİĞİ) ===
    function updateContent(cityId) {
        // Bu kısmı kendi sayfa yapınıza göre düzenleyin
        console.log(`Şehir değişti: ${cityId}`);
        
        // Örnek: Sayfadaki başlıkları güncelle
        const titles = document.querySelectorAll('.section-title, h2, h3');
        titles.forEach(title => {
            if (title.textContent.includes('AKSARAY') || 
                title.textContent.includes('BURSA') || 
                title.textContent.includes('MANİSA') || 
                title.textContent.includes('KOCAELİ')) {
                const newTitle = title.textContent.replace(
                    /(AKSARAY|BURSA|MANİSA|KOCAELİ)/, 
                    cityId.toUpperCase()
                );
                title.textContent = newTitle;
            }
        });
        
        // Örnek: Dosya linklerini güncelle
        const fileLinks = document.querySelectorAll('.doc-button[href*="drive.google.com"]');
        fileLinks.forEach((link, index) => {
            const currentHref = link.getAttribute('href');
            if (currentHref.includes('aksaray') || 
                currentHref.includes('bursa') || 
                currentHref.includes('manisa') || 
                currentHref.includes('kocaeli')) {
                
                // Link'i şehre göre güncelle
                const newHref = currentHref.replace(
                    /(aksaray|bursa|manisa|kocaeli)/, 
                    cityId
                );
                link.setAttribute('href', newHref);
                
                // Buton metnini güncelle
                const cityName = document.querySelector(`[data-city="${cityId}"]`)?.textContent || '';
                link.textContent = `${cityName} Dosya-${index + 1}`;
            }
        });
    }
    
    // === 7. BAŞLATMA FONKSİYONU ===
    function initializeSystem() {
        console.log('🚀 Şehir Sistemi Başlatılıyor...');
        
        // 1. CSS enjekte et
        injectCSS();
        
        // 2. HTML yapısını oluştur
        const htmlCreated = createHTMLStructure();
        if (!htmlCreated) {
            console.error('❌ HTML yapısı oluşturulamadı!');
            return;
        }
        
        // 3. Dropdown'u başlangıç değeriyle doldur
        populateDropdown(currentCity);
        
        // 4. Event handler'ları kur
        setupEventHandlers();
        
        console.log('✅ Şehir Sistemi Hazır!');
    }
    
    // === 8. DOM HAZIR OLUNCA BAŞLAT ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        // DOM zaten hazır
        initializeSystem();
    }
    
    // === 9. GLOBAL API (İSTEĞE BAĞLI) ===
    window.SehirSistemi = {
        setCity: function(cityId) {
            const button = document.querySelector(`.sehir-btn[data-city="${cityId}"]`);
            if (button) button.click();
        },
        getCurrentCity: function() {
            return currentCity;
        },
        addMachine: function(cityId, machineName, machineUrl) {
            if (!cityMachines[cityId]) cityMachines[cityId] = [];
            cityMachines[cityId].push({ name: machineName, url: machineUrl });
            
            // Eğer bu şehir aktifse dropdown'u güncelle
            if (currentCity === cityId) {
                populateDropdown(cityId);
            }
        }
    };
    
})();
