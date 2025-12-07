// dropdown-menu.js - SAYFA YÖNLENDİRMELİ Dropdown menü sistemi

(function() {
    'use strict';
    
    console.log('🔄 Dropdown menü yükleniyor (sayfa yönlendirmeli)...');
    
    // HER ŞEHİR İÇİN MAKİNALAR - URL İLE
    const sehirMakineleri = {
        aksaray: [
            { text: "1000T Pres", url: "index.html" },
            { text: "2000T Pres", url: "hidromode-2000t.html" },
            { text: "5000T Pres", url: "5000t-pres.html" },
            { text: "6000T Pres", url: "6000t-pres.html" },
            { text: "SMG Pres", url: "smg-pres.html" },
            { text: "Stenhoj", url: "stenhoj.html" },
            { text: "Gazaltı 1-2-3", url: "gazalti-1-2-3.html" }
        ],
        bursa: [
            { text: "CNC Programları", url: "bursa-cnc.html" },
            { text: "Kalite Kontrol", url: "bursa-kalite.html" },
            { text: "Üretim Hattı", url: "bursa-uretim.html" },
            { text: "Makina Bakım", url: "bursa-bakim.html" }
        ],
        manisa: [
            { text: "Ofis Otomasyon", url: "manisa-ofis.html" },
            { text: "Yönetim Paneli", url: "manisa-panel.html" },
            { text: "Raporlama Sistemi", url: "manisa-rapor.html" },
            { text: "Güvenlik Yazılımları", url: "manisa-guvenlik.html" }
        ],
        kocaeli: [
            { text: "IoT Sistemleri", url: "kocaeli-iot.html" },
            { text: "Akıllı Şehir", url: "kocaeli-akilli-sehir.html" },
            { text: "AR-GE Projeleri", url: "kocaeli-arge.html" },
            { text: "İnovasyon", url: "kocaeli-inovasyon.html" }
        ]
    };
    
    // DROPDOWN DEĞİŞKENİ
    let dropdown = null;
    
    // DROPDOWN OLUŞTUR
    const createDropdown = () => {
        try {
            const buttonsContainer = document.querySelector('.sehir-butonlari-container');
            if (!buttonsContainer) {
                console.error('❌ Buton container bulunamadı!');
                return false;
            }
            
            // Dropdown container'ı oluştur
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
            
            // Butonlardan sonra ekle
            buttonsContainer.parentNode.insertBefore(dropdownContainer, buttonsContainer.nextSibling);
            
            // Dropdown elementini kaydet
            dropdown = document.getElementById('sehir-dropdown');
            
            console.log('✅ Dropdown menü oluşturuldu');
            return true;
            
        } catch (error) {
            console.error('❌ Dropdown oluşturma hatası:', error);
            return false;
        }
    };
    
    // DROPDOWN SEÇENEKLERİNİ GÜNCELLE
    const updateDropdownOptions = (sehirId) => {
        try {
            if (!dropdown) {
                dropdown = document.getElementById('sehir-dropdown');
                if (!dropdown) {
                    console.error('❌ Dropdown bulunamadı!');
                    return;
                }
            }
            
            const label = document.getElementById('dropdown-label');
            if (!label) return;
            
            // Dropdown'ı temizle
            dropdown.innerHTML = '<option value="">Makina seçin...</option>';
            
            // Şehre özel makineleri al
            const makineler = sehirMakineleri[sehirId] || sehirMakineleri.aksaray;
            
            // Şu anki sayfayı al
            const currentPage = window.location.pathname.split('/').pop();
            
            // Seçenekleri ekle
            makineler.forEach(makina => {
                const option = document.createElement('option');
                option.value = makina.url; // DEĞER = URL
                option.textContent = makina.text; // GÖRÜNEN = Metin
                option.setAttribute('data-sehir', sehirId);
                
                // Eğer bu sayfa şu anki sayfa ise, seçili yap
                if (makina.url === currentPage) {
                    option.selected = true;
                    console.log(`✅ Mevcut sayfa seçili: ${makina.text}`);
                }
                
                dropdown.appendChild(option);
            });
            
            // Label'ı güncelle
            const sehirAdi = getSehirAdi(sehirId);
            label.textContent = `${sehirAdi} Makina Seçin:`;
            
            console.log(`✅ Dropdown güncellendi: ${sehirAdi} (${makineler.length} makina)`);
            
        } catch (error) {
            console.error('❌ Dropdown güncelleme hatası:', error);
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
    
    // SAYFA YÖNLENDİRME FONKSİYONU
    const redirectToPage = (url) => {
        if (!url || url === "" || url === "#") {
            console.warn('⚠️ Geçersiz URL:', url);
            return;
        }
        
        console.log(`🌐 Sayfa yönlendiriliyor: ${url}`);
        
        // Aynı sayfaysa yönlendirme yapma
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === url) {
            console.log('ℹ️ Zaten bu sayfadasınız');
            return;
        }
        
        // 0.3 saniye sonra yönlendir (kullanıcı görebilsin)
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    };
    
    // DROPDOWN CHANGE EVENT'İ
    const handleDropdownChange = () => {
        if (!dropdown) return;
        
        dropdown.addEventListener('change', function() {
            const selectedUrl = this.value;
            const selectedText = this.options[this.selectedIndex].textContent;
            const sehirId = this.options[this.selectedIndex].getAttribute('data-sehir');
            
            console.log(`📋 Dropdown değişti: ${selectedText} -> ${selectedUrl}`);
            
            if (selectedUrl && selectedUrl !== "") {
                // Event tetikle
                const event = new CustomEvent('dropdownSecildi', {
                    detail: {
                        text: selectedText,
                        url: selectedUrl,
                        sehirId: sehirId,
                        timestamp: new Date()
                    }
                });
                document.dispatchEvent(event);
                
                // Sayfayı yönlendir
                redirectToPage(selectedUrl);
            } else {
                // Boş seçimde dropdown'ı sıfırla
                this.selectedIndex = 0;
            }
        });
        
        console.log('✅ Dropdown change event eklendi');
    };
    
    // EVENT LISTENER'LARI KUR
    const setupEventListeners = () => {
        // 1. ŞEHİR DEĞİŞTİĞİNDE
        document.addEventListener('sehirDegisti', function(event) {
            console.log(`📍 Şehir değişti event: ${event.detail.sehirAdi}`);
            
            // Dropdown'ı güncelle
            updateDropdownOptions(event.detail.sehirId);
            
            // Aktif şehir değiştiğinde, ilk makina sayfasına yönlendir
            setTimeout(() => {
                const makineler = sehirMakineleri[event.detail.sehirId];
                if (makineler && makineler.length > 0 && dropdown) {
                    // İlk makina sayfasına yönlendir
                    const firstMachineUrl = makineler[0].url;
                    const currentPage = window.location.pathname.split('/').pop();
                    
                    // Eğer şu anki sayfa bu şehre ait değilse, yönlendir
                    const isCurrentPageFromThisCity = makineler.some(m => m.url === currentPage);
                    if (!isCurrentPageFromThisCity) {
                        console.log(`🔄 Şehir değişti, yönlendiriliyor: ${firstMachineUrl}`);
                        redirectToPage(firstMachineUrl);
                    }
                }
            }, 500);
        });
        
        // 2. DROPDOWN DEĞİŞTİĞİNDE (sayfa yönlendirmesi)
        handleDropdownChange();
        
        // 3. SAYFA YÜKLENDİĞİNDE AKTİF ŞEHRİ BUL
        const setupPageLoadListener = () => {
            // URL'den şehir bilgisini tahmin et
            const currentPage = window.location.pathname.split('/').pop();
            console.log(`📄 Sayfa yüklendi: ${currentPage}`);
            
            // Hangi şehre ait olduğunu bul
            let detectedCity = 'aksaray';
            for (const [cityId, makineler] of Object.entries(sehirMakineleri)) {
                if (makineler.some(m => m.url === currentPage)) {
                    detectedCity = cityId;
                    break;
                }
            }
            
            console.log(`📍 Tespit edilen şehir: ${detectedCity}`);
            
            // Şehir butonunu aktif yap
            const cityButton = document.querySelector(`[data-sehir="${detectedCity}"]`);
            if (cityButton) {
                // Tüm butonlardan active class'ını kaldır
                document.querySelectorAll('.sehir-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Bu şehir butonunu aktif yap
                cityButton.classList.add('active');
                
                // Header'daki şehir adını güncelle
                const headerSpan = document.getElementById('header-sehir-adi');
                if (headerSpan) {
                    headerSpan.textContent = cityButton.textContent;
                }
                
                console.log(`✅ Aktif şehir güncellendi: ${cityButton.textContent}`);
                
                // Dropdown'ı güncelle
                updateDropdownOptions(detectedCity);
            }
        };
        
        // Sayfa yüklendiğinde çalıştır
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupPageLoadListener);
        } else {
            setTimeout(setupPageLoadListener, 1000);
        }
    };
    
    // YENİ MAKİNA EKLE
    const addMakina = (sehirId, makina) => {
        if (!sehirMakineleri[sehirId]) {
            sehirMakineleri[sehirId] = [];
        }
        
        sehirMakineleri[sehirId].push(makina);
        
        // Eğer bu şehir aktifse, dropdown'ı güncelle
        const activeBtn = document.querySelector('.sehir-btn.active');
        if (activeBtn && activeBtn.getAttribute('data-sehir') === sehirId) {
            updateDropdownOptions(sehirId);
        }
        
        console.log(`✅ Yeni makina eklendi: ${sehirId} - ${makina.text}`);
    };
    
    // BAŞLATMA
    const init = () => {
        console.log('🚀 Dropdown menü başlatılıyor...');
        
        // Dropdown'ı oluştur
        const created = createDropdown();
        
        if (created) {
            // Event listener'ları kur
            setupEventListeners();
            
            // İlk dropdown'ı doldur (gecikmeli)
            setTimeout(() => {
                // Aktif şehri bul
                const activeBtn = document.querySelector('.sehir-btn.active');
                const sehirId = activeBtn ? activeBtn.getAttribute('data-sehir') : 'aksaray';
                
                updateDropdownOptions(sehirId);
                console.log(`✅ İlk dropdown dolduruldu: ${sehirId}`);
            }, 800);
            
            // Global fonksiyonları ekle
            window.DropdownMenu = {
                makinaEkle: addMakina,
                secileniGetir: () => {
                    if (dropdown && dropdown.value) {
                        return {
                            text: dropdown.options[dropdown.selectedIndex].textContent,
                            url: dropdown.value,
                            sehirId: dropdown.options[dropdown.selectedIndex].getAttribute('data-sehir')
                        };
                    }
                    return null;
                },
                dropdownGuncelle: updateDropdownOptions,
                sayfaYonlendir: redirectToPage,
                tumMakineleriGetir: () => sehirMakineleri
            };
            
            console.log('✅ Dropdown menü sistemi hazır (sayfa yönlendirmeli)');
            return true;
        }
        
        return false;
    };
    
    // DİĞER SCRIPT'LERİ BEKLE
    const waitForButtons = (attempt = 0) => {
        const maxAttempts = 20;
        
        if (document.querySelector('.sehir-butonlari-container')) {
            console.log('✅ Butonlar bulundu, dropdown başlatılıyor...');
            const success = init();
            
            if (!success && attempt < maxAttempts) {
                setTimeout(() => waitForButtons(attempt + 1), 500);
            }
        } else if (attempt < maxAttempts) {
            console.log(`⏳ Butonlar bekleniyor... (deneme ${attempt + 1}/${maxAttempts})`);
            setTimeout(() => waitForButtons(attempt + 1), 500);
        } else {
            console.warn('⚠️ Butonlar bulunamadı, dropdown oluşturuluyor...');
            // Yine de dropdown'ı oluşturmaya çalış
            setTimeout(() => {
                const success = init();
                if (!success) {
                    console.error('❌ Dropdown oluşturulamadı');
                }
            }, 1000);
        }
    };
    
    // BAŞLAT
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM hazır, dropdown başlatılıyor...');
            setTimeout(() => waitForButtons(), 1000);
        });
    } else {
        console.log('📄 DOM zaten hazır, dropdown başlatılıyor...');
        setTimeout(() => waitForButtons(), 1000);
    }
    
})();
