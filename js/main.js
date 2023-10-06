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
        console.log(table);
        showModal.style.display = 'flex';
        closeModal.onclick = function(){
            showModal.style.display = 'none';
        }
        submitOrderRemove.onclick = function() {
            table.classList.remove('active_table');
            showModal.style.display = 'none';
            localStorage.removeItem('tasks', JSON.stringify(tasks))
            renderTasks(tasks)
            menuOrder.innerHTML = ''
        }
        submitOrder.onclick = function() {
            console.log(table);
            showModal.style.display = 'none';
            table.classList.add('active_table');
        }
        
        // thêm và xóa list food
        const btnAddTabFood = $('.btn_order-add')
        const menuOrder = $('.auth-form__menu')

        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        
        btnAddTabFood.addEventListener('click', function() {
            tasks.push({name: menuOrder.innerHTML})
            localStorage.setItem('tasks', JSON.stringify(tasks)) 
            renderTasks(tasks)

        })
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
                                <div class="name_food"></div>
                            </div>
                            <div class="menu_order_right">
                                <div class="navbar_list_food">
                                    <div class="icon_list">
                                        <i class="fa-solid fa-pen"></i>
                                    </div>
                                    <div class="list_food">
                                        <div href="" class="item_food">
                                            <span class="text_food">Khoai tây chiên</span>
                                        </div>
                                        <div href="" class="item_food">
                                            <span class="text_food">Đùi gà chiên</span>
                                        </div>
                                        <div href="" class="item_food">
                                            <span class="text_food">Mỳ cay</span>
                                        </div>
                                        <div href="" class="item_food">
                                            <span class="text_food">Tokbukki</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <i class="fa-solid fa-minus icon_minus"></i>
                                    <span class="text_number">1</span>
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
                    localStorage.setItem('tasks', JSON.stringify(tasks));
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


            const chooseFood = document.querySelectorAll('.item_food');
            const nameFoodOrder = document.querySelectorAll('.text_food');
            const nameFood = document.querySelector('.name_food')
            chooseFood.forEach((button, index) => {
                button.addEventListener('click', () => {
                    const nameFood = button.closest('.menu_order').querySelector('.name_food');
                    const currentFood = nameFoodOrder[index].innerText;
                    nameFood.innerText = currentFood;
                })
            })
        }
    }
});



