// Switch active view between menu100 to menu106
function switchView(viewId) {
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.add('active');
    }

    // Update active state in submenu
    document.querySelectorAll('.sub-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNav = document.getElementById(`sub-${viewId}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Switch from Submenu to Main Sidebar Menu
function backToMainMenu() {
    document.getElementById('products-submenu-list').classList.add('hidden');
    document.getElementById('main-sidebar-list').classList.remove('hidden');
}

// Open Products Submenu from Main Sidebar
function openSubMenu(menuName) {
    if (menuName === 'products') {
        document.getElementById('main-sidebar-list').classList.add('hidden');
        document.getElementById('products-submenu-list').classList.remove('hidden');
        switchView('menu100');
    }
}

// Toggle Profile Popup Menu
function toggleProfileMenu() {
    const popup = document.getElementById('profile-popup');
    popup.classList.toggle('hidden');
}

// Set Day / Night Theme
function setTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('theme-light');
    } else {
        document.body.classList.remove('theme-light');
    }
}

// Open Quick Modal for adding Category / Product / Additive in UI
function openAddModal(type) {
    const modal = document.getElementById('quick-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body-inputs');
    const saveBtn = document.getElementById('modal-save-btn');

    if (type === 'category') {
        title.textContent = 'افزودن دسته‌بندی جدید';
        body.innerHTML = `
            <input type="text" id="inp-cat-name" placeholder="نام دسته‌بندی (مثلاً: بستنی سنتی)">
            <input type="number" id="inp-cat-priority" placeholder="اولویت نمایش (مثلاً: 2)">
        `;
        saveBtn.onclick = () => {
            const name = document.getElementById('inp-cat-name').value || 'دسته جدید';
            const prio = document.getElementById('inp-cat-priority').value || '1';
            const code = Math.floor(208370000 + Math.random() * 9000);
            const tbody = document.getElementById('categories-tbody');
            tbody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td><button class="three-dots-btn">•••</button></td>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${prio}</td>
                    <td>-</td>
                </tr>
            `);
            document.getElementById('cat-record-count').textContent = `${tbody.children.length} رکورد`;
            closeModal();
        };
    } else if (type === 'product') {
        title.textContent = 'افزودن محصول جدید';
        body.innerHTML = `
            <input type="text" id="inp-prod-name" placeholder="نام محصول">
            <input type="text" id="inp-prod-cat" placeholder="نام دسته‌بندی" value="دسته 1">
            <input type="number" id="inp-prod-price" placeholder="قیمت (تومان)">
            <input type="text" id="inp-prod-code" placeholder="کد محصول (مثلاً: x002)">
        `;
        saveBtn.onclick = () => {
            const name = document.getElementById('inp-prod-name').value || 'محصول جدید';
            const cat = document.getElementById('inp-prod-cat').value || 'دسته 1';
            const price = Number(document.getElementById('inp-prod-price').value || 0).toLocaleString();
            const code = document.getElementById('inp-prod-code').value || 'x002';
            const tbody = document.getElementById('products-tbody');
            tbody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td><input type="checkbox"></td>
                    <td><button class="three-dots-btn">•••</button></td>
                    <td>${name}</td>
                    <td>${cat}</td>
                    <td>${price}</td>
                    <td>0</td>
                    <td>-</td>
                    <td>0</td>
                    <td><span class="status-active">فعال</span></td>
                    <td>1</td>
                    <td>-</td>
                    <td>${code}</td>
                </tr>
            `);
            document.getElementById('prod-record-count').textContent = `${tbody.children.length} رکورد`;
            closeModal();
        };
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('quick-modal').classList.add('hidden');
}
