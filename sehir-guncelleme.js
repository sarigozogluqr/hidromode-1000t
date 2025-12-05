// city-content-updater.js
const CityContentUpdater = (function() {
    const cityContentData = {
        aksaray: {
            "temel-kodlar": {
                title: "AKSARAY - Temel Kodlar",
                files: [
                    { name: "Temel Fonksiyonlar", link: "aksaray-temel.zip" },
                    { name: "Başlangıç Scriptleri", link: "aksaray-baslangic.pdf" }
                ]
            },
            "fabrika-otomasyon": {
                title: "AKSARAY - Fabrika Otomasyon",
                files: [
                    { name: "Üretim Hattı Kodları", link: "aksaray-uretim.zip" },
                    { name: "Konveyör Sistemi", link: "aksaray-konveyor.pdf" }
                ]
            }
        },
        konya: {
            "cnc-programlar": {
                title: "KONYA - CNC Programları",
                files: [
                    { name: "CNC Temel Kodlar", link: "konya-cnc-temel.zip" },
                    { name: "İleri CNC Programlama", link: "konya-cnc-ileri.pdf" }
                ]
            }
        }
        // Diğer şehirler...
    };

    const addStyles = () => {
        if (document.querySelector('style[data-content-updater]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-content-updater', 'true');
        style.textContent = `
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
        
        let container = document.getElementById('dynamic-content-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'dynamic-content-container';
            container.className = 'dynamic-content-container';
            
            const dropdown = document.querySelector('.dropdown-manager-container');
            if (dropdown) {
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
        addStyles();
        
        document.addEventListener('cityButtonClicked', function(event) {
            const cityId = event.detail.cityId;
            const dropdown = document.getElementById('city-dropdown');
            if (dropdown && dropdown.options.length > 1) {
                dropdown.selectedIndex = 1;
                loadContent(cityId, dropdown.value);
            }
        });
        
        document.addEventListener('dropdownOptionSelected', function(event) {
            if (event.detail.value) {
                loadContent(event.detail.cityId, event.detail.value);
            }
        });
        
        console.log('CityContentUpdater başlatıldı');
    };

    return {
        init,
        addCityContent: function(cityId, optionData) {
            if (!cityContentData[cityId]) {
                cityContentData[cityId] = {};
            }
            Object.assign(cityContentData[cityId], optionData);
        }
    };
})();
