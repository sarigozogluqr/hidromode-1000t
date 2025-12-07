// sehir-sistemi-son.js - TÜM İSTENEN ÖZELLİKLER
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
            { name: "Makina Bakım", url: "bursa-bakim.html" },
            { name: "Robotik Kol", url: "bursa-robotik.html" },
            { name: "Konveyör Sistemi", url: "bursa-konveyor.html" }
        ],
        manisa: [
            { name: "Ofis Otomasyon", url: "manisa-ofis.html" },
            { name: "Yönetim Paneli", url: "manisa-panel.html" },
            { name: "Raporlama Sistemi", url: "manisa-rapor.html" },
            { name: "Güvenlik Yazılımları", url: "manisa-guvenlik.html" },
            { name: "ERP Sistemi", url: "manisa-erp.html" },
            { name: "İnsan Kaynakları", url: "manisa-ik.html" }
        ],
        kocaeli: [
            { name: "IoT Sistemleri", url: "kocaeli-iot.html" },
            { name: "Akıllı Şehir", url: "kocaeli-akilli-sehir.html" },
            { name: "AR-GE Projeleri", url: "kocaeli-arge.html" },
            { name: "İnovasyon", url: "kocaeli-inovasyon.html" },
            { name: "Sensör Ağı", url: "kocaeli-sensor.html" },
            { name: "Veri Analitiği", url: "kocaeli-analitik.html" }
        ]
    };
    
    let currentCity = CITIES[0];
    
    // === 2. CSS EKLEME ===
    function injectCSS() {
        if (document.getElementById('sehir-sistem-css')) return;
        
        const css = `
            /* ŞEHİR BUTONLARI - YAN YANA, TAM GENİŞLİK */
            .sehir-butonlari-container {
                width: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .sehir-butonlari-wrapper {
                display: flex; /* YAN YANA */
                width: 100%;
            }
            
            .sehir-btn {
                flex: 1; /* EŞİT GENİŞLİK */
                padding: 18px 10px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                color: #333;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                text-align: center;
                letter-spacing: 0.5px;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .sehir-btn:last-child {
                border-right: none;
            }
            
            .sehir-btn:hover {
                background: white;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                z-index: 2;
            }
            
            .sehir-btn.active {
                background: white;
                color: #230564;
                font-weight: 800;
                box-shadow: 0 0 20px rgba(35, 5, 100, 0.3);
                z-index: 3;
            }
            
            .sehir-btn.active::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #ffcc00, #ff9900);
            }
            
            /* HEADER ŞEHİR ADI - BEYAZ RENK */
            .sehir-adi-header {
                display: inline-block;
                color: white !important; /* BEYAZ RENK */
                font-weight: 700;
                font-size: 1.2em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                padding: 5px 15px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 6px;
                margin-left: 10px;
                animation: slideIn 0.4s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(-10px) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            /* DROPDOWN MENÜ */
            .sehir-dropdown-container {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 25px 30px;
                border-bottom: 3px solid #230564;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            }
            
            .sehir-dropdown-wrapper {
                max-width: 700px;
                margin: 0 auto;
            }
            
            .sehir-dropdown-label {
                display: block;
                margin-bottom: 15px;
                color: #230564;
                font-weight: 800;
                font-size: 18px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .sehir-dropdown-select {
                width: 100%;
                padding: 16px 25px;
                border: 3px solid #230564;
                border-radius: 10px;
                background: white;
                color: #230564;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(35, 5, 100, 0.15);
                appearance: none;
                background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23230564"><path d="M7 10l5 5 5-5z"/></svg>');
                background-repeat: no-repeat;
                background-position: right 20px center;
                background-size: 20px;
            }
            
            .sehir-dropdown-select:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(35, 5, 100, 0.25);
                border-color: #1a044a;
            }
            
            .sehir-dropdown-select:focus {
                outline: none;
                box-shadow: 0 0 0 4px rgba(35, 5, 100, 0.3);
                border-color: #1a044a;
            }
            
            /* BUTONLAR İÇİN RESPONSIVE */
            @media (max-width: 768px) {
                .sehir-butonlari-wrapper {
                    flex-wrap: wrap;
                }
                
                .sehir-btn {
                    flex: 0 0 50%;
                    border-right: 1px solid rgba(0, 0, 0, 0.1);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                .sehir-btn:nth-child(2n) {
                    border-right: none;
                }
                
                .sehir-btn:nth-last-child(-n+2) {
                    border-bottom: none;
                }
                
                .sehir-adi-header {
                    font-size: 1em;
                    margin-left: 5px;
                    padding: 3px 10px;
                }
                
                .sehir-dropdown-select {
                    padding: 14px 20px;
                    font-size: 15px;
                }
            }
            
            @media (max-width: 480px) {
                .sehir-btn {
                    flex: 0 0 100%;
                    border-right: none;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
    
    // === 3. BUTONLARI OLUŞTUR (YAN YANA) ===
    function createButtons() {
        const header = document.querySelector('.header');
        if (!header) {
            console.error('❌ Header bulunamadı!');
            return false;
        }
        
        // Eğer zaten varsa güncelle
        let container = document.querySelector('.sehir-butonlari-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'sehir-butonlari-container';
            container.id = 'city-buttons-container';
            
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
            
            // Header'dan hemen sonra ekle
            if (header.nextSibling) {
                header.parentNode.insertBefore(container, header.nextSibling);
            } else {
                header.parentNode.appendChild(container);
            }
        }
        
        return true;
    }
    
    // === 4. HEADER'A ŞEHİR ADI EKLE (BEYAZ RENK) ===
    function setupHeaderCity() {
        const headerH1 = document.querySelector('.header h1');
        if (!headerH1) {
            console.error('❌ Header h1 bulunamadı!');
            return;
        }
        
        // Mevcut text'i kontrol et
        const currentHTML = headerH1.innerHTML;
        
        // Eğer şehir adı span'ı yoksa ekle
        if (!currentHTML.includes('sehir-adi-header')) {
            // "SARIGÖZOĞLU" dan sonra şehir adı ekle
            if (currentHTML.includes('SARIGÖZOĞLU')) {
                headerH1.innerHTML = currentHTML.replace(
                    'SARIGÖZOĞLU', 
                    'SARIGÖZOĞLU <span class="sehir-adi-header" id="current-city-name">' + currentCity.name + '</span>'
                );
            } else {
                // Farklı format ise sona ekle
                const span = document.createElement('span');
                span.className = 'sehir-adi-header';
                span.id = 'current-city-name';
                span.textContent = currentCity.name;
                headerH1.appendChild(span);
            }
        }
    }
    
    // === 5. HEADER'DA SADECE ŞEHİR ADINI DEĞİŞTİR (BEYAZ) ===
    function updateHeaderCity(cityName) {
        const citySpan = document.getElementById('current-city-name');
        if (citySpan) {
            // Smooth animasyon
            citySpan.style.opacity = '0.5';
            citySpan.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                citySpan.textContent = cityName;
                citySpan.style.opacity = '1';
                citySpan.style.transform = 'scale(1)';
            }, 150);
        } else {
            // Eğer span yoksa oluştur
            setupHeaderCity();
            updateHeaderCity(cityName);
        }
    }
    
    // === 6. DROPDOWN OLUŞTUR ===
    function createDropdown() {
        const buttonsContainer = document.getElementById('city-buttons-container');
        if (!buttonsContainer) {
            console.error('❌ Buton container bulunamadı!');
            return false;
        }
        
        // Eğer zaten varsa güncelle
        let dropdownContainer = document.querySelector('.sehir-dropdown-container');
        
        if (!dropdownContainer) {
            dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'sehir-dropdown-container';
            dropdownContainer.id = 'city-dropdown-container';
            dropdownContainer.innerHTML = `
                <div class="sehir-dropdown-wrapper">
                    <label class="sehir-dropdown-label" id="dropdown-label">${currentCity.name} MAKİNA SEÇİN:</label>
                    <select class="sehir-dropdown-select" id="machine-dropdown">
                        <option value="">Makina seçin...</option>
                    </select>
                </div>
            `;
            
            // Butonlardan sonra ekle
            if (buttonsContainer.nextSibling) {
                buttonsContainer.parentNode.insertBefore(dropdownContainer, buttonsContainer.nextSibling);
            } else {
                buttonsContainer.parentNode.appendChild(dropdownContainer);
            }
        }
        
        return true;
    }
    
    // === 7. DROPDOWN İÇERİĞİNİ GÜNCELLE (URL GEÇİŞLERİ İÇİN) ===
    function updateDropdown(cityId) {
        const select = document.getElementById('machine-dropdown');
        const label = document.getElementById('dropdown-label');
        
        if (!select || !label) {
            console.error('❌ Dropdown elementleri bulunamadı!');
            return;
        }
        
        // Önceki seçimi kaydet
        const previousValue = select.value;
        
        // Temizle
        select.innerHTML = '<option value="">Makina seçin...</option>';
        
        // Seçenekleri ekle
        const machines = MACHINE_DATA[cityId] || [];
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.url;
            option.textContent = machine.name;
            
            // Eğer bu URL şu anki sayfaysa seçili yap
            if (machine.url === window.location.pathname.split('/').pop() || 
                machine.url === window.location.href) {
                option.selected = true;
            }
            
            select.appendChild(option);
        });
        
        // Eğer hiçbiri seçili değilse ve önceki bir değer varsa, onu koru
        if (!select.value && previousValue && previousValue !== '') {
            const prevOption = Array.from(select.options).find(opt => opt.value === previousValue);
            if (prevOption) prevOption.selected = true;
        }
        
        // Label'ı güncelle
        const city = CITIES.find(c => c.id === cityId);
        if (city) {
            label.textContent = `${city.name} MAKİNA SEÇİN:`;
        }
    }
    
    // === 8. SAYFA İÇERİĞİNİ GÜNCELLE (URL GEÇİŞLERİ) ===
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
                
                // Buton metnini güncelle
                if (link.classList.contains('doc-button')) {
                    const city = CITIES.find(c => c.id === cityId);
                    if (city) {
                        link.textContent = `${city.name} Dosya-${index + 1}`;
                        link.title = `${city.name} - ${index + 1}. dosya`;
                    }
                }
            }
        });
        
        // Sayfa başlıklarını güncelle
        document.querySelectorAll('h1, h2, h3, .section-title, .page-title').forEach(title => {
            const text = title.textContent;
            if (text) {
                const cityPattern = /(AKSARAY|BURSA|MANİSA|KOCAELİ)/;
                if (cityPattern.test(text)) {
                    const city = CITIES.find(c => c.id === cityId);
                    if (city) {
                        title.textContent = text.replace(cityPattern, city.name);
                    }
                }
            }
        });
        
        // URL'yi de güncelleyelim (isteğe bağlı)
        updateCurrentUrl(cityId);
    }
    
    // === 9. URL GÜNCELLEME ===
    function updateCurrentUrl(cityId) {
        // Şu anki URL'de şehir parametresi varsa güncelle
        const url = new URL(window.location.href);
        if (url.searchParams.has('sehir')) {
            url.searchParams.set('sehir', cityId);
            window.history.replaceState({}, '', url);
        }
    }
    
    // === 10. EVENT HANDLER'LAR ===
    function setupEventHandlers() {
        // 1. Şehir butonları için EVENT DELEGATION
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sehir-btn')) {
                handleCityButtonClick(e.target);
            }
        });
        
        // 2. Dropdown değişimi
        document.addEventListener('change', (e) => {
            if (e.target.id === 'machine-dropdown') {
                handleDropdownChange(e.target);
            }
        });
        
        // 3. Sayfa yüklendiğinde aktif şehri kontrol et
        window.addEventListener('load', () => {
            checkCurrentPageCity();
        });
    }
    
    function handleCityButtonClick(button) {
        const cityId = button.dataset.city;
        const cityName = button.dataset.cityName;
        
        // Tüm butonlardan active class'ını kaldır
        document.querySelectorAll('.sehir-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Tıklanan butona active class'ını ekle
        button.classList.add('active');
        
        // Mevcut şehri güncelle
        currentCity = CITIES.find(c => c.id === cityId) || CITIES[0];
        
        // Header'daki şehir adını güncelle (BEYAZ)
        updateHeaderCity(cityName);
        
        // Dropdown'ı güncelle
        updateDropdown(cityId);
        
        // Sayfa içeriğini güncelle
        updatePageContent(cityId);
        
        // Custom event tetikle
        document.dispatchEvent(new CustomEvent('sehirDegisti', {
            detail: { 
                cityId, 
                cityName,
                timestamp: new Date().toISOString()
            }
        }));
        
        console.log(`📍 Şehir değiştirildi: ${cityName}`);
    }
    
    function handleDropdownChange(select) {
        if (select.value) {
            // URL'ye git
            console.log(`🌐 Sayfa değiştiriliyor: ${select.value}`);
            
            // Kısa bir animasyon için bekle
            select.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                select.style.transform = 'scale(1)';
                window.location.href = select.value;
            }, 200);
        }
    }
    
    function checkCurrentPageCity() {
        // URL'den veya sayfa içeriğinden şehri tespit et
        const url = window.location.href;
        const path = window.location.pathname;
        
        // URL'de şehir adı var mı kontrol et
        for (const city of CITIES) {
            if (url.includes(city.id) || path.includes(city.id)) {
                // Bu şehre geç
                const button = document.querySelector(`.sehir-btn[data-city="${city.id}"]`);
                if (button) {
                    button.click();
                    break;
                }
            }
        }
    }
    
    // === 11. BAŞLATMA FONKSİYONU ===
    function init() {
        console.log('🚀 Şehir Sistemi Başlatılıyor...');
        
        try {
            // Sıralı işlemler
            injectCSS();
            
            if (!createButtons()) {
                throw new Error('Butonlar oluşturulamadı');
            }
            
            setupHeaderCity();
            
            if (!createDropdown()) {
                throw new Error('Dropdown oluşturulamadı');
            }
            
            setupEventHandlers();
            
            // İlk yükleme
            updateDropdown(currentCity.id);
            updatePageContent(currentCity.id);
            
            console.log('✅ Şehir Sistemi Başarıyla Yüklendi!');
            console.log('📌 Özellikler:');
            console.log('   • Butonlar yan yana');
            console.log('   • Header şehir adı BEYAZ');
            console.log('   • Dropdown URL geçişleri aktif');
            
        } catch (error) {
            console.error('❌ Hata:', error);
            // Hata durumunda 3 saniye sonra tekrar dene
            setTimeout(init, 3000);
        }
    }
    
    // === 12. DOM HAZIR OLUNCA ÇALIŞTIR ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM zaten hazır, hemen başlat
        setTimeout(init, 100);
    }
    
    // === 13. GLOBAL API ===
    window.SehirSistemi = {
        // Şehir değiştir
        setSehir: (cityId) => {
            const button = document.querySelector(`.sehir-btn[data-city="${cityId}"]`);
            if (button) {
                button.click();
                return true;
            }
            console.warn(`⚠️ Şehir butonu bulunamadı: ${cityId}`);
            return false;
        },
        
        // Aktif şehri getir
        getSehir: () => currentCity,
        
        // Yeni makine ekle
        addMakina: (cityId, makinaAdi, makinaUrl) => {
            if (!MACHINE_DATA[cityId]) {
                MACHINE_DATA[cityId] = [];
            }
            
            MACHINE_DATA[cityId].push({ 
                name: makinaAdi, 
                url: makinaUrl 
            });
            
            // Eğer bu şehir aktifse dropdown'u güncelle
            if (currentCity.id === cityId) {
                updateDropdown(cityId);
            }
            
            console.log(`➕ Yeni makine eklendi: ${cityId} - ${makinaAdi}`);
            return true;
        },
        
        // Makineleri listele
        getMakineler: (cityId) => {
            return MACHINE_DATA[cityId] || [];
        },
        
        // Yeni şehir ekle
        addSehir: (cityId, cityName, makineler = []) => {
            CITIES.push({ id: cityId, name: cityName.toUpperCase() });
            MACHINE_DATA[cityId] = makineler;
            
            // Butonları yeniden oluştur
            createButtons();
            
            console.log(`➕ Yeni şehir eklendi: ${cityName}`);
            return true;
        }
    };
    
})();
