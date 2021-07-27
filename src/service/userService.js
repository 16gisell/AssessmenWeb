//variables
var refrechlist;
var idT1="";
var idT2 ="";
var cronometro;
var cronometro2;
var refrechlist2;

//urls-Apis
var usersApis ='http://localhost:3000/api/users';
var taquilla1Api='http://localhost:3000/api/taquilla1';
var taquilla2Api = 'http://localhost:3000/api/taquilla2';

//iniciamos tiempo de trabajo por taquillas
function initTiempo(){
    tiempoTaquilla1();
    tiempoTaquilla2(); 
}

//solicitud tikets
function solicitudTicket(){            
    let id_user = document.getElementById("id_user").value;
    let nameUser = document.getElementById("nameUser").value;
    let data=JSON.stringify({
        id_user: id_user,
        nameUser: nameUser,
        action: 'espera'
    })
    PostUser(data, id_user); 
      
}

//************************************** Usuarios ********************************************* */

//registra datos de usuarios en tabla users
async function PostUser(data, id_user){
    const url= usersApis+'/cola';
    const res = await fetch(url, {
        method:'POST',
        body:data,
        headers:{
        'content-type': 'application/json'
    }
    })
    .then((res)=>{
        console.log(res)
    })
    .then((data)=>{
        
        console.log(data)
        //enviamos id_user para obtener el id con el cual lo guardamos en la db
        users(id_user);
    })
    .catch((err)=>console.log(err));
}

// traemos todos los usuarios registrados
async function users(id_user){    
    const url = usersApis;
    const res = await fetch(url)
    .then(res => res.json())
    .then(data=>{
        //filtramos los id para tener los datos del id que se acaba de crear
       const datoo= data.filter(dato=>{
          return dato.id_user == id_user
        })
        //tenemos el objeto del dato friltrado y solo tomamos el id
        const datoo2 = datoo.map(item=>{
            return item._id
        })
        //di el filtrado es correcto lo agregamos a taquilla
        if(datoo){
            SelectTaquilla(datoo2)
        }
    })
    .catch(err=>console.log(err));
}


//******************************** TAQUILLAS ********************************** */

//funcion para definir la taquilla de atencion
async function SelectTaquilla(datoo2){
    const dat = datoo2[0];
    const url= taquilla1Api;
    const res = await fetch(url)
    .then(response => response.json())
    .then(data=>{
        //agregamos a taquilla de forma random
        var x = Math.floor((Math.random() * 2) + 1);
        if(x==1){
            taquilla1(dat)
        }
        else if(x==2){
            taquilla2(dat);
        }
        else{
            return false;
        }
    })
    .catch(err=>console.log(err))
}

//******************************* TAQUILLA 1 ********************************* */

//registramos en taquilla1 el id del usuario que acaba de ser seleccionado a esta taquilla
async function taquilla1(dat){   
    const url= taquilla1Api+'/ticke1';
    const datai= JSON.stringify({
        idUser: dat
    });
    const res = await fetch(url, {
        method:'POST',
        body:datai,
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res=>console.log(res))
    .then(data=>{
        dataTaquilla1();
    })
    .catch(err=>console.log(err))
}

//Listar data de taquilla1
async function dataTaquilla1(){ 
    const url = taquilla1Api;
    const res = await fetch(url)
    .then(response => response.json())
    .then(data=>{
        var divListar = data.map(function(bar){
            return ' <div class="col-sm-12">'+
                        '<div class="card text-center">'+
                        ' <div class="card-body">'+
                            ' <h5 class="card-title">ID:'+bar.idUser+'</h5>'+
                                '<a href="#" class="btn btn-primary">Ticket</a>'+
                        '</div>'+
                        '</div>'+
                    '</div>' 
        })
        document.getElementById("listTaquilla1").innerHTML = divListar;
        idT1=data[0].idUser;
        clearInterval(refrechlist);
    })
    .catch(err=>console.log(err));
}

//refrescamos div taquilla1
function refrescarT1(){
    refrechlist= setInterval(function(){
        window.onload=dataTaquilla1();
    },5000)
}

//verificamos en tiempo transcurrido para la taquilla1
function tiempoTaquilla1(){
    contador_s =00;
    contador_m =00;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");
    cronometro = setInterval(
        function(){
            if(contador_s==60)
            {
                contador_s=0
                contador_m++;
                m.innerHTML = contador_m;                
            }
            if(contador_m==2)
            {
                clearInterval(cronometro);
                updateUserT1();
            }
            s.innerHTML = contador_s;
            contador_s++;
        }
    ,1000);
}

//actualizamos usuario antes de eliminar
async function updateUserT1(){
    const url = usersApis+"/"+idT1;
    const dataIdT1= idT1;
    const data = JSON.stringify({
        action:'Atendido'
    })
    const res= fetch(url,{
        method: 'PUT',
        body:data,
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res=>console.log(res))
    .then(data=>{
        deliteElementTaquilla1(dataIdT1);
    })
    .catch(err=>console.log(err));
}

//al transcurrir los 2min se eleimina elemento de la tabla taquila1 y se actualiza tabla user
async function deliteElementTaquilla1(dataIdT1){
    const url= taquilla1Api+"/"+dataIdT1;
    const res = fetch(url,{
        method:'DELETE'
    })
    .then(res=>{console.log(res)})
    .then(data=>{
        refrescarT1();      
        tiempoTaquilla1();
    })
    .catch(err=>console.log(err));    
}

//************************************ TAQUILLA 2 *********************************** */

//registramos en taquilla1 el id del usuario que acaba de ser seleccionado a esta taquilla
async function taquilla2(dat){ 
    const url= taquilla2Api+'/ticke2';
    const datai= JSON.stringify({
        idUser: dat
    });

    const res = await fetch(url, {
        method:'POST',
        body:datai,
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res=>console.log(res))
    .then(data=>{
        dataTaquilla2()
    })
    .catch(err=>console.log(err));
}

//Listar data de taquilla2
async function dataTaquilla2(){
    const url = taquilla2Api;
    const res = await fetch(url)
    .then(response => response.json())
    .then(data=>{
        var divListar = data.map(function(bar){
            return ' <div class="col-sm-12">'+
            '<div class="card text-center">'+
            ' <div class="card-body">'+
                ' <h5 class="card-title">ID:'+bar.idUser+'</h5>'+
                    '<a href="#" class="btn btn-primary">Ticket</a>'+
            '</div>'+
            '</div>'+
        '</div>' 
        })
        document.getElementById("listTaquilla2").innerHTML = divListar;
        idT2=data[0].idUser;        
        clearInterval(refrechlist2);
    })
    .catch(err=>console.log(err));
}

//refrescamos div taquilla2
function refrescarT2(){
    console.log("refrech taquilla 2 ***")
    refrechlist2= setInterval(function(){
        window.onload=dataTaquilla2();
    },5000)
}

//tiempo de taquilla2 
function tiempoTaquilla2(){
    console.log("tiempo taquilla 2")
    contador_s2 =00;
    contador_m2 =00;
    s2 = document.getElementById("segundos2");
    m2 = document.getElementById("minutos2");
    cronometro2 = setInterval(
        function(){
            if(contador_s2==60)
            {
                contador_s2=0
                contador_m2++;
                m2.innerHTML = contador_m;
                
            }
            if(contador_m2==3)
            {
                clearInterval(cronometro2);
                updateUserT2();
            }
            s2.innerHTML = contador_s2;
            contador_s2++;
        }
    ,1000);
}

//actualizamos usuario antes de eliminar
async function updateUserT2(){
    console.log("actualizar taquilla 2 ***")
    const url = usersApis+"/"+idT2;
    const data = JSON.stringify({
        action:'Atendido'
    })
    const res= fetch(url,{
        method: 'PUT',
        body:data,
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res=>console.log(res))
    .then(data=>{
        deliteElementTaquilla2();
    })
    .catch(err=>console.log(err));
} 

async function deliteElementTaquilla2(){
    console.log(idT2, "desde delete")
    const url= taquilla2Api+"/"+idT2;
    const res = fetch(url,{
        method:'DELETE'
    })
    .then(res=>{console.log(res)})
    .then(data=>{
        refrescarT2();  
        tiempoTaquilla2();      
    })
    .catch(err=>console.log(err))    
}

