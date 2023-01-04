let addProductForm = document.getElementById('addProductForm')
const handleAddProductSubmit = (evt,form,route) =>{
    evt.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    formData.forEach((value)=>value.disabled = true);
    [... document.forms.addProductForm.elements].forEach(el => el.disabled  = true );
    document.forms.addProductForm.elements.btnAddProduct.classList.add('hidden');
    document.forms.addProductForm.elements.btnAddProductTryAgain.classList.remove('hidden');    
    fetch(route,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res) => {
        if (res.ok) {  return res.json(); }
        return Promise.reject(res); 
    })    
    .then(json=>{
        if(json.result==="success"){
            document.forms.addProductForm.elements.name.value = json.payload.data.name;
            document.forms.addProductForm.elements.description.value = json.payload.data.description;
            document.forms.addProductForm.elements.price.value = json.payload.data.price;
            document.forms.addProductForm.elements.stock.value = json.payload.data.stock;
            document.forms.addProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
            document.images.imageAddProduct.src = json.payload.data.thumbnail;
            document.getElementById("idMessageAddProduct").innerHTML = `${json.message} : ${json.payload.data.name} with SKU Code: ${json.payload.data.sku}`;    
        }       
        else if(json.result=="error"){
            document.getElementById("idMessageAddProduct").innerHTML = `${json.message} : ${json.payload.data.map( data => data.message)} `;            
        } 
    })
    .catch((res) => {
        res.json()
        .then( json  => {
            document.getElementById("idMessageAddProduct").innerHTML = `try again, if the error persists contact support`;            
        })
    })
    .finally(() =>{
        [... document.forms.addProductForm.elements].forEach(el => el.disabled  = false );
        document.forms.addProductForm.elements.btnAddProduct.classList.remove('hidden');
        document.forms.addProductForm.elements.btnAddProductTryAgain.classList.add('hidden');
    });        
}
addProductForm.addEventListener('submit',(e)=>handleAddProductSubmit(e,e.target,'/api/product'))

let updateProductForm = document.getElementById('updateProductForm')
const handleUpdateProductSubmit = (evt,form,route) =>{
    evt.preventDefault()
    document.images.imageUpdateProduct.src = './img/loadingDark.gif'
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = true );
    document.forms.updateProductForm.elements.btnUpdateProduct.classList.add('hidden');
    document.forms.updateProductForm.elements.btnUpdateProductTryAgain.classList.remove('hidden');                
    fetch(route,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res) => {
        if (res.ok) {  return res.json(); }
        return Promise.reject(res); 
    })
    .then(json=>{
        if(json.result==="success"){
            document.forms.updateProductForm.elements.name.value = json.payload.data.name;
            document.forms.updateProductForm.elements.description.value = json.payload.data.description;
            document.forms.updateProductForm.elements.price.value = json.payload.data.price;
            document.forms.updateProductForm.elements.stock.value = json.payload.data.stock;
            document.forms.updateProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
            document.images.imageUpdateProduct.src = json.payload.data.thumbnail;            
            document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} Updated`;            
        }
        else if(json.result=="error"){
            document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} `;                     
        }
    })          
    .catch((res) => {
        res.json()
        .then( json  => {
            document.getElementById("idMessageUpdateProduct").innerHTML = `try again, if the error persists contact support`;
            document.images.imageUpdateProduct.src ='./img/defaultThumbnail.png';
        })
    })
    .finally(() =>{
        [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = false );
        document.forms.updateProductForm.elements.btnUpdateProduct.classList.remove('hidden');
        document.forms.updateProductForm.elements.btnUpdateProductTryAgain.classList.add('hidden');                                
    });        
}
updateProductForm.addEventListener('submit',(e)=>handleUpdateProductSubmit(e,e.target,'/api/product'))

let findProduct = document.getElementById('id')
const handleFindProductSubmit = (evt,form,route) =>{
    if ( findProduct.value.length !== 36 ) {
        document.forms.updateProductForm.elements.name.value = 'Not Found';
        document.forms.updateProductForm.elements.description.value = 'Not Found';
        document.forms.updateProductForm.elements.price.value = '',
        document.forms.updateProductForm.elements.stock.value = '';
        document.forms.updateProductForm.elements.thumbnail.value = 'Not Found';
        document.images.imageUpdateProduct.src = './img/defaultThumbnail.png';
        document.getElementById("idMessageUpdateProduct").innerHTML = `Invalid SKU code , please try again, if the error persists contact support`
    } 
    else {
        document.images.imageUpdateProduct.src = './img/loadingDark.gif';
        [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = true );
        document.forms.updateProductForm.elements.btnUpdateProduct.classList.add('hidden');
        document.forms.updateProductForm.elements.btnUpdateProductTryAgain.classList.remove('hidden');         
        fetch(route+form.value,{
            method:"GET",
            headers:{
                // Accept: "application/json",
                "Content-Type":"application/json"
            }
        })
        .then((res) => {
            if (res.ok) {  return res.json(); }
            return Promise.reject(res); 
        })    
        .then(json=>{
            if(json.result==="success"){
                document.forms.updateProductForm.elements.name.value = json.payload.data.name;
                document.forms.updateProductForm.elements.description.value = json.payload.data.description;
                document.forms.updateProductForm.elements.price.value = json.payload.data.price;
                document.forms.updateProductForm.elements.stock.value = json.payload.data.stock;
                document.forms.updateProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
                document.images.imageUpdateProduct.src = json.payload.data.thumbnail;
                document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} Found`;            
            }
            else if(json.result=="error"){
                document.forms.updateProductForm.elements.name.value = 'Not Found';
                document.forms.updateProductForm.elements.description.value = 'Not Found';
                document.forms.updateProductForm.elements.price.value = '',
                document.forms.updateProductForm.elements.stock.value = '';
                document.forms.updateProductForm.elements.thumbnail.value = 'Not Found';
                document.images.imageUpdateProduct.src = json.payload.data.thumbnail;            
                document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} `;                     
            }
        })
        .catch((res) => {
            res.json()
            .then( json  => {
                document.forms.updateProductForm.elements.name.value = 'Not Found';
                document.forms.updateProductForm.elements.description.value = 'Not Found';
                document.forms.updateProductForm.elements.price.value = '',
                document.forms.updateProductForm.elements.stock.value = '';
                document.forms.updateProductForm.elements.thumbnail.value = 'Not Found';
                document.images.imageUpdateProduct.src = json.payload.data.thumbnail;
                document.getElementById("idMessageUpdateProduct").innerHTML = `try again, if the error persists contact support`
            })
        })
        .finally(() =>{
            [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = false );
            document.forms.updateProductForm.elements.btnUpdateProduct.classList.remove('hidden');
            document.forms.updateProductForm.elements.btnUpdateProductTryAgain.classList.add('hidden');                                            
        });        
    }   
}
findProduct.addEventListener('blur',(e)=>handleFindProductSubmit(e,e.target,'/api/product/'))



