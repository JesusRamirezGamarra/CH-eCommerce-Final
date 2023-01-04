let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let buyThings = [];
let totalCard = 0;
let countProduct = 0;
const searchForm = document.getElementById('searchForm');

//buyThings = ( sessionStorage.getItem('CODERSHOP') == null )?[]: sessionStorage.getItem('CODERSHOP');
buyThings = ( sessionStorage.getItem('CODERSHOP') == null )?[]: JSON.parse('[' + sessionStorage.getItem("CODERSHOP") + ']')[0];

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(document.forms.searchForm.q.value.trim())
        window.location.replace('/api/product/search/'+ document.forms.searchForm.q.value.trim());
})
showCart = () => document.getElementById("products-id").style.display = "block";
closeBtn = () => document.getElementById("products-id").style.display = "none";
addProduct = (domumentItemProduct) =>{
    const infoProduct = {
        image: domumentItemProduct.parentElement.querySelector('div img').src,
        title: domumentItemProduct.parentElement.querySelector('h3').textContent,
        price: domumentItemProduct.parentElement.querySelector('p').textContent.split(' ')[1],
        productId: domumentItemProduct.parentElement.dataset.id,
        fyh: new Date().getTime(),
        quantity: 1
    }    
    readTheContent(infoProduct);    
}
deleteProduct = (domumentItemProduct) =>{
    const deleteId = domumentItemProduct.dataset.id
    buyThings.forEach(value => {
        if (value.productId == deleteId) {
            let priceReduce = parseFloat(value.price) * parseFloat(value.quantity);
            totalCard =  totalCard - priceReduce;
            totalCard = totalCard.toFixed(2);
        }
    });
    buyThings = buyThings.filter(product => product.productId !== deleteId);
    countProduct--;
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}
readTheContent = (infoProduct) =>{
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    const exist = buyThings.some(product => product.productId === infoProduct.productId);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.productId === infoProduct.productId) {
                product.quantity++;
                product.fyh =  new Date().getTime();
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings,infoProduct]
        countProduct++;
    }
    loadHtml();
}
loadHtml = () =>{
    clearHtml();
    buyThings = buyThings.sort( (a,b)=>{
        return  new Date(b.fyh) - new Date(a.fyh);
    });
    buyThings.forEach(product => {
        const {image, title, price, quantity, productId} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$ ${price}</h5>
                <h6>Amount: ${quantity}</h6>
            </div>
            <span class="delete-product" data-id="${productId}" onclick="deleteProduct(this)">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
                </svg>            
            </span>
        `;        
        containerBuyCart.appendChild(row);
        priceTotal.innerHTML = totalCard;
        amountProduct.innerHTML = countProduct;
    });

    ( buyThings.length == 0 ) ? document.forms.checkOutForm.elements.btnCheckout.classList.add('hidden') : document.forms.checkOutForm.elements.btnCheckout.classList.remove('hidden');    
    sessionStorage.setItem('CODERSHOP',   JSON.stringify(buyThings) );
    //sessionStorage.setItem('CODERSHOP',  JSON.stringify({data: buyThings}) );

}
clearHtml = () =>containerBuyCart.innerHTML = '';

let checkOut = document.getElementById('checkOutForm')
const handleCheckOutSubmit = (evt,form,route) =>{    
    evt.preventDefault()
    let obj = buyThings.map( product => (   { product: product. productId, quantity: product.quantity }  ));
    fetch(route,{
        redirect: 'manual',
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        },
    })
    .then((res) => {
        if (res.ok) {  return res.json(); }
        return Promise.reject(res); 
    }) 
    .then(json=>{
        if(json.result==="success"){
            window.location.replace('/api/cart/checkout');
        }
        else if(json.result=="error"){
        }
    })
    .catch((res) => {
        window.location.replace('/login');
    })
    .finally(() =>{
    })
};
checkOut.addEventListener('submit',(e)=>handleCheckOutSubmit(e,e.target,'/api/cart/'))

readTheContentOnly = (infoProduct) =>{
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    const exist = buyThings.some(product => product.productId === infoProduct.productId);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.productId === infoProduct.productId) {
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings,infoProduct]
        countProduct++;
    }
    loadHtml();
}

save = ( productid , amount ) =>{    
    const pro = buyThings.map(product => {
        if (product.productId === productid) {
            product.quantity = amount;
            return product;
        } else {
            return product;
        }
    });
    buyThings = [...pro];
}

load = () => {
    if (buyThings  && buyThings.length > 0){
        countProduct = buyThings.length
        buyThings.forEach((item) =>{
            readTheContentOnly(item);
        })
    }
}
load ();

