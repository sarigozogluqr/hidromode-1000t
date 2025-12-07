// sehir-butonlari.js - HIZLI VERSİYON

(function() {
    'use strict';
    
    // BUTONLARI HIZLICA OLUŞTUR
    const createButtonsFast = () => {
        // Mevcut butonlar varsa onları kullan
        const existingContainer = document.querySelector('.sehir-butonlari-container');
        if (existingContainer) {
            console.log('✅ Butonlar zaten var, güncelleniyor...');
            updateExistingButtons(existingContainer);
            return true;
        }
        
        // Yeni oluştur
        const header = document.querySelector('.header');
        if (!header) return false;
        
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
        
        header.parentNode.insertBefore(buttonContainer, header.nextSibling);
        setupButtonEventsFast();
        return true;
    };
    
    // EVENT'LERİ HIZLICA KUR
    const setupButtonEventsFast = () => {
        const buttons = document.querySelectorAll('.sehir-btn');
        
        // TEK event handler (event delegation)
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('sehir-btn')) {
                const sehirAdi = e.target.textContent;
                const sehirId = e.target.getAttribute('data-sehir');
                
                // Tüm butonlardan active class'ını kaldır
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Tıklanan butona active class'ını ekle
                e.target.classList.add('active');
                
                // Header'daki şehir adını güncelle
                const headerSpan = document.getElementById('header-sehir-adi');
                if (headerSpan) headerSpan.textContent = sehirAdi;
                
                // Event tetikle
                document.dispatchEvent(new CustomEvent('sehirDegisti', {
                    detail: { sehirId: sehirId, sehirAdi: sehirAdi }
                }));
            }
        });
    };
    
    // BAŞLAT - HEMEN
    setTimeout(() => {
        createButtonsFast();
        console.log('⚡ Butonlar hızlı yüklendi');
    }, 10); // 10ms sonra
    
})();
