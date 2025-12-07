// sehir-butonlari-optimize.js - OPTİMİZE EDİLMİŞ VERSİYON
(() => {
    'use strict';
    
    // === 1. KONFİGÜRASYON ===
    const CITIES = [
        { id: 'aksaray', name: 'AKSARAY', color: '#230564' },
        { id: 'bursa', name: 'BURSA', color: '#1976D2' },
        { id: 'manisa', name: 'MANİSA', color: '#388E3C' },
        { id: 'kocaeli', name: 'KOCAELİ', color: '#7B1FA2' }
    ];
    
    let currentCity = CITIES[0];
    
    // === 2. CSS EKLEME (SADECE 1 KERE) ===
    function injectCSS() {
        if (document.getElementById('sehir-css-styles')) return;
        
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
                grid-template-columns: repeat(4, 1fr); /* 4 buton tam eşit */
                width: 100%;
                gap: 0; /* Boşluk yok */
            }
            
            .sehir-btn {
                padding: 18px 5px;
                background: #ffffff;
                border: none;
                color: #555;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                text-align: center;
                letter-spacing: 0.5px;
                border-right: 1px solid #e0e0e0;
            }
            
            /* Son butonda sağ çizgi olmasın */
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
                box-shadow: inset 0 -3px 0 #230564;
            }
            
            /* Aktif buton üzerindeki animasyon efekti */
            .sehir-btn.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: #230564;
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
            }
            
            /* HEADER ŞEHİR ADI (LOGO HAREKET ETMEYECEK) */
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
            
            .sehir-dropdown-select:hover {
                box-shadow: 0 5px 15px rgba(35, 5, 100, 0.15);
            }
            
            /* RESPONSIVE */
            @media (max-width: 768px) {
                .sehir-butonlari-wrapper {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .sehir-btn:nth-child(2n) {
                    border-right: none;
                }
                
                .sehir-adi-header {
                    font-size: 1em;
                    margin-left: 5px;
                    padding: 2px 6px;
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
        style.id = 'sehir-css-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // === 3. BUTONLARI OLUŞTUR (TAM GENİŞLİK) ===
    function createButtons() {
        // Eğer zaten varsa güncelle
        let container = document.querySelector('.sehir-butonlari-container');
        
        if (!container) {
            // Header'ı bul
            const header = document.querySelector('.header');
            if (!header) return false;
            
            // Container oluştur
            container = document.createElement('div');
            container.className = 'sehir-butonlari-container';
            
            // Buton wrapper'ı
            const wrapper = document.createElement('div');
            wrapper.className = 'sehir-butonlari-wrapper';
            
            // Her şehir için buton oluştur
            CITIES.forEach((city, index) => {
                const button = document.createElement('button');
                button.className = `sehir-btn ${index === 0 ? 'active' : ''}`;
                button.dataset.city = city.id;
                button.dataset.cityName = city.name;
                button.textContent = city.name;
                wrapper.appendChild(button);
            });
            
            container.appendChild(wrapper);
            
            // Header'dan sonra ekle
            header.parentNode.insertBefore(container, header.nextSibling);
        }
        
        return true;
    }
    
    // === 4. HEADER'A ŞEHİR ADINI EKLE (LOGO HAREKET ETMEYECEK) ===
    function setupHeaderCity() {
        const header = document.querySelector('.header h1');
        if (!header) return;
        
        // Eğer şehir adı span'ı yoksa oluştur
        let citySpan = header.querySelector('.sehir-adi-header');
        
        if (!citySpan) {
            // Header text'ini al
            const originalText = header.textContent || header.innerText;
            
            // "SARIGÖZOĞLU" dan sonra şehir adı ekleyelim
            if (!originalText.includes('SARIGÖZOĞLU')) {
                // Farklı bir yapı varsa, sadece sona ekle
                citySpan = document.createElement('span');
                citySpan.className = 'sehir-adi-header';
                citySpan.id = 'current-city-name';
                citySpan.textContent = currentCity.name;
                header.appendChild(citySpan);
            } else {
                // "SARIGÖZOĞLU AKSARAY" formatında ise
                const parts = originalText.split('SARIGÖZOĞLU');
                if (parts.length > 1) {
                    header.innerHTML = `SARIGÖZOĞLU <span class="sehir-adi-header" id="current-city-name">${currentCity.name}</span>`;
                } else {
                    header.innerHTML = `${originalText} <span class="sehir-adi-header" id="current-city-name">${currentCity.name}</span>`;
                }
            }
        }
    }
    
    // === 5. HEADER'DA SADECE ŞEHİR ADINI DEĞİŞTİR ===
    function updateHeaderCity(cityName) {
        const citySpan = document.getElementById('current-city-name');
        if (citySpan) {
            // Sadece text değiştir, logo ve diğer elementler hareket etmez
            citySpan.textContent = cityName;
            
            // Hafif animasyon
            citySpan.style.opacity = '0.7';
            setTimeout(() => {
                citySpan.style.opacity = '1';
            }, 150);
        }
    }
    
    // === 6. DROPDOWN MENÜ ===
    function createDropdown() {
        const buttonsContainer = document.querySelector('.sehir-butonlari-container');
        if (!buttonsContainer) return false;
        
        // Eğer dropdown zaten varsa güncelle
        let dropdownContainer = document.querySelector('.sehir-dropdown-container');
        
        if (!dropdownContainer) {
            dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'sehir-dropdown-container';
            dropdownContainer.innerHTML = `
                <div class="sehir-dropdown-wrapper">
                    <label class="sehir-dropdown-label" id="dropdown-label">${currentCity.name} Makina Seçin:</label>
                    <select class="sehir-dropdown-select" id="sehir-dropdown">
                        <option value="">Makina seçin...</option>
                        <!-- Options JavaScript ile eklenecek -->
                    </select>
                </div>
            `;
            
            buttonsContainer.parentNode.insertBefore(dropdownContainer, buttonsContainer.nextSibling);
        }
        
        return true;
    }
    
    // === 7. DROPDOWN İÇERİĞİ ===
    const machineData = {
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
    
    function updateDropdown(cityId) {
        const select = document.getElementById('sehir-dropdown');
        const label = document.getElementById('dropdown-label');
        
        if (!select || !label) return;
        
        // Temizle
        select.innerHTML = '<option value="">Makina seçin...</option>';
        
        // Seçenekleri ekle
        const machines = machineData[cityId] || [];
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.url;
            option.textContent = machine.name;
            select.appendChild(option);
        });
        
        // Label'ı güncelle
        const cityName = CITIES.find(c => c.id === cityId)?.name || cityId.toUpperCase();
        label.textContent = `${cityName} Makina Seçin:`;
    }
    
    // === 8. EVENT HANDLER'LAR ===
    function setupEvents() {
        // 1. Buton tıklamaları (Delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sehir-btn')) {
                const cityId = e.target.dataset.city;
                const cityName = e.target.dataset.cityName;
                
                // Aktif butonu değiştir
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Header'daki şehir adını güncelle (SADECE TEXT)
                updateHeaderCity(cityName);
                
                // Dropdown'ı güncelle
                currentCity = CITIES.find(c => c.id === cityId) || CITIES[0];
                updateDropdown(cityId);
                
                // Custom event
                document.dispatchEvent(new CustomEvent('cityChanged', {
                    detail: { cityId, cityName }
                }));
            }
        });
        
        // 2. Dropdown değişimi
        document.addEventListener('change', (e) => {
            if (e.target.id === 'sehir-dropdown' && e.target.value) {
                // Sayfa değiştirme (isteğe bağlı gecikme)
                setTimeout(() => {
                    window.location.href = e.target.value;
                }, 100);
            }
        });
    }
    
    // === 9. SAYFA İÇERİĞİNİ GÜNCELLE ===
    function updatePageContent(cityId) {
        // Örnek: Dosya bağlantılarını güncelle
        document.querySelectorAll('.doc-button').forEach((button, index) => {
            const currentHref = button.getAttribute('href');
            if (currentHref && currentHref.includes('drive.google.com')) {
                // Link'i güncelle
                const newHref = currentHref.replace(
                    /(aksaray|bursa|manisa|kocaeli)/,
                    cityId
                );
                button.setAttribute('href', newHref);
                
                // Buton metnini güncelle
                const cityName = CITIES.find(c => c.id === cityId)?.name || '';
                button.textContent = `${cityName} Dosya-${index + 1}`;
            }
        });
    }
    
    // === 10. BAŞLATMA ===
    function init() {
        console.log('🚀 Şehir Sistemi Başlatılıyor...');
        
        // Sıralı işlemler
        injectCSS();
        createButtons();
        setupHeaderCity();
        createDropdown();
        setupEvents();
        
        // İlk yükleme
        updateDropdown(currentCity.id);
        updatePageContent(currentCity.id);
        
        console.log('✅ Şehir Sistemi Hazır!');
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
            if (button) button.click();
        },
        getCurrentSehir: () => currentCity,
        addMachine: (cityId, machineName, machineUrl) => {
            if (!machineData[cityId]) machineData[cityId] = [];
            machineData[cityId].push({ name: machineName, url: machineUrl });
            
            if (currentCity.id === cityId) {
                updateDropdown(cityId);
            }
        }
    };
    
})();
