let contador = 0;
let autenticado = false;

document.querySelector("#modulo-login").classList.remove("d-none");;  

const modulos = document.querySelectorAll("[id^='link-']");
modulos.forEach((enlace)=>{
    enlace.addEventListener("click", (e)=>{
        e.preventDefault(); 
        let id = enlace.getAttribute("id");
        let vector = id.split("-");
        let link = vector[1];         

        const enlaces = document.querySelectorAll("[id^=modulo-]");
        enlaces.forEach((e)=>{
            e.classList.add("d-none");
        })        
        
        document.querySelector("#modulo-"+link).classList.remove("d-none"); 
        
        if(link==="login" && autenticado){
            document.querySelector("#bienvenida").classList.remove("d-none");
            document.querySelector("#login").classList.add("d-none");    
        }
    })
});

const botonEntrar = document.querySelector("#btn-entrar");
botonEntrar.addEventListener("click", (e)=>{
    e.preventDefault();
    let username = document.querySelector("#txt-usuario").value;
    let password = document.querySelector("#txt-password").value;

    //validaciones
    if(username.trim()===''){
        alert("Error: Debe ingresar el nombre de usuario");
        document.querySelector("#txt-usuario").focus();
        return;
    }
    if(password.trim()===''){
        alert("Error: Debe ingresar el password de usuario");
        document.querySelector("#txt-password").focus();
        return;
    }

    //validaciones
    if(username==="admin" && password==="admin"){
        const enlaces = document.querySelectorAll("[id^=modulo-]");
        enlaces.forEach((e)=>{
            e.classList.add("d-none");
        })        
        
        document.querySelector("#modulo-estudiantes").classList.remove("d-none");
        autenticado = true;
    }
    else{
        alert("Datos incorrectos");
        document.querySelector("#txt-usuario").focus();
        return;
    }

})


$(document).ready(function(){
    $("#ventana").dialog({
        title: 'Ingresar Estudiante',
        width: 600,
        height: 'auto',
        autoOpen: false,
        modal: true,
        show: "fold",
        hide: "explode",
        buttons: [
            {
                text: "Guardar",
                class: "boton-verde",
                click: function(){
                    //validar

                    contador++;

                    let nombre = document.querySelector("#nombre").value;
                    let nota1 = document.querySelector("#nota1").value;
                    let nota2 = document.querySelector("#nota2").value;
                    let nota3 = document.querySelector("#nota3").value;

                    let promedio = (parseFloat(nota1)+parseFloat(nota2)+parseFloat(nota3))/3;

                    let clase = "";
                    if(promedio < 3){
                        clase = "bg-danger text-center text-white";
                    }

                    const tabla = document.querySelector("#tabla-estudiantes");
                    tabla.innerHTML = tabla.innerHTML 
                    + `
                        <tr id="fila-${contador}">
                            <td>${contador}</td>
                            <td>${nombre}</td>
                            <td>${nota1}</td>
                            <td>${nota2}</td>
                            <td>${nota3}</td>
                            <td class="${clase}">${promedio.toFixed(1)}</td>
                            <td>
                                <a href="#" id="editar-estudiante-${contador}" class="btn btn-warning">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="#" id="eliminar-estudiante-${contador}" class="btn btn-danger">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    
                    `; 

                    $(this).dialog('close');

                    /*let btnEditar = document.querySelector("#editar-estudiante-"+contador);
                    btnEditar.addEventListener("click", ()=>{

                    });*/

                    const botonesEliminar = document.querySelectorAll("[id^='eliminar-estudiante-']");
                    botonesEliminar.forEach((b)=>{
                        b.removeEventListener("click", null);
                    });

                    botonesEliminar.forEach((b)=>{
                        b.addEventListener("click", (e)=>{
                            e.preventDefault();
                            let id = b.getAttribute("id");
                            let vector = id.split("-");
                            let estudiante_id = vector[2];
                            let estudiante_nombre = document.querySelector("#fila-"+estudiante_id+" td:nth-child(2)").textContent;

                            if(confirm(`Desea eliminar el estudiante ${estudiante_nombre}`)){
                                document.querySelector("#fila-"+estudiante_id).remove();
                            }
                        })
                    });
                    


                }
            },
            {
                text: "Cancelar",
                class: "boton-rojo",
                click: function(){
                    $(this).dialog('close');
                }
            }
        ]
    });

    $("#btn-ingresar").click(function(e){
        e.preventDefault();
        $("#ventana").dialog('open');
        document.querySelector("#nombre").value = '';
        document.querySelector("#nota1").value = '';
        document.querySelector("#nota2").value = '';
        document.querySelector("#nota3").value = '';
    })
})