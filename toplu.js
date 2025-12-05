// city-system.js - TÜM SİSTEMİ BİRLEŞTİRİR
// Kullanım: <script src="city-system.js"></script>

(function() {
    console.log('🚀 Şehir Sistemi Başlatılıyor...');
    
    // 1. TÜM CSS'LERİ BİRLEŞTİR
    const addAllStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* BUTON STİLLERİ */
            .city-buttons-container { 
                background: #f0f0f0; 
                padding: 15px; 
                border-bottom: 2px solid #ddd; 
            }
            .city-buttons-wrapper { 
                display: flex; 
                justify-content: center; 
                gap: 15px; 
                flex-wrap: wrap; 
            }
            .city-btn { 
                padding: 12px 25px; 
                background: white; 
                border: 2px solid #230564; 
                border-radius: 8px; 
                color: #230564; 
                font-weight: bold; 
                cursor: pointer; 
                transition: all 0.3s ease; 
                font-size: 16px; 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            }
            .city-btn:hover { 
                background: #230564; 
                color: white; 
                transform: translateY(-2px); 
            }
            .city-btn.active { 
                background: #230564; 
                color: white; 
                box-shadow: 0 4px 10px rgba(35, 5, 100, 0.3); 
            }
            .city-name-in-header { 
                color: #ffcc00; 
                font-weight: 700; 
            }
            
            /* DROPDOWN STİLLERİ */
            .dropdown-manager-container {
                background: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #ddd;
            }
            .dropdown-manager-wrapper {
                max-width: 500px;
                margin: 0 auto;
            }
            .dropdown-manager-label {
                display: block;
                margin-bottom: 8px;
                color: #230564;
                font-weight: 600;
                font-size: 16px;
            }
            .dropdown-manager-select {
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
            .dropdown-manager-select:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(35, 5, 100, 0.2);
            }
            
            /* İÇERİK STİLLERİ */
            .dynamic-content-container {
                padding: 30px;
            }
            .city-button-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            .city-doc-button {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #230564;
                color: white;
                text-decoration: none;
                padding: 16px 20px;
                border-radius: 10px;
                font-weight: 500;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(25, 25, 112, 0.3);
            }
            .city-doc-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(25, 25, 112, 0.4);
                background: #1a044a;
            }
            .city-doc-icon {
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    };
    
    // 2. BUTON SİSTEMİ
    const initCityButtons = () => {
        const addButtonStyles = () => {
            // CSS zaten eklendi
        };

        const createButtonsHTML = () => {
            return `
            <div class="city-buttons-container">
                <div class="city-buttons-wrapper">
                    <button class="city-btn active" data-city="aksaray">AKSARAY</button>
                    <button class="city-btn" data-city="konya">KONYA</button>
                    <button class="city-btn" data-city="ankara">ANKARA</button>
                    <button class="city-btn" data-city="istanbul">İSTANBUL</button>
                </div>
            </div>
            `;
        };

        const updateHeaderCity = (cityName) => {
            let citySpan = document.getElementById('header-city-name');
            
            if (!citySpan) {
                const headerH1 = document.querySelector('.header h1');
                if (headerH1) {
                    const text = headerH1.textContent || headerH1.innerText;
                    const words = text.split(' ');
                    if (words.length > 1) {
                        const lastName = words.pop();
                        headerH1.innerHTML = words.join(' ') + 
                            ' <span id="header-city-name" class="city-name-in-header">' + 
                            lastName + 
                            '</span>';
                        citySpan = document.getElementById('header-city-name');
                    }
                }
            }
            
            if (citySpan) {
                citySpan.textContent = cityName;
            }
        };

        const setupButtonEvents = () => {
            const buttons = document.querySelectorAll('.city-btn');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const cityName = this.textContent;
                    const cityId = this.getAttribute('data-city');
                    
                    buttons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    updateHeaderCity(cityName);
                    
                    const cityChangeEvent = new CustomEvent('cityButtonClicked', {
                        detail: { cityId: cityId, cityName: cityName }
                    });
                    document.dispatchEvent(cityChangeEvent);
                });
            });
        };

        const insertButtonsToPage = () => {
            const container = document.querySelector('.container');
            const header = document.querySelector('.header');
            
            if (container && header) {
                const buttonsContainer = document.createElement('div');
                buttonsContainer.innerHTML = createButtonsHTML();
                header.parentNode.insertBefore(buttonsContainer, header.nextSibling);
                return true;
            }
            return false;
        };

        const init = () => {
            const inserted = insertButtonsToPage();
            if (inserted) {
                setupButtonEvents();
                updateHeaderCity('AKSARAY');
                console.log('✅ Şehir Butonları eklendi');
                return true;
            }
            return false;
        };

        return init();
    };
    
    // 3. DROPDOWN SİSTEMİ
    const initDropdownManager = () => {
        const cityDropdownOptions = {
            aksaray: [
                { value: "temel-kodlar", text: "Temel Kodlar" },
                { value: "fabrika-otomasyon", text: "Fabrika Otomasyon" },
                { value: "veritabani", text: "Veritabanı Scriptleri" }
            ],
            konya: [
                { value: "cnc-programlar", text: "CNC Programları" },
                { value: "kalite-kontrol", text: "Kalite Kontrol" },
                { value: "uretim-hatti", text: "Üretim Hattı" }
            ],
            ankara: [
                { value: "ofis-otomasyon", text: "Ofis Otomasyon" },
                { value: "yonetim-paneli", text: "Yönetim Paneli" },
                { value: "rapor-sistem", text: "Raporlama Sistemi" }
            ],
            istanbul: [
                { value: "iot-sistem", text: "IoT Sistemleri" },
                { value: "akilli-sehir", text: "Akıllı Şehir" },
                { value: "ar-ge", text: "AR-GE Projeleri" }
            ]
        };

        const createDropdownHTML = () => {
            return `
            <div class="dropdown-manager-container">
                <div class="dropdown-manager-wrapper">
                    <label class="dropdown-manager-label" id="dropdown-label">
                        İçerik Seçin:
                    </label>
                    <select class="dropdown-manager-select" id="city-dropdown">
                        <option value="">Seçiniz...</option>
                    </select>
                </div>
            </div>
            `;
        };

        const insertDropdown = () => {
            const cityButtons = document.querySelector('.city-buttons-container');
            if (cityButtons) {
                const dropdownHTML = createDropdownHTML();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = dropdownHTML;
                cityButtons.parentNode.insertBefore(tempDiv.firstChild, cityButtons.nextSibling);
                return true;
            }
            return false;
        };

        const updateDropdownOptions = (cityId) => {
            const dropdown = document.getElementById('city-dropdown');
            const label = document.getElementById('dropdown-label');
            
            if (!dropdown || !label) return;
            
            dropdown.innerHTML = '<option value="">Seçiniz...</option>';
            const options = cityDropdownOptions[cityId] || cityDropdownOptions.aksaray;
            
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                dropdown.appendChild(optionElement);
            });
            
            const cityNames = { aksaray: 'AKSARAY', konya: 'KONYA', ankara: 'ANKARA', istanbul: 'İSTANBUL' };
            label.textContent = `${cityNames[cityId] || cityId.toUpperCase()} İçerik Seçin:`;
            
            if (!dropdown.hasAttribute('data-events-bound')) {
                dropdown.addEventListener('change', function(event) {
                    const selectedValue = event.target.value;
                    if (selectedValue) {
                        const activeBtn = document.querySelector('.city-btn.active');
                        const cityId = activeBtn ? activeBtn.getAttribute('data-city') : 'aksaray';
                        
                        const changeEvent = new CustomEvent('dropdownOptionSelected', {
                            detail: {
                                value: selectedValue,
                                text: event.target.options[event.target.selectedIndex].text,
                                cityId: cityId
                            }
                        });
                        document.dispatchEvent(changeEvent);
                    }
                });
                dropdown.setAttribute('data-events-bound', 'true');
            }
        };

        const init = () => {
            const inserted = insertDropdown();
            
            if (inserted) {
                document.addEventListener('cityButtonClicked', function(event) {
                    updateDropdownOptions(event.detail.cityId);
                });
                
                const defaultCity = document.querySelector('.city-btn.active')?.getAttribute('data-city') || 'aksaray';
                updateDropdownOptions(defaultCity);
                
                console.log('✅ Dropdown Manager eklendi');
                return true;
            }
            return false;
        };

        return init();
    };
    
    // 4. İÇERİK GÜNCELLEYİCİ
    const initContentUpdater = () => {
        const cityContentData = {
            aksaray: {
                "temel-kodlar": {
                    title: "AKSARAY - Temel Kodlar",
                    files: [
                        { name: "Temel Fonksiyonlar", link: "https://drive.google.com/file/d/aksaray1=sharing" },
                        { name: "Başlangıç Scriptleri", link: "https://drive.google.com/file/d/aksaray2=sharing" }
                    ]
                },
                "fabrika-otomasyon": {
                    title: "AKSARAY - Fabrika Otomasyon",
                    files: [
                        { name: "Üretim Hattı Kodları", link: "https://drive.google.com/file/d/aksaray3=sharing" },
                        { name: "Konveyör Sistemi", link: "https://drive.google.com/file/d/aksaray4=sharing" }
                    ]
                }
            },
            konya: {
                "cnc-programlar": {
                    title: "KONYA - CNC Programları",
                    files: [
                        { name: "CNC Temel Kodlar", link: "https://drive.google.com/file/d/konya1=sharing" },
                        { name: "İleri CNC Programlama", link: "https://drive.google.com/file/d/konya2=sharing" }
                    ]
                }
            },
            ankara: {
                "ofis-otomasyon": {
                    title: "ANKARA - Ofis Otomasyon",
                    files: [
                        { name: "Ofis Yazılımları", link: "https://drive.google.com/file/d/ankara1=sharing" },
                        { name: "Yönetim Paneli", link: "https://drive.google.com/file/d/ankara2=sharing" }
                    ]
                }
            },
            istanbul: {
                "iot-sistem": {
                    title: "İSTANBUL - IoT Sistemleri",
                    files: [
                        { name: "IoT Temel Kodlar", link: "https://drive.google.com/file/d/istanbul1=sharing" },
                        { name: "Akıllı Sistemler", link: "https://drive.google.com/file/d/istanbul2=sharing" }
                    ]
                }
            }
        };

        const loadContent = (cityId, optionValue) => {
            const cityData = cityContentData[cityId];
            if (!cityData) {
                console.warn(`Şehir verisi bulunamadı: ${cityId}`);
                return;
            }
            
            const content = cityData[optionValue];
            if (!content) {
                console.warn(`İçerik bulunamadı: ${cityId} - ${optionValue}`);
                return;
            }
            
            // Mevcut içeriği temizle veya yeni container oluştur
            let container = document.getElementById('dynamic-content-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dynamic-content-container';
                container.className = 'dynamic-content-container';
                
                const dropdown = document.querySelector('.dropdown-manager-container');
                const existingContent = document.querySelector('.content');
                
                if (dropdown && existingContent) {
                    // Mevcut içeriği değiştir
                    existingContent.parentNode.removeChild(existingContent);
                    dropdown.parentNode.insertBefore(container, dropdown.nextSibling);
                } else if (dropdown) {
                    dropdown.parentNode.insertBefore(container, dropdown.nextSibling);
                }
            }
            
            const html = `
                <div class="doc-section">
                    <h2 class="section-title">${content.title}</h2>
                    <div class="city-button-grid">
                        ${content.files.map(file => `
                            <a href="${file.link}" class="city-doc-button" target="_blank">
                                <span>${file.name}</span>
                                <span class="city-doc-icon">📁</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
            
            container.innerHTML = html;
        };

        const init = () => {
            // Şehir değiştiğinde
            document.addEventListener('cityButtonClicked', function(event) {
                const cityId = event.detail.cityId;
                const dropdown = document.getElementById('city-dropdown');
                if (dropdown && dropdown.options.length > 1) {
                    dropdown.selectedIndex = 1;
                    loadContent(cityId, dropdown.value);
                }
            });
            
            // Dropdown seçeneği değiştiğinde
            document.addEventListener('dropdownOptionSelected', function(event) {
                if (event.detail.value) {
                    loadContent(event.detail.cityId, event.detail.value);
                }
            });
            
            // İlk yükleme
            const defaultCity = document.querySelector('.city-btn.active')?.getAttribute('data-city') || 'aksaray';
            setTimeout(() => {
                const dropdown = document.getElementById('city-dropdown');
                if (dropdown && dropdown.options.length > 1) {
                    dropdown.selectedIndex = 1;
                    loadContent(defaultCity, dropdown.value);
                }
            }, 500);
            
            console.log('✅ İçerik Güncelleyici eklendi');
            return true;
        };

        return init();
    };
    
    // 5. ANA BAŞLATMA FONKSİYONU
    const startCitySystem = () => {
        console.log('🔄 Şehir Sistemi kuruluyor...');
        
        // 1. Tüm CSS'leri ekle
        addAllStyles();
        
        // 2. Butonları ekle (en önemli - diğerleri buna bağlı)
        const buttonsReady = initCityButtons();
        if (!buttonsReady) {
            console.error('❌ Şehir butonları eklenemedi!');
            return;
        }
        
        // 3. Kısa bekleme süresi
        setTimeout(() => {
            // 4. Dropdown'ı ekle
            const dropdownReady = initDropdownManager();
            
            if (dropdownReady) {
                // 5. İçerik güncelleyiciyi ekle
                setTimeout(() => {
                    initContentUpdater();
                    console.log('🎉 Şehir Sistemi başarıyla kuruldu!');
                    
                    // Başarı event'i tetikle
                    document.dispatchEvent(new CustomEvent('citySystemReady'));
                }, 300);
            }
        }, 200);
    };
    
    // 6. SAYFA HAZIR OLUNCA BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCitySystem);
    } else {
        startCitySystem();
    }
    
    // 7. GLOBAL FONKSİYONLAR (isteğe bağlı)
    window.CitySystem = {
        addCity: function(cityId, cityName, dropdownOptions, contentData) {
            // Yeni şehir butonu ekle
            const buttonsWrapper = document.querySelector('.city-buttons-wrapper');
            if (buttonsWrapper) {
                const newButton = document.createElement('button');
                newButton.className = 'city-btn';
                newButton.setAttribute('data-city', cityId);
                newButton.textContent = cityName;
                
                newButton.addEventListener('click', function() {
                    const allButtons = document.querySelectorAll('.city-btn');
                    allButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const citySpan = document.getElementById('header-city-name');
                    if (citySpan) citySpan.textContent = cityName;
                    
                    document.dispatchEvent(new CustomEvent('cityButtonClicked', {
                        detail: { cityId: cityId, cityName: cityName }
                    }));
                });
                
                buttonsWrapper.appendChild(newButton);
                console.log(`✅ Yeni şehir eklendi: ${cityName}`);
            }
        },
        reload: function() {
            startCitySystem();
        }
    };
})();
