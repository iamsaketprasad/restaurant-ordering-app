import {menuArray} from './data.js'

const orderItem = []

const menuSection = document.getElementById('menu-section')
const orderSection = document.getElementById('order-section')
const modal = document.getElementById('modal')
const paymentForm = document.getElementById('payment-form')

const menuHtml = menuArray.map(menu => {
    const { name, 
            ingredients, 
            id, 
            price, 
            emoji } = menu
        return `
        <div class="menu-item">
            <div class="item-graphic">${emoji}</div>
            <div class="item">
                <h3 class="item-title">${name}</h3>
                <p class="item-description">${ingredients}</p>
                <h4 class="item-price">$${price}</h4>
            </div>
            <div class="add-btn-box">
                <button class="add-btn" data-id="${id}">+</button>
            </div>
        </div>
        <hr>
        `
}).join('')
menuSection.innerHTML = menuHtml

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        addOrderItem(e.target.dataset.id)
    }
    if(e.target.dataset.rmvId){
        rmvOrderItem(e.target.dataset.rmvId)
    }
    if(e.target.id === 'complete-order-btn'){
        paymentPage()
    }
})

function addOrderItem(orderId){
    menuArray.forEach(menu => {
        if(orderId === `${menu.id}`){
            orderItem.push(menu)
        }
    })
    renderOrder()
}

function renderOrder(){
    const totalPrice = orderItem.reduce((total, currentItem) => total + currentItem.price, 0)
    const orderHtml = orderItem.map(item =>{
        const { name, 
            ingredients, 
            id, 
            price, 
            emoji } = item
        return `
        <div class="order-item">
            <h3>${name}</h3>
            <div class="rmv-btn-box">
                <button class="rmv-btn" data-rmv-id="${id}">remove</button>
            </div>
            <h4 class="order-item-price">$${price}</h4>
        </div>
        `
    }).join('')
    const htmlOrderTemplate = `
    <h3 id="your-order">Your order</h3>
    <div id="order">
        ${orderHtml}
    </div>
    <hr id="order-hr">
    <div id="total-price">
        <h3>Total price:</h3>
        <h3 id="total-price-sum">$${totalPrice}</h3>
    </div>
    <div id="order-btn">
        <button id="complete-order-btn">Complete order</button>
    </div>
    `
    if(orderHtml) {
        orderSection.innerHTML = htmlOrderTemplate
        document.getElementById('container').style.margin = '0px auto'
    } else {
        orderSection.innerHTML = ''
        document.getElementById('container').style.margin = '0px auto 250px'
    }
}

function rmvOrderItem(rmvOrderId){
    const rmvItem = orderItem.findIndex(item => `${item.id}` === rmvOrderId)
    orderItem.splice(rmvItem, 1)
    renderOrder()
}

function paymentPage(){
    modal.style.display = 'inline'
}


paymentForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    
    modal.style.display = 'none'
    
    const orderCompleteMsg = `
    <div id="order-complete-box">
        <p id="order-complete-msg">Thanks, ${fullName}! Your order is on its way!</p>
    </div>
    `
    orderSection.innerHTML = orderCompleteMsg
})


