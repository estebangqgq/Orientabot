async function enviarMensaje() {

    const input = document.getElementById("userInput");
    const mensaje = input.value.trim();

    if (!mensaje) return;

    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `
        <div class="user-message">
            ${mensaje}
        </div>
    `;

    input.value = "";

    const typingId = "typing-" + Date.now();

    chatBox.innerHTML += `
        <div class="bot-message" id="${typingId}">
            ⏳ OrientaBot está escribiendo...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const respuesta = await fetch(
            "http://localhost:3000/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    mensaje
                })
            }
        );

        const data = await respuesta.json();

        document.getElementById(typingId).innerHTML =
            marked.parse(data.respuesta);

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch(error){

        document.getElementById(typingId).innerHTML =
        "❌ Error al conectar con la IA.";

        console.error(error);

    }

}

document.getElementById("userInput")
.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        enviarMensaje();

    }

});

window.addEventListener("load", () => {

    const resultado =
    localStorage.getItem("resultadoVocacional");

    if(!resultado) return;

    localStorage.removeItem(
        "resultadoVocacional"
    );

    const mensaje =
`Acabo de terminar mi test vocacional. 

Mis carreras recomendadas son: 

${resultado}

Explícame cada carrera.

Incluye:

📌 Descripción

🎓 Qué se estudia

💼 Campo laboral

💰 Salario aproximado

✅ Ventajas

🎯 Recomendación final`;

    document.getElementById("userInput").value =
    mensaje;

    enviarMensaje();

});