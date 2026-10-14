const SEED=[
 {id:'s1',no:'01',phase:'1º año',type:'hallazgo',title:'La biblioteca está desordenada y buscar un libro cuesta tiempo',
  obs:'Los usuarios pierden tiempo buscando un libro. Muchas veces no saben si el ejemplar está disponible ni en qué lugar de la biblioteca se encuentra.',
  int:'El problema no es la falta de libros sino la falta de información sobre ellos. Escolano et al. (2025) encuentran lo mismo en bibliotecas sin sistema automatizado: encontrar material lleva más tiempo y esfuerzo a estudiantes y bibliotecarios.',
  cite:'Anteproyecto de 1º · Sección 1'},
 {id:'s2',no:'02',phase:'1º año',type:'decision',title:'La solución es un catálogo de disponibilidad en una tablet',
  obs:'Se definió una aplicación para tablet en modo kiosco dentro de la biblioteca. Muestra si un libro está disponible, cuántos ejemplares hay y su ubicación exacta en estantes y repisas.',
  int:'Así el usuario consulta sin recorrer la biblioteca. El objetivo general es dar acceso rápido a los recursos y, a la vez, facilitar la gestión de la colección.',
  cite:'Anteproyecto de 1º · Secciones 1 y 2'},
 {id:'s3',no:'03',phase:'1º año',type:'avance',title:'Interfaz diseñada y presentada ante compañeros y profesora',
  obs:'Se diseñó la interfaz "Ñe\'ẽryru Tecnológico" con buscador, seis categorías (Cuentos, Novelas, Poesía, Teatro, Ensayo, Diccionarios) y menú lateral. En la defensa del anteproyecto no hubo observaciones formales.',
  int:'La falta de observaciones no equivale a una validación. La interfaz se comprobará con usuarios reales cuando exista el prototipo.',
  cite:'Anteproyecto de 1º · Secciones 8 y 13'},
 {id:'s4',no:'04',phase:'1º año',type:'decision',title:'Prioridades definidas con el método MoSCoW',
  obs:'Cinco funcionalidades quedaron priorizadas. Alta: búsqueda y disponibilidad, geolocalización en interiores, organización de la biblioteca. Media: mapeo e inventario espacial. Baja: reporte de libros más solicitados.',
  int:'Ordenar por prioridad permite saber qué construir primero cuando el tiempo no alcanza.',
  cite:'Sección 3'},
 {id:'s5',no:'05',phase:'2º año',type:'decision',title:'Se descarta la pantalla gigante y se pasa a tablet',
  obs:'La idea inicial era una pantalla táctil de gran formato, como las de las cadenas de comida rápida. Se evaluaron costos de hardware, mantenimiento e instalación.',
  int:'La pantalla no era viable con el presupuesto asignado. La tablet mantiene la función del sistema y es sostenible.',
  cite:'Sección 3 · Cambio de alcance'},
 {id:'s6',no:'06',phase:'2º año',type:'hallazgo',title:'Estado real: ninguna funcionalidad está implementada',
  obs:'Las cinco funcionalidades figuran como pendientes y la programación no empezó. Observaciones registradas: falta manejo de errores ante datos faltantes en la búsqueda; la geolocalización en interiores se evaluará durante el 2º curso; el desorden de la biblioteca frena el mapeo; la organización física se postergó por falta de tiempo del equipo.',
  int:'Es lo esperable en un prototipo temprano (Bjarnason et al., 2023). El riesgo está en el tiempo: el trabajo técnico se concentra en el 3º año.',
  cite:'Secciones 3 y 4'},
 {id:'s7',no:'07',phase:'2º año',type:'decision',title:'Kotlin como lenguaje para Android',
  obs:'Se eligió Kotlin, con interoperabilidad con Java, por ser el lenguaje que Google recomienda para el desarrollo Android moderno. Las librerías, la instalación de dependencias y la ejecución local siguen sin definir.',
  int:'La elección está tomada. Falta bajarla a decisiones concretas de herramientas.',
  cite:'Sección 7 · Gupta (2024)'},
 {id:'s8',no:'08',phase:'2º año',type:'pendiente',title:'Organización del trabajo: Git/GitHub y tablero Kanban',
  obs:'No hay repositorio ni control de versiones. Tampoco se usa un tablero de tareas. Los roles están asignados: Coordinación y QA, Programación y Documentación.',
  int:'Conviene crear el repositorio antes de escribir la primera línea de código, para que cada cambio quede registrado. Beckman et al. (2021) respaldan adoptar Git temprano en proyectos de estudiantes.',
  cite:'Sección 5'},
 {id:'s9',no:'09',phase:'2º año',type:'pendiente',title:'Próximos pasos hacia el 3º curso',
  obs:'Programar los módulos de prioridad alta, configurar el modo kiosco, hacer el piloto con usuarios, ajustar a la versión 1.1 y cerrar la documentación. Las fechas dependen del calendario institucional.',
  int:'Prioridad inmediata: empezar con búsqueda y disponibilidad, incluyendo el mensaje de "Sin resultados".',
  cite:'Secciones 10 y 11'}
];
const TYPES={hallazgo:'Hallazgo',decision:'Decisión',avance:'Avance',pendiente:'Pendiente'};
const FN=[
 {n:'Búsqueda y disponibilidad',p:'Alta',o:'Falta manejo de errores ante datos faltantes.'},
 {n:'Geolocalización en interiores',p:'Alta',o:'Aún no implementada. Se evaluará durante el 2º curso.'},
 {n:'Organización de la biblioteca',p:'Alta',o:'Sin cambios respecto al anteproyecto. Postergada por falta de tiempo del equipo.'},
 {n:'Mapeo e inventario espacial',p:'Media',o:'Frenado por el desorden dentro de la biblioteca.'},
 {n:'Reporte de libros más solicitados',p:'Baja',o:'Postergado para el cierre de esta etapa.'}
];
const KEY='cuaderno-neeryru-entradas';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}}
let own=load(),filter='todos';

function render(){
  const all=[...SEED,...own];
  const list=all.filter(e=>filter==='todos'||e.type===filter);
  const el=document.getElementById('entries');
  el.innerHTML=list.length?list.map(e=>`
   <article class="entry${e.own?' own':''}">
     <div class="side"><span class="no">${esc(e.no)}</span><span class="tag t-${e.type}">${TYPES[e.type]}</span><span class="mono" style="color:var(--muted)">${esc(e.phase)}</span></div>
     <div class="body"><h3>${esc(e.title)}</h3>
       <div class="field"><span class="label">Observado</span><p>${esc(e.obs)}</p></div>
       ${e.int?`<div class="field interp"><span class="label">Interpretación</span><p>${esc(e.int)}</p></div>`:''}
       ${e.cite?`<div class="cite">${esc(e.cite)}</div>`:''}
       ${e.own?`<button class="del" type="button" data-del="${esc(e.id)}">Borrar entrada</button>`:''}
     </div></article>`).join(''):'<p class="empty">No hay entradas de este tipo.</p>';
  const counts={todos:all.length};all.forEach(e=>counts[e.type]=(counts[e.type]||0)+1);
  document.getElementById('filters').innerHTML=['todos',...Object.keys(TYPES)].map(k=>
    `<button class="chip" type="button" data-f="${k}" aria-pressed="${filter===k}">${k==='todos'?'Todas':TYPES[k]} · ${counts[k]||0}</button>`).join('');
}
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-f]');if(f){filter=f.dataset.f;render();return}
  const d=e.target.closest('[data-del]');if(d){own=own.filter(x=>x.id!==d.dataset.del);save(own);render()}
});
document.getElementById('board').innerHTML=FN.map(f=>`
  <div class="fn"><div class="row"><span class="pri ${f.p.toLowerCase()}">Prioridad ${f.p}</span><span class="state">Pendiente</span></div>
  <h3>${f.n}</h3><div class="bar" aria-hidden="true"><i></i></div><p>${f.o}</p></div>`).join('');

const dateEl=document.getElementById('f-date');
try{dateEl.value=new Date().toISOString().slice(0,10)}catch(e){}
document.getElementById('form').addEventListener('submit',ev=>{
  ev.preventDefault();
  const t=document.getElementById('f-title').value.trim(),o=document.getElementById('f-obs').value.trim();
  if(!t||!o)return;
  const d=dateEl.value?dateEl.value.split('-').reverse().join('/'):'';
  own.push({id:'u'+Date.now(),own:true,no:String(SEED.length+own.length+1).padStart(2,'0'),phase:d||'Nueva',type:document.getElementById('f-type').value,title:t,obs:o,int:document.getElementById('f-int').value.trim(),cite:'Entrada propia'});
  const ok=save(own);
  document.getElementById('formMsg').textContent=ok?'Entrada guardada en este navegador.':'Entrada agregada. Este navegador no permite guardarla y se perderá al cerrar la página.';
  ev.target.reset();try{dateEl.value=new Date().toISOString().slice(0,10)}catch(e){}
  filter='todos';render();
});

const btn=document.getElementById('themeBtn'),root=document.documentElement;
function dark(){const t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches}
function label(){btn.textContent=dark()?'Modo claro':'Modo oscuro'}
btn.addEventListener('click',()=>{root.setAttribute('data-theme',dark()?'light':'dark');label()});
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
function setMenu(open){menu.hidden=!open;burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Cerrar menú de secciones':'Abrir menú de secciones')}
burger.addEventListener('click',()=>setMenu(menu.hidden));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false);burger.focus()}});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('nav.sec'))setMenu(false)});
label();render();
