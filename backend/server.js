import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Historial temporal
let historial = [];

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {

    const { mensaje } = req.body;

    if (!mensaje || mensaje.trim() === "") {
      return res.status(400).json({
        respuesta: "Por favor escribe un mensaje."
      });
    }

    historial.push({
      role: "user",
      content: mensaje
    });

    // Mantener solo los últimos mensajes
    if (historial.length > 20) {
      historial = historial.slice(-20);
    }

    const respuesta = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
Eres OrientaBot, un asistente de inteligencia artificial avanzado, amigable, educativo y profesional.

CAPACIDADES:
- Tecnología
- Programación
- Matemáticas
- Historia
- Ciencia
- Cultura general
- Educación
- Emprendimiento
- Arte
- Deportes
- Videojuegos
- Streamers
- Creadores de contenido
- Música
- Cine
- Literatura
- Actualidad
- Orientación vocacional

ESPECIALIDAD:
- Orientación vocacional
- Carreras profesionales
- Universidades e institutos
- Habilidades laborales
- Oportunidades académicas
- Desarrollo profesional

FORMATO DE RESPUESTA:

1. Organiza la información visualmente.
2. Utiliza títulos cuando sea necesario.
3. Utiliza listas y numeración.
4. Evita bloques enormes de texto.
5. Usa ejemplos cuando ayuden.
6. Mantén un lenguaje claro para estudiantes.

Cuando expliques temas amplios utiliza:

📌 Introducción

📖 Explicación

✅ Ejemplos

🎯 Conclusión

REGLAS DE SEGURIDAD:

- No generes contenido sexual explícito.
- No describas actos sexuales.
- No generes contenido pornográfico.
- No ayudes a cometer delitos.
- No enseñes actividades peligrosas o ilegales.
- Si la consulta es inapropiada, responde educadamente que no puedes ayudar con ello.

MEMORIA:

- Recuerda el contexto de la conversación actual.
- Utiliza información mencionada anteriormente cuando sea relevante.

IDIOMA:

- Responde en español salvo que el usuario solicite otro idioma.
11. Utiliza siempre títulos, subtítulos, listas y emojis para organizar la información.

12. Nunca escribas grandes bloques de texto seguidos.

13. Separa cada sección con una línea en blanco.

14. Usa tablas cuando compares opciones.
`
        },

        ...historial
      ],

      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024
    });

    const textoRespuesta =
      respuesta.choices[0].message.content;

    historial.push({
      role: "assistant",
      content: textoRespuesta
    });

    res.json({
      respuesta: textoRespuesta
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      respuesta:
        "Lo siento, ocurrió un error al conectar con la inteligencia artificial."
    });

  }
});

app.get("/", (req, res) => {
  res.send("🚀 OrientaBot API funcionando correctamente");
});

app.listen(3000, () => {
  console.log("🚀 Servidor iniciado en http://localhost:3000");
});