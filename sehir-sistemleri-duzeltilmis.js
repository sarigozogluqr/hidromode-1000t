// sehir-sistemleri-duzeltilmis.js - DÜZELTİLMİŞ VERSİYON
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
    let citySpan = null;
    
    // === 2. CSS EKLEME (DÜZELTİLDİ) ===
    function injectCSS() {
        if (document.getElementById('sehir-sistem-css')) return;
        
        const css = `
            /* ŞEHİR BUTONLARI - TAM GENİŞLİK, YAN YANA */
            .sehir-butonlari-container {
                width: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .sehir-butonlari-wrapper {
                display: flex; /* YAN YANA - SABİT */
                width: 100%;
                flex-wrap: nowrap; /* ASLA ALT ALTA GEÇMESİN */
            }
            
            .sehir-btn {
                flex: 1;
                padding: 16px 5px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                color: #333;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
                white-space: nowrap; /* METİN KAYMASIN */
                overflow: hidden;
                text-overflow: ellipsis;
                min-height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .sehir-btn:last-child {
                border-right: none;
            }
            
            .sehir-btn:hover {
                background: white;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .sehir-btn.active {
                background: white;
                color: #230564;
                font-weight: 800;
                box-shadow: 0 0 20px rgba(35, 5, 100, 0.3);
                position: relative;
            }
            
            .sehir-btn.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #ffcc00, #ff9900);
            }
            
            /* MOBİL İÇİN - BUTONLAR YAN YANA KALSIN (KÜÇÜK YAZI) */
            @media (max-width: 768px) {
                .sehir-btn {
                    padding: 12px 3px;
                    font-size: 12px;
                    min-height: 45px;
                }
                
                .sehir-butonlari-wrapper {
                    flex-wrap: nowrap; /* ÖNEMLİ: ASLA ALT ALTA GEÇMESİN */
                    overflow-x: auto; /* YATAY KAYDIRMA */
                    -webkit-overflow-scrolling: touch;
                }
                
                .sehir-btn {
                    flex: 0 0 25%; /* HER BİRİ %25 GENİŞLİK */
                    min-width: 80px; /* MIN GENİŞLİK */
                }
            }
            
            @media (max-width: 480px) {
                .sehir-btn {
                    font-size: 11px;
                    padding: 10px 2px;
                    min-height: 40px;
                }
            }
            
            /* HEADER ŞEHİR ADI - BEYAZ RENK, TEK SPAN (DÜZELTİLDİ) */
            .sehir-adi-header {
                color: white !important;
                font-weight: 700;
                font-size: 1.2em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                margin-left: 10px;
                background: rgba(255, 255, 255, 0.15);
                padding: 4px 12px;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: inline-block;
            }
            
            /* DROPDOWN MENÜ */
            .sehir-dropdown-container {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 20px 15px;
                border-bottom: 3px solid #230564;
            }
            
            .sehir-dropdown-wrapper {
                max-width: 100%;
                margin: 0 auto;
            }
            
            .sehir-dropdown-label {
                display: block;
                margin-bottom: 10px;
                color: #230564;
                font-weight: 700;
                font-size: 16px;
                text-align: center;
            }
            
            .sehir-dropdown-select {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #230564;
                border-radius: 8px;
                background: white;
                color: #230564;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
            }
            
            /* MOBİL DROPDOWN */
            @media (max-width: 768px) {
                .sehir-dropdown-container {
                    padding: 15px 10px;
                }
                
                .sehir-dropdown-label {
                    font-size: 14px;
                }
                
                .sehir-dropdown-select {
                    padding: 10px 12px;
                    font-size: 13px;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'sehir-sistem-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // === 3. BUTONLARI OLUŞTUR (DÜZELTİLDİ) ===
    function createButtons() {
        // Eski butonları temizle
        const oldContainer = document.querySelector('.sehir-butonlari-container');
        if (oldContainer) oldContainer.remove();
        
        const header = document.querySelector('.header');
        if (!header) {
            console.error('❌ Header bulunamadı!');
            return false;
        }
        
        // Container oluştur
        const container = document.createElement('div');
        container.className = 'sehir-butonlari-container';
        container.id = 'city-buttons-container';
        
        // Wrapper oluştur
        const wrapper = document.createElement('div');
        wrapper.className = 'sehir-butonlari-wrapper';
        
        // Butonları oluştur
        CITIES.forEach((city, index) => {
            const button = document.createElement('button');
            button.className = `sehir-btn ${index === 0 ? 'active' : ''}`;
            button.dataset.city = city.id;
            button.dataset.cityName = city.name;
            button.textContent = city.name;
            button.type = 'button'; // FORM GÖNDERİLMESİN
            wrapper.appendChild(button);
        });
        
        container.appendChild(wrapper);
        
        // Header'dan sonra ekle
        header.insertAdjacentElement('afterend', container);
        
        return true;
    }
    
    // === 4. HEADER'A ŞEHİR ADI EKLE (DÜZELTİLDİ - TEK SPAN) ===
    function setupHeaderCity() {
        const headerH1 = document.querySelector('.header h1');
        if (!headerH1) return;
        
        // Önceki tüm şehir span'larını temizle
        const oldSpans = headerH1.querySelectorAll('.sehir-adi-header');
        oldSpans.forEach(span => span.remove());
        
        // Tek bir span oluştur
        citySpan = document.createElement('span');
        citySpan.className = 'sehir-adi-header';
        citySpan.id = 'current-city-name';
        citySpan.textContent = currentCity.name;
        
        // "SARIGÖZOĞLU" yazısından sonra ekle
        const headerText = headerH1.textContent || headerH1.innerText;
        
        if (headerText.includes('SARIGÖZOĞLU')) {
            // Sadece SARIGÖZOĞLU'yu bırak, şehri span olarak ekle
            headerH1.innerHTML = 'SARIGÖZOĞLU ';
            headerH1.appendChild(citySpan);
        } else {
            // Mevcut metni koru, sonuna şehir span'ını ekle
            headerH1.innerHTML = headerText + ' ';
            headerH1.appendChild(citySpan);
        }
        
        console.log('✅ Header şehir adı eklendi:', currentCity.name);
    }
    
    // === 5. HEADER'DA ŞEHİR ADINI DEĞİŞTİR (DÜZELTİLDİ) ===
    function updateHeaderCity(cityName) {
        if (!citySpan) {
            // Eğer span yoksa oluştur
            setupHeaderCity();
        }
        
        if (citySpan) {
            // SADECE TEXT DEĞİŞTİR, YENİ SPAN OLUŞTURMA
            citySpan.textContent = cityName;
            console.log('🔄 Header şehir adı güncellendi:', cityName);
        } else {
            console.error('❌ Şehir span bulunamadı!');
        }
    }
    
    // === 6. DROPDOWN OLUŞTUR ===
    function createDropdown() {
        // Eski dropdown'ı temizle
        const oldDropdown = document.querySelector('.sehir-dropdown-container');
        if (oldDropdown) oldDropdown.remove();
        
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
        
        buttonsContainer.insertAdjacentElement('afterend', container);
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
        const docButtons = document.querySelectorAll('.doc-button');
        docButtons.forEach((link, index) => {
            const href = link.getAttribute('href');
            if (href && href.includes('drive.google.com')) {
                const newHref = href.replace(
                    /(aksaray|bursa|manisa|kocaeli)/g,
                    cityId
                );
                link.setAttribute('href', newHref);
                
                const city = CITIES.find(c => c.id === cityId);
                if (city) {
                    link.textContent = `${city.name} Dosya-${index + 1}`;
                }
            }
        });
    }
    
    // === 9. EVENT HANDLER'LAR (DÜZELTİLDİ) ===
    function setupEventHandlers() {
        // 1. ŞEHİR BUTONLARI - EVENT DELEGATION
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('sehir-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const cityId = e.target.dataset.city;
                const cityName = e.target.dataset.cityName;
                
                console.log('🖱️ Butona tıklandı:', cityName);
                
                // Tüm butonlardan active class'ını kaldır
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Tıklanan butona active class'ını ekle
                e.target.classList.add('active');
                
                // Mevcut şehri güncelle
                currentCity = CITIES.find(c => c.id === cityId) || CITIES[0];
                
                // Header'daki şehir adını GÜNCELLE (YENİ SPAN OLUŞTURMA)
                updateHeaderCity(cityName);
                
                // Dropdown'ı güncelle
                updateDropdown(cityId);
                
                // Sayfa içeriğini güncelle
                updatePageContent(cityId);
            }
        });
        
        // 2. DROPDOWN DEĞİŞİMİ
        document.addEventListener('change', function(e) {
            if (e.target.id === 'machine-dropdown' && e.target.value) {
                console.log('🌐 Sayfa değiştiriliyor:', e.target.value);
                setTimeout(() => {
                    window.location.href = e.target.value;
                }, 100);
            }
        });
    }
    
    // === 10. BAŞLATMA FONKSİYONU (DÜZELTİLDİ) ===
    function init() {
        console.log('🚀 Şehir Sistemi Başlatılıyor...');
        
        try {
            // 1. CSS enjekte et
            injectCSS();
            
            // 2. Butonları oluştur
            if (!createButtons()) {
                throw new Error('Butonlar oluşturulamadı');
            }
            
            // 3. Header'a şehir adını ekle (TEK SPAN)
            setupHeaderCity();
            
            // 4. Dropdown'ı oluştur
            if (!createDropdown()) {
                throw new Error('Dropdown oluşturulamadı');
            }
            
            // 5. Event handler'ları kur
            setupEventHandlers();
            
            // 6. İlk yükleme
            updateDropdown(currentCity.id);
            updatePageContent(currentCity.id);
            
            console.log('✅ Şehir Sistemi Başarıyla Yüklendi!');
            console.log('📌 Düzeltmeler:');
            console.log('   • Header şehir adı TEK SPAN (6 tane yazma sorunu çözüldü)');
            console.log('   • Mobilde butonlar YAN YANA (alt alta geçme sorunu çözüldü)');
            console.log('   • Buton tıklamaları düzeltildi');
            
            // Test için
            setTimeout(() => {
                console.log('🧪 Test: Aktif şehir:', currentCity.name);
                console.log('🧪 Test: City span mevcut:', !!citySpan);
            }, 1000);
            
        } catch (error) {
            console.error('❌ Hata:', error);
            // 2 saniye sonra tekrar dene
            setTimeout(init, 2000);
        }
    }
    
    // === 11. DOM HAZIR OLUNCA ÇALIŞTIR ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM zaten hazırsa 100ms sonra başlat
        setTimeout(init, 100);
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
            if (!MACHINE_DATA[cityId]) MACHINE_DATA[cityId] = [];
            MACHINE_DATA[cityId].push({ name: makinaAdi, url: makinaUrl });
            
            if (currentCity.id === cityId) {
                updateDropdown(cityId);
            }
            return true;
        }
    };
    
})();
