// city-manager.js - Şehir Buton Yöneticisi
// Kullanım: <script src="city-manager.js"></script>

const CityManager = (function() {
    // Şehir verileri
    const cityData = {
        aksaray: {
            name: "AKSARAY",
            dropdownLabel: "AKSARAY İçerik Seçin:",
            contents: {
                "ornek-kod": {
                    title: "AKSARAY - Örnek Kodlar",
                    files: [
                        { name: "AKSARAY Temel Kodlar", link: "https://drive.google.com/file/d/aksaray1=sharing", icon: "📁" },
                        { name: "AKSARAY Gelişmiş Fonksiyonlar", link: "https://drive.google.com/file/d/aksaray2=sharing", icon: "⚙️" },
                        { name: "AKSARAY Veritabanı Scriptleri", link: "https://drive.google.com/file/d/aksaray3=sharing", icon: "🗄️" }
                    ]
                },
                "dokumanlar": {
                    title: "AKSARAY - Dokümanlar",
                    files: [
                        { name: "AKSARAY Kullanım Kılavuzu", link: "#", icon: "📘" },
                        { name: "AKSARAY Teknik Şartname", link: "#", icon: "📋" }
                    ]
                },
                "projeler": {
                    title: "AKSARAY - Projeler",
                    files: [
                        { name: "AKSARAY Robotik Projesi", link: "#", icon: "🤖" },
                        { name: "AKSARAY Otomasyon Sistemi", link: "#", icon: "⚡" }
                    ]
                },
                "raporlar": {
                    title: "AKSARAY - Raporlar",
                    files: [
                        { name: "AKSARAY Aylık Rapor", link: "#", icon: "📊" },
                        { name: "AKSARAY Performans Analizi", link: "#", icon: "📈" }
                    ]
                }
            }
        },
        konya: {
            name: "KONYA",
            dropdownLabel: "KONYA İçerik Seçin:",
            contents: {
                "ornek-kod": {
                    title: "KONYA - Örnek Kodlar",
                    files: [
                        { name: "KONYA Endüstriyel Kodlar", link: "https://drive.google.com/file/d/konya1=sharing", icon: "🏭" },
                        { name: "KONYA PLC Programları", link: "https://drive.google.com/file/d/konya2=sharing", icon: "🔧" }
                    ]
                },
                "dokumanlar": {
                    title: "KONYA - Dokümanlar",
                    files: [
                        { name: "KONYA Fabrika Kılavuzu", link: "#", icon: "🏗️" },
                        { name: "KONYA Montaj Talimatları", link: "#", icon: "📐" }
                    ]
                },
                "projeler": {
                    title: "KONYA - Projeler",
                    files: [
                        { name: "KONYA CNC Projesi", link: "#", icon: "⚙️" },
                        { name: "KONYA Üretim Hattı", link: "#", icon: "🚀" }
                    ]
                },
                "raporlar": {
                    title: "KONYA - Raporlar",
                    files: [
                        { name: "KONYA Üretim Raporu", link: "#", icon: "📊" },
                        { name: "KONYA Kalite Kontrol", link: "#", icon: "✅" }
                    ]
                }
            }
        },
        ankara: {
            name: "ANKARA",
            dropdownLabel: "ANKARA İçerik Seçin:",
            contents: {
                "ornek-kod": {
                    title: "ANKARA - Örnek Kodlar",
                    files: [
                        { name: "ANKARA Ofis Otomasyonu", link: "https://drive.google.com/file/d/ankara1=sharing", icon: "🏢" },
                        { name: "ANKARA Yönetim Yazılımı", link: "https://drive.google.com/file/d/ankara2=sharing", icon: "💼" }
                    ]
                },
                "dokumanlar": {
                    title: "ANKARA - Dokümanlar",
                    files: [
                        { name: "ANKARA Yönetim Kılavuzu", link: "#", icon: "📑" },
                        { name: "ANKARA Protokol Dokümanları", link: "#", icon: "📜" }
                    ]
                },
                "projeler": {
                    title: "ANKARA - Projeler",
                    files: [
                        { name: "ANKARA Merkezi Sistem", link: "#", icon: "🌐" },
                        { name: "ANKARA Yönetim Paneli", link: "#", icon: "📱" }
                    ]
                },
                "raporlar": {
                    title: "ANKARA - Raporlar",
                    files: [
                        { name: "ANKARA Strateji Raporu", link: "#", icon: "🎯" },
                        { name: "ANKARA Bütçe Analizi", link: "#", icon: "💰" }
                    ]
                }
            }
        },
        istanbul: {
            name: "İSTANBUL",
            dropdownLabel: "İSTANBUL İçerik Seçin:",
            contents: {
                "ornek-kod": {
                    title: "İSTANBUL - Örnek Kodlar",
                    files: [
                        { name: "İSTANBUL IoT Sistemleri", link: "https://drive.google.com/file/d/istanbul1=sharing", icon: "📡" },
                        { name: "İSTANBUL Akıllı Şehir", link: "https://drive.google.com/file/d/istanbul2=sharing", icon: "🏙️" }
                    ]
                },
                "dokumanlar": {
                    title: "İSTANBUL - Dokümanlar",
                    files: [
                        { name: "İSTANBUL Teknoloji Rehberi", link: "#", icon: "🔬" },
                        { name: "İSTANBUL İnovasyon Dokümanları", link: "#", icon: "💡" }
                    ]
                },
                "projeler": {
                    title: "İSTANBUL - Projeler",
                    files: [
                        { name: "İSTANBUL Akıllı Fabrika", link: "#", icon: "🏭" },
                        { name: "İSTANBUL AR-GE Projesi", link: "#", icon: "🧪" }
                    ]
                },
                "raporlar": {
                    title: "İSTANBUL - Raporlar",
                    files: [
                        { name: "İSTANBUL İnovasyon Raporu", link: "#", icon: "🚀" },
                        { name: "İSTANBUL Teknoloji Analizi", link: "#", icon: "📈" }
                    ]
                }
            }
        }
    };

    // CSS stilini ekle
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .city-manager-container {
                background: #f0f0f0;
                padding: 15px;
                border-bottom: 2px solid #ddd;
            }
            
            .city-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .city-button {
                padding: 12px 25px;
                background: white;
                border: 2px solid #230564;
                border-radius: 8px;
                color: #230564;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
            }
            
            .city-button:hover {
                background: #230564;
                color: white;
                transform: translateY(-2px);
            }
            
            .city-button.active {
                background: #230564;
                color: white;
                box-shadow: 0 4px 10px rgba(35, 5, 100, 0.3);
            }
            
            .city-dropdown-container {
                background: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #ddd;
            }
            
            .city-dropdown-menu {
                max-width: 500px;
                margin: 0 auto;
            }
            
            .city-dropdown-label {
                display: block;
                margin-bottom: 8px;
                color: #230564;
                font-weight: 600;
            }
            
            .city-dropdown-select {
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
            
            .city-dropdown-select:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(35, 5, 100, 0.2);
            }
            
            .city-name-header {
                color: #ffcc00;
                font-weight: 700;
            }
            
            .city-content-container {
                padding: 30px;
            }
            
            .city-button-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
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

    // HTML yapısını oluştur
    const createHTMLStructure = () => {
        // Şehir butonları container'ı
        const cityContainer = document.createElement('div');
        cityContainer.className = 'city-manager-container';
        cityContainer.innerHTML = `
            <div class="city-buttons">
                <button class="city-button active" data-city="aksaray" data-city-name="AKSARAY">AKSARAY</button>
                <button class="city-button" data-city="konya" data-city-name="KONYA">KONYA</button>
                <button class="city-button" data-city="ankara" data-city-name="ANKARA">ANKARA</button>
                <button class="city-button" data-city="istanbul" data-city-name="İSTANBUL">İSTANBUL</button>
            </div>
        `;

        // Dropdown container'ı
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'city-dropdown-container';
        dropdownContainer.innerHTML = `
            <div class="city-dropdown-menu">
                <label class="city-dropdown-label" id="city-dropdown-label">AKSARAY İçerik Seçin:</label>
                <select class="city-dropdown-select" id="city-content-dropdown">
                    <option value="ornek-kod">Örnek Kod</option>
                    <option value="dokumanlar">Dokümanlar</option>
                    <option value="projeler">Projeler</option>
                    <option value="raporlar">Raporlar</option>
                </select>
            </div>
        `;

        // İçerik container'ı
        const contentContainer = document.createElement('div');
        contentContainer.id = 'city-content-container';
        contentContainer.className = 'city-content-container';

        // Header'daki şehir adı için span (eğer yoksa ekle)
        let cityHeaderSpan = document.getElementById('current-city-header');
        if (!cityHeaderSpan) {
            const headerH1 = document.querySelector('.header h1');
            if (headerH1) {
                const text = headerH1.textContent || headerH1.innerText;
                // "AKSARAY" kelimesini span içine al
                headerH1.innerHTML = text.replace(/(AKSARAY|KONYA|ANKARA|İSTANBUL)/g, 
                    '<span id="current-city-header" class="city-name-header">$1</span>');
                cityHeaderSpan = document.getElementById('current-city-header');
            }
        }

        // Mevcut içeriği değiştireceğimiz div (varsa)
        let targetContentDiv = document.querySelector('.content:first-of-type');
        if (!targetContentDiv) {
            targetContentDiv = document.createElement('div');
            targetContentDiv.className = 'content';
            document.querySelector('.container').appendChild(targetContentDiv);
        }

        // Yapıyı ekle
        const container = document.querySelector('.container');
        if (container) {
            // Header'dan sonra ekle
            const header = document.querySelector('.header');
            if (header) {
                header.parentNode.insertBefore(cityContainer, header.nextSibling);
                cityContainer.parentNode.insertBefore(dropdownContainer, cityContainer.nextSibling);
                dropdownContainer.parentNode.insertBefore(contentContainer, dropdownContainer.nextSibling);
            }
        }

        return {
            cityContainer,
            dropdownContainer,
            contentContainer,
            cityHeaderSpan,
            targetContentDiv
        };
    };

    // İçerik yükle
    const loadCityContent = (cityId, contentType = 'ornek-kod') => {
        const city = cityData[cityId];
        if (!city) return;

        // Header'daki şehir adını güncelle
        const cityHeaderSpan = document.getElementById('current-city-header');
        if (cityHeaderSpan) {
            cityHeaderSpan.textContent = city.name;
        }

        // Dropdown label'ı güncelle
        const dropdownLabel = document.getElementById('city-dropdown-label');
        if (dropdownLabel) {
            dropdownLabel.textContent = city.dropdownLabel;
        }

        // İçeriği yükle
        const content = city.contents[contentType];
        if (!content) return;

        // HTML oluştur
        let html = `
            <div class="doc-section">
                <h2 class="section-title">${content.title}</h2>
                <div class="city-button-grid">
        `;
        
        content.files.forEach(file => {
            html += `
                <a href="${file.link}" class="city-doc-button" target="_blank">
                    <span>${file.name}</span>
                    <span class="city-doc-icon">${file.icon}</span>
                </a>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        // İçeriği yerleştir
        const contentContainer = document.getElementById('city-content-container');
        if (contentContainer) {
            contentContainer.innerHTML = html;
        }
    };

    // Event listener'ları kur
    const setupEventListeners = () => {
        const cityButtons = document.querySelectorAll('.city-button');
        const dropdown = document.getElementById('city-content-dropdown');
        
        let currentCity = 'aksaray';

        // Şehir butonları
        cityButtons.forEach(button => {
            button.addEventListener('click', function() {
                const cityId = this.getAttribute('data-city');
                
                // Aktif butonu güncelle
                cityButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Şehri değiştir
                currentCity = cityId;
                
                // İçeriği yükle
                loadCityContent(cityId, dropdown.value);
            });
        });

        // Dropdown
        if (dropdown) {
            dropdown.addEventListener('change', function() {
                loadCityContent(currentCity, this.value);
            });
        }
    };

    // Başlatma fonksiyonu
    const init = () => {
        // CSS ekle
        addStyles();
        
        // HTML yapısını oluştur
        createHTMLStructure();
        
        // Event listener'ları kur
        setupEventListeners();
        
        // İlk içeriği yükle
        loadCityContent('aksaray', 'ornek-kod');
        
        console.log('City Manager başlatıldı!');
    };

    // Public API
    return {
        init,
        loadCityContent,
        addCity: function(cityId, cityDataObj) {
            cityData[cityId] = cityDataObj;
        },
        getCurrentCity: function() {
            const activeButton = document.querySelector('.city-button.active');
            return activeButton ? activeButton.getAttribute('data-city') : 'aksaray';
        }
    };
})();

// Sayfa yüklendiğinde otomatik başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', CityManager.init);
} else {
    CityManager.init();
}

// Global erişim için
window.CityManager = CityManager;
