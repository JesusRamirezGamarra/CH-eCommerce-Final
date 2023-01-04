deleteProduct = (domumentItemProduct) =>{
    const deleteId = domumentItemProduct.dataset.id
    // let obj = buyThings.map( product => (   { product: product. productId, quantity: product.quantity }  ));
    let obj =  { product : domumentItemProduct.dataset.id }
    fetch('/api/cart/',{
        method:"DELETE",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res) => {
        if (res.ok || res.status == 403) {  return res.json(); }
        return Promise.reject(res); 
    })   
    .then(json=>{
        if(json.result==="success"){
            buyThings = ( sessionStorage.getItem('CODERSHOP') == null )?[]: JSON.parse('[' + sessionStorage.getItem("CODERSHOP") + ']')[0];
            let deleteId = json.payload.data;
            buyThings.forEach(value => {                
                if (value.productId == deleteId) {
                    let priceReduce = parseFloat(value.price) * parseFloat(value.quantity);
                    totalCard =  totalCard - priceReduce;
                    totalCard = totalCard.toFixed(2);
                }
            });
            
            buyThings = buyThings.filter(product => product.productId !== deleteId);
            sessionStorage.setItem('CODERSHOP',   JSON.stringify(buyThings) );
            window.location.replace('/api/cart/checkout');
        }       
        else if(json.result=="error"){
            document.getElementById("idMessage").innerHTML = `<span>${json.message} `
        }
    }) 
    .catch((res) => {
        document.getElementById("idMessage").innerHTML = `try again, if the error persists contact support. ${(res.message===undefined)?'': res.message}`
    })
    .finally(() =>{
    }); 
}


sumar = () => {
    let subtotal = 0;
    [ ...document.getElementsByClassName( "montoProducto" ) ].forEach(  ( element ) =>{
        if(element.innerHTML !== '') subtotal += parseFloat(element.innerHTML);
    });
    document.getElementById('total').innerHTML = subtotal;
}
sumar();

checkout = () =>{
    let obj = buyThings.map( product => (   { product: product. productId, quantity: product.quantity }  ));
    fetch('/api/cart/addproductstoorder',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res) => {
        if (res.ok || res.status == 403) {  return res.json(); }
        return Promise.reject(res); 
    })   
    .then(json=>{
        if(json.result==="success"){
            sessionStorage.setItem('CODERSHOP',[]) 
            window.location.replace('/');
        }       
        else if(json.result=="error"){
            document.getElementById("idMessage").innerHTML = `<span>${json.message} `
        }
    }) 
    .catch((res) => {
        document.getElementById("idMessage").innerHTML = `try again, if the error persists contact support. ${(res.message===undefined)?'': res.message}`
    })
    .finally(() =>{
    }); 
}