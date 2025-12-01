const menuStyles = `
<style>
.main-nav {
    background: #f8f9fa;
    padding: 30px 25px;
    border-bottom: 1px solid #dee2e6;
    text-align: center;
}
.nav-content {
max-width: 500px;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
}
.dropdown-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.dropdown-label {
    font-weight: 700;
    color: #230564;
    font-size: 18px;
    margin: 0;
    text-align: center;
}
.dropdown-select {
    width: 100%;
    max-width: 400px;
    padding: 16px 20px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    background: white;
    font-size: 16px;
    font-weight: 500;
    color: #230564;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
 background-position: right 20px center;
    background-size: 16px;
    text-align: center;
}

.dropdown-select:hover {
    border-color: #230564;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
    transform: translateY(-1px);
}

.dropdown-select:focus {
    outline: none;
    border-color: #230564;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.dropdown-select option[value=""]{
text-align: center;
color: #440ac2;
font-style: italic;
}
.dropdown-select optgroup {
font-weight: 600;
color: #110230;
font-size: 14px;
text-align: center;
}

@media (max-width: 600px) {
    .main-nav {
        padding: 25px 15px;
    }
    .nav-content {
    max-width: 100%;
    }
    .dropdown-select {
    padding: 14px 16px;
    font-size: 15px;
    max-width: 100%;
    }
    
    .dropdown-label {
        font-size: 16px;
 }
}
</style>
`;


const menuData = {
    presler: [
        { name: "1000T Pres", url: "index.html" },
        { name: "2000T Pres", url: "hidromode-2000t.html" },
        {name: "5000T Pres", url: "5000t-pres.html"},
        {name: "6000T Pres", url: "6000t-pres.html"},
        {name: "SMG Pres", url: "smg-pres.html"},    
        {name: "Stenhoj", url: "stenhoj.html"}
    ],
    
    hatlar: [
        { name: "Kapı Hattı", url: "hat-b.html" },        
    ],
    
   hucreler: [
        { name: "Gazaltı-1-2-3 Hücresi", url: "gazalti-1-2-3.html" },   
        ]
   
};

function createNavigationMenu() {
    return `
    <div class="main-nav">
        <div class="nav-content">
            <div class="dropdown-label">Hepsini Görüntüle</div>
            <div class="dropdown-container">
            <select class="dropdown-select" onchange="if(this.value) window.location.href=this.value">
                <option value="" selected>(Seçim Yapın)</option>
                
               
                    <!-- PRESLER -->
                    
                        ${menuData.presler.map(pres => 
                            `<option value="${pres.url}">${pres.name}</option>`
                        ).join('')}
                    
                    
                    <!-- HATLAR -->
                   
                        ${menuData.hatlar.map(hat => 
                            `<option value="${hat.url}">${hat.name}</option>`
                        ).join('')}
                    
                    
                    <!-- HÜCRELER -->
                    
                        ${menuData.hucreler.map(hucre => 
                            `<option value="${hucre.url}">${hucre.name}</option>`
                        ).join('')}
                    
                    
                  
            </select>
        </div>
    </div>
    `;
}


function loadNavigationMenu() {
         document.head.insertAdjacentHTML('beforeend',menuStyles);
    const header = document.querySelector('.header');
    if (header) {
        header.insertAdjacentHTML('afterend', createNavigationMenu());
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavigationMenu);
} else {
    loadNavigationMenu();
}
