var USUARIO = {
    nombre: "Nicolas",
    correo: "nicolas@gmail.com",
    contraseña: "12345n"
}

function searchMail(){
    var correoUser = document.getElementById("txtEmail").value;
    var contraUser = document.getElementById("txtPassword").value;

    if( correoUser == USUARIO.correo && contraUser == USUARIO.contraseña){
        alert("Usuario correcto, !Bienvenido "+ USUARIO.nombre)
    } else{
        alert("Usuario o contraseña incorrectos")
    }
}