
$(document).ready(function () {
    /*validador */
    validador = $("#formAdd").validate({
        rules: {
            usuairoDocumento: {
                required: true,
                number:true
            },
            usuairoNombre: {
				required: true,
			},
            usuarioApellido: {
				required: true,
			},
            usuarioCelular: {
				required: true,
                number:true
			},
            usuarioDireccion: {
				required: true,
			},

        },

        messages: {
            usuairoDocumento: {
                required: "Documento Usuario: Requerida",
                number:"Solo se permiten números."
            },
            usuairoNombre: {
				required: 'Nombre Usuario: Requerida',
			},
            usuarioApellido: {
				required: 'Apellido Usuario: Requerida',
			},
            usuarioCelular: {
				required: 'Celular Usuario: Requerida',
                number:"Solo se permiten números."
			},
            usuarioDireccion: {
				required: 'Direccion Usuario: Requerida',
			},

        },
        errorPlacement: function (error, element) {
            $(element)
                .closest("form")
                .find("div[for='" + element.attr("id") + "']")
                .append(error);
        },
        errorElement: "span",
        onfocusout: function (element) {
            this.element(element);
        }
    });

    
   
    $("#btnEnviar").click(function () {
        if (!validador.form()) return
            
        const user = {
            documento: $("#usuairoDocumento").val(),
            nombre: $("#usuairoNombre").val(),
            apellido: $("#usuarioApellido").val(),
            celular: $("#usuarioCelular").val(),
            direccion: $("#usuarioDireccion").val()
          };

          agregarUsuarioNuevo(user)

            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Se creo con exito el Usuario',
                showConfirmButton: false,
                timer: 1500
            })

            window.history.back();

    });


    const  agregarUsuarioNuevo  = (datosUsuario)  =>{
        
        let ultimoId = parseInt(localStorage.getItem('ultimoId')) || 0;

        ultimoId++;
    
        datosUsuario.id = ultimoId;
    
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
        usuarios.push(datosUsuario);
    
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        localStorage.setItem('ultimoId', ultimoId);
    }

});



