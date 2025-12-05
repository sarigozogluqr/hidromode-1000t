// city-buttons.js - Sadece Şehir Butonları
// Kullanım: <script src="city-buttons.js"></script>

const CityButtons = (function() {
    // CSS stilini ekle
    const addButtonStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    };

    // Buton HTML'sini oluştur
    const createButtonsHTML = () => {
        const buttonsHTML = `
        <div class="city-buttons-container">
            <div class="city-buttons-wrapper">
                <button class="city-btn active" data-city="aksaray">AKSARAY</button>
                <button class="city-btn" data-city="konya">KONYA</button>
                <button class="city-btn" data-city="ankara">ANKARA</button>
                <button class="city-btn" data-city="istanbul">İSTANBUL</button>
            </div>
        </div>
        `;
        
        return buttonsHTML;
    };

    // Header'daki şehir adını güncelle
    const updateHeaderCity = (cityName) => {
        // Mevcut header'daki şehir adını bul veya oluştur
        let citySpan = document.getElementById('header-city-name');
        
        if (!citySpan) {
            const headerH1 = document.querySelector('.header h1');
            if (headerH1) {
                // "SARIGÖZOĞLU AKSARAY" şeklinde bir metin varsa
                const text = headerH1.textContent || headerH1.innerText;
                
                // Son kelimeyi span içine al
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

    // Buton tıklama olaylarını ayarla
    const setupButtonEvents = () => {
        const buttons = document.querySelectorAll('.city-btn');
        let currentCity = 'aksaray';
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const cityName = this.textContent;
                const cityId = this.getAttribute('data-city');
                
                // Tüm butonlardan active class'ını kaldır
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Tıklanan butona active class'ını ekle
                this.classList.add('active');
                
                // Header'daki şehir adını güncelle
                updateHeaderCity(cityName);
                
                // Mevcut şehri güncelle
                currentCity = cityId;
                
                // Özel event tetikle (dropdown vs. dinleyebilir)
                const cityChangeEvent = new CustomEvent('cityButtonClicked', {
                    detail: {
                        cityId: cityId,
                        cityName: cityName,
                        timestamp: new Date()
                    }
                });
                document.dispatchEvent(cityChangeEvent);
            });
        });
    };

    // Butonları sayfaya ekle
    const insertButtonsToPage = () => {
        const container = document.querySelector('.container');
        const header = document.querySelector('.header');
        
        if (container && header) {
            // Buton container'ını oluştur
            const buttonsContainer = document.createElement('div');
            buttonsContainer.innerHTML = createButtonsHTML();
            
            // Header'dan hemen sonra ekle
            header.parentNode.insertBefore(buttonsContainer, header.nextSibling);
            
            return true;
        }
        
        return false;
    };

    // Başlatma fonksiyonu
    const init = () => {
        // CSS ekle
        addButtonStyles();
        
        // Butonları sayfaya ekle
        const inserted = insertButtonsToPage();
        
        if (inserted) {
            // Event listener'ları kur
            setupButtonEvents();
            
            // İlk şehir adını header'a yerleştir
            updateHeaderCity('AKSARAY');
            
            console.log('Şehir butonları başarıyla eklendi!');
        } else {
            console.error('Şehir butonları eklenemedi! Container veya header bulunamadı.');
        }
    };

    // Public fonksiyonlar
    return {
        init,
        addButton: function(cityId, cityName) {
            const buttonsWrapper = document.querySelector('.city-buttons-wrapper');
            if (buttonsWrapper) {
                const newButton = document.createElement('button');
                newButton.className = 'city-btn';
                newButton.setAttribute('data-city', cityId);
                newButton.textContent = cityName;
                
                // Event listener ekle
                newButton.addEventListener('click', function() {
                    const allButtons = document.querySelectorAll('.city-btn');
                    allButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    updateHeaderCity(cityName);
                    
                    // Event tetikle
                    const cityChangeEvent = new CustomEvent('cityButtonClicked', {
                        detail: {
                            cityId: cityId,
                            cityName: cityName,
                            timestamp: new Date()
                        }
                    });
                    document.dispatchEvent(cityChangeEvent);
                });
                
                buttonsWrapper.appendChild(newButton);
            }
        },
        getCurrentCity: function() {
            const activeButton = document.querySelector('.city-btn.active');
            if (activeButton) {
                return {
                    id: activeButton.getAttribute('data-city'),
                    name: activeButton.textContent
                };
            }
            return { id: 'aksaray', name: 'AKSARAY' };
        },
        changeCity: function(cityId) {
            const button = document.querySelector(`.city-btn[data-city="${cityId}"]`);
            if (button) {
                button.click();
            }
        }
    };
})();

// Otomatik başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', CityButtons.init);
} else {
    CityButtons.init();
}

// Global erişim
window.CityButtons = CityButtons;
