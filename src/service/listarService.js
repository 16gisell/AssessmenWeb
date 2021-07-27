//urls-Apis
var usersApis ='http://localhost:3000/api/users';

//Listar usuarios
async function dataUsuario(){  
    const url = usersApis;
    const res = await fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data,"data")
        var divListar = data.map(function(bar,index){
            console.log(bar._id)
            const ids= bar._id
            if(bar.action === "espera"){
                return `<tr>
                            <th scope="row">${index}</th>
                            <td>${bar.id_user}</td>
                            <td>${bar.nameUser}</td>
                            <td>${bar.action}</td>
                        </tr>` 
            }
            else if(bar.action === "Atendido"){ 
                var tabla =`<tr>
                            <th scope="row">${index}</th>
                            <td>${bar.id_user}</td>
                            <td>${bar.nameUser}</td>
                            <td>${bar.action}</td>
                            <td><button type="button" class="btn btn-danger" id="delete" onClick="SetUsers(${bar.id_user})">Eliminar</button></td>
                        </tr>` 
                        // const dele= document.getElementById("delete");
                        // dele.onclick =DeleteUser(bar._id)
                return tabla;
            }
            else{
                return false;
            }
            
        })
        
        document.getElementById("listTabla").innerHTML = divListar;
    })
    .catch(err=>console.log(err));
}

async function SetUsers(_id){
    const url = usersApis;
    var idsFilter="";
    const res= await fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const filtrar=data.filter(dato=>{
            return dato.id_user == _id
        })
        idsFilter =filtrar[0]._id
        DeleteUser(idsFilter)
    })
    .catch(err=>console.log(err))
}

async function DeleteUser(idsFilter){
    const url= usersApis+'/'+idsFilter;
    const res = await fetch(url,{
        method:'DELETE'
    })
    .then(res=>console.log(res))
    .then(data=>{
        location.reload();
    })
    .catch(err=>console.log(err))
}