export function valida(input){
const tipodeInput = input.dataset.tipo
if (validadores[tipodeInput]){
    validadores[tipodeInput](input);
}


if (input.validity.valid){
 input.parentElement.classList.remove('input-container--invalid');
 input.parentElement.querySelector(".input-message-error").innerHTML = ""
} else{
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipodeInput, input)
}

}

const tipoDeErrores = [ 
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
    
];


const mensajesDeError = {
    nombre:{
        valueMissing: "el campo nombre no puede estar vacio",
    },

    email: {
        valueMissing: "el campo correo no puede estar vacio",
        typeMismatch: "el correo no es valido",
    },
    password:{
            valueMissing: "el campo contraseña no puede estar vacio",
            patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, una letra minúscula, un número y no puede contener caracteres especiales."
            
    },

    nacimiento:{
        alueMissing: "este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },

    numero:{
        valueMissing: "este campo nopuede estar vacio",
        patternMismatch: "el formato requerido es XXXXXXXXXX 10 numeros"

    },

    direccion:{
        valueMissing: "este campo nopuede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 y 40 caracteres."

    },

    ciudad:{
        valueMissing: "este campo nopuede estar vacio",
        patternMismatch: "la ciudad debe contener entre 10 y 40 caracteres."

    },

    estado:{
        valueMissing: "este campo nopuede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres."

    },

};


const validadores = {
 nacimiento: (input) => validarnacimiento(input)
};

function mostrarMensajeDeError(tipodeInput, input){
let  mensaje = ""
tipoDeErrores.forEach( error => {
    if(input.validity[error]){
        console.log(tipodeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipodeInput][error]);
        mensaje = mensajesDeError [tipodeInput][error];
    }

})
return mensaje

}

function validarnacimiento(input){
    const fechacliente = new Date (input.value);
    let mensaje = ""
   if  (!mayorDeEdad(fechacliente)){
    mensaje = "Debes tener al menos 18 años de edad"

   }
    input.setCustomValidity(mensaje)

}

function mayorDeEdad(fecha){
    const fechaActual = new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );

    return diferenciaFechas < fechaActual;

}