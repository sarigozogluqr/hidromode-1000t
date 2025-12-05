// sehir-butonlari.js - Şehir butonları sistemi (GÜNCELLENDİ)

(function() {
    'use strict';
    
    console.log('Şehir butonları yükleniyor...');
    
    // AKTİF ŞEHİR TAKİBİ
    let aktifSehirId = 'aksaray';
    
    // BUTONLARI OLUŞTUR
    const createButtons = () => {
        try {
            const header = document.querySelector('.header');
            if (!header) {
                console.error('Header bulunamadı!');
                return false;
            }
            
            // Buton container'ı oluştur
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'sehir-butonlari-container';
            buttonContainer.innerHTML = `
                <div class="sehir-butonlari-wrapper">
                    <button class="sehir-btn active" data-sehir="aksaray">AKSARAY</button>
                    <button class="sehir-btn" data-sehir="bursa">BURSA</button>
                    <button class="sehir-btn" data-sehir="manisa">MANİSA</button>
                    <button class="sehir-btn" data-sehir="kocaeli">KOCAELİ</button>
                </div>
            `;
            
            // Header'dan sonra ekle
            header.parentNode.insertBefore(buttonContainer, header.nextSibling);
            
            // EVENT LISTENER'LARI EKLE
            setupButtonEvents();
            
            console.log('✅ Şehir butonları oluşturuldu');
            return true;
            
        } catch (error) {
            console.error('❌ Buton oluşturma hatası:', error);
            return false;
        }
    };
    
    // BUTON EVENT'LERİ (DÜZELTİLDİ)
    const setupButtonEvents = () => {
        const buttons = document.querySelectorAll('.sehir-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const sehirAdi = this.textContent;
                const sehirId = this.getAttribute('data-sehir');
                
                // ÖNCEKİ AKTİF BUTONU KONTROL ET
                const oncekiAktif = document.querySelector('.sehir-btn.active');
                
                // Tüm butonlardan active class'ını kaldır
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Tıklanan butona active class'ını ekle
                this.classList.add('active');
                
                // Aktif şehri güncelle
                aktifSehirId = sehirId;
                
                // Header'daki sadece şehir adını güncelle
                updateHeaderSehir(sehirAdi);
                
                // Event tetikle (sadece şehir gerçekten değiştiyse)
                if (!oncekiAktif || oncekiAktif.getAttribute('data-sehir') !== sehirId) {
                    const event = new CustomEvent('sehirDegisti', {
                        detail: {
                            sehirId: sehirId,
                            sehirAdi: sehirAdi,
                            oncekiSehirId: oncekiAktif ? oncekiAktif.getAttribute('data-sehir') : null
                        }
                    });
                    document.dispatchEvent(event);
                }
                
                console.log(`Şehir değiştirildi: ${sehirAdi} (ID: ${sehirId})`);
            });
        });
    };
    
    // HEADER'DAKİ SADECE ŞEHİR ADINI GÜNCELLE (DÜZELTİLDİ)
    const updateHeaderSehir = (sehirAdi) => {
        try {
            let sehirSpan = document.getElementById('header-sehir-adi');
            
            if (!sehirSpan) {
                // Span yoksa oluştur, LOGOYU DEĞİŞTİRME!
                const headerH1 = document.querySelector('.header h1');
                if (headerH1) {
                    // Sadece şehir adını değiştir, logo sabit kalacak
                    const currentHTML = headerH1.innerHTML;
                    
                    // "SARIGÖZOĞLU AKSARAY" formatında mı kontrol et
                    if (currentHTML.includes('AKSARAY') || currentHTML.includes('BURSA') || 
                        currentHTML.includes('MANİSA') || currentHTML.includes('KOCAELİ')) {
                        // Sadece şehir adını değiştir
                        headerH1.innerHTML = currentHTML.replace(
                            /(AKSARAY|BURSA|MANİSA|KOCAELİ)/g, 
                            '<span id="header-sehir-adi" class="sehir-adi-header">' + sehirAdi + '</span>'
                        );
                    } else {
                        // İlk defa ekleniyorsa
                        headerH1.innerHTML = 'SARIGÖZOĞLU <span id="header-sehir-adi" class="sehir-adi-header">' + sehirAdi + '</span>';
                    }
                    sehirSpan = document.getElementById('header-sehir-adi');
                }
            } else {
                // Span varsa sadece text'i değiştir
                sehirSpan.textContent = sehirAdi;
            }
            
        } catch (error) {
            console.error('Header güncelleme hatası:', error);
        }
    };
    
    // YENİ ŞEHİR EKLEME FONKSİYONU (DÜZELTİLDİ)
    const addNewCity = (sehirId, sehirAdi) => {
        try {
            const buttonsWrapper = document.querySelector('.sehir-butonlari-wrapper');
            if (!buttonsWrapper) {
                console.error('Buton wrapper bulunamadı!');
                return false;
            }
            
            // Buton zaten var mı kontrol et
            const existingButton = buttonsWrapper.querySelector(`[data-sehir="${sehirId}"]`);
            if (existingButton) {
                console.warn(`${sehirAdi} butonu zaten var`);
                return false;
            }
            
            const newButton = document.createElement('button');
            newButton.className = 'sehir-btn';
            newButton.setAttribute('data-sehir', sehirId);
            newButton.textContent = sehirAdi;
            
            newButton.addEventListener('click', function() {
                const allButtons = document.querySelectorAll('.sehir-btn');
                
                // Tüm butonlardan active class'ını kaldır
                allButtons.forEach(btn => btn.classList.remove('active'));
                
                // Yeni butona active class'ını ekle
                this.classList.add('active');
                
                // Aktif şehri güncelle
                aktifSehirId = sehirId;
                
                // Header'daki şehir adını güncelle
                updateHeaderSehir(sehirAdi);
                
                // Event tetikle
                const event = new CustomEvent('sehirDegisti', {
                    detail: { 
                        sehirId: sehirId, 
                        sehirAdi: sehirAdi,
                        yeniEklendi: true 
                    }
                });
                document.dispatchEvent(event);
                
                console.log(`Yeni şehir seçildi: ${sehirAdi}`);
            });
            
            buttonsWrapper.appendChild(newButton);
            console.log(`Yeni şehir eklendi: ${sehirAdi}`);
            return true;
            
        } catch (error) {
            console.error('Yeni şehir ekleme hatası:', error);
            return false;
        }
    };
    
   
    
    // BAŞLATMA
    const init = () => {
        // Butonları oluştur
        const created = createButtons();
        
        if (created) {
            // İlk şehir adını header'a yerleştir
            updateHeaderSehir('AKSARAY');
            
          
            
            // Global fonksiyonları ekle
            window.SehirButonlari = {
                yeniSehirEkle: addNewCity,
                aktifSehriGetir: () => {
                    return {
                        id: aktifSehirId,
                        adi: document.querySelector('.sehir-btn.active')?.textContent || 'AKSARAY'
                    };
                },
                sehirDegistir: (sehirId) => {
                    const button = document.querySelector(`[data-sehir="${sehirId}"]`);
                    if (button) {
                        button.click();
                    }
                }
            };
            
            console.log('Şehir butonları sistemi hazır');
        }
    };
    
    // DOM HAZIR OLUNCA BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 300);
    }
    
})();
