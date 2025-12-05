// sehir-butonlari.js - Şehir butonları sistemi

(function() {
    'use strict';
    
    console.log('🔄 Şehir butonları yükleniyor...');
    
    // BUTONLARI OLUŞTUR
    const createButtons = () => {
        try {
            const header = document.querySelector('.header');
            if (!header) {
                console.error('❌ Header bulunamadı!');
                return false;
            }
            
            // Buton container'ı oluştur
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'sehir-butonlari-container';
            buttonContainer.innerHTML = `
                <div class="sehir-butonlari-wrapper">
                    <button class="sehir-btn active" data-sehir="aksaray">AKSARAY</button>
                    <button class="sehir-btn" data-sehir="konya">KONYA</button>
                    <button class="sehir-btn" data-sehir="ankara">ANKARA</button>
                    <button class="sehir-btn" data-sehir="istanbul">İSTANBUL</button>
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
    
    // BUTON EVENT'LERİ
    const setupButtonEvents = () => {
        const buttons = document.querySelectorAll('.sehir-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const sehirAdi = this.textContent;
                const sehirId = this.getAttribute('data-sehir');
                
                // Tüm butonlardan active class'ını kaldır
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Tıklanan butona active class'ını ekle
                this.classList.add('active');
                
                // Header'daki şehir adını güncelle
                updateHeaderSehir(sehirAdi);
                
                // Event tetikle
                const event = new CustomEvent('sehirDegisti', {
                    detail: {
                        sehirId: sehirId,
                        sehirAdi: sehirAdi
                    }
                });
                document.dispatchEvent(event);
                
                console.log(`📍 Şehir değiştirildi: ${sehirAdi}`);
            });
        });
    };
    
    // HEADER'DAKİ ŞEHİR ADINI GÜNCELLE
    const updateHeaderSehir = (sehirAdi) => {
        try {
            let sehirSpan = document.getElementById('header-sehir-adi');
            
            if (!sehirSpan) {
                // Span yoksa oluştur
                const headerH1 = document.querySelector('.header h1');
                if (headerH1) {
                    headerH1.innerHTML = 'SARIGÖZOĞLU <span id="header-sehir-adi" class="sehir-adi-header">' + sehirAdi + '</span>';
                    sehirSpan = document.getElementById('header-sehir-adi');
                }
            }
            
            if (sehirSpan) {
                sehirSpan.textContent = sehirAdi;
            }
            
        } catch (error) {
            console.error('❌ Header güncelleme hatası:', error);
        }
    };
    
    // YENİ ŞEHİR EKLEME FONKSİYONU
    const addNewCity = (sehirId, sehirAdi) => {
        try {
            const buttonsWrapper = document.querySelector('.sehir-butonlari-wrapper');
            if (!buttonsWrapper) return false;
            
            const newButton = document.createElement('button');
            newButton.className = 'sehir-btn';
            newButton.setAttribute('data-sehir', sehirId);
            newButton.textContent = sehirAdi;
            
            newButton.addEventListener('click', function() {
                const allButtons = document.querySelectorAll('.sehir-btn');
                allButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updateHeaderSehir(sehirAdi);
                
                const event = new CustomEvent('sehirDegisti', {
                    detail: { sehirId: sehirId, sehirAdi: sehirAdi }
                });
                document.dispatchEvent(event);
            });
            
            buttonsWrapper.appendChild(newButton);
            console.log(`✅ Yeni şehir eklendi: ${sehirAdi}`);
            return true;
            
        } catch (error) {
            console.error('❌ Yeni şehir ekleme hatası:', error);
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
                    const activeBtn = document.querySelector('.sehir-btn.active');
                    return activeBtn ? {
                        id: activeBtn.getAttribute('data-sehir'),
                        adi: activeBtn.textContent
                    } : null;
                }
            };
            
            console.log('✅ Şehir butonları sistemi hazır');
        }
    };
    
    // DOM HAZIR OLUNCA BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 300);
    }
    
})();
