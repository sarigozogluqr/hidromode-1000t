// dropdown-menu.js - Dropdown menü sistemi

(function() {
    'use strict';
    
    console.log('🔄 Dropdown menü yükleniyor...');
    
    // HER ŞEHİR İÇİN FARKLI SEÇENEKLER
    const sehirSecenekleri = {
        aksaray: [
            { name: "1000T Pres", url:"index.html" },
            { name: "2000T Pres", url: "hidromode-2000t.html" },
            { name: "5000T Pres", url: "5000t-pres.html" },
            { name: "6000T Pres", url: "6000t-pres.html" },
            { name: "SMG Pres", url: "smg-pres.html"},
            { name: "Stenhoj", url: "sthenhoj.html"},
            { name: "Gazaltı-1-2-3", url:"gazalti-1-2-3.html"}
        ],
        bursa: [
            { deger: "cnc-program", metin: "CNC Programları" },
            { deger: "kalite-kontrol", metin: "Kalite Kontrol" },
            { deger: "uretim-hatti", metin: "Üretim Hattı" },
            { deger: "makina-bakim", metin: "Makina Bakım" }
        ],
        manisa: [
            { deger: "ofis-otomasyon", metin: "Ofis Otomasyon" },
            { deger: "yonetim-panel", metin: "Yönetim Paneli" },
            { deger: "rapor-sistem", metin: "Raporlama Sistemi" },
            { deger: "guvenlik", metin: "Güvenlik Yazılımları" }
        ],
        kocaeli: [
            { deger: "iot-sistem", metin: "IoT Sistemleri" },
            { deger: "akilli-sehir", metin: "Akıllı Şehir" },
            { deger: "arge-proje", metin: "AR-GE Projeleri" },
            { deger: "inovasyon", metin: "İnovasyon" }
        ]
    };
    
    // DROPDOWN OLUŞTUR
    const createDropdown = () => {
        try {
            const buttonsContainer = document.querySelector('.sehir-butonlari-container');
            if (!buttonsContainer) {
                console.error('Buton container bulunamadı!');
                return false;
            }
            
            // Dropdown container'ı oluştur
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'dropdown-menu-container';
            dropdownContainer.innerHTML = `
                <div class="dropdown-menu-wrapper">
                    <label class="dropdown-menu-label" id="dropdown-label">AKSARAY İçerik Seçin:</label>
                    <select class="dropdown-menu-select" id="sehir-dropdown">
                        <option value="">Seçiniz...</option>
                    </select>
                </div>
            `;
            
            // Butonlardan sonra ekle
            buttonsContainer.parentNode.insertBefore(dropdownContainer, buttonsContainer.nextSibling);
            
            console.log('Dropdown menü oluşturuldu');
            return true;
            
        } catch (error) {
            console.error('Dropdown oluşturma hatası:', error);
            return false;
        }
    };
    
    // DROPDOWN SEÇENEKLERİNİ GÜNCELLE
    const updateDropdownOptions = (sehirId) => {
        try {
            const dropdown = document.getElementById('sehir-dropdown');
            const label = document.getElementById('dropdown-label');
            
            if (!dropdown || !label) return;
            
            // Dropdown'ı temizle
            dropdown.innerHTML = '<option value="">Seçiniz...</option>';
            
            // Şehre özel seçenekleri al
            const secenekler = sehirSecenekleri[sehirId] || sehirSecenekleri.aksaray;
            
            // Seçenekleri ekle
            secenekler.forEach(secenek => {
                const option = document.createElement('option');
                option.value = secenek.name;
                option.textContent = secenek.url;
                dropdown.appendChild(option);
            });
            
            // Label'ı güncelle
            const sehirAdi = getSehirAdi(sehirId);
            label.textContent = `${sehirAdi} İçerik Seçin:`;
            
            console.log(`Dropdown güncellendi: ${sehirAdi}`);
            
        } catch (error) {
            console.error('Dropdown güncelleme hatası:', error);
        }
    };
    
    // ŞEHİR ID'SİNDEN ADINI AL
    const getSehirAdi = (sehirId) => {
        const sehirler = {
            aksaray: 'AKSARAY',
            bursa: 'BURSA',
            manisa: 'MANİSA',
            kocaeli: 'KOCAELİ'
        };
        return sehirler[sehirId] || sehirId.toUpperCase();
    };
    
    // EVENT LISTENER'LARI KUR
    const setupEventListeners = () => {
        // Şehir değiştiğinde dropdown'ı güncelle
        document.addEventListener('sehirDegisti', function(event) {
            updateDropdownOptions(event.detail.sehirId);
        });
        
        // Dropdown değiştiğinde
        const dropdown = document.getElementById('sehir-dropdown');
        if (dropdown) {
            dropdown.addEventListener('change', function() {
                const secilenDeger = this.value;
                const secilenMetin = this.options[this.selectedIndex].text;
                
                if (secilenDeger) {
                    // Aktif şehri bul
                    const activeBtn = document.querySelector('.sehir-btn.active');
                    const sehirId = activeBtn ? activeBtn.getAttribute('data-sehir') : 'aksaray';
                    
                    // Event tetikle
                    const event = new CustomEvent('dropdownSecildi', {
                        detail: {
                            name: secilenDeger,
                            url: secilenMetin,
                            sehirId: sehirId
                        }
                    });
                    document.dispatchEvent(event);
                    
                    console.log(`Seçilen: ${secilenMetin}`);
                }
            });
        }
    };
    
    // YENİ ŞEHİR SEÇENEKLERİ EKLE
    const addSehirSecenekleri = (sehirId, secenekler) => {
        sehirSecenekleri[sehirId] = secenekler;
        
        // Eğer bu şehir aktifse, dropdown'ı güncelle
        const activeBtn = document.querySelector('.sehir-btn.active');
        if (activeBtn && activeBtn.getAttribute('data-sehir') === sehirId) {
            updateDropdownOptions(sehirId);
        }
    };
    
    // BAŞLATMA
    const init = () => {
        // Dropdown'ı oluştur
        const created = createDropdown();
        
        if (created) {
            // Event listener'ları kur
            setupEventListeners();
            
            // İlk dropdown'ı doldur
            updateDropdownOptions('aksaray');
            
            // Global fonksiyonları ekle
            window.DropdownMenu = {
                yeniSecenekEkle: addSehirSecenekleri,
                secileniGetir: () => {
                    const dropdown = document.getElementById('sehir-dropdown');
                    if (dropdown && dropdown.value) {
                        return {
                            deger: dropdown.value,
                            metin: dropdown.options[dropdown.selectedIndex].text
                        };
                    }
                    return null;
                }
            };
            
            console.log('Dropdown menü sistemi hazır');
        }
    };
    
    // DİĞER SCRIPT'LERİ BEKLE
    const waitForButtons = () => {
        if (document.querySelector('.sehir-butonlari-container')) {
            init();
        } else {
            setTimeout(waitForButtons, 100);
        }
    };
    
    // BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForButtons);
    } else {
        waitForButtons();
    }
    
})();
