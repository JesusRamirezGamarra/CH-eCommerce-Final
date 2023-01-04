// window.addEventListener('load', () => {
//     evt.preventDefault();
//     const data = new FormData(form);
//     const obj = {}
//     data.forEach((value,key)=>obj[key]=value);
//     fetch('/api/user/profile',{
//         method:"POST",
//         body:JSON.stringify(obj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })
//     .then((res) => {
//         if (res.ok || res.status == 403) {  return res.json(); }
//         return Promise.reject(res); 
//     })   
//     .then(json=>{
//         if(json.result==="success"){
//             window.location.replace('/');
//         }       
//         else if(json.result=="error"){
//             if ( json.payload.data == undefined )
//                 document.getElementById("idMessage").innerHTML = `<span>${json.message} :  ${json.cause}</span>`
//             else{
//                 document.getElementById("idMessage").innerHTML =  `<div><b><u>${json.message}</u> : </b> </div>${json.payload.data.map( data => '<div>'+ data.message + ' in ' +  data.parameter + '.' + data.parameter + '": ' + data.value +' not valid.'+'</div>' ).join('')}`;
//             } 
//         }
//     }) 
//     .catch((res) => {
//         document.getElementById("idMessage").innerHTML = `try again, if the error persists contact support. ${(res.message===undefined)?'': res.message}`
//     })
//     .finally(() =>{

//     }); 
    
// }, false);





const form = document.getElementById('registerForm');
form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/user/profile',{
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
            document.getElementById("idMessage").innerHTML = `User update Sucessfully.`
        }       
        else if(json.result=="error"){
            if ( json.payload.data == undefined )
                document.getElementById("idMessage").innerHTML = `<span>${json.message} :  ${json.cause}</span>`
            else{
                document.getElementById("idMessage").innerHTML =  `<div><b><u>${json.message}</u> : </b> </div>${json.payload.data.map( data => '<div>'+ data.message + ' in ' +  data.parameter + '.' + data.parameter + '": ' + data.value +' not valid.'+'</div>' ).join('')}`;
            } 
        }
    }) 
    .catch((res) => {
        document.getElementById("idMessage").innerHTML = `try again, if the error persists contact support. ${(res.message===undefined)?'': res.message}`
    })
    .finally(() =>{

    }); 
    
})