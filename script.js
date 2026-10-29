// ---- lógica del buscador (misma que prototipo/buscador.py) ----
const CATALOGO=[
 {
  "id": 1,
  "titulo": "El principito",
  "autor": "Antoine de Saint-Exupéry",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 3,
   "disponibles": 2
  }
 },
 {
  "id": 2,
  "titulo": "Caperucita roja",
  "autor": "Charles Perrault",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 2,
   "disponibles": 1
  }
 },
 {
  "id": 3,
  "titulo": "El patito feo",
  "autor": "Hans Christian Andersen",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 2,
   "disponibles": 0
  }
 },
 {
  "id": 4,
  "titulo": "Hansel y Gretel",
  "autor": "Hermanos Grimm",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 1,
   "disponibles": 1
  }
 },
 {
  "id": 5,
  "titulo": "Ricitos de Oro y los tres osos",
  "autor": "Robert Southey",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 2,
   "disponibles": 2
  }
 },
 {
  "id": 6,
  "titulo": "El zapatero y los duendes",
  "autor": "Hermanos Grimm",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 1,
   "disponibles": 0
  }
 },
 {
  "id": 7,
  "titulo": "Los tres cerditos",
  "autor": "Tradicional",
  "categoria": "Cuentos"
 },
 {
  "id": 8,
  "titulo": "La liebre y la tortuga",
  "autor": "Esopo",
  "categoria": "Cuentos",
  "ejemplares": {
   "total": 2,
   "disponibles": 1
  }
 },
 {
  "id": 9,
  "titulo": "Don Quijote de la Mancha",
  "autor": "Miguel de Cervantes",
  "categoria": "Novelas",
  "ejemplares": {
   "total": 4,
   "disponibles": 3
  }
 },
 {
  "id": 10,
  "titulo": "Hijo de hombre",
  "autor": "Augusto Roa Bastos",
  "categoria": "Novelas",
  "ejemplares": {
   "total": 2,
   "disponibles": 1
  }
 },
 {
  "id": 11,
  "titulo": "Rimas y leyendas",
  "autor": "Gustavo Adolfo Bécquer",
  "categoria": "Poesía",
  "ejemplares": {
   "total": 2,
   "disponibles": 1
  }
 },
 {
  "id": 12,
  "titulo": "La casa de Bernarda Alba",
  "autor": "Federico García Lorca",
  "categoria": "Teatro",
  "ejemplares": {
   "total": 3,
   "disponibles": 2
  }
 },
 {
  "id": 13,
  "titulo": "El laberinto de la soledad",
  "autor": "Octavio Paz",
  "categoria": "Ensayo",
  "ejemplares": {
   "total": 1,
   "disponibles": 1
  }
 },
 {
  "id": 14,
  "titulo": "Diccionario de la lengua española",
  "autor": "Real Academia Española",
  "categoria": "Diccionarios",
  "ejemplares": {
   "total": 2,
   "disponibles": 2
  }
 }
];
const CATEGORIAS=['Cuentos','Novelas','Poesía','Teatro','Ensayo','Diccionarios'];
const MSG_SIN_RESULTADOS='Sin resultados',MSG_SIN_DATO='Disponibilidad no registrada';
function normalizar(t){return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()}
function buscar(catalogo,consulta='',categoria=null){
  const palabras=normalizar(consulta).split(/\s+/).filter(Boolean);
  const cat=categoria?normalizar(categoria):'';
  if(!palabras.length&&!cat)return [];
  return catalogo.filter(l=>{
    if(cat&&normalizar(l.categoria||'')!==cat)return false;
    const texto=normalizar(l.titulo||'')+' '+normalizar(l.autor||'');
    return palabras.every(p=>texto.includes(p));
  });
}
function disponibilidad(l){
  const e=l.ejemplares,sinDato={estado:'sin-dato',texto:MSG_SIN_DATO};
  if(!e||typeof e!=='object'||Array.isArray(e))return sinDato;
  const total=e.total,libres=e.disponibles;
  if(!Number.isInteger(total)||!Number.isInteger(libres)||total<0||libres<0||libres>total)return sinDato;
  if(libres===0)return {estado:'agotado',texto:`No hay ejemplares disponibles (0 de ${total})`};
  if(libres===1)return {estado:'libre',texto:`1 ejemplar disponible (de ${total})`};
  return {estado:'libre',texto:`${libres} ejemplares disponibles (de ${total})`};
}
// ---- fin de la lógica ----

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
 {id:'s6',no:'06',phase:'2º año',type:'hallazgo',title:'Sin prototipo al cierre del informe',
  obs:'Al entregar el informe, las cinco funcionalidades figuraban como pendientes y la programación no había empezado. La revisión señaló que para 2º curso se esperaba al menos el buscador con disponibilidad funcionando, aunque fuera con datos de prueba y sin tablet. Otras observaciones registradas: la búsqueda no manejaba datos faltantes; la geolocalización en interiores se evaluará durante el 2º curso; el desorden de la biblioteca frena el mapeo; la organización física se postergó por falta de tiempo del equipo.',
  int:'El criterio se podía cumplir sin hardware: bastaba con datos de prueba. Que un prototipo esté incompleto en esta etapa es normal (Bjarnason et al., 2023), pero tenía que existir. La entrada 09 responde a esta observación.',
  cite:'Secciones 3 y 4 · Revisión del informe'},
 {id:'s7',no:'07',phase:'2º año',type:'decision',title:'Prototipo en Python y migración a Kotlin en 3º',
  obs:'Se había elegido Kotlin por ser el lenguaje que Google recomienda para Android (Gupta, 2024), pero no había herramientas, librerías ni entorno definidos. La revisión indicó que la decisión quedaba solo en el papel y pidió considerar empezar en Python, que el equipo ya maneja.',
  int:'Se decide hacer el prototipo en Python, que no necesita instalar nada más, y migrar a Kotlin en 3º curso. Lo que se valida ahora (buscar, filtrar, calcular la disponibilidad) se traduce después. Kotlin sigue siendo el lenguaje de la app final y el entorno para Android se define al empezar la migración.',
  cite:'Sección 7 · Revisión del informe'},
 {id:'s8',no:'08',phase:'2º año',type:'avance',title:'El sitio de seguimiento ya está en GitHub',
  obs:'El sitio de seguimiento está publicado en un repositorio de GitHub, por lo que el control de versiones ya está en uso. Todavía no se usa un tablero de tareas (Kanban). Los roles siguen asignados: Coordinación y QA, Programación y Documentación.',
  int:'Falta subir el prototipo al mismo repositorio. Beckman et al. (2021) respaldan adoptar Git temprano en proyectos de estudiantes. Didkivska y Vakaliuk (2026) asocian Kanban con el desarrollo de habilidades de planificación, comunicación y resolución de problemas.',
  cite:'Sección 5'},
 {id:'s9',no:'09',phase:'2º año',type:'avance',title:'Prototipo del buscador con disponibilidad (datos de prueba)',
  obs:'Hay un buscador en Python (prototipo/buscador.py) que corre en consola, sin tablet. Busca por título y autor sin distinguir mayúsculas ni tildes, filtra por las seis categorías, muestra cuántos ejemplares hay disponibles, responde "Sin resultados" y no falla si faltan las cantidades de un libro. El catálogo de prueba tiene 14 libros y las 16 pruebas automáticas pasan.',
  int:'Cubre la parte de la funcionalidad de prioridad Alta que se esperaba para 2º. Todavía no muestra la ubicación (estante y repisa), no usa una base de datos real y no tiene interfaz de tablet. Los datos son de prueba, no el inventario de la biblioteca.',
  cite:'Carpeta prototipo/ · sección Prototipo del buscador'},
 {id:'s10',no:'10',phase:'2º año',type:'pendiente',title:'Próximos pasos hacia el 3º curso',
  obs:'Cargar el inventario real de la biblioteca, agregar la ubicación (estante y repisa), configurar el modo kiosco, hacer el piloto con usuarios, migrar el prototipo a Kotlin y cerrar la documentación. Las fechas dependen del calendario institucional.',
  int:'Prioridad inmediata: reemplazar los datos de prueba por una muestra real de la colección y probar con usuarios internos.',
  cite:'Secciones 10 y 11'}
];
const TYPES={hallazgo:'Hallazgo',decision:'Decisión',avance:'Avance',pendiente:'Pendiente'};
const FN=[
 {n:'Búsqueda y disponibilidad',p:'Alta',st:'Prototipo',o:'Prototipo en Python con datos de prueba: busca por título y autor, filtra por categoría, muestra disponibilidad y maneja datos faltantes. Falta: ubicación en estante y repisa, base de datos real e interfaz en tablet.'},
 {n:'Geolocalización en interiores',p:'Alta',st:'Pendiente',o:'Aún no implementada. Se evaluará durante el 2º curso.'},
 {n:'Organización de la biblioteca',p:'Alta',st:'Pendiente',o:'Sin cambios respecto al anteproyecto. Postergada por falta de tiempo del equipo.'},
 {n:'Mapeo e inventario espacial',p:'Media',st:'Pendiente',o:'Frenado por el desorden dentro de la biblioteca.'},
 {n:'Reporte de libros más solicitados',p:'Baja',st:'Pendiente',o:'Postergado para el cierre de esta etapa.'}
];
const KEY='cuaderno-neeryru-entradas';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}}
let own=load(),filter='todos';

function render(){
  const dup=new Set(SEED.map(e=>e.title+'|'+e.obs));
  const all=[...SEED,...own.filter(e=>!dup.has(e.title+'|'+e.obs))];
  const list=all.filter(e=>filter==='todos'||e.type===filter);
  const el=document.getElementById('entries');
  el.innerHTML=list.length?list.map(e=>`
   <article class="entry${e.own?' own':''}">
     <div class="side"><span class="no">${esc(e.no)}</span><span class="tag t-${e.type}">${TYPES[e.type]}</span><span class="mono" style="color:var(--muted)">${esc(e.phase)}</span></div>
     <div class="body"><h3>${esc(e.title)}</h3>
       <div class="field"><span class="label">Observado</span><p>${esc(e.obs)}</p></div>
       ${e.int?`<div class="field interp"><span class="label">Interpretación</span><p>${esc(e.int)}</p></div>`:''}
       ${e.cite?`<div class="cite">${esc(e.cite)}</div>`:''}
       ${e.own?`<div class="acts"><button class="del" type="button" data-code="${esc(e.id)}">Copiar como código</button><button class="del" type="button" data-del="${esc(e.id)}">Borrar entrada</button></div>`:''}
     </div></article>`).join(''):'<p class="empty">No hay entradas de este tipo.</p>';
  const counts={todos:all.length};all.forEach(e=>counts[e.type]=(counts[e.type]||0)+1);
  document.getElementById('filters').innerHTML=['todos',...Object.keys(TYPES)].map(k=>
    `<button class="chip" type="button" data-f="${k}" aria-pressed="${filter===k}">${k==='todos'?'Todas':TYPES[k]} · ${counts[k]||0}</button>`).join('');
}
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-f]');if(f){filter=f.dataset.f;render();return}
  const d=e.target.closest('[data-del]');if(d){own=own.filter(x=>x.id!==d.dataset.del);save(own);render();return}
  const k=e.target.closest('[data-code]');if(k){const x=own.find(y=>y.id===k.dataset.code);if(x)showCode(x)}
});
document.getElementById('board').innerHTML=FN.map(f=>`
  <div class="fn"><div class="row"><span class="pri ${f.p.toLowerCase()}">Prioridad ${f.p}</span><span class="state${f.st==='Prototipo'?' proto':''}">${f.st}</span></div>
  <h3>${f.n}</h3><p>${f.o}</p></div>`).join('');

const qEl=document.getElementById('q'),catsEl=document.getElementById('cats'),resEl=document.getElementById('results');
let catSel=null;
function renderProto(){
  catsEl.innerHTML=CATEGORIAS.map(c=>`<button class="chip" type="button" data-cat="${c}" aria-pressed="${catSel===c}">${c}</button>`).join('');
  if(!qEl.value.trim()&&!catSel){resEl.innerHTML='<p class="empty">Escribe un título o autor, o elige una categoría.</p>';return}
  const lista=buscar(CATALOGO,qEl.value,catSel);
  if(!lista.length){resEl.innerHTML=`<p class="empty">${MSG_SIN_RESULTADOS}</p>`;return}
  resEl.innerHTML=lista.map(l=>{const d=disponibilidad(l);return `<article class="book"><div><h3>${esc(l.titulo||'(sin título)')}</h3><div class="mono" style="color:var(--muted)">${esc(l.autor||'autor no registrado')} · ${esc(l.categoria||'sin categoría')}</div></div><div class="avail a-${d.estado}">${esc(d.texto)}</div><div class="mono loc">Ubicación: en desarrollo</div></article>`}).join('');
}
qEl.addEventListener('input',renderProto);
catsEl.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;catSel=catSel===b.dataset.cat?null:b.dataset.cat;renderProto()});

// ---- código para pegar en la lista SEED ----
const codeBox=document.getElementById('codeBox'),codeOut=document.getElementById('codeOut'),codeMsg=document.getElementById('codeMsg');
function toCode(e){
  const q=s=>JSON.stringify(String(s));
  const partes=[`id:${q('e'+e.no)}`,`no:${q(e.no)}`,`phase:${q(e.phase)}`,`type:${q(e.type)}`,`title:${q(e.title)}`,`obs:${q(e.obs)}`];
  if(e.int)partes.push(`int:${q(e.int)}`);
  partes.push(`cite:${q('Registro del equipo')}`);
  return ',{'+partes.join(',\n  ')+'}';
}
function showCode(e){
  codeOut.textContent=toCode(e);codeMsg.textContent='';codeBox.hidden=false;
  codeBox.scrollIntoView({block:'nearest',behavior:'smooth'});
}
document.getElementById('copyCode').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(codeOut.textContent);codeMsg.textContent='Código copiado. Ahora pégalo en script.js.'}
  catch(err){const r=document.createRange();r.selectNodeContents(codeOut);const s=getSelection();s.removeAllRanges();s.addRange(r);codeMsg.textContent='Selecciona el código y cópialo con Ctrl+C.'}
});

const dateEl=document.getElementById('f-date');
try{dateEl.value=new Date().toISOString().slice(0,10)}catch(e){}
document.getElementById('form').addEventListener('submit',ev=>{
  ev.preventDefault();
  const t=document.getElementById('f-title').value.trim(),o=document.getElementById('f-obs').value.trim();
  if(!t||!o)return;
  const d=dateEl.value?dateEl.value.split('-').reverse().join('/'):'';
  own.push({id:'u'+Date.now(),own:true,no:String(SEED.length+own.length+1).padStart(2,'0'),phase:d||'Nueva',type:document.getElementById('f-type').value,title:t,obs:o,int:document.getElementById('f-int').value.trim(),cite:'Entrada propia'});
  const ok=save(own);
  document.getElementById('formMsg').textContent=(ok?'Entrada guardada en este navegador.':'Entrada agregada. Este navegador no permite guardarla y se perderá al cerrar la página.')+' Copia el código de abajo para subirla a GitHub.';
  showCode(own[own.length-1]);
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
label();render();renderProto();
