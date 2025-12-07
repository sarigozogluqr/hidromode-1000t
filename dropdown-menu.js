// dropdown-menu.js - HIZLI VERSİYON

(function() {
    'use strict';
    
    // VERİLER - SABİT
    const sehirSecenekleri = {
        aksaray: [
            { makina: "1000T Pres", text: "1000T Pres", url: "index.html" },
            { makina: "2000T Pres", text: "2000T Pres", url: "hidromode-2000t.html" },
            { makina: "5000T Pres", text: "5000T Pres", url: "5000t-pres.html" },
            { makina: "6000T Pres", text: "6000T Pres", url: "6000t-pres.html" },
            { makina: "SMG Pres", text: "SMG Pres", url: "smg-pres.html" },
            { makina: "Stenhoj", text: "Stenhoj", url: "sthenhoj.html" },
            { makina: "Gazaltı-1-2-3", text: "Gazaltı-1-2-3", url: "gazalti-1-2-3.html" }
        ],
        bursa: [
            { makina: "CNC Programları", text: "CNC Programları", url: "bursa-cnc.html" },
            { makina: "Kalite Kontrol", text: "Kalite Kontrol", url: "bursa-kalite.html" },
            { makina: "Üretim Hattı", text: "Üretim Hattı", url: "bursa-uretim.html" },
            { makina: "Makina Bakım", text: "Makina Bakım", url: "bursa-bakim.html" }
        ],
        manisa: [
            { makina: "Ofis Otomasyon", text: "Ofis Otomasyon", url: "manisa-ofis.html" },
            { makina: "Yönetim Paneli", text: "Yönetim Paneli", url: "manisa-panel.html" },
            { makina: "Raporlama Sistemi", text: "Raporlama Sistemi", url: "manisa-rapor.html" },
            { makina: "Güvenlik Yazılımları", text: "Güvenlik Yazılımları", url: "manisa-guvenlik.html" }
        ],
        kocaeli: [
            { makina: "IoT Sistemleri", text: "IoT Sistemleri", url: "kocaeli-iot.html" },
            { makina: "Akıllı Şehir", text: "Akıllı Şehir", url: "kocaeli-akilli-sehir.html" },
            { makina: "AR-GE Projeleri", text: "AR-GE Projeleri", url: "kocaeli-arge.html" },
            { makina: "İnovasyon", text: "İnovasyon", url: "kocaeli-inovasyon.html" }
        ]
    };
    
    // DROPDOWN'ı HIZLICA OLUŞTUR
    const createDropdownFast = () => {
        const buttonsContainer = document.querySelector('.sehir-butonlari-container');
        if (!buttonsContainer) return false;
        
        // Dropdown container'ı
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'dropdown-menu-container';
        dropdownContainer.innerHTML = `
            <div class="dropdown-menu-wrapper">
                <label class="dropdown-menu-label" id="dropdown-label">AKSARAY Makina Seçin:</label>
                <select class="dropdown-menu-select" id="sehir-dropdown">
                    <option value="">Makina seçin...</option>
                </select>
            </div>
        `;
        
        buttonsContainer.parentNode.insertBefore(dropdownContainer, buttonsContainer.nextSibling);
        return true;
    };
    
    // DROPDOWN EVENT'İ - HIZLI
    const setupDropdownFast = () => {
        const dropdown = document.getElementById('sehir-dropdown');
        if (!dropdown) return;
        
        // TEK event handler
        dropdown.addEventListener('change', function() {
            const url = this.value;
            if (url) {
                console.log('🌐 Yönlendiriliyor:', url);
                setTimeout(() => window.location.href = url, 50);
            }
        });
        
        // Şehir değiştiğinde dropdown'ı güncelle
        document.addEventListener('sehirDegisti', function(e) {
            const secenekler = sehirSecenekleri[e.detail.sehirId] || sehirSecenekleri.aksaray;
            const dropdown = document.getElementById('sehir-dropdown');
            const label = document.getElementById('dropdown-label');
            
            if (dropdown && label) {
                dropdown.innerHTML = '<option value="">Makina seçin...</option>';
                secenekler.forEach(s => {
                    const option = document.createElement('option');
                    option.value = s.url;
                    option.textContent = s.makina;
                    dropdown.appendChild(option);
                });
                
                label.textContent = `${e.detail.sehirAdi} Makina Seçin:`;
            }
        });
    };
    
    // BAŞLAT - HIZLI
    setTimeout(() => {
        if (createDropdownFast()) {
            setupDropdownFast();
            console.log('⚡ Dropdown hızlı yüklendi');
        }
    }, 50); // 50ms sonra
    
})();
