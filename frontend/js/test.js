// ============================================================
// ORIENTABOT - TEST VOCACIONAL
// PREGUNTAS DIFERENTES EN CADA INTENTO
// ============================================================

const TOTAL_PREGUNTAS = 30;

// ============================================================
// BANCO DE PREGUNTAS
// ============================================================

const bancoPreguntas = [

    // ========================================================
    // TECNOLOGÍA
    // ========================================================

    { texto: "¿Te gustaría crear aplicaciones, páginas web o programas?", area: "tecnologia" },
    { texto: "¿Te interesa descubrir cómo funcionan las computadoras?", area: "tecnologia" },
    { texto: "¿Te llama la atención la inteligencia artificial?", area: "tecnologia" },
    { texto: "¿Disfrutarías aprendiendo programación?", area: "tecnologia" },
    { texto: "¿Te gustaría crear videojuegos?", area: "tecnologia" },
    { texto: "¿Te interesa proteger sistemas y redes contra ataques informáticos?", area: "tecnologia" },
    { texto: "¿Te gusta resolver problemas utilizando computadoras?", area: "tecnologia" },
    { texto: "¿Te interesa analizar grandes cantidades de datos?", area: "tecnologia" },
    { texto: "¿Te gustaría aprender cómo funcionan las redes informáticas?", area: "tecnologia" },
    { texto: "¿Te entusiasma aprender nuevas herramientas tecnológicas?", area: "tecnologia" },
    { texto: "¿Te gustaría desarrollar una aplicación que utilicen otras personas?", area: "tecnologia" },
    { texto: "¿Te interesa experimentar con robots o dispositivos inteligentes?", area: "tecnologia" },
    { texto: "¿Te gustaría trabajar en una empresa tecnológica?", area: "tecnologia" },
    { texto: "¿Te gusta encontrar errores y buscar cómo solucionarlos?", area: "tecnologia" },
    { texto: "¿Te interesa aprender sobre computación en la nube?", area: "tecnologia" },

    // ========================================================
    // INGENIERÍA
    // ========================================================

    { texto: "¿Te gusta resolver problemas utilizando matemáticas?", area: "ingenieria" },
    { texto: "¿Te interesa diseñar máquinas o sistemas?", area: "ingenieria" },
    { texto: "¿Te gustaría participar en proyectos de construcción?", area: "ingenieria" },
    { texto: "¿Te interesa saber cómo funcionan las máquinas?", area: "ingenieria" },
    { texto: "¿Te gustan los problemas que requieren lógica y cálculo?", area: "ingenieria" },
    { texto: "¿Te gustaría diseñar edificios o estructuras?", area: "ingenieria" },
    { texto: "¿Te interesa mejorar procesos dentro de una empresa?", area: "ingenieria" },
    { texto: "¿Te gustaría trabajar con circuitos y dispositivos electrónicos?", area: "ingenieria" },
    { texto: "¿Te interesa la mecánica de vehículos o máquinas?", area: "ingenieria" },
    { texto: "¿Te gustaría diseñar soluciones para problemas ambientales?", area: "ingenieria" },
    { texto: "¿Te gustan los proyectos donde debes planificar y construir?", area: "ingenieria" },
    { texto: "¿Te interesa saber cómo funcionan las instalaciones eléctricas?", area: "ingenieria" },
    { texto: "¿Te gustaría trabajar desarrollando productos nuevos?", area: "ingenieria" },
    { texto: "¿Te interesa combinar tecnología con ingeniería?", area: "ingenieria" },
    { texto: "¿Te gustaría participar en grandes proyectos de infraestructura?", area: "ingenieria" },

    // ========================================================
    // SALUD
    // ========================================================

    { texto: "¿Te interesa aprender cómo funciona el cuerpo humano?", area: "salud" },
    { texto: "¿Te gustaría ayudar directamente a personas con problemas de salud?", area: "salud" },
    { texto: "¿Te interesa trabajar en hospitales o clínicas?", area: "salud" },
    { texto: "¿Te gustaría aprender sobre enfermedades y tratamientos?", area: "salud" },
    { texto: "¿Te interesa la alimentación y la nutrición?", area: "salud" },
    { texto: "¿Te gustaría ayudar a recuperar físicamente a una persona?", area: "salud" },
    { texto: "¿Te interesa la prevención de enfermedades?", area: "salud" },
    { texto: "¿Te gustaría trabajar con equipos médicos?", area: "salud" },
    { texto: "¿Te interesa la salud dental?", area: "salud" },
    { texto: "¿Te gustaría participar en campañas de salud?", area: "salud" },
    { texto: "¿Te interesa estudiar el funcionamiento de los órganos humanos?", area: "salud" },
    { texto: "¿Te gustaría trabajar ayudando a pacientes durante su recuperación?", area: "salud" },
    { texto: "¿Te interesa investigar nuevos tratamientos?", area: "salud" },
    { texto: "¿Te gustaría trabajar en situaciones donde debes cuidar a otras personas?", area: "salud" },
    { texto: "¿Te interesa aprender primeros auxilios?", area: "salud" },

    // ========================================================
    // PSICOLOGÍA
    // ========================================================

    { texto: "¿Te gusta escuchar a otras personas cuando tienen problemas?", area: "psicologia" },
    { texto: "¿Te interesa comprender las emociones humanas?", area: "psicologia" },
    { texto: "¿Te gustaría orientar a personas que atraviesan dificultades?", area: "psicologia" },
    { texto: "¿Te interesa saber por qué las personas actúan de determinada manera?", area: "psicologia" },
    { texto: "¿Te consideras una persona comprensiva?", area: "psicologia" },
    { texto: "¿Te gustaría ayudar a mejorar la convivencia entre personas?", area: "psicologia" },
    { texto: "¿Te interesa trabajar con jóvenes que necesitan orientación?", area: "psicologia" },
    { texto: "¿Te gustaría ayudar a alguien a superar un problema personal?", area: "psicologia" },
    { texto: "¿Te interesa estudiar la conducta humana?", area: "psicologia" },
    { texto: "¿Te resulta fácil ponerte en el lugar de otras personas?", area: "psicologia" },
    { texto: "¿Te gustaría trabajar en orientación psicológica?", area: "psicologia" },
    { texto: "¿Te interesa resolver conflictos entre personas?", area: "psicologia" },
    { texto: "¿Te gustaría ayudar a personas que necesitan apoyo social?", area: "psicologia" },
    { texto: "¿Te interesa conocer cómo influyen las emociones en nuestras decisiones?", area: "psicologia" },
    { texto: "¿Te gustaría trabajar en recursos humanos ayudando a trabajadores?", area: "psicologia" },

    // ========================================================
    // NEGOCIOS
    // ========================================================

    { texto: "¿Te gustaría dirigir un negocio propio?", area: "negocios" },
    { texto: "¿Te interesa organizar equipos y tomar decisiones?", area: "negocios" },
    { texto: "¿Te llaman la atención las ventas?", area: "negocios" },
    { texto: "¿Te interesa aprender sobre finanzas?", area: "negocios" },
    { texto: "¿Te gustaría crear una empresa?", area: "negocios" },
    { texto: "¿Te gusta convencer a otras personas con tus ideas?", area: "negocios" },
    { texto: "¿Te gustaría administrar una empresa?", area: "negocios" },
    { texto: "¿Te interesa aprender sobre marketing y publicidad?", area: "negocios" },
    { texto: "¿Te gusta organizar proyectos?", area: "negocios" },
    { texto: "¿Te gustaría negociar con otras personas o empresas?", area: "negocios" },
    { texto: "¿Te interesa conocer cómo funcionan los mercados?", area: "negocios" },
    { texto: "¿Te gustaría liderar un equipo de trabajo?", area: "negocios" },
    { texto: "¿Te interesa el comercio internacional?", area: "negocios" },
    { texto: "¿Te gustaría tomar decisiones importantes dentro de una empresa?", area: "negocios" },
    { texto: "¿Te interesa aprender cómo administrar correctamente el dinero?", area: "negocios" },

    // ========================================================
    // CREATIVIDAD
    // ========================================================

    { texto: "¿Disfrutas dibujar, diseñar o crear contenido visual?", area: "creatividad" },
    { texto: "¿Te gustaría crear videos o animaciones?", area: "creatividad" },
    { texto: "¿Te interesa la fotografía?", area: "creatividad" },
    { texto: "¿Te gusta expresar tus ideas mediante imágenes?", area: "creatividad" },
    { texto: "¿Te gustaría diseñar logotipos o marcas?", area: "creatividad" },
    { texto: "¿Te interesa el diseño de páginas web desde el punto de vista visual?", area: "creatividad" },
    { texto: "¿Te gusta crear contenido para redes sociales?", area: "creatividad" },
    { texto: "¿Te gustaría trabajar en producción audiovisual?", area: "creatividad" },
    { texto: "¿Te interesa la arquitectura y el diseño de espacios?", area: "creatividad" },
    { texto: "¿Te gusta buscar formas originales de resolver problemas?", area: "creatividad" },
    { texto: "¿Te gustaría crear ilustraciones digitales?", area: "creatividad" },
    { texto: "¿Te interesa la edición de fotografías y videos?", area: "creatividad" },
    { texto: "¿Te gustaría diseñar productos?", area: "creatividad" },
    { texto: "¿Te gusta experimentar con colores, formas y estilos?", area: "creatividad" },
    { texto: "¿Te gustaría trabajar en publicidad y creación de contenido?", area: "creatividad" },

    // ========================================================
    // EDUCACIÓN
    // ========================================================

    { texto: "¿Te gusta explicar temas y ayudar a otras personas a aprender?", area: "educacion" },
    { texto: "¿Te gustaría trabajar con niños o adolescentes?", area: "educacion" },
    { texto: "¿Te gusta hablar frente a otras personas?", area: "educacion" },
    { texto: "¿Te interesa enseñar algo que dominas?", area: "educacion" },
    { texto: "¿Te gustaría preparar clases o materiales educativos?", area: "educacion" },
    { texto: "¿Te interesa la comunicación y el periodismo?", area: "educacion" },
    { texto: "¿Te gusta participar en exposiciones?", area: "educacion" },
    { texto: "¿Te gustaría trabajar como profesor?", area: "educacion" },
    { texto: "¿Te interesa investigar y luego explicar lo aprendido?", area: "educacion" },
    { texto: "¿Te gustaría conducir entrevistas o programas?", area: "educacion" },
    { texto: "¿Te resulta fácil explicar algo de diferentes maneras?", area: "educacion" },
    { texto: "¿Te gusta escribir textos para comunicar ideas?", area: "educacion" },
    { texto: "¿Te gustaría ayudar a estudiantes con dificultades?", area: "educacion" },
    { texto: "¿Te interesa crear contenido educativo?", area: "educacion" },
    { texto: "¿Te gustaría hablar ante un público grande?", area: "educacion" },

    // ========================================================
    // SEGURIDAD
    // ========================================================

    { texto: "¿Te gustaría trabajar protegiendo y ayudando a otras personas?", area: "seguridad" },
    { texto: "¿Te atraen profesiones como policía, bombero o militar?", area: "seguridad" },
    { texto: "¿Te consideras una persona disciplinada?", area: "seguridad" },
    { texto: "¿Puedes mantener la calma en situaciones difíciles?", area: "seguridad" },
    { texto: "¿Te gustaría participar en operaciones de emergencia?", area: "seguridad" },
    { texto: "¿Te interesa la seguridad ciudadana?", area: "seguridad" },
    { texto: "¿Te gustaría ayudar durante desastres naturales?", area: "seguridad" },
    { texto: "¿Te interesa aprender técnicas de primeros auxilios y rescate?", area: "seguridad" },
    { texto: "¿Te gusta trabajar siguiendo normas y procedimientos?", area: "seguridad" },
    { texto: "¿Estarías dispuesto a trabajar bajo presión?", area: "seguridad" },
    { texto: "¿Te gustaría formar parte de una institución de servicio público?", area: "seguridad" },
    { texto: "¿Te interesa la prevención de riesgos?", area: "seguridad" },
    { texto: "¿Te gustaría ayudar a mantener el orden en una comunidad?", area: "seguridad" },
    { texto: "¿Te interesa la gestión de emergencias?", area: "seguridad" },
    { texto: "¿Te gustaría trabajar en actividades donde la responsabilidad sea muy importante?", area: "seguridad" },

    // ========================================================
    // OFICIOS
    // ========================================================

    { texto: "¿Prefieres aprender haciendo cosas prácticas?", area: "oficios" },
    { texto: "¿Te gustaría aprender mecánica?", area: "oficios" },
    { texto: "¿Te interesa la electricidad?", area: "oficios" },
    { texto: "¿Te gusta reparar objetos o equipos?", area: "oficios" },
    { texto: "¿Te gustaría aprender carpintería?", area: "oficios" },
    { texto: "¿Te interesa trabajar con herramientas?", area: "oficios" },
    { texto: "¿Te gustaría aprender soldadura?", area: "oficios" },
    { texto: "¿Te interesa la construcción?", area: "oficios" },
    { texto: "¿Te gustaría aprender gastronomía?", area: "oficios" },
    { texto: "¿Te gusta desmontar cosas para descubrir cómo funcionan?", area: "oficios" },
    { texto: "¿Prefieres resolver problemas con tus propias manos?", area: "oficios" },
    { texto: "¿Te gustaría aprender mantenimiento de equipos?", area: "oficios" },
    { texto: "¿Te interesa trabajar con materiales y herramientas físicas?", area: "oficios" },
    { texto: "¿Te gustaría aprender una profesión técnica?", area: "oficios" },
    { texto: "¿Te gusta ver un resultado físico después de realizar un trabajo?", area: "oficios" },

    // ========================================================
    // DERECHO
    // ========================================================

    { texto: "¿Te gusta debatir y defender tus ideas?", area: "derecho" },
    { texto: "¿Te interesa conocer las leyes?", area: "derecho" },
    { texto: "¿Te gustaría defender los derechos de otras personas?", area: "derecho" },
    { texto: "¿Te interesa cómo funciona la sociedad?", area: "derecho" },
    { texto: "¿Te gusta analizar diferentes puntos de vista?", area: "derecho" },
    { texto: "¿Te gustaría participar en debates?", area: "derecho" },
    { texto: "¿Te interesa la justicia?", area: "derecho" },
    { texto: "¿Te gustaría resolver conflictos mediante argumentos?", area: "derecho" },
    { texto: "¿Te interesa la política y las instituciones públicas?", area: "derecho" },
    { texto: "¿Te gusta investigar información antes de tomar una posición?", area: "derecho" },
    { texto: "¿Te gustaría trabajar defendiendo a personas o empresas?", area: "derecho" },
    { texto: "¿Te interesa conocer cómo se crean las leyes?", area: "derecho" },
    { texto: "¿Te gusta analizar problemas sociales?", area: "derecho" },
    { texto: "¿Te gustaría trabajar en una institución pública?", area: "derecho" },
    { texto: "¿Te interesa la historia y evolución de las sociedades?", area: "derecho" }

];


// ============================================================
// PERFILES
// ============================================================

const perfiles = {

    tecnologia: {
        nombre: "Tecnología",
        icono: "💻",
        carreras: "Ingeniería de Software, Ingeniería de Sistemas, Ciencia de Datos, Inteligencia Artificial y Ciberseguridad",
        descripcion: "Tienes afinidad por la tecnología, la lógica y la creación de soluciones digitales."
    },

    ingenieria: {
        nombre: "Ingeniería",
        icono: "⚙️",
        carreras: "Ingeniería Civil, Industrial, Mecánica, Electrónica, Mecatrónica y Ambiental",
        descripcion: "Te atraen los problemas técnicos, las matemáticas, los sistemas y la construcción."
    },

    salud: {
        nombre: "Salud",
        icono: "🩺",
        carreras: "Medicina, Enfermería, Odontología, Nutrición, Obstetricia y Tecnología Médica",
        descripcion: "Tienes interés por el cuerpo humano, el bienestar y el cuidado de otras personas."
    },

    psicologia: {
        nombre: "Psicología y área social",
        icono: "🧠",
        carreras: "Psicología, Trabajo Social, Recursos Humanos y orientación social",
        descripcion: "Te interesa comprender a las personas, sus emociones y sus problemas."
    },

    negocios: {
        nombre: "Negocios y administración",
        icono: "💼",
        carreras: "Administración, Economía, Contabilidad, Finanzas, Marketing y Negocios Internacionales",
        descripcion: "Tienes interés por liderar, organizar, emprender y tomar decisiones."
    },

    creatividad: {
        nombre: "Creatividad y diseño",
        icono: "🎨",
        carreras: "Diseño Gráfico, UX/UI, Animación, Comunicación Audiovisual, Arquitectura y Diseño de Interiores",
        descripcion: "Destacas por tu interés en crear, diseñar y expresar ideas de manera visual."
    },

    educacion: {
        nombre: "Educación y comunicación",
        icono: "📚",
        carreras: "Educación, Pedagogía, Comunicación, Periodismo y capacitación",
        descripcion: "Te gusta comunicar ideas, enseñar y ayudar a otras personas a aprender."
    },

    seguridad: {
        nombre: "Seguridad y servicio público",
        icono: "👮",
        carreras: "Policía, Fuerzas Armadas, Bomberos, Seguridad, Gestión de Emergencias y Defensa Civil",
        descripcion: "Tienes afinidad con la disciplina, el servicio, la protección y el trabajo bajo presión."
    },

    oficios: {
        nombre: "Oficios y trabajo práctico",
        icono: "🔧",
        carreras: "Mecánica, Electricidad, Carpintería, Soldadura, Gastronomía, Construcción y mantenimiento técnico",
        descripcion: "Prefieres aprender mediante la práctica y desarrollar habilidades técnicas o manuales."
    },

    derecho: {
        nombre: "Derecho y humanidades",
        icono: "⚖️",
        carreras: "Derecho, Ciencias Políticas, Relaciones Internacionales y áreas jurídicas",
        descripcion: "Te interesan las leyes, los argumentos, la justicia y los problemas sociales."
    }

};


// ============================================================
// VARIABLES
// ============================================================

let preguntasSeleccionadas = [];
let preguntasUsadas = [];
let actual = 0;

const puntajes = {};


// ============================================================
// INICIALIZAR PUNTAJES
// ============================================================

function inicializarPuntajes() {

    Object.keys(perfiles).forEach(area => {
        puntajes[area] = 0;
    });

}


// ============================================================
// MEZCLAR
// ============================================================

function mezclar(array) {

    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];

    }

    return copia;

}


// ============================================================
// GENERAR TEST DIFERENTE
// ============================================================

function generarPreguntas() {

    const areas = Object.keys(perfiles);

    let seleccion = [];

    // Una pregunta aleatoria de cada área
    areas.forEach(area => {

        const disponibles =
            bancoPreguntas.filter(
                pregunta => pregunta.area === area
            );

        if (disponibles.length > 0) {

            const pregunta =
                disponibles[
                    Math.floor(
                        Math.random() *
                        disponibles.length
                    )
                ];

            seleccion.push(pregunta);

        }

    });


    // Evitar duplicados
    const usadas =
        new Set(
            seleccion.map(p => p.texto)
        );


    let restantes =
        bancoPreguntas.filter(
            pregunta =>
                !usadas.has(pregunta.texto)
        );


    // Mezclar restantes
    restantes = mezclar(restantes);


    // Agregar hasta 30
    while (
        seleccion.length < TOTAL_PREGUNTAS &&
        restantes.length > 0
    ) {

        seleccion.push(
            restantes.shift()
        );

    }


    // Orden diferente
    preguntasSeleccionadas =
        mezclar(seleccion);


    preguntasUsadas =
        preguntasSeleccionadas.map(
            pregunta => pregunta.texto
        );

}


// ============================================================
// MOSTRAR PREGUNTA
// ============================================================

function mostrarPregunta() {

    if (
        actual >= preguntasSeleccionadas.length
    ) {

        mostrarResultado();
        return;

    }


    const pregunta =
        preguntasSeleccionadas[actual];


    const contador =
        document.getElementById("contador");

    const questionBox =
        document.getElementById("questionBox");

    const progress =
        document.getElementById("progress");


    if (contador) {

        contador.innerText =
            `${actual + 1}/${TOTAL_PREGUNTAS}`;

    }


    if (questionBox) {

        questionBox.innerText =
            pregunta.texto;

    }


    if (progress) {

        const porcentaje =
            (actual / TOTAL_PREGUNTAS) * 100;

        progress.style.width =
            `${porcentaje}%`;

    }

}


// ============================================================
// RESPONDER
// ============================================================

function responder(valor) {

    if (
        actual >= preguntasSeleccionadas.length
    ) {

        return;

    }


    const pregunta =
        preguntasSeleccionadas[actual];


    puntajes[pregunta.area] +=
        Number(valor);


    actual++;


    if (
        actual <
        preguntasSeleccionadas.length
    ) {

        mostrarPregunta();

    } else {

        mostrarResultado();

    }

}


// ============================================================
// CALCULAR RESULTADOS
// ============================================================

function calcularResultados() {

    const cantidadPorArea = {};


    preguntasSeleccionadas.forEach(
        pregunta => {

            if (
                !cantidadPorArea[pregunta.area]
            ) {

                cantidadPorArea[pregunta.area] = 0;

            }

            cantidadPorArea[pregunta.area]++;

        }
    );


    return Object.entries(puntajes)

        .map(
            ([area, puntaje]) => {

                const cantidad =
                    cantidadPorArea[area] || 1;

                const maximo =
                    cantidad * 3;

                const porcentaje =
                    Math.round(
                        (puntaje / maximo) * 100
                    );


                return {

                    area,
                    nombre:
                        perfiles[area].nombre,

                    puntaje,

                    porcentaje,

                    preguntas:
                        cantidad

                };

            }
        )

        .sort(
            (a, b) =>
                b.porcentaje -
                a.porcentaje
        );

}


// ============================================================
// MOSTRAR RESULTADO
// ============================================================

function mostrarResultado() {

    const botones =
        document.querySelector(".buttons");

    const contador =
        document.getElementById("contador");

    const questionBox =
        document.getElementById("questionBox");

    const progress =
        document.getElementById("progress");

    const resultado =
        document.getElementById("resultado");


    if (botones) {

        botones.style.display =
            "none";

    }


    if (contador) {

        contador.innerText =
            `${TOTAL_PREGUNTAS}/${TOTAL_PREGUNTAS}`;

    }


    if (questionBox) {

        questionBox.innerText =
            "🎉 ¡Test completado! Hemos analizado tus respuestas.";

    }


    if (progress) {

        progress.style.width =
            "100%";

    }


    const resultados =
        calcularResultados();


    const mejores =
        resultados.slice(0, 5);


    // ========================================================
    // HTML RESULTADOS
    // ========================================================

    let html = `

        <h2>
            🏆 Tus áreas con mayor compatibilidad
        </h2>

        <p style="
            margin-bottom:20px;
            color:#64748b;
        ">
            Estos resultados son orientativos y representan
            tus preferencias según las respuestas realizadas.
        </p>

    `;


    mejores.forEach(
        (item, index) => {

            const perfil =
                perfiles[item.area];


            html += `

                <div class="career">

                    <strong>
                        ${perfil.icono}
                        ${index + 1}.
                        ${perfil.nombre}
                    </strong>

                    <p>
                        ${perfil.descripcion}
                    </p>

                    <p>
                        <strong>
                            Opciones relacionadas:
                        </strong>

                        ${perfil.carreras}
                    </p>

                    <span>
                        Compatibilidad:
                        <strong>
                            ${item.porcentaje}%
                        </strong>
                    </span>

                    <div class="result-bar">

                        <div
                            class="result-fill"
                            style="
                                width:${item.porcentaje}%
                            "
                        ></div>

                    </div>

                </div>

            `;

        }
    );


    if (resultado) {

        resultado.innerHTML =
            html;

    }


    // ========================================================
    // PERFIL PRINCIPAL
    // ========================================================

    const mejorResultado =
        resultados[0];


    if (mejorResultado) {

        localStorage.setItem(
            "perfilVocacional",
            mejorResultado.nombre
        );

        localStorage.setItem(
            "areaVocacional",
            mejorResultado.area
        );

        localStorage.setItem(
            "compatibilidadVocacional",
            String(
                mejorResultado.porcentaje
            )
        );

    }


    // ========================================================
    // RESUMEN
    // ========================================================

    const resumen =
        mejores
            .map(item => {

                const perfil =
                    perfiles[item.area];

                return `${perfil.nombre} (${item.porcentaje}%)`;

            })
            .join(", ");


    localStorage.setItem(
        "resultadoVocacional",
        resumen
    );


    // ========================================================
    // RESULTADOS COMPLETOS
    // ========================================================

    localStorage.setItem(
        "resultadosVocacionales",
        JSON.stringify(resultados)
    );


    // ========================================================
    // PREGUNTAS REALIZADAS
    // ========================================================

    localStorage.setItem(
        "preguntasTestVocacional",
        JSON.stringify(
            preguntasUsadas
        )
    );


    // ========================================================
    // DATOS COMPLETOS
    // ========================================================

    const datosTest = {

        fecha:
            new Date().toISOString(),

        totalPreguntas:
            TOTAL_PREGUNTAS,

        resultados:
            resultados,

        mejoresResultados:
            mejores,

        perfilPrincipal:
            mejorResultado
                ? mejorResultado.nombre
                : null,

        preguntas:
            preguntasUsadas

    };


    localStorage.setItem(
        "datosTestVocacional",
        JSON.stringify(datosTest)
    );


    // ========================================================
    // BOTÓN CHATBOT
    // ========================================================

    const btnChatbot =
        document.getElementById(
            "btnChatbot"
        );


    if (btnChatbot) {

        btnChatbot.href =
            "chatbot.html";

        btnChatbot.style.display =
            "inline-block";

    }


    // ========================================================
    // BOTÓN REINICIAR
    // ========================================================

    const btnReiniciar =
        document.querySelector(
            ".reiniciar"
        );


    if (btnReiniciar) {

        btnReiniciar.style.display =
            "inline-block";

    }


    console.log(
        "✅ Test terminado"
    );

    console.log(
        "Perfil principal:",
        mejorResultado
    );

    console.log(
        "Resultados:",
        resultados
    );

}


// ============================================================
// INICIAR TEST
// ============================================================

function iniciarTest() {

    actual = 0;

    inicializarPuntajes();

    generarPreguntas();


    const botones =
        document.querySelector(
            ".buttons"
        );


    const resultado =
        document.getElementById(
            "resultado"
        );


    if (botones) {

        botones.style.display =
            "flex";

    }


    if (resultado) {

        resultado.innerHTML =
            "";

    }


    mostrarPregunta();

}


// ============================================================
// BOTÓN REINICIAR
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const btnReiniciar =
            document.querySelector(
                ".reiniciar"
            );


        if (btnReiniciar) {

            btnReiniciar.addEventListener(
                "click",
                () => {

                    iniciarTest();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }

    }
);


// ============================================================
// INICIAR
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarTest
);