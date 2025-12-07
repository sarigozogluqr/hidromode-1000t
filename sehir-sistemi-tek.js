

// sehir-sistemi-tek.js - TÜM ÖZELLİKLER TEK DOSYADA
(() => {
    'use strict';
    
    // === 1. KONFİGÜRASYON VE VERİLER ===
    const CITIES = [
        { id: 'aksaray', name: 'AKSARAY' },
        { id: 'bursa', name: 'BURSA' },
        { id: 'manisa', name: 'MANİSA' },
        { id: 'kocaeli', name: 'KOCAELİ' }
    ];
    
    const MACHINE_DATA = {
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
    
    let currentCity = CITIES[0];
    
    // === 2. CSS EKLEME ===
    function injectCSS() {
        if (document.getElementById('sehir-sistem-css')) return;
        
        const css = `
            /* ŞEHİR BUTONLARI - TAM GENİŞLİK */
            .sehir-butonlari-container {
                width: 100%;
                background: linear-gradient(to right, #f5f5f5, #fafafa);
                padding: 0;
                border-bottom: 3px solid #e0e0e0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            
            .sehir-butonlari-wrapper {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 100%;
                gap: 0;
            }
            
            .sehir-btn {
                padding: 18px 5px;
                background: #ffffff;
                border: none;
                color: #555;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                text-align: center;
                letter-spacing: 0.5px;
                border-right: 1px solid #e0e0e0;
            }
            
            .sehir-btn:last-child {
                border-right: none;
            }
            
            .sehir-btn:hover {
                background: #f0f0f0;
                transform: translateY(-1px);
                box-shadow: inset 0 -3px 0 rgba(35, 5, 100, 0.1);
            }
            
            .sehir-btn.active {
                background: #ffffff;
                color: #230564;
                box-shadow: inset 0 -3px 0 #230564;
                font-weight: 800;
            }
            
            .sehir-btn.active:hover {
                background: #ffffff;
                transform: none;
            }
            
            /* HEADER ŞEHİR ADI (LOGO HAREKET ETMEZ) */
            .sehir-adi-header {
                display: inline-block;
                color: #ffcc00;
                font-weight: 800;
                font-size: 1.1em;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                padding: 2px 10px;
                background: rgba(35, 5, 100, 0.1);
                border-radius: 4px;
                margin-left: 8px;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* DROPDOWN MENÜ */
            .sehir-dropdown-container {
                background: #f8f9fa;
                padding: 20px 30px;
                border-bottom: 2px solid #e0e0e0;
            }
            
            .sehir-dropdown-wrapper {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .sehir-dropdown-label {
                display: block;
                margin-bottom: 12px;
                color: #230564;
                font-weight: 700;
                font-size: 16px;
                text-align: center;
            }
            
            .sehir-dropdown-select {
                width: 100%;
                padding: 14px 20px;
                border: 2px solid #230564;
                border-radius: 8px;
                background: white;
                color: #230564;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(35, 5, 100, 0.1);
            }
            
            .sehir-dropdown-select:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(35, 5, 100, 0.2);
                border-color: #1a044a;
            }
            
            /* RESPONSIVE */
            @media (max-width: 768px) {
                .sehir-butonlari-wrapper {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .sehir-btn:nth-child(2n) {
                    border-right: none;
                }
            }
            
            @media (max-width: 480px) {
                .sehir-butonlari-wrapper {
                    grid-template-columns: 1fr;
                }
                
                .sehir-btn {
                    border-right: none;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .sehir-btn:last-child {
                    border-bottom: none;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'sehir-sistem-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // === 3. BUTONLARI OLUŞTUR ===
    function createButtons() {
        const header = document.querySelector('.header');
        if (!header) return false;
        
        // Container oluştur
        const container = document.createElement('div');
        container.className = 'sehir-butonlari-container';
        container.id = 'city-buttons-container';
        
        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'sehir-butonlari-wrapper';
        
        // Butonları ekle
        CITIES.forEach((city, index) => {
            const button = document.createElement('button');
            button.className = `sehir-btn ${index === 0 ? 'active' : ''}`;
            button.dataset.city = city.id;
            button.dataset.cityName = city.name;
            button.textContent = city.name;
            wrapper.appendChild(button);
        });
        
        container.appendChild(wrapper);
        header.parentNode.insertBefore(container, header.nextSibling);
        return true;
    }
    
    // === 4. HEADER'A ŞEHİR ADI EKLE (LOGO SABİT) ===
    function setupHeaderCity() {
        const headerH1 = document.querySelector('.header h1');
        if (!headerH1) return;
        
        // Mevcut text'i al
        const originalText = headerH1.textContent || headerH1.innerText;
        
        // Eğer "SARIGÖZOĞLU" içeriyorsa
        if (originalText.includes('SARIGÖZOĞLU')) {
            // SARIGÖZOĞLU'dan sonra şehir adını ekle
            headerH1.innerHTML = `SARIGÖZOĞLU <span class="sehir-adi-header" id="current-city-name">${currentCity.name}</span>`;
        } else {
            // Farklı format ise sona ekle
            const span = document.createElement('span');
            span.className = 'sehir-adi-header';
            span.id = 'current-city-name';
            span.textContent = currentCity.name;
            headerH1.appendChild(span);
        }
    }
    
    // === 5. HEADER'DA SADECE ŞEHİR ADINI DEĞİŞTİR ===
    function updateHeaderCity(cityName) {
        const citySpan = document.getElementById('current-city-name');
        if (citySpan) {
            citySpan.textContent = cityName;
            citySpan.style.opacity = '0.7';
            setTimeout(() => {
                citySpan.style.opacity = '1';
            }, 150);
        }
    }
    
    // === 6. DROPDOWN OLUŞTUR ===
    function createDropdown() {
        const buttonsContainer = document.getElementById('city-buttons-container');
        if (!buttonsContainer) return false;
        
        const container = document.createElement('div');
        container.className = 'sehir-dropdown-container';
        container.id = 'city-dropdown-container';
        container.innerHTML = `
            <div class="sehir-dropdown-wrapper">
                <label class="sehir-dropdown-label" id="dropdown-label">${currentCity.name} Makina Seçin:</label>
                <select class="sehir-dropdown-select" id="machine-dropdown">
                    <option value="">Makina seçin...</option>
                </select>
            </div>
        `;
        
        buttonsContainer.parentNode.insertBefore(container, buttonsContainer.nextSibling);
        return true;
    }
    
    // === 7. DROPDOWN İÇERİĞİNİ GÜNCELLE ===
    function updateDropdown(cityId) {
        const select = document.getElementById('machine-dropdown');
        const label = document.getElementById('dropdown-label');
        
        if (!select || !label) return;
        
        // Temizle
        select.innerHTML = '<option value="">Makina seçin...</option>';
        
        // Seçenekleri ekle
        const machines = MACHINE_DATA[cityId] || [];
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.url;
            option.textContent = machine.name;
            select.appendChild(option);
        });
        
        // Label'ı güncelle
        const city = CITIES.find(c => c.id === cityId);
        if (city) {
            label.textContent = `${city.name} Makina Seçin:`;
        }
    }
    
    // === 8. SAYFA İÇERİĞİNİ GÜNCELLE ===
    function updatePageContent(cityId) {
        // Google Drive linklerini güncelle
        document.querySelectorAll('a[href*="drive.google.com"]').forEach((link, index) => {
            const href = link.getAttribute('href');
            if (href) {
                // Şehir adını linkte güncelle
                const newHref = href.replace(
                    /(aksaray|bursa|manisa|kocaeli)/g,
                    cityId
                );
                link.setAttribute('href', newHref);
                
                // Buton metnini güncelle (eğer doc-button class'ı varsa)
                if (link.classList.contains('doc-button')) {
                    const city = CITIES.find(c => c.id === cityId);
                    if (city) {
                        link.textContent = `${city.name} Dosya-${index + 1}`;
                    }
                }
            }
        });
        
        // Başlıkları güncelle
        document.querySelectorAll('h2, h3, .section-title').forEach(title => {
            const text = title.textContent;
            if (text && (text.includes('AKSARAY') || text.includes('BURSA') || 
                         text.includes('MANİSA') || text.includes('KOCAELİ'))) {
                const city = CITIES.find(c => c.id === cityId);
                if (city) {
                    title.textContent = text.replace(
                        /(AKSARAY|BURSA|MANİSA|KOCAELİ)/,
                        city.name
                    );
                }
            }
        });
    }
    
    // === 9. EVENT HANDLER'LAR ===
    function setupEventHandlers() {
        // Buton tıklamaları (Event Delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sehir-btn')) {
                const cityId = e.target.dataset.city;
                const cityName = e.target.dataset.cityName;
                
                // Aktif butonu değiştir
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Header'daki şehir adını güncelle
                updateHeaderCity(cityName);
                
                // Mevcut şehri güncelle
                currentCity = CITIES.find(c => c.id === cityId) || CITIES[0];
                
                // Dropdown'ı güncelle
                updateDropdown(cityId);
                
                // Sayfa içeriğini güncelle
                updatePageContent(cityId);
                
                // Custom event
                document.dispatchEvent(new CustomEvent('sehirDegisti', {
                    detail: { cityId, cityName }
                }));
            }
        });
        
        // Dropdown değişimi
        document.addEventListener('change', (e) => {
            if (e.target.id === 'machine-dropdown' && e.target.value) {
                // Sayfayı değiştir
                setTimeout(() => {
                    window.location.href = e.target.value;
                }, 100);
            }
        });
    }
    
    // === 10. BAŞLATMA FONKSİYONU ===
    function init() {
        console.log('🚀 Şehir Sistemi Başlatılıyor...');
        
        try {
            // Sıralı işlemler
            injectCSS();
            createButtons();
            setupHeaderCity();
            createDropdown();
            setupEventHandlers();
            
            // İlk yükleme
            updateDropdown(currentCity.id);
            updatePageContent(currentCity.id);
            
            console.log('✅ Şehir Sistemi Başarıyla Yüklendi!');
        } catch (error) {
            console.error('❌ Hata:', error);
        }
    }
    
    // === 11. DOM HAZIR OLUNCA ÇALIŞTIR ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // === 12. GLOBAL API ===
    window.SehirSistemi = {
        setSehir: (cityId) => {
            const button = document.querySelector(`.sehir-btn[data-city="${cityId}"]`);
            if (button) {
                button.click();
                return true;
            }
            return false;
        },
        getSehir: () => currentCity,
        addMakina: (cityId, makinaAdi, makinaUrl) => {
            if (!MACHINE_DATA[cityId]) {
                MACHINE_DATA[cityId] = [];
            }
            MACHINE_DATA[cityId].push({ name: makinaAdi, url: makinaUrl });
            
            if (currentCity.id === cityId) {
                updateDropdown(cityId);
            }
            return true;
        },
        getMakineler: (cityId) => {
            return MACHINE_DATA[cityId] || [];
        }
    };
    
})();
