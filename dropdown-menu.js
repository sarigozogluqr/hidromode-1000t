// dropdown-manager.js
const DropdownManager = (function() {
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

    const addStyles = () => {
        if (document.querySelector('style[data-dropdown-manager]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-dropdown-manager', 'true');
        style.textContent = `
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
        `;
        document.head.appendChild(style);
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
        addStyles();
        const inserted = insertDropdown();
        
        if (inserted) {
            document.addEventListener('cityButtonClicked', function(event) {
                updateDropdownOptions(event.detail.cityId);
            });
            
            const defaultCity = document.querySelector('.city-btn.active')?.getAttribute('data-city') || 'aksaray';
            updateDropdownOptions(defaultCity);
            
            console.log('DropdownManager başlatıldı');
        }
    };

    return {
        init,
        addCityOptions: function(cityId, options) {
            cityDropdownOptions[cityId] = options;
        }
    };
})();
