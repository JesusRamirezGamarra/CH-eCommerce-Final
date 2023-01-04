const form = document.getElementById('loginForm');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/login/passport',{
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
            window.location.replace('/');
        }       
        else if(json.result=="error"){
            document.getElementById("idMessage").innerHTML =`${json.message}. Because ${json.cause}`;    
        } 
    })
    .catch((res) => {
        document.getElementById("idMessage").innerHTML = `try again, if the error persists contact support. ${res.message}`;
    })
    .finally(() =>{

    }); 
    
})