const preguntas = [

{texto:"¿Te gusta programar y trabajar con computadoras?",area:"tecnologia"},
{texto:"¿Te interesan los videojuegos y la tecnología?",area:"tecnologia"},

{texto:"¿Te gustan las matemáticas?",area:"ingenieria"},
{texto:"¿Disfrutas resolver problemas complejos?",area:"ingenieria"},

{texto:"¿Te interesa la medicina y el cuerpo humano?",area:"salud"},
{texto:"¿Te gustaría trabajar ayudando pacientes?",area:"salud"},

{texto:"¿Te gusta escuchar y aconsejar personas?",area:"psicologia"},
{texto:"¿Te interesan las emociones humanas?",area:"psicologia"},

{texto:"¿Te gustaría defender personas en juicios?",area:"derecho"},
{texto:"¿Te interesan las leyes?",area:"derecho"},

{texto:"¿Te gustaría dirigir una empresa?",area:"administracion"},
{texto:"¿Te interesan los negocios?",area:"administracion"},

{texto:"¿Te gusta enseñar?",area:"educacion"},
{texto:"¿Disfrutas explicar temas a otros?",area:"educacion"},

{texto:"¿Te gusta dibujar o diseñar?",area:"diseno"},
{texto:"¿Te interesa crear contenido visual?",area:"diseno"},

{texto:"¿Te gusta vender ideas o productos?",area:"marketing"},
{texto:"¿Te interesa la publicidad?",area:"marketing"},

{texto:"¿Te gusta diseñar edificios?",area:"arquitectura"},
{texto:"¿Te interesan los planos y construcciones?",area:"arquitectura"}

];

let actual = 0;

const puntajes = {
tecnologia:0,
ingenieria:0,
salud:0,
psicologia:0,
derecho:0,
administracion:0,
educacion:0,
diseno:0,
marketing:0,
arquitectura:0
};

mostrarPregunta();

function mostrarPregunta(){

document.getElementById("questionBox").innerHTML =
`Pregunta ${actual+1} de ${preguntas.length}<br><br>${preguntas[actual].texto}`;

document.getElementById("progress").style.width =
(actual/preguntas.length)*100 + "%";

}

function responder(valor){

puntajes[preguntas[actual].area]+=valor;

actual++;

if(actual<preguntas.length){

mostrarPregunta();

}else{

mostrarResultado();

}

}

function mostrarResultado(){

document.querySelector(".buttons").style.display="none";

document.getElementById("questionBox").innerHTML =
"🎉 Test Finalizado";

document.getElementById("progress").style.width =
"100%";

const ordenados =
Object.entries(puntajes)
.sort((a,b)=>b[1]-a[1]);

let html =
"<h2>🏆 Top 5 Carreras Recomendadas</h2>";

ordenados.slice(0,5).forEach(item=>{

let porcentaje =
Math.round((item[1]/6)*100);

html += `
<div class="career">
<strong>${obtenerCarrera(item[0])}</strong>
<br>
Compatibilidad: ${porcentaje}%
</div>
`;

});

document.getElementById("resultado").innerHTML =
html;

const mejoresCarreras =
ordenados
.slice(0,3)
.map(item => obtenerCarrera(item[0]))
.join(", ");

localStorage.setItem(
"resultadoVocacional",
mejoresCarreras
);

document.getElementById("btnChatbot").href =
"chatbot.html";

document.querySelector(".volver").style.display =
"inline-block";

}

function obtenerCarrera(area){

const carreras = {

tecnologia:
"Ingeniería de Software, Ingeniería de Sistemas, Ciencia de Datos y Ciberseguridad",

ingenieria:
"Ingeniería Industrial, Civil, Mecánica y Electrónica",

salud:
"Medicina, Enfermería, Nutrición y Obstetricia",

psicologia:
"Psicología y Trabajo Social",

derecho:
"Derecho y Ciencias Políticas",

administracion:
"Administración, Economía y Contabilidad",

educacion:
"Educación Inicial, Primaria y Secundaria",

diseno:
"Diseño Gráfico, UX/UI y Animación Digital",

marketing:
"Marketing, Publicidad y Negocios Digitales",

arquitectura:
"Arquitectura y Urbanismo"

};

return carreras[area];

}