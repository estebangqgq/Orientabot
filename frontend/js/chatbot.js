const inputMensaje =
    document.getElementById("userInput");

const inputImagen =
    document.getElementById("imageInput");

const botonEnviar =
    document.getElementById("sendButton");

const botonEliminarImagen =
    document.getElementById("removeImageBtn");

const CLAVE_HISTORIAL_CHAT =
    "orientabotHistorialChat";

const CLAVE_TEMA =
    "orientabotTema";

let imagenSeleccionadaBase64 = null;


/* =====================================================
   ELEMENTOS MENÚ CELULAR
===================================================== */

const sidebar =
    document.getElementById("sidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const closeSidebarBtn =
    document.getElementById("closeSidebarBtn");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function abrirMenuMovil(){

    if(!sidebar) return;

    sidebar.classList.add(
        "mobile-open"
    );

    sidebarOverlay?.classList.add(
        "visible"
    );

}


function cerrarMenuMovil(){

    if(!sidebar) return;

    sidebar.classList.remove(
        "mobile-open"
    );

    sidebarOverlay?.classList.remove(
        "visible"
    );

}


mobileMenuBtn?.addEventListener(
    "click",
    abrirMenuMovil
);


closeSidebarBtn?.addEventListener(
    "click",
    cerrarMenuMovil
);


sidebarOverlay?.addEventListener(
    "click",
    cerrarMenuMovil
);


/*
 * Cerrar menú después de seleccionar
 * una opción.
 */

document
    .querySelectorAll(".menu a")
    .forEach(enlace => {

        enlace.addEventListener(
            "click",
            cerrarMenuMovil
        );

    });


/* =====================================================
   UTILIDADES
===================================================== */

function escaparHTML(texto){

    return String(texto ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


function obtenerChatBox(){

    return document.getElementById(
        "chatBox"
    );

}


function desplazarAlFinal(){

    const chatBox =
        obtenerChatBox();

    if(chatBox){

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }

}


/* =====================================================
   HISTORIAL
===================================================== */

function guardarHistorialChat(){

    const chatBox =
        obtenerChatBox();

    if(!chatBox) return;

    try{

        localStorage.setItem(
            CLAVE_HISTORIAL_CHAT,
            chatBox.innerHTML
        );

    }catch(error){

        console.warn(
            "No se pudo guardar el historial:",
            error
        );

    }

}


function restaurarHistorialChat(){

    const chatBox =
        obtenerChatBox();

    if(!chatBox) return;

    const historial =
        localStorage.getItem(
            CLAVE_HISTORIAL_CHAT
        );

    if(!historial) return;

    chatBox.innerHTML =
        historial;


    chatBox
        .querySelectorAll(
            ".typing-indicator"
        )
        .forEach(indicador => {

            const fila =
                indicador.closest(
                    ".message-row"
                );

            if(fila){

                fila.remove();

            }

        });


    desplazarAlFinal();

}


/* =====================================================
   MODAL BORRAR HISTORIAL
===================================================== */

const deleteModal =
    document.getElementById(
        "deleteModal"
    );

const cancelDeleteBtn =
    document.getElementById(
        "cancelDeleteBtn"
    );

const confirmDeleteBtn =
    document.getElementById(
        "confirmDeleteBtn"
    );

const clearChatButton =
    document.getElementById(
        "clearChatButton"
    );


function abrirModalEliminar(){

    if(!deleteModal) return;

    cerrarMenuMovil();

    deleteModal.classList.add(
        "visible"
    );

}


function cerrarModalEliminar(){

    if(!deleteModal) return;

    deleteModal.classList.remove(
        "visible"
    );

}


function confirmarBorrado(){

    localStorage.removeItem(
        CLAVE_HISTORIAL_CHAT
    );

    cerrarModalEliminar();

    /*
     * Limpiamos visualmente el chat
     * sin necesidad de recargar.
     */

    const chatBox =
        obtenerChatBox();

    if(chatBox){

        chatBox.innerHTML = `

            <div class="message-row bot-row">

                <div class="avatar">
                    🤖
                </div>

                <div class="bot-message">

                    <strong>
                        OrientaBot
                    </strong>

                    <p>
                        ¡Hola! Puedes escribirme
                        una pregunta o adjuntar
                        una imagen para que la analice.
                    </p>

                </div>

            </div>

        `;

    }

}


clearChatButton?.addEventListener(
    "click",
    abrirModalEliminar
);


cancelDeleteBtn?.addEventListener(
    "click",
    cerrarModalEliminar
);


confirmDeleteBtn?.addEventListener(
    "click",
    confirmarBorrado
);


/*
 * Si hacemos clic fuera del modal,
 * también se cierra.
 */

deleteModal?.addEventListener(
    "click",
    evento => {

        if(
            evento.target === deleteModal
        ){

            cerrarModalEliminar();

        }

    }
);


/*
 * Escape para cerrar modal.
 */

document.addEventListener(
    "keydown",
    evento => {

        if(evento.key === "Escape"){

            cerrarModalEliminar();
            cerrarMenuMovil();

        }

    }
);


/* =====================================================
   IMAGEN
===================================================== */

const contenedorPreview =
    document.getElementById(
        "imagePreviewContainer"
    );

const imagenPreview =
    document.getElementById(
        "imagePreview"
    );

const nombreImagen =
    document.getElementById(
        "imageName"
    );


function convertirArchivoABase64(
    archivo
){

    return new Promise(
        (resolve,reject) => {

            const lector =
                new FileReader();

            lector.onload = () => {

                resolve(
                    lector.result
                );

            };

            lector.onerror = () => {

                reject(
                    new Error(
                        "No se pudo leer la imagen."
                    )
                );

            };

            lector.readAsDataURL(
                archivo
            );

        }
    );

}


function eliminarImagenSeleccionada(){

    imagenSeleccionadaBase64 =
        null;


    if(inputImagen){

        inputImagen.value = "";

    }


    if(imagenPreview){

        imagenPreview.removeAttribute(
            "src"
        );

    }


    if(nombreImagen){

        nombreImagen.textContent =
            "";

    }


    if(contenedorPreview){

        contenedorPreview
            .classList
            .remove("visible");

    }

}


/* =====================================================
   MENSAJE USUARIO
===================================================== */

function agregarMensajeUsuario(
    mensaje,
    imagen = null
){

    const chatBox =
        obtenerChatBox();

    if(!chatBox) return;


    const tieneImagen =
        Boolean(imagen);


    let imagenHTML = "";


    if(tieneImagen){

        imagenHTML = `

            <img
                class="message-image"
                src="${imagen}"
                alt="Imagen enviada"
            >

        `;

    }


    let textoHTML = "";


    if(mensaje){

        textoHTML = `

            <p>
                ${escaparHTML(mensaje)
                    .replace(
                        /\n/g,
                        "<br>"
                    )}
            </p>

        `;

    }


    chatBox.insertAdjacentHTML(
        "beforeend",
        `

        <div class="message-row user-row">

            <div
                class="user-message ${
                    tieneImagen
                        ? "has-image"
                        : ""
                }"
            >

                ${imagenHTML}

                ${textoHTML}

            </div>

        </div>

        `
    );


    guardarHistorialChat();

}


/* =====================================================
   INDICADOR
===================================================== */

function agregarIndicadorEscritura(){

    const chatBox =
        obtenerChatBox();

    if(!chatBox) return null;


    const id =
        "typing-" + Date.now();


    chatBox.insertAdjacentHTML(
        "beforeend",
        `

        <div class="message-row bot-row">

            <div class="avatar">
                🤖
            </div>

            <div
                class="bot-message"
                id="${id}"
            >

                <div class="typing-indicator">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>

        </div>

        `
    );


    return id;

}


/* =====================================================
   RESPUESTA IA
===================================================== */

async function escribirRespuesta(
    elemento,
    texto
){

    if(!elemento) return;


    const respuesta =
        String(texto || "").trim();


    if(!respuesta){

        elemento.innerHTML = `

            <p>
                ⚠️ La IA no devolvió
                una respuesta.
            </p>

        `;

        return;

    }


    if(
        typeof marked !== "undefined"
    ){

        elemento.innerHTML =
            marked.parse(
                respuesta
            );

    }else{

        elemento.innerHTML =
            escaparHTML(
                respuesta
            ).replace(
                /\n/g,
                "<br>"
            );

    }


    /*
     * Renderizar MathJax si existe.
     */

    if(
        window.MathJax &&
        typeof MathJax.typesetPromise ===
            "function"
    ){

        try{

            await MathJax.typesetPromise([
                elemento
            ]);

        }catch(error){

            console.warn(
                "MathJax:",
                error
            );

        }

    }


    guardarHistorialChat();

    desplazarAlFinal();

}


/* =====================================================
   ENVIAR MENSAJE
===================================================== */

async function enviarMensaje(
    mensajePersonalizado = null,
    htmlUsuarioPersonalizado = null
){

    const mensaje =
        mensajePersonalizado !== null

            ? mensajePersonalizado

            : (
                inputMensaje
                    ?.value
                    .trim() || ""
            );


    const imagenParaEnviar =
        imagenSeleccionadaBase64;


    if(
        !mensaje &&
        !imagenParaEnviar
    ){

        return;

    }


    if(botonEnviar){

        botonEnviar.disabled =
            true;

    }


    const chatBox =
        obtenerChatBox();


    /*
     * Mostrar mensaje usuario
     */

    if(
        htmlUsuarioPersonalizado &&
        chatBox
    ){

        chatBox.insertAdjacentHTML(
            "beforeend",
            `

            <div class="message-row user-row">

                <div class="user-message">

                    ${htmlUsuarioPersonalizado}

                </div>

            </div>

            `
        );


        guardarHistorialChat();

    }else{

        agregarMensajeUsuario(
            mensaje ||
            "Analiza esta imagen.",
            imagenParaEnviar
        );

    }


    /*
     * Limpiar input
     */

    if(inputMensaje){

        inputMensaje.value = "";

        inputMensaje.style.height =
            "48px";

    }


    eliminarImagenSeleccionada();


    /*
     * Indicador
     */

    const typingId =
        agregarIndicadorEscritura();


    desplazarAlFinal();


    try{

        console.log(
            "📤 Enviando mensaje..."
        );


        /*
         * IMPORTANTE:
         * Esta URL debe ser normal.
         */

        const respuesta =
            await fetch(
    "https://orientabot-1-5aox.onrender.com/chat",
    {


                    method:"POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:JSON.stringify({

                        mensaje:
                            mensaje ||
                            "Analiza detalladamente esta imagen.",

                        imagen:
                            imagenParaEnviar

                    })

                }
            );


        const textoRespuesta =
            await respuesta.text();


        console.log(
            "📥 Respuesta del servidor:",
            textoRespuesta
        );


        let data;


        try{

            data =
                JSON.parse(
                    textoRespuesta
                );

        }catch(error){

            throw new Error(
                "El servidor no devolvió JSON válido."
            );

        }


        if(!respuesta.ok){

            throw new Error(

                data.detalle ||

                data.respuesta ||

                "El servidor devolvió un error."

            );

        }


        const cajaBot =
            document.getElementById(
                typingId
            );


        if(!cajaBot) return;


        await escribirRespuesta(
            cajaBot,
            data.respuesta
        );


    }catch(error){

        console.error(
            "❌ Error:",
            error
        );


        const cajaBot =
            document.getElementById(
                typingId
            );


        if(cajaBot){

            cajaBot.innerHTML = `

                <p>
                    ❌ No se pudo obtener
                    una respuesta.
                </p>

                <small>
                    ${escaparHTML(
                        error.message
                    )}
                </small>

            `;

        }

    }finally{

        if(botonEnviar){

            botonEnviar.disabled =
                false;

        }


        if(inputMensaje){

            inputMensaje.focus();

        }


        desplazarAlFinal();

    }

}


/* =====================================================
   BOTÓN ENVIAR
===================================================== */

botonEnviar?.addEventListener(
    "click",
    () => {

        enviarMensaje();

    }
);


/* =====================================================
   ENTER
===================================================== */

inputMensaje?.addEventListener(
    "keydown",
    evento => {

        if(
            evento.key === "Enter" &&
            !evento.shiftKey
        ){

            evento.preventDefault();

            enviarMensaje();

        }

    }
);


/* =====================================================
   TEXTAREA AUTOMÁTICO
===================================================== */

inputMensaje?.addEventListener(
    "input",
    () => {

        inputMensaje.style.height =
            "48px";


        inputMensaje.style.height =
            Math.min(
                inputMensaje.scrollHeight,
                130
            ) + "px";

    }
);


/* =====================================================
   SELECCIONAR IMAGEN
===================================================== */

inputImagen?.addEventListener(
    "change",
    async () => {

        const archivo =
            inputImagen.files?.[0];


        if(!archivo){

            eliminarImagenSeleccionada();

            return;

        }


        const tiposPermitidos = [

            "image/jpeg",
            "image/png",
            "image/webp"

        ];


        if(
            !tiposPermitidos.includes(
                archivo.type
            )
        ){

            alert(
                "Selecciona una imagen JPG, PNG o WEBP."
            );

            eliminarImagenSeleccionada();

            return;

        }


        const limite =
            3 * 1024 * 1024;


        if(
            archivo.size > limite
        ){

            alert(
                "La imagen debe pesar menos de 3 MB."
            );

            eliminarImagenSeleccionada();

            return;

        }


        try{

            imagenSeleccionadaBase64 =
                await convertirArchivoABase64(
                    archivo
                );


            if(imagenPreview){

                imagenPreview.src =
                    imagenSeleccionadaBase64;

            }


            if(nombreImagen){

                nombreImagen.textContent =
                    archivo.name;

            }


            if(contenedorPreview){

                contenedorPreview
                    .classList
                    .add("visible");

            }


        }catch(error){

            alert(
                error.message
            );

            eliminarImagenSeleccionada();

        }

    }
);


/* =====================================================
   ELIMINAR IMAGEN
===================================================== */

botonEliminarImagen?.addEventListener(
    "click",
    eliminarImagenSeleccionada
);


/* =====================================================
   RESULTADO TEST VOCACIONAL
===================================================== */

window.addEventListener(
    "load",
    () => {

        restaurarHistorialChat();


        const resultado =
            localStorage.getItem(
                "resultadoVocacional"
            );


        if(!resultado) return;


        localStorage.removeItem(
            "resultadoVocacional"
        );


        const mensajeParaIA = `

Acabo de terminar mi test vocacional.

Mis áreas y carreras recomendadas son:

${resultado}

Analiza mis resultados de forma clara y ordenada.

Incluye:

1. Resumen de mi perfil vocacional.
2. Explicación de las principales áreas.
3. Qué se estudia.
4. Campo laboral.
5. Habilidades necesarias.
6. Ventajas y dificultades.
7. Recomendación final.

Aclara que el test es orientativo.

`.trim();


        const htmlUsuario = `

            <h3>
                🎓 Resultado de mi test vocacional
            </h3>

            <p>
                <strong>
                    Áreas recomendadas:
                </strong>
            </p>

            <p>
                ${escaparHTML(resultado)}
            </p>

            <p>
                Quiero que OrientaBot
                analice estos resultados.
            </p>

        `;


        enviarMensaje(
            mensajeParaIA,
            htmlUsuario
        );

    }
);


/* =====================================================
   MODO OSCURO
===================================================== */

const botonTema =
    document.getElementById(
        "darkModeBtn"
    );


function aplicarTema(){

    const tema =
        localStorage.getItem(
            CLAVE_TEMA
        ) || "claro";


    const oscuro =
        tema === "oscuro";


    document.body.classList.toggle(
        "dark",
        oscuro
    );


    if(botonTema){

        botonTema.textContent =
            oscuro
                ? "☀️"
                : "🌙";

    }

}


botonTema?.addEventListener(
    "click",
    () => {

        const oscuro =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            CLAVE_TEMA,
            oscuro
                ? "claro"
                : "oscuro"
        );


        aplicarTema();

    }
);


aplicarTema();