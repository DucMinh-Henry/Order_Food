const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Xử lý active table khi submit

const tables = $$('.table')

const showModal = $('.modal')
const closeModal = $('.icon_close')
const submitOrderRemove = $('.btn_order-remove')
const submitOrder = $('.btn_submit_order--comfrim')

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}


tables.forEach((table) => {
    table.onclick = function() {
        showModal.style.display = 'flex';
        // Take database in localStorage
        const tasks = getTasksFromLocalStorage()
        // onclick into icon close hidden Modal
        closeModal.onclick = function(){
            showModal.style.display = 'none';
        }
        // onclick into btn Remove hidden Modal
        submitOrderRemove.onclick = function() {
            showModal.style.display = 'none';
            table.classList.remove('active_table');
            localStorage.removeItem('textNumberValues');
            localStorage.removeItem('foodItems');
        }
        
        const btnAddShowtodoList = $('.btn_submit_order--add')
        const menuOrder = $('.auth-form__menu')
        const showModalTodoList = $('.modal__todoList')
        const tabNameEl = $('.addFood__input')
        const btnAddTabFood = $('.addFood__btn')
        const behindAddFood = $('.addFood__remove')

        // onclick into btn ADD to add food
        btnAddShowtodoList.addEventListener('click', function() {
            showModalTodoList.style.display = 'flex';
        });

        // Check localStorage
        const tabs = localStorage.getItem('tabs') ? JSON.parse(localStorage.getItem('tabs')) : [];
        //  onclick into btn ADD to add food into lists food
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
        // onclick into icon close hidden modalAddFood
        behindAddFood.onclick = function() {
            showModalTodoList.removeAttribute('style');
        }

        // Render tasks food 
        function renderTasks(tasks = []) {
            let content = '<div>'
            tasks.forEach((task, index) => {
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
                            <span class="text_number" data-index="${index}">${task.quantity || 0}</span>
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
                    const newQuantity = currentQuantity + 1;
        
                    // Update the tasks array with the new quantity
                    tasks[index].quantity = newQuantity;
        
                    // Update and store the value in localStorage
                    textNumber[index].innerText = newQuantity;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                });
            });
        
            decreaseQuantity.forEach((button, index) => {
                button.addEventListener('click', () => {
                    const currentQuantity = parseInt(textNumber[index].innerText);
                    if (currentQuantity > 0) {
                        const newQuantity = currentQuantity - 1;
        
                        // Update the tasks array with the new quantity
                        tasks[index].quantity = newQuantity;
        
                        // Update and store the value in localStorage
                        textNumber[index].innerText = newQuantity;
                        localStorage.setItem('tasks', JSON.stringify(tasks));
                    }
                });
            });
            

            const showModalConfirmOrder = $('.modal__confirmOrder')
            const listFoodOrder = $('.confirmFood__listOrder')
            const foodItems = localStorage.getItem('foodItems') ? JSON.parse(localStorage.getItem('foodItems')) : [];
            submitOrder.addEventListener('click', function() {
                showModalConfirmOrder.style.display = 'flex';
                const behindConfirmOrder = $('.confirmFood__remove');
                behindConfirmOrder.addEventListener('click', () => {
                    showModalConfirmOrder.removeAttribute('style');
                });
                
                const btnConfirmOrder = $('.confirmFood__btn')
                btnConfirmOrder.onclick = function() {
                    table.classList.add('active_table');
                    showModal.style.display = 'none';
                }
                listFoodOrder.innerHTML = ''; 
                const savedTasks = getTasksFromLocalStorage();
                if (savedTasks.length > 0) {
                    savedTasks.forEach((task, index) => {
                        const quantity = parseInt(textNumber[index].innerText); 
                        if (quantity > 0) {
                                listFoodOrder.innerHTML += `
                                    <div>
                                        <div class="menu_order">
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
                                                    <span class="text_number">${quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="line_list-menu"></div>
                                    </div>
                                `;
                            foodItems.push({name: listFoodOrder.innerHTML ,tabname: task.tabName, quantity: quantity }); 
                            localStorage.setItem('foodItems', JSON.stringify(foodItems));
                        }
                    }); 
                }
            });
        }
        const savedTasks = getTasksFromLocalStorage();
        if (savedTasks.length > 0) {
            renderTasks(savedTasks);
        }
    }
});




