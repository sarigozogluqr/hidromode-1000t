(() => {
    'use strict';
    
    console.log('Şehir Sistemi Yükleniyor...');
    
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
            { name: "Stenhoj", url: "stenhoj.html" },
            { name: "Gazaltı-1-2-3", url: "gazalti-1-2-3.html" }
        ],
        bursa: [
            { name: "KUKA" , url: "bursa-kuka.html" }
       ],  
        manisa: [
            { name: "Kuka Robot" , url: "manisa-kuka.html" } 
        ],
        kocaeli: [
            { name: "KUKA Kocaeli", url: "kocaeli-kuka.html" },
        ]    
    };

    function getStateFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const cityId = urlParams.get('city');
        const machineUrl = urlParams.get('machine');

        return {
            cityId: cityId || 'aksaray',
            machineUrl: machineUrl || ''
        };
    }
    function updateURLState(cityId, machineUrl ='') {
        const url = new URL(window.location);
        url.searchParams.set('city', cityId);
        if (machineUrl) {
            url.searchParams.set('machine', machineUrl);
        } else {
            url.searchParams.delete('machine');
        }
        console.log(`Yönlendiriliyor: ${url.toString()}`);
        window.history.replaceState({}, '',url.toString());
    }
    
    let currentCity = CITIES[0];
    let currentMachine = '';
    let originalFileNames = {}; 
  
    function injectCSS() {
        if (document.getElementById('sehir-css')) return;
        const css = `
           
            .sehir-butonlari-container {
                background: #f0f0f0;
                padding: 15px;
                border-bottom: 2px solid #ddd;
                overflow: hidden;
            }
            
            .sehir-butonlari-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
                max-width: 1200px;
                margin: 0 auto;
                flex-wrap: nowrap;
            }
            
            .sehir-btn {
                flex: 1;
                min-width: 120px;
                max-width: 200px;
                padding: 15px 10px;
                background: white;
                border: 2px solid #230564;
                border-radius: 8px;
                color: #230564;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                text-align: center;
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
            }
            
            .sehir-btn:hover {
                background: #230564;
                color: white;
            }
            
            .sehir-btn.active {
                background: #230564;
                color: white;
                box-shadow: 0 4px 10px rgba(35, 5, 100, 0.3);
            }
            
            .sehir-adi-header {
                color: white;
                font-weight: 600;
                margin: 0 auto;
                padding: 5px 15px;
                display: flex;
                justify-content: center; 
            }
        
            .sehir-dropdown-container {
                background: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #ddd;
            }
            
            .sehir-dropdown-wrapper {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .sehir-dropdown-label {
                display: block;
                margin-bottom: 10px;
                color: #230564;
                font-weight: 700;
                text-align: center;
                font-size: 18px;
            }
            
            .sehir-dropdown-select {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #230564;
                border-radius: 8px;
                background: white;
                color: #230564;
                font-size: 16px;
                cursor: pointer;
                font-weight: 300;
                font-style: italic;
            }
            
            .sehir-dropdown-select option {
                padding: 10px;
                font-size: 15px;
            }
                    
            /* Masaüstü (1200px ve üstü) */
            @media (min-width: 1200px) {
                .sehir-butonlari-wrapper {
                    gap: 20px;
                }
                .sehir-btn {
                    font-size: 18px;
                    height: 65px;
                }
            }
            
            /* Laptop (992px - 1199px) */
            @media (min-width: 992px) and (max-width: 1199px) {
                .sehir-butonlari-wrapper {
                    gap: 15px;
                }
                .sehir-btn {
                    font-size: 16px;
                    height: 60px;
                }
            }
            
            /* Tablet (768px - 991px) */
            @media (min-width: 768px) and (max-width: 991px) {
                .sehir-butonlari-wrapper {
                    gap: 12px;
                }
                .sehir-btn {
                    font-size: 15px;
                    height: 55px;
                    min-width: 100px;
                }
            }
            
            /* Mobil (480px - 767px) */
            @media (max-width: 767px) {
                .sehir-butonlari-container {
                    padding: 12px 10px;
                }        
                .sehir-butonlari-wrapper {
                    gap: 8px;
                    padding: 0 5px;
                }
                .sehir-btn {
                    font-size: 14px;
                    height: 50px;
                    min-width: 80px;
                    padding: 10px 5px;
                    flex: 1; 
                }
            }
            
            /* Çok Küçük Mobil (479px ve altı) */
            @media (max-width: 479px) {
                .sehir-butonlari-wrapper {
                    gap: 5px;
                }
                .sehir-btn {
                    font-size: 12px;
                    height: 45px;
                    min-width: 70px;
                    padding: 8px 3px;
                } 
                .sehir-butonlari-container {
                    padding: 10px 8px;
                }
            }
            
            /* YATAY MOD (Landscape) */
            @media (max-height: 600px) and (orientation: landscape) {
                .sehir-btn {
                    height: 40px;
                    font-size: 13px;
                }
            }
            
            /* ÇOK GENİŞ EKRANLAR */
            @media (min-width: 1600px) {
                .sehir-butonlari-wrapper {
                    max-width: 1400px;
                    gap: 25px;
                }
                .sehir-btn {
                    max-width: 250px;
                    font-size: 20px;
                    height: 70px;
                }
            }
            
        `;
        
        const style = document.createElement('style');
        style.id = 'sehir-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    
    function createButtons() {
        const header = document.querySelector('.header');
        if (!header) {
            console.error('Header bulunamadı!');
            return false;
        }
        
        const oldContainer = document.querySelector('.sehir-butonlari-container');
        if (oldContainer) oldContainer.remove();

        const { cityId: urlCityId } = getStateFromURL();
        const activeCityId = urlCityId || 'aksaray';
        
        const container = document.createElement('div');
        container.className = 'sehir-butonlari-container';
        container.innerHTML = `
            <div class="sehir-butonlari-wrapper">
                <button class="sehir-btn ${activeCityId === 'aksaray' ? 'active' : ''}" data-city="aksaray">AKSARAY</button>
                <button class="sehir-btn ${activeCityId === 'bursa' ? 'active' : ''}" data-city="bursa">BURSA</button>
                <button class="sehir-btn ${activeCityId === 'manisa' ? 'active' : ''}" data-city="manisa">MANİSA</button>
                <button class="sehir-btn ${activeCityId === 'kocaeli' ? 'active' : ''}" data-city="kocaeli">KOCAELİ</button>
            </div>
        `;
        
        header.insertAdjacentElement('afterend', container);
        console.log(`Butonlar oluşturuldu, aktif şehir: ${activeCityId}`);
        return true;
    }
    
    function setupHeaderCity() {
        const headerH1 = document.querySelector('.header h1');
        if (!headerH1) {
            console.error('Header h1 bulunamadı!');
            return;
        }
        
        const oldSpans = headerH1.querySelectorAll('.sehir-adi-header');
        oldSpans.forEach(span => span.remove());
        
        const span = document.createElement('span');
        span.className = 'sehir-adi-header';
        span.id = 'current-city-name';
        span.textContent = currentCity.name;
        
        headerH1.innerHTML = 'SARIGÖZOĞLU ';
        headerH1.appendChild(span);
        
        console.log('Header şehir adı eklendi:', currentCity.name);
    }
    
    function updateHeaderCity(cityName) {
        const span = document.getElementById('current-city-name');
        if (span) {
            span.textContent = cityName;
            console.log('Header güncellendi:', cityName);
        } else {
            setupHeaderCity();
        }
    }
    
    function saveOriginalFileNames() {
        const docButtons = document.querySelectorAll('.doc-button, a[href*="drive.google.com"]');
        originalFileNames = {};
        
        docButtons.forEach((link, index) => {
            const originalText = link.textContent.trim();
            originalFileNames[index] = originalText;
            console.log(`Orijinal dosya ${index + 1}: "${originalText}"`);
        });
        
        console.log('Orijinal dosya isimleri kaydedildi:', originalFileNames);
    }
    
    function createDropdown() {
        const oldDropdown = document.querySelector('.sehir-dropdown-container');
        if (oldDropdown) oldDropdown.remove();
        
        const buttonsContainer = document.querySelector('.sehir-butonlari-container');
        if (!buttonsContainer) {
            console.error('Buton container bulunamadı!');
            return false;
        }
        
        const container = document.createElement('div');
        container.className = 'sehir-dropdown-container';
        container.innerHTML = `
            <div class="sehir-dropdown-wrapper">
                <label class="sehir-dropdown-label" id="dropdown-label">${currentCity.name} DOKÜMANLAR:</label>
                <select class="sehir-dropdown-select" id="machine-dropdown">
                    <option value="">(Seçim Yapın)</option>
                </select>
            </div>
        `;
        
        buttonsContainer.insertAdjacentElement('afterend', container);
        console.log('Dropdown oluşturuldu');
        return true;
    }
    
    function updateDropdown(cityId) {
        const select = document.getElementById('machine-dropdown');
        const label = document.getElementById('dropdown-label');
        
        if (!select) {
            console.error('Dropdown select bulunamadı!');
            return;
        }
        
        if (!label) {
            console.error('Dropdown label bulunamadı!');
            return;
        }
        
        console.log(`Dropdown güncelleniyor: ${cityId}`);
      
        select.innerHTML = '<option value="">(Seçim Yapın)</option>';
       
        const machines = MACHINE_DATA[cityId];
        if (machines && machines.length > 0) {
            machines.forEach((machine) => {
                const option = document.createElement('option');
                option.value = machine.url;
                option.textContent = machine.name;
                select.appendChild(option);
            });
            
            console.log(`${machines.length} makine eklendi`);
            
            machines.forEach((machine, index) => {
                console.log(`   ${index + 1}. ${machine.name} -> ${machine.url}`);
            });
            
        } else {
            console.warn(`${cityId} için makine bulunamadı!`);
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Bu şehir için makine bulunamadı";
            select.appendChild(option);
        }
        
        const city = CITIES.find(c => c.id === cityId);
        if (city) {
            label.textContent = `${city.name} DOKÜMANLAR:`;
        }
    }
    
    function updateFileLinks(cityId) {
        const docButtons = document.querySelectorAll('.doc-button, a[href*="drive.google.com"]');
        const cityName = CITIES.find(c => c.id === cityId)?.name || cityId.toUpperCase();
        
        console.log(`Dosya linkleri güncelleniyor: ${cityName}`);
        console.log(`Bulunan link sayısı: ${docButtons.length}`);
        
        if (docButtons.length === 0) {
            console.log('Güncellenecek dosya linki bulunamadı');
            return;
        }
        
        if (Object.keys(originalFileNames).length === 0) {
            saveOriginalFileNames();
        }
        
        docButtons.forEach((link, index) => {
            const href = link.getAttribute('href');
            if (href && href.includes('drive.google.com')) {
                let newHref = href;
                
                CITIES.forEach(city => {
                    if (href.includes(city.id)) {
                        newHref = href.replace(city.id, cityId);
                        console.log(`   Link ${index + 1}: ${city.id} -> ${cityId}`);
                    }
                });
                
                link.setAttribute('href', newHref);
                
                if (originalFileNames[index]) {
                    const originalText = originalFileNames[index];
                    const newText = originalText.replace(
                        /(AKSARAY|BURSA|MANİSA|KOCAELİ)/,
                        cityName
                    );
                    
                    link.textContent = newText;
                    console.log(`   Metin ${index + 1}: "${originalText}" -> "${newText}"`);
                } else {
                    link.textContent = `${cityName} Dosya-${index + 1}`;
                }
            }
        });
        
        console.log('Dosya linkleri güncellendi');
    }
   
        function navigateToPage(pageUrl, cityId, machineUrl) {
    // DEBUG: Mevcut durumu kontrol et
    console.log('=== DEBUG ===');
    console.log('Mevcut sayfa:', window.location.href);
    console.log('Hedef sayfa:', pageUrl);
    console.log('Şehir:', cityId);
    console.log('Makine:', machineUrl);
    
    // Query parametrelerini oluştur
    const params = new URLSearchParams();
    
    if (cityId) {
        params.set('city', cityId);
    }
    
    if (machineUrl) {
        params.set('machine', machineUrl);
    }
    
    // Cache önleme
    params.set('_t', Date.now());
    
    // Hedef URL'yi oluştur
    let targetUrl;
    
    // Eğer pageUrl zaten query parametresi içeriyorsa
    if (pageUrl.includes('?')) {
        const [base, existingParams] = pageUrl.split('?');
        const allParams = new URLSearchParams(existingParams);
        
        // Yeni parametreleri ekle
        params.forEach((value, key) => {
            allParams.set(key, value);
        });
        
        targetUrl = `${base}?${allParams.toString()}`;
    } else {
        targetUrl = `${pageUrl}?${params.toString()}`;
    }
    
    console.log('Oluşturulan URL:', targetUrl);
    console.log('=== DEBUG SONU ===');
    
    // Yönlendir
    window.location.href = targetUrl;

}
    
    function setupEventHandlers() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sehir-btn')) {
                const cityId = e.target.dataset.city;
                const cityName = e.target.textContent;
                
                console.log(`\n=== ŞEHİR DEĞİŞİYOR: ${cityName} ===`);
                
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                updateHeaderCity(cityName);
                currentCity = CITIES.find(c => c.id === cityId) || CITIES[0];
                updateDropdown(cityId);
                updateFileLinks(cityId);

                updateURLState(cityId, currentMachine);
                
                console.log(`Şehir başarıyla değiştirildi: ${cityName}\n`);
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.id === 'machine-dropdown' && e.target.value) {
                const selectedUrl = e.target.value;
                const selectedText = e.target.options[e.target.selectedIndex].text;

                currentMachine = selectedUrl;
                
                console.log(`Sayfa değiştiriliyor:`);
                console.log(` Makina: ${selectedText}`);
                console.log(` URL: ${selectedUrl}`);

                console.log(` Şehir: ${currentCity.id}`);
                navigateToPage(selectedUrl, currentCity.id, selectedUrl);
                
                
            }
        });
    }
    
    function testSystem() {
        console.log('\n=== SİSTEM TESTİ ===');
        console.log('1. Butonlar:', document.querySelectorAll('.sehir-btn').length, 'adet');
        console.log('2. Dropdown:', document.getElementById('machine-dropdown') ? 'VAR' : 'YOK');
        
        const dropdown = document.getElementById('machine-dropdown');
        if (dropdown) {
            console.log('3. Dropdown seçenekleri:', dropdown.options.length, 'adet');
            console.log('4. İlk 3 seçenek:');
            for (let i = 0; i < Math.min(3, dropdown.options.length); i++) {
                console.log(`   ${i}. ${dropdown.options[i].text} -> ${dropdown.options[i].value}`);
            }
        }
        
        console.log('5. Orijinal dosya isimleri:', Object.keys(originalFileNames).length, 'adet');
        console.log('6. Mevcut şehir:', currentCity.name);
    }
    
    function init() {
        console.log('Şehir Sistemi Başlatılıyor...\n');

        const { cityId: urlCityId, machineUrl } = getStateFromURL();
        
        try {
            const initialCity = CITIES.find(c => c.id === urlCityId) || CITIES[0];
            currentCity = initialCity;
            currentMachine = machineUrl || '';

            console.log(`URL'den alınan: Şehir=${urlCityId}, Makine=${machineUrl || 'yok'}`);
            console.log(`Başlangıç şehri: ${currentCity.name}`);
            
            injectCSS();
            if (!createButtons()) {
                console.warn('Butonlar oluşturulamadı');
            }
            setupHeaderCity();
            
            if (!createDropdown()) {
                console.warn('Dropdown oluşturulamadı');
            }
            
            saveOriginalFileNames();
            
            setupEventHandlers();

            const activeButton = document.querySelector(`.sehir-btn[data-city="${urlCityId}"]`);
            if (activeButton) {
                console.log(`Aktif buton bulundu: ${urlCityId}`);
                updateHeaderCity(activeButton.textContent);
                }
              
            updateDropdown(currentCity.id);
            if (machineUrl) {
                currentMachine = machineUrl;
                setTimeout(() => {
                const dropdown = document.getElementById('machine-dropdown');
                if (dropdown) {
                    dropdown.value = machineUrl;
                    console.log(`Dropdown makine ayarlandı: ${machineUrl}`);
                }
                },200);
            }

            
            updateFileLinks(currentCity.id);

            
            setTimeout(testSystem, 1500);
            
            console.log('\nŞehir Sistemi Başarıyla Yüklendi!\n');
            console.log(`Başlangıç Şehri: ${currentCity.name} `);
        
            
        } catch (error) {
            console.error('Başlatma hatası:', error);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.SehirSistemi = {
        setSehir: (cityId) => {
            const button = document.querySelector(`.sehir-btn[data-city="${cityId}"]`);
            if (button) {
                button.click();
                return true;
            }
            console.error(`Şehir butonu bulunamadı: ${cityId}`);
            return false;
        },
        
        getSehir: () => currentCity,
        
        getMakineler: (cityId) => {
            return MACHINE_DATA[cityId] || [];
        },
        
        debug: {
            originalFileNames: () => originalFileNames,
            testDropdown: () => {
                const dropdown = document.getElementById('machine-dropdown');
                if (dropdown) {
                    console.log('Dropdown seçenekleri:');
                    for (let i = 0; i < dropdown.options.length; i++) {
                        console.log(`${i}. ${dropdown.options[i].text} -> ${dropdown.options[i].value}`);
                    }
                }
            }
        }
    };
    
    console.log('Şehir Sistemi yüklendi, DOM bekleniyor...');
    
})();
