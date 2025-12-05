// sehir-guncelleme.js - İçerik güncelleme sistemi

(function() {
    'use strict';
    
    console.log('Şehir güncelleme yükleniyor...');
    
    // HER ŞEHİR VE SEÇENEK İÇİN İÇERİKLER
    const sehirIcerikleri = {
        aksaray: {
            "temel-kod": {
                baslik: "AKSARAY - Temel Kodlar",
                dosyalar: [
                    { isim: "AKSARAY Temel Fonksiyonlar", link: "https://drive.google.com/file/d/aksaray1=sharing" },
                    { isim: "AKSARAY Başlangıç Scriptleri", link: "https://drive.google.com/file/d/aksaray2=sharing" },
                    { isim: "AKSARAY Veritabanı Bağlantısı", link: "https://drive.google.com/file/d/aksaray3=sharing" }
                ]
            },
            "fabrika-otomasyon": {
                baslik: "AKSARAY - Fabrika Otomasyon",
                dosyalar: [
                    { isim: "AKSARAY Üretim Hattı Kodları", link: "https://drive.google.com/file/d/aksaray4=sharing" },
                    { isim: "AKSARAY Konveyör Sistemi", link: "https://drive.google.com/file/d/aksaray5=sharing" }
                ]
            }
        },
        bursa: {
            "cnc-program": {
                baslik: "BURSA - CNC Programları",
                dosyalar: [
                    { isim: "BURSA CNC Temel Kodlar", link: "https://drive.google.com/file/d/konya1=sharing" },
                    { isim: "BURSA İleri CNC Programlama", link: "https://drive.google.com/file/d/konya2=sharing" }
                ]
            },
            "kalite-kontrol": {
                baslik: "BURSA - Kalite Kontrol",
                dosyalar: [
                    { isim: "BURSA Kalite Test Scriptleri", link: "https://drive.google.com/file/d/konya3=sharing" },
                    { isim: "BURSA ISO Dokümanları", link: "https://drive.google.com/file/d/konya4=sharing" }
                ]
            }
        },
        manisa: {
            "ofis-otomasyon": {
                baslik: "MANİSA - Ofis Otomasyon",
                dosyalar: [
                    { isim: "MANİSA Ofis Yazılımları", link: "https://drive.google.com/file/d/ankara1=sharing" },
                    { isim: "MANİSA Yönetim Paneli", link: "https://drive.google.com/file/d/ankara2=sharing" }
                ]
            }
        },
        kocaeli: {
            "iot-sistem": {
                baslik: "KOCAELİ - IoT Sistemleri",
                dosyalar: [
                    { isim: "KOCAELİ IoT Temel Kodlar", link: "https://drive.google.com/file/d/istanbul1=sharing" },
                    { isim: "KOCAELİ Akıllı Sistemler", link: "https://drive.google.com/file/d/istanbul2=sharing" }
                ]
            }
        }
    };
    
    // İÇERİK ALANINI OLUŞTUR
    const createContentArea = () => {
        try {
            const dropdownContainer = document.querySelector('.dropdown-menu-container');
            if (!dropdownContainer) {
                console.error('Dropdown container bulunamadı!');
                return false;
            }
            
            // İçerik container'ı oluştur
            const contentContainer = document.createElement('div');
            contentContainer.className = 'sehir-icerik-container';
            contentContainer.id = 'sehir-icerik-alani';
            
            // Dropdown'dan sonra ekle
            dropdownContainer.parentNode.insertBefore(contentContainer, dropdownContainer.nextSibling);
            
            console.log('İçerik alanı oluşturuldu');
            return true;
            
        } catch (error) {
            console.error('İçerik alanı oluşturma hatası:', error);
            return false;
        }
    };
    
    // İÇERİK YÜKLE
    const loadContent = (sehirId, secenekDegeri) => {
        try {
            const contentArea = document.getElementById('sehir-icerik-alani');
            if (!contentArea) return;
            
            const sehirIcerik = sehirIcerikleri[sehirId];
            if (!sehirIcerik || !sehirIcerik[secenekDegeri]) {
                // İçerik yoksa mesaj göster
                contentArea.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <h3>${getSehirAdi(sehirId)}</h3>
                        <p>"${secenekDegeri}" için içerik hazırlanıyor...</p>
                    </div>
                `;
                return;
            }
            
            const icerik = sehirIcerik[secenekDegeri];
            
            // HTML oluştur
            let html = `
                <h2 style="text-align: center; color: #230564; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 3px solid #230564;">
                    ${icerik.baslik}
                </h2>
                <div class="sehir-icerik-grid">
            `;
            
            icerik.dosyalar.forEach(dosya => {
                html += `
                    <a href="${dosya.link}" class="sehir-dosya-btn" target="_blank">
                        ${dosya.isim}
                    </a>
                `;
            });
            
            html += '</div>';
            contentArea.innerHTML = html;
            
            console.log(`İçerik yüklendi: ${sehirId} - ${secenekDegeri}`);
            
        } catch (error) {
            console.error('İçerik yükleme hatası:', error);
        }
    };
    
    // ŞEHİR ADINI AL
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
        // Şehir değiştiğinde
        document.addEventListener('sehirDegisti', function(event) {
            const sehirId = event.detail.sehirId;
            
            // Dropdown'daki ilk seçeneği yükle
            setTimeout(() => {
                const dropdown = document.getElementById('sehir-dropdown');
                if (dropdown && dropdown.options.length > 1) {
                    dropdown.selectedIndex = 1; // İlk içerik seçeneği
                    loadContent(sehirId, dropdown.value);
                }
            }, 200);
        });
        
        // Dropdown seçeneği değiştiğinde
        document.addEventListener('dropdownSecildi', function(event) {
            if (event.detail.deger) {
                loadContent(event.detail.sehirId, event.detail.deger);
            }
        });
    };
    
    // YENİ İÇERİK EKLE
    const addSehirIcerik = (sehirId, secenekDegeri, icerik) => {
        if (!sehirIcerikleri[sehirId]) {
            sehirIcerikleri[sehirId] = {};
        }
        sehirIcerikleri[sehirId][secenekDegeri] = icerik;
        
        console.log(`Yeni içerik eklendi: ${sehirId} - ${secenekDegeri}`);
    };
    
    // BAŞLATMA
    const init = () => {
        // İçerik alanını oluştur
        const created = createContentArea();
        
        if (created) {
            // Event listener'ları kur
            setupEventListeners();
            
            // İlk içeriği yükle
            setTimeout(() => {
                const dropdown = document.getElementById('sehir-dropdown');
                if (dropdown && dropdown.options.length > 1) {
                    dropdown.selectedIndex = 1;
                    loadContent('aksaray', dropdown.value);
                }
            }, 500);
            
            // Global fonksiyonları ekle
            window.SehirGuncelleme = {
                yeniIcerikEkle: addSehirIcerik,
                icerikYukle: loadContent
            };
            
            console.log('Şehir güncelleme sistemi hazır');
        }
    };
    
    // DİĞER SCRIPT'LERİ BEKLE
    const waitForDropdown = () => {
        if (document.querySelector('.dropdown-menu-container')) {
            init();
        } else {
            setTimeout(waitForDropdown, 100);
        }
    };
    
    // BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForDropdown);
    } else {
        waitForDropdown();
    }
    
})();
