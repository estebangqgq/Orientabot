import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({
    limit: "15mb"
}));

const PORT = process.env.PORT || 3000;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


/* =========================
   HISTORIAL
========================= */

let historial = [];

function limitarHistorial() {

    if (historial.length > 20) {
        historial = historial.slice(-20);
    }

}


/* =========================
   PROMPT
========================= */

const SYSTEM_PROMPT = `
Eres OrientaBot, un asistente de inteligencia artificial educativo, amigable y profesional.

Ayudas directamente al estudiante. SIEMPRE habla directamente con él usando expresiones como:
- "Vamos a resolverlo."
- "En tu ejercicio..."
- "Observamos que..."
- "La respuesta es..."
- "Primero..."
- "Ahora..."
- "Finalmente..."

NUNCA hables del estudiante en tercera persona.

NO digas frases como:
- "The user wants..."
- "The user asks..."
- "El usuario quiere..."
- "El usuario solicita..."
- "The image shows..."
- "The user wants me to..."
- "Let's formulate the response..."
- "Drafting the response..."
- "Final answer..."
- "Step 1: Analyze the image..."
- "I need to..."
- "I should..."
- "We need to..."
- "Internal monologue..."
- "Analysis..."
- "Reasoning..."

MUY IMPORTANTE:
NO muestres tu razonamiento interno, instrucciones internas, análisis previo, borradores ni planificación.
NO expliques cómo estás pensando.
NO escribas una sección de análisis antes de responder.
Entrega DIRECTAMENTE la respuesta final para el estudiante.

========================================
IDIOMA
========================================

Responde SIEMPRE EN ESPAÑOL.

No escribas ninguna parte de la respuesta en inglés.

========================================
MATEMÁTICAS
========================================

Cuando resuelvas ejercicios matemáticos:

- Explica paso a paso.
- Sé claro y sencillo.
- Habla directamente al estudiante.
- Utiliza notación matemática SIMPLE.

NO uses LaTeX.

NO uses:
$
$$
\\frac{}
\\[
\\]
\\begin{}
\\end{}
\\cdot
\\text{}

Tampoco uses fórmulas encerradas entre símbolos de dólar.

En lugar de:

$2x + \\frac{x}{2} = 45$

escribe:

2x + x/2 = 45

En lugar de:

$$x = 18$$

escribe:

x = 18

En lugar de:

\\frac{5x}{2}

escribe:

5x/2

Puedes utilizar símbolos matemáticos normales como:
+
-
×
÷
=
>
<
≤
≥
√

Pero evita formatos matemáticos complicados.

========================================
IMÁGENES
========================================

Cuando recibas una imagen:

1. Analiza cuidadosamente lo que realmente aparece.
2. Lee el texto visible.
3. Si aparece un ejercicio, resuélvelo directamente.
4. Explica el procedimiento paso a paso.
5. Si una parte no se puede leer, dilo claramente.
6. No inventes información.
7. Si aparece una captura de pantalla, explica directamente qué problema presenta y cómo solucionarlo.
8. Si aparece un gráfico, explica lo que realmente se puede observar.
9. No hagas diagnósticos médicos definitivos solamente a partir de una imagen.
10. No deduzcas información sensible sobre personas.

NO describas tu proceso interno de análisis de la imagen.

En vez de decir:

"The image shows..."
"The user wants me to solve..."

di directamente:

"En la imagen aparece el siguiente ejercicio..."
"Vamos a resolverlo paso a paso."

========================================
FORMATO
========================================

Usa Markdown sencillo.

Puedes utilizar:

# Título

## Subtítulo

**Texto importante**

- Listas

1. Pasos

Pero NO utilices LaTeX.

Las respuestas deben ser naturales y dirigidas directamente al estudiante.

No repitas innecesariamente el mismo ejercicio.

No escribas una explicación interna antes de la respuesta.

========================================
EJEMPLO DE RESPUESTA MATEMÁTICA
========================================

Si la imagen contiene:

"El doble de un número y su mitad suman 45. ¿Cuál es el número?"

La respuesta debe comenzar directamente así:

"Vamos a resolver este ejercicio paso a paso.

### Planteamiento

Sea x el número que buscamos.

El doble de un número: 2x
Su mitad: x/2

Entonces:

2x + x/2 = 45

### Resolución

Multiplicamos toda la ecuación por 2:

4x + x = 90

5x = 90

x = 18

### Comprobación

El doble de 18 es 36.
La mitad de 18 es 9.

36 + 9 = 45

### Respuesta final

El número es 18."

NO agregues antes de esto análisis, planificación, traducciones al inglés, razonamiento interno ni borradores.

========================================
OTROS TEMAS
========================================

También puedes ayudar con:

- Orientación vocacional.
- Carreras profesionales.
- Universidades.
- Institutos.
- Educación.
- Programación.
- Ciencias.
- Historia.
- Tecnología.
- Cultura general.
- Ejercicios.
- Imágenes.
- Capturas de pantalla.
- Gráficos.
- Documentos.

Siempre responde directamente al estudiante y en español.
`;
function limpiarRespuesta(texto) {

    let respuesta = String(texto || "");

    // Eliminar bloques de razonamiento oculto
    respuesta = respuesta.replace(
        /<think>[\s\S]*?<\/think>/gi,
        ""
    );

    respuesta = respuesta.replace(
        /<analysis>[\s\S]*?<\/analysis>/gi,
        ""
    );

    // Eliminar símbolos de LaTeX
    respuesta = respuesta
        .replace(/\$\$/g, "")
        .replace(/\$/g, "")
        .replace(/\\\[/g, "")
        .replace(/\\\]/g, "")
        .replace(/\\\(/g, "")
        .replace(/\\\)/g, "");

    // Convertir algunas expresiones LaTeX comunes
    respuesta = respuesta
        .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
        .replace(/\\cdot/g, "×")
        .replace(/\\times/g, "×")
        .replace(/\\div/g, "÷")
        .replace(/\\sqrt\{([^{}]+)\}/g, "√($1)")
        .replace(/\\text\{([^{}]+)\}/g, "$1");

    // Eliminar restos de comandos LaTeX comunes
    respuesta = respuesta
        .replace(/\\mathbf\{([^{}]+)\}/g, "$1")
        .replace(/\\mathrm\{([^{}]+)\}/g, "$1")
        .replace(/\\left/g, "")
        .replace(/\\right/g, "");

    return respuesta.trim();
}


/* =========================
   INICIO
========================= */

app.get("/", (req, res) => {

    res.json({
        estado: "OrientaBot API funcionando",
        vision: true
    });

});


/* =========================
   CHAT
========================= */

app.post("/chat", async (req, res) => {

    try {

        const mensaje =
            String(req.body.mensaje || "").trim();

        const imagen =
            req.body.imagen || null;


        if (!mensaje && !imagen) {

            return res.status(400).json({
                respuesta:
                    "Escribe un mensaje o adjunta una imagen."
            });

        }


        let mensajes = [];
        let modelo = "";


        /* =========================
           IMAGEN
        ========================= */

        if (imagen) {

            modelo = "qwen/qwen3.6-27b";

            console.log("");
            console.log("================================");
            console.log("🖼️ IMAGEN RECIBIDA");
            console.log("================================");
            console.log("Modelo:", modelo);
            console.log("Mensaje:", mensaje || "(sin mensaje)");
            console.log("Tipo de imagen:", typeof imagen);
            console.log("Tamaño Base64:", imagen.length);
            console.log("================================");


            /*
             * Verificamos que realmente
             * sea una imagen Base64.
             */

            if (!imagen.startsWith("data:image/")) {

                return res.status(400).json({
                    respuesta:
                        "La imagen enviada no tiene un formato válido."
                });

            }


            const contenidoUsuario = [

                {
                    type: "text",

                    text:
                        mensaje ||
                        "Analiza detalladamente esta imagen y dime qué observas."
                },

                {
                    type: "image_url",

                    image_url: {
                        url: imagen
                    }

                }

            ];


            mensajes = [

                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },

                /*
                 * Para evitar problemas,
                 * no mandamos imágenes antiguas
                 * dentro del historial.
                 */

                ...historial.filter(
                    mensaje =>
                        typeof mensaje.content === "string"
                ),

                {
                    role: "user",
                    content: contenidoUsuario
                }

            ];

        }


        /* =========================
           TEXTO NORMAL
        ========================= */

        else {

            modelo = "openai/gpt-oss-120b";

            mensajes = [

                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },

                ...historial,

                {
                    role: "user",
                    content: mensaje
                }

            ];

        }


        console.log(
            "🤖 Consultando:",
            modelo
        );


        /* =========================
           GROQ
        ========================= */

        const completion =
            await groq.chat.completions.create({

                model: modelo,

                messages: mensajes,

                temperature: 0.7,

                max_completion_tokens: 4000,

                stream: false

            });


        console.log(
            "✅ Groq respondió"
        );


       const respuestaOriginal =
    completion
        ?.choices?.[0]
        ?.message
        ?.content;

const respuesta =
    limpiarRespuesta(respuestaOriginal);


        console.log(
            "Respuesta recibida:",
            respuesta
        );


        /* =========================
           RESPUESTA VACÍA
        ========================= */

        if (
            !respuesta ||
            !String(respuesta).trim()
        ) {

            console.error(
                "❌ GROQ DEVOLVIÓ RESPUESTA VACÍA"
            );

            return res.status(500).json({

                respuesta:
                    "La IA recibió la imagen, pero no devolvió una respuesta. Intenta nuevamente."

            });

        }


        /* =========================
           HISTORIAL
        ========================= */

        historial.push({

            role: "user",

            content:
                imagen
                    ? `${mensaje || "Analiza esta imagen."} [Imagen adjunta]`
                    : mensaje

        });


        historial.push({

            role: "assistant",

            content: respuesta

        });


        limitarHistorial();


        /* =========================
           RESPUESTA
        ========================= */

        return res.json({

            respuesta: respuesta,

            usoVision: Boolean(imagen)

        });


    } catch (error) {

        console.error("");
        console.error("================================");
        console.error("❌ ERROR DE ORIENTABOT");
        console.error("================================");
        console.error(error);
        console.error("================================");


        const estado =
            error.status || 500;


        let mensajeError =
            "Lo siento, ocurrió un error al consultar la inteligencia artificial.";


        if (estado === 401) {

            mensajeError =
                "La API Key de Groq no es válida.";

        }


        if (estado === 413) {

            mensajeError =
                "La imagen enviada es demasiado grande.";

        }


        if (estado === 429) {

            mensajeError =
                "Se alcanzó temporalmente el límite de solicitudes. Intenta nuevamente.";

        }


        if (estado === 404) {

            mensajeError =
                "El modelo de inteligencia artificial no está disponible.";

        }


        return res.status(estado).json({

            respuesta: mensajeError,

            detalle:
                error.message || ""

        });

    }

});


/* =========================
   REINICIAR CHAT
========================= */

app.post("/reiniciar-chat", (req, res) => {

    historial = [];

    res.json({
        mensaje: "Historial eliminado."
    });

});


/* =========================
   SERVIDOR
========================= */

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("🚀 ORIENTABOT");
    console.log("================================");
    console.log(
        `Servidor iniciado en http://localhost:${PORT}`
    );
    console.log("================================");

});