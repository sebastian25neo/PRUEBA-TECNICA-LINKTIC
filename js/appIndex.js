
$(document).ready(function() {

    const obtenerUsuarios = () => {
        // Obtener el array de usuarios de localStorage
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    const datosUsuario = obtenerUsuarios();

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


    const tablaUsuarios = $('#tablaUsuarios').DataTable({
        "data": datosUsuario,
        "columns": [
            {"data": "documento"},
            {"data": "nombre"},
            {"data": "apellido"},
            {"data": "celular"},
            {"data": "direccion"},
            {
                // Columna para el botón de editar
                "data": null,
                "defaultContent": '<button class="editarBtn btn-primary ">Editar</button>'
            },
            {
                // Columna para el botón de editar
                "data": null,
                "defaultContent": '<button class="eliminarBtn btn-danger">Eliminar</button>'
            }
        ]
    });

    $('#tablaUsuarios tbody').on('click', '.editarBtn', function () {
        const UsuarioData  = tablaUsuarios.row($(this).parents('tr')).data();

        mostrarModalEditar(UsuarioData);
    });

    $('#tablaUsuarios tbody').on('click', '.eliminarBtn', function () {
        const usuarioId  = tablaUsuarios.row($(this).parents('tr')).data().id;

        eliminarUsuario(usuarioId);
    });

    // Función para mostrar el modal de edición con los datos del usuario
    const mostrarModalEditar = (datosUsuario) => {
        console.log(datosUsuario.documento);
        // Aquí puedes actualizar el contenido del modal con los datos del usuario
        $('#modalEditar').show();
        $('#usuairoDocumento').val(datosUsuario.documento); 
        $('#usuairoNombre').val(datosUsuario.nombre); 
        $('#usuarioApellido').val(datosUsuario.apellido); 
        $('#usuarioCelular').val(datosUsuario.celular); 
        $('#usuarioDireccion').val(datosUsuario.direccion); 

       localStorage.setItem('indiceUsuarioEditar', datosUsuario.id);
    }


        $('.close').on('click', function() {
            $('#modalEditar').hide();
        });

        $("#btnEnviar").click(function () {
            if (!validador.form()) return

           editarUsuario()

                Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Se creo con exito el Usuario',
                    showConfirmButton: false,
                    timer: 1500
                })
    
        });

        const  editarUsuario  = ()  =>{

             const indice = JSON.parse(localStorage.getItem('indiceUsuarioEditar'));

            let usuarios = obtenerUsuarios();

            usuarios[indice] = {
                id: indice,
                documento: $('#usuairoDocumento').val(),
                nombre: $('#usuairoNombre').val(),
                apellido: $('#usuarioApellido').val(),
                celular: $('#usuarioCelular').val(),
                direccion: $('#usuarioDireccion').val()
            };

            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            tablaUsuarios.clear().rows.add(usuarios).draw();

            $('#modalEditar').hide();
            
        }
        const eliminarUsuario = (usuarioId) => {
            
            let usuarios = obtenerUsuarios();
        
            usuarios = usuarios.filter(usuario => usuario.id !== usuarioId);
        

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
            tablaUsuarios.clear().rows.add(usuarios).draw();

            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                text: 'El usuario ha sido eliminado correctamente.',
                showConfirmButton: false,
                timer: 1500
            });
        };

        $("#btnCancelar").click(function () {
            validador.resetForm();
            $('#modalEditar').hide();

        });

});
