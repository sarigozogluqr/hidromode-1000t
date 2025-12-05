// city-buttons.js
const CityButtons = (function() {
    const addButtonStyles = () => {
        if (document.querySelector('style[data-city-buttons]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-city-buttons', 'true');
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
        let currentCity = 'aksaray';
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const cityName = this.textContent;
                const cityId = this.getAttribute('data-city');
                
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updateHeaderCity(cityName);
                currentCity = cityId;
                
                const cityChangeEvent = new CustomEvent('cityButtonClicked', {
                    detail: { cityId: cityId, cityName: cityName, timestamp: new Date() }
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
        addButtonStyles();
        const inserted = insertButtonsToPage();
        if (inserted) {
            setupButtonEvents();
            updateHeaderCity('AKSARAY');
            console.log('CityButtons başlatıldı');
        }
    };

    return {
        init,
        addButton: function(cityId, cityName) {
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
                    updateHeaderCity(cityName);
                    
                    const cityChangeEvent = new CustomEvent('cityButtonClicked', {
                        detail: { cityId: cityId, cityName: cityName, timestamp: new Date() }
                    });
                    document.dispatchEvent(cityChangeEvent);
                });
                
                buttonsWrapper.appendChild(newButton);
            }
        }
    };
})();
