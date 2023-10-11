const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Xử lý active table khi submit

const tables = $$('.table')

const showModal = $('.modal')
const closeModal = $('.icon_close')
const submitOrderRemove = $('.btn_order-remove')
const submitOrder = $('.btn_order')

// hiển thị menu và active table
tables.forEach((table) => {
    table.onclick = function() {
        showModal.style.display = 'flex';
        closeModal.onclick = function(){
            showModal.style.display = 'none';
        }
        submitOrderRemove.onclick = function() {
            showModal.style.display = 'none';
            table.classList.remove('active_table');
        }
        submitOrder.onclick = function() {
            console.log(table);
            showModal.style.display = 'none';
            table.classList.add('active_table');
        }
        
        // thêm và xóa list food
        const btnAddShowtodoList = $('.btn_submit_order--add')
        const menuOrder = $('.auth-form__menu')
        const showModalTodoList = $('.modal__todoList')
        const tabNameEl = $('.addFood__input')
        const btnAddTabFood = $('.addFood__btn')
        const behindAddFood = $('.addFood__remove')

        const tasks = getTasksFromLocalStorage()
        btnAddShowtodoList.addEventListener('click', function() {
            showModalTodoList.style.display = 'flex';
        });
        
        const tabs = localStorage.getItem('tabs') ? JSON.parse(localStorage.getItem('tabs')) : [];
        btnAddTabFood.addEventListener('click', function() {
            showModalTodoList.removeAttribute('style');
            const tabName = tabNameEl.value;
            if (tabName) { 
                tabs.push({ name: tabName }); 
                tasks.push({ name: menuOrder.innerHTML, tabName: tabName }); 
                tabNameEl.value = '';
                localStorage.setItem('tabs', JSON.stringify(tabs));
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks(tasks);
            }
        });
        behindAddFood.onclick = function() {
            showModalTodoList.removeAttribute('style');
        }
        function renderTasks(tasks = []) {
            let content = '<div>'
            tasks.forEach((task) => {
                content += `
                <div class="menu_order">
                    <div class="remove_food_order">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="menu_order_left">
                        <i class="fa-solid fa-circle-user img_user"></i>
                        <div class="name_food">${task.tabName}</div>
                    </div>
                    <div class="menu_order_right">
                        <div class="navbar_list_food">
                            <div class="icon_list">
                                <i class="fa-solid fa-pen"></i>
                            </div>
                            <div class="note">
                                <div class="note__container">
                                    <div class="note__header">
                                        <i class="fa-solid fa-xmark"></i>
                                        <h2 class="note__header--title">Note to restaurant</h2>
                                    </div>
                                    <div class="line_title"></div>
                                    <div class="note__content">
                                        <h2 class="note__content--title">Optional</h2>
                                        <textarea name="" id="note__content--input" rows="5" cols="20" placeholder="Add your request"></textarea>
                                        <button>confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-minus icon_minus"></i>
                            <span class="text_number">0</span>
                            <i class="fa-solid fa-plus icon_plus"></i>
                        </div>
                    </div>
                </div>
                <div class="line_list-menu"></div>
                `
            })
            content += '</div>'
            menuOrder.innerHTML = content

            const removeIcon = document.querySelectorAll('.remove_food_order');
            removeIcon.forEach((button, index) => {
                button.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    tabs.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    localStorage.setItem('tabs', JSON.stringify(tabs));
                    renderTasks(tasks);
                });
            });

            const decreaseQuantity = document.querySelectorAll('.icon_minus');
            const increaseQuantity = document.querySelectorAll('.icon_plus');
            const textNumber = document.querySelectorAll('.text_number');
            
            increaseQuantity.forEach((button, index) => {
                button.addEventListener('click', () => {
                    const currentQuantity = parseInt(textNumber[index].innerText);
                    textNumber[index].innerText = (currentQuantity + 1).toString();
                });
            });
            
            decreaseQuantity.forEach((button, index) => {
                button.addEventListener('click', () => {
                    const currentQuantity = parseInt(textNumber[index].innerText);
                    if (currentQuantity > 0) {
                        textNumber[index].innerText = (currentQuantity - 1).toString();
                    }
                });
            });
        }
        const savedTasks = getTasksFromLocalStorage();
        if (savedTasks.length > 0) {
            renderTasks(savedTasks);
        }
    }
});

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}



