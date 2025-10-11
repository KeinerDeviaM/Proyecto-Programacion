/* =========================================
   Mercadito Sport — app.js (A+B+C, sin 360 y sin mega-menú)
   - Super Buscador (voz, tendencias)
   - Listados con chips + quick view
   - Carrito (localStorage) + CTA móvil
   - Detalle con recomendador de talla + JSON-LD
   - PWA (registro) + blur/skeleton/srcset
   ========================================= */

// ---------- Dataset (demo) ----------
const PRODUCTS = [
  { id:"s1", name:"Guayos Fútbol Pro FG", price:259900, rating:4.7, reviews:912, department:"Hombre", sport:"Fútbol", type:"calzado", brand:"FitMax", colors:[{name:"Negro/Rojo",hex:"#111827"},{name:"Azul",hex:"#2563EB"}], stock:48, discount:25, tags:["top ventas","envío gratis"], image:"https://images.unsplash.com/photo-1603297635072-6f6f8e0d2caa?q=80&w=1600&auto=format&fit=crop", description:"Botas con tacos FG para césped natural, upper sintético texturizado y placa ligera de tracción." },
  { id:"s2", name:"Tenis Running AeroFly", price:219900, rating:4.5, reviews:540, department:"Mujer", sport:"Running", type:"calzado", brand:"AeroRun", colors:[{name:"Blanco",hex:"#F3F4F6"},{name:"Rosa",hex:"#F472B6"}], stock:120, discount:30, tags:["oferta","ligeros"], image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop", description:"Amortiguación reactiva, malla respirable y suela con agarre en clima húmedo." },
  { id:"s3", name:"Pantaloneta Dry-Fit Training", price:69900, rating:4.6, reviews:287, department:"Hombre", sport:"Training", type:"pantalonetas", brand:"ProFlex", colors:[{name:"Gris",hex:"#6B7280"},{name:"Negro",hex:"#111827"}], stock:210, discount:10, tags:["nuevo"], image:"https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=1600&auto=format&fit=crop", description:"Secado rápido, bolsillos con cierre y ajuste elástico. Ideal para gym o cross training." },
  { id:"s4", name:"Balón de Baloncesto Outdoor", price:89900, rating:4.4, reviews:156, department:"Línea Junior", sport:"Basket", type:"accesorios", brand:"CourtPro", colors:[{name:"Naranja",hex:"#EA580C"}], stock:84, discount:0, tags:["junior"], image:"https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600&auto=format&fit=crop", description:"Cubierta de caucho de alto agarre y canales profundos para mayor control en exteriores." },
  { id:"s5", name:"Camiseta Running Reflective", price:55900, rating:4.3, reviews:94, department:"Mujer", sport:"Running", type:"camisetas", brand:"AeroRun", colors:[{name:"Morado",hex:"#8B5CF6"},{name:"Negro",hex:"#111827"}], stock:160, discount:15, tags:["tendencia"], image:"https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1600&auto=format&fit=crop", description:"Tejido respirable, detalles reflectivos 360º y costuras planas anti-roce." },
  { id:"s6", name:"Set Medias Compresión 3 pares", price:39900, rating:4.8, reviews:842, department:"Novedades", sport:"Running", type:"accesorios", brand:"SwiftGear", colors:[{name:"Negro",hex:"#111827"}], stock:300, discount:40, tags:["nuevo","oferta"], image:"https://images.unsplash.com/photo-1542219550-37153d387c47?q=80&w=1600&auto=format&fit=crop", description:"Compresión gradual para mejorar la circulación y reducir fatiga muscular." },
  { id:"s7", name:"Pantalón Jogger Training Unisex", price:94900, rating:4.2, reviews:210, department:"Hombre", sport:"Training", type:"pantalones", brand:"ProFlex", colors:[{name:"Azul",hex:"#1E3A8A"},{name:"Negro",hex:"#111827"}], stock:130, discount:20, tags:["popular"], image:"https://images.unsplash.com/photo-1601397922721-4326ae07a1b2?q=80&w=1600&auto=format&fit=crop", description:"Tejido suave, cintura ajustable y tobillo elastizado. Ideal para calentamiento." },
  { id:"s8", name:"Chanclas Piscina Soft", price:39900, rating:4.1, reviews:77, department:"Línea Junior", sport:"Natación", type:"calzado", brand:"AquaSoft", colors:[{name:"Azul",hex:"#2563EB"},{name:"Verde",hex:"#16A34A"}], stock:200, discount:18, tags:["junior","verano"], image:"https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop", description:"Espuma ligera con agarre antideslizante. Perfectas para ducha y piscina." },
  { id:"s9", name:"Raqueta Tenis All Court", price:299900, rating:4.6, reviews:188, department:"Novedades", sport:"Tenis", type:"accesorios", brand:"CourtPro", colors:[{name:"Negro",hex:"#111827"}], stock:42, discount:22, tags:["nuevo"], image:"https://images.unsplash.com/photo-1542144582-1ba00456b5d5?q=80&w=1600&auto=format&fit=crop", description:"Marco de grafito, patrón 16x19 y balance intermedio para control y potencia." },
  { id:"s10", name:"Top Deportivo Soporte Medio", price:62900, rating:4.0, reviews:61, department:"Mujer", sport:"Training", type:"camisetas", brand:"ProFlex", colors:[{name:"Negro",hex:"#111827"},{name:"Coral",hex:"#FB7185"}], stock:190, discount:0, tags:["bestseller"], image:"https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop", description:"Paneles de malla para ventilación y tirantes regulables." },
  { id:"s11", name:"Canilleras Fútbol Shield", price:34900, rating:4.9, reviews:512, department:"Hombre", sport:"Fútbol", type:"accesorios", brand:"FitMax", colors:[{name:"Negro",hex:"#111827"}], stock:500, discount:35, tags:["oferta"], image:"https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1600&auto=format&fit=crop", description:"Placa rígida con acolchado EVA y calceta elástica para sujeción perfecta." },
  { id:"s12", name:"Camiseta Fútbol Club Local 24/25", price:179900, rating:4.7, reviews:980, department:"Novedades", sport:"Fútbol", type:"camisetas", brand:"SwiftGear", colors:[{name:"Rojo",hex:"#EF4444"},{name:"Blanco",hex:"#F3F4F6"}], stock:95, discount:15, tags:["edición 24/25","nuevo"], image:"https://images.unsplash.com/photo-1518602164578-cd0074062763?q=80&w=1600&auto=format&fit=crop", description:"Tejido transpirable con tecnología anti-humedad y escudo termo-sellado." },
];
const REVIEWS = {
  s1:[{id:"r1",user:"Carlos M.",rating:5,title:"Tracción brutal",body:"Se sienten livianos y el agarre es excelente.",date:"2025-08-02"}],
  s5:[{id:"r3",user:"Laura R.",rating:4,title:"Transpira bien",body:"Corrí 10K y se mantuvo seca.",date:"2025-06-12"}],
  s10:[{id:"r4",user:"Sofía G.",rating:5,title:"Soporte real",body:"Para HIIT fue perfecto.",date:"2025-03-21"}],
};

// ---------- Helpers ----------
const $  = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const formatCOP = (n)=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP"}).format(n);

// Imagen: srcset (usa w=400/800/1200 en URLs de Unsplash)
const srcset = (u)=>{
  try{
    const w400 = u.replace(/w=\d+/, 'w=400');
    const w800 = u.replace(/w=\d+/, 'w=800');
    const w1200= u.replace(/w=\d+/, 'w=1200');
    return `${w400} 400w, ${w800} 800w, ${w1200} 1200w`;
  }catch{ return ''; }
};

// Blur/skeleton helpers
function imgSkeleton(img){
  const wrapper = img.parentElement;
  wrapper?.classList.add('skel');
  img.addEventListener('load', ()=> wrapper?.classList.remove('skel'));
}

// Nav items
const DEPARTMENTS = [
  {label:"Novedades", slug:"novedades"},
  {label:"Hombre", slug:"hombre"},
  {label:"Mujer", slug:"mujer"},
  {label:"Línea Junior", slug:"junior"},
];
const SUBCATS = [
  { id:"todo", label:"Todo" },
  { id:"calzado", label:"Calzado" },
  { id:"camisetas", label:"Camisas/Camisetas" },
  { id:"pantalones-pantalonetas", label:"Pantalones/Pantalonetas" },
  { id:"accesorios", label:"Accesorios" },
  { id:"ofertas", label:"Ofertas" },
  { id:"novedades", label:"Novedades" },
];
const sports = [...new Set(PRODUCTS.map(p=>p.sport))].sort();
const brands = [...new Set(PRODUCTS.map(p=>p.brand))].sort();
const types  = [...new Set(PRODUCTS.map(p=>p.type))].sort();
const TRENDS = ["guayos", "top deportivo", "raqueta", "jogger", "pantaloneta"];

// Stars
function starsHTML(r=0){
  const f=Math.floor(r), half=r-f>=0.5;
  let out='<span aria-label="rating" style="letter-spacing:2px">';
  for(let i=0;i<5;i++) out+= (i<f ? '★' : (i===f&&half ? '☆' : '☆'));
  out+=`</span> <span class="meta">(${r.toFixed(1)})</span>`;
  return out;
}

// --------- NAV SIMPLE (sin mega-menú) ---------
function navHTML(current){
  return [
    `<a href="./index.html" class="${current==='Inicio'?'active':''}">Inicio</a>`,
    `<a href="./novedades.html" class="${current==='Novedades'?'active':''}">Novedades</a>`,
    `<a href="./hombre.html" class="${current==='Hombre'?'active':''}">Hombre</a>`,
    `<a href="./mujer.html" class="${current==='Mujer'?'active':''}">Mujer</a>`,
    `<a href="./junior.html" class="${current==='Línea Junior'?'active':''}">Línea Junior</a>`,
  ].join("");
}

// Barra anuncio: timer simple
function startPromoTimer(){
  const el = $("#promoTimer");
  if(!el) return;
  function nextMidnight(){ const n=new Date(); n.setHours(24,0,0,0); return n; }
  function tick(){
    const diff = nextMidnight() - new Date();
    const h=String(Math.floor(diff/3.6e6)).padStart(2,"0");
    const m=String(Math.floor((diff%3.6e6)/6e4)).padStart(2,"0");
    const s=String(Math.floor((diff%6e4)/1e3)).padStart(2,"0");
    el.textContent = `${h}:${m}:${s}`;
  }
  tick(); setInterval(tick, 1000);
}

// ---------- CART (localStorage) ----------
const CART_KEY = "ms_cart";
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)||"{}"); }catch{ return {}; } }
function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCTA(); }
function addToCart(id, qty=1){
  const c = getCart();
  c[id] = (c[id]||0) + qty;
  saveCart(c);
  showCartDrawer();
}
function removeFromCart(id){
  const c = getCart();
  delete c[id]; saveCart(c); renderCartDrawer();
}
function cartCount(){
  const c = getCart();
  return Object.values(c).reduce((a,b)=>a+b,0);
}
function cartItems(){
  const c = getCart();
  return Object.entries(c).map(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return null;
    return { ...p, qty, final: p.discount>0?Math.round(p.price*(1-p.discount/100)):p.price };
  }).filter(Boolean);
}

// CTA flotante móvil
function ensureCartCTA(){
  if($('#cartCTA')) return;
  const b=document.createElement('button');
  b.id='cartCTA';
  b.className='btn cart-cta';
  b.innerHTML='🛒 Ver carrito';
  b.style.display='none';
  b.addEventListener('click', showCartDrawer);
  document.body.appendChild(b);
  updateCartCTA();
}
function updateCartCTA(){
  const b = $('#cartCTA'); if(!b) return;
  const cnt = cartCount();
  b.style.display = cnt>0 ? 'flex' : 'none';
  b.textContent = `🛒 Carrito (${cnt})`;
}

// Drawer carrito
function ensureCartDrawer(){
  if($('#cartDrawer')) return $('#cartDrawer');
  const host = document.createElement('div');
  host.id='cartDrawer';
  host.className='drawer';
  host.innerHTML = `
    <div class="drawer-box">
      <div class="row" style="justify-content:space-between;align-items:center">
        <strong>Tu carrito</strong>
        <button id="cartClose" class="btn small outline">✕</button>
      </div>
      <div id="cartBody" style="margin-top:10px;max-height:60vh;overflow:auto"></div>
      <div id="cartFooter" class="row" style="justify-content:space-between;margin-top:10px">
        <span class="meta">Impuestos y envío en el checkout</span>
        <div class="row" style="gap:8px">
          <button id="cartClear" class="btn outline small">Vaciar</button>
          <a class="btn small">Ir a pagar</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(host);
  $('#cartClose',host).addEventListener('click', ()=> host.classList.remove('open'));
  $('#cartClear',host).addEventListener('click', ()=>{ localStorage.removeItem(CART_KEY); updateCartCTA(); renderCartDrawer(); });
  host.addEventListener('click', (e)=>{ if(e.target===host) host.classList.remove('open'); });
  return host;
}
function renderCartDrawer(){
  const host = ensureCartDrawer();
  const body = $('#cartBody',host);
  const items = cartItems();
  if(!items.length){
    body.innerHTML = `<p class="meta">Aún no has agregado productos.</p>`;
    updateCartCTA();
    return;
  }
  let total = 0;
  body.innerHTML = items.map(it=>{
    total += it.final * it.qty;
    return `<div class="card" style="box-shadow:none">
      <div class="pad row" style="gap:10px;align-items:center">
        <div class="img" style="width:64px;height:64px;border-radius:10px;overflow:hidden"><img src="${it.image}" alt="${it.name}"></div>
        <div style="flex:1">
          <div style="font-weight:700">${it.name}</div>
          <div class="meta">${it.brand} • ${it.sport}</div>
          <div class="row" style="gap:6px;margin-top:4px">
            <button class="btn small outline" data-minus="${it.id}">-</button>
            <span>${it.qty}</span>
            <button class="btn small outline" data-plus="${it.id}">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="meta">${it.discount>0?`<span class="old">${formatCOP(it.price)}</span>`:''}</div>
          <div class="now">${formatCOP(it.final*it.qty)}</div>
          <button class="btn small outline" data-remove="${it.id}" style="margin-top:6px">Quitar</button>
        </div>
      </div>
    </div>`;
  }).join("") + `<div class="row" style="justify-content:space-between;margin-top:8px"><strong>Total</strong><strong>${formatCOP(Math.round(total))}</strong></div>`;
  // Bind acciones
  $$('[data-remove]', host).forEach(b=> b.addEventListener('click', ()=> removeFromCart(b.dataset.remove)));
  $$('[data-minus]', host).forEach(b=> b.addEventListener('click', ()=>{
    const c=getCart(); const id=b.dataset.minus; if(!c[id]) return;
    c[id]=Math.max(1, c[id]-1); saveCart(c); renderCartDrawer();
  }));
  $$('[data-plus]', host).forEach(b=> b.addEventListener('click', ()=>{
    const c=getCart(); const id=b.dataset.plus; c[id]=(c[id]||0)+1; saveCart(c); renderCartDrawer();
  }));
  updateCartCTA();
}
function showCartDrawer(){
  renderCartDrawer();
  ensureCartDrawer().classList.add('open');
}

// ---------- HOME ----------
function renderHome(){
  // Marcas
  const brandsSet = [...new Set(PRODUCTS.map(p=>p.brand))];
  const brandsBox = $("#homeBrands");
  if (brandsBox) brandsBox.innerHTML = brandsSet.map(b=>`<span class="brand-badge">${b}</span>`).join("");

  // Ofertas (slider)
  const offers = PRODUCTS.filter(p=>p.discount>0).sort((a,b)=>b.discount-a.discount).slice(0,10);
  const track = $("#homeSlider .track");
  if (track) {
    track.innerHTML = offers.map(p=>{
      const now = Math.round(p.price*(1-p.discount/100));
      const ahorras = p.price - now;
      return `<article class="card">
        <div class="img skel"><img loading="lazy" sizes="(max-width: 600px) 100vw, 360px" src="${p.image}" srcset="${srcset(p.image)}" alt="${p.name}"></div>
        <div class="pad">
          <div class="row" style="justify-content:space-between"><div style="font-weight:700">${p.name}</div><span class="badge danger">-${p.discount}%</span></div>
          <div class="meta">${p.department} • ${p.sport} • ${p.brand}</div>
          <div class="row" style="gap:8px;margin-top:6px"><span>${starsHTML(p.rating)}</span><span class="meta">${p.reviews} reseñas</span></div>
          <div class="price"><span class="now">${formatCOP(now)}</span><span class="old">${formatCOP(p.price)}</span><span class="meta">Ahorras ${formatCOP(ahorras)}</span></div>
          <div class="row" style="gap:8px;margin-top:10px">
            <a class="btn small outline" href="./producto.html?id=${p.id}">Ver</a>
            <button class="btn small" data-add="${p.id}">Agregar</button>
          </div>
        </div>
      </article>`;
    }).join("");
    $$('#homeSlider img').forEach(img=> imgSkeleton(img));
    $("#btnPrev")?.addEventListener("click", ()=> track.scrollBy({left:-320,behavior:"smooth"}));
    $("#btnNext")?.addEventListener("click", ()=> track.scrollBy({left: 320,behavior:"smooth"}));
    $$('#homeSlider [data-add]').forEach(b=> b.addEventListener('click', ()=> addToCart(b.dataset.add,1)));
  }

  // Ofertas del día (si existe)
  const timer = $("#dealTimer");
  if (timer) {
    function nextMidnight(){const n=new Date(); n.setHours(24,0,0,0); return n;}
    function tick(){const diff=nextMidnight()-new Date(); const h=String(Math.floor(diff/3.6e6)).padStart(2,"0"); const m=String(Math.floor((diff%3.6e6)/6e4)).padStart(2,"0"); const s=String(Math.floor((diff%6e4)/1e3)).padStart(2,"0"); timer.textContent=`${h}:${m}:${s}`;}
    tick(); setInterval(tick,1000);
  }
}

// ---------- FILTRADO / LISTADOS ----------
function filterData(list,{department=null,subcat="todo",query="",selectedSports=new Set(),selectedTypes=new Set(),selectedBrands=new Set()}){
  let l=list.filter(p=>{
    const q = query.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sport.toLowerCase().includes(q);
  });

  if(department==="Novedades") l=l.filter(p=>(p.tags||[]).includes("nuevo")||p.department==="Novedades");
  else if(department) l=l.filter(p=>p.department===department);

  switch(subcat){
    case "calzado": l=l.filter(p=>p.type==="calzado"); break;
    case "camisetas": l=l.filter(p=>p.type==="camisetas"); break;
    case "pantalones-pantalonetas": l=l.filter(p=>["pantalones","pantalonetas"].includes(p.type)); break;
    case "accesorios": l=l.filter(p=>p.type==="accesorios"); break;
    case "ofertas": l=l.filter(p=>(p.discount||0)>0); break;
    case "novedades": l=l.filter(p=>(p.tags||[]).includes("nuevo")); break;
  }
  if(selectedSports.size) l=l.filter(p=>selectedSports.has(p.sport));
  if(selectedTypes.size)  l=l.filter(p=>selectedTypes.has(p.type));
  if(selectedBrands.size) l=l.filter(p=>selectedBrands.has(p.brand));
  return l;
}

function renderList({containerId,department=null,subcat="todo",query="",sorter="featured",selectedSports=new Set(),selectedTypes=new Set(),selectedBrands=new Set()}){
  const grid=document.getElementById(containerId);
  if(!grid) return;

  let data=filterData(PRODUCTS,{department,subcat,query,selectedSports,selectedTypes,selectedBrands});
  switch(sorter){
    case "price-asc": data.sort((a,b)=>a.price-b.price); break;
    case "price-desc": data.sort((a,b)=>b.price-a.price); break;
    case "rating": data.sort((a,b)=>b.rating-a.rating); break;
    case "reviews": data.sort((a,b)=>b.reviews-a.reviews); break;
    default: data.sort((a,b)=>b.discount-a.discount||b.reviews-a.reviews);
  }

  $("#resultsCount")?.replaceChildren(document.createTextNode(`${data.length} resultado${data.length!==1?'s':''}`));

  grid.innerHTML = data.map(p=>{
    const now=p.discount>0?Math.round(p.price*(1-p.discount/100)):p.price;
    const ahorras=p.price-now;
    const badge=p.discount>0?`<span class="badge danger">-${p.discount}%</span>`:"";
    const sw = (p.colors||[]).slice(0,4).map(c=>`<span class="swatch" title="${c.name}" style="background:${c.hex}"></span>`).join("");
    return `<div class="card">
      <div class="img skel"><img loading="lazy" sizes="(max-width: 600px) 100vw, 260px" src="${p.image}" srcset="${srcset(p.image)}" alt="${p.name}"></div>
      <div class="pad">
        <div class="row" style="justify-content:space-between"><div style="font-weight:700">${p.name}</div>${badge}</div>
        <div class="meta">${p.department} • ${p.sport} • ${p.type} • ${p.brand}</div>
        <div class="swatches">${sw}</div>
        <div class="row" style="gap:8px;margin-top:6px"><span>${starsHTML(p.rating)}</span><span class="meta">${p.reviews} reseñas</span></div>
        <div class="price"><span class="now">${formatCOP(now)}</span>${p.discount>0?`<span class="old">${formatCOP(p.price)}</span>`:''}<span class="meta">Ahorras ${formatCOP(ahorras)}</span></div>
        <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">
          <a class="btn small outline" href="./producto.html?id=${p.id}">Ver</a>
          <button class="btn small outline" data-quick="${p.id}">Ver rápido</button>
          <button class="btn small" data-add="${p.id}">Agregar</button>
        </div>
      </div>
    </div>`;
  }).join("");

  $$('#grid img').forEach(img=> imgSkeleton(img));
  $$('#grid [data-quick]').forEach(b=> b.addEventListener('click', ()=> openQuickView(b.dataset.quick)));
  $$('#grid [data-add]').forEach(b=> b.addEventListener('click', ()=> addToCart(b.dataset.add,1)));

  ensureChipsBar();
}

// Chips (debajo del header)
function ensureChipsBar(){
  if($('#chipsBar')) return;
  const grid = document.getElementById('grid');
  if(!grid) return;
  const bar = document.createElement('div');
  bar.id='chipsBar';
  bar.className='chipsbar container';
  grid.parentElement.insertBefore(bar, grid);
}
function renderChipsBar(state, urlSubcat){
  const bar = $('#chipsBar'); if(!bar) return;
  const chips = [];
  if(state.query) chips.push({k:'q', label:`“${state.query}”`});
  if(urlSubcat && urlSubcat!=='todo'){
    const lbl = SUBCATS.find(s=>s.id===urlSubcat)?.label || urlSubcat;
    chips.push({k:'subcat', label:lbl});
  }
  if(state.selectedSports?.size) chips.push(...[...state.selectedSports].map(v=>({k:'sport', label:v})));
  if(state.selectedBrands?.size) chips.push(...[...state.selectedBrands].map(v=>({k:'brand', label:v})));
  if(state.selectedTypes?.size)  chips.push(...[...state.selectedTypes].map(v=>({k:'type', label:v})));

  bar.innerHTML = chips.length ? chips.map(ch=>`<button class="chip" data-chip="${ch.k}:${ch.label}">${ch.label} ✕</button>`).join("") : `<span class="meta">Filtra por subcategoría, deporte, marca…</span>`;
  $$('#chipsBar [data-chip]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const [k] = b.dataset.chip.split(':');
      const params = new URLSearchParams(location.search);
      if(k==='q') params.delete('q');
      else if(k==='subcat') params.delete('subcat');
      else if(k==='sport') params.delete('sport');
      else if(k==='brand') params.delete('brand');
      location.search = params.toString();
    });
  });
}

// ---------- QUICK VIEW ----------
function ensureQuickViewHost(){
  if($('#quickView')) return $('#quickView');
  const host = document.createElement('div');
  host.id = 'quickView';
  host.className = 'drawer overlay';
  host.innerHTML = `
    <div class="drawer-box" style="max-width:900px;width:min(900px,92vw)">
      <div class="row" style="justify-content:space-between;align-items:center">
        <strong>Vista rápida</strong>
        <button id="qvClose" class="btn small outline">✕</button>
      </div>
      <div id="qvBody" style="padding-top:8px"></div>
    </div>`;
  document.body.appendChild(host);
  $('#qvClose', host)?.addEventListener('click', ()=> host.classList.remove('open'));
  host.addEventListener('click', (e)=>{ if(e.target===host) host.classList.remove('open'); });
  return host;
}
function openQuickView(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  const host = ensureQuickViewHost();
  const now=p.discount>0?Math.round(p.price*(1-p.discount/100)):p.price;
  const sw = (p.colors||[]).slice(0,6).map(c=>`<span class="swatch" title="${c.name}" style="background:${c.hex}"></span>`).join("");
  $('#qvBody').innerHTML = `
    <div class="grid2">
      <div class="card" style="box-shadow:none">
        <div class="img skel zoomable"><img loading="lazy" src="${p.image}" srcset="${srcset(p.image)}" sizes="(max-width: 600px) 100vw, 420px" alt="${p.name}"></div>
        <div class="pad">${sw?`<div class="swatches">${sw}</div>`:''}</div>
      </div>
      <div>
        <h2 style="margin:4px 0">${p.name}</h2>
        <div class="meta">${p.department} • ${p.sport} • ${p.type} • ${p.brand}</div>
        <div class="row" style="gap:8px;margin-top:6px"><span>${starsHTML(p.rating)}</span><span class="meta">${p.reviews} reseñas</span></div>
        <div class="price" style="margin:10px 0">${p.discount>0?`<span class="now" style="font-size:24px">${formatCOP(now)}</span><span class="old">${formatCOP(p.price)}</span>`:`<span class="now" style="font-size:24px">${formatCOP(now)}</span>`}</div>
        <div class="row" style="gap:8px;margin:6px 0">
          ${p.type==="calzado"?`<select id="qvSize" class="pill"><option value="">Talla (EU)</option>${[36,37,38,39,40,41,42,43,44,45].map(x=>`<option>${x}</option>`).join("")}</select>`:""}
          ${p.type==="camisetas"?`<select id="qvSize" class="pill"><option value="">Talla</option>${["XS","S","M","L","XL"].map(x=>`<option>${x}</option>`).join("")}</select>`:""}
        </div>
        <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">
          <button class="btn" id="qvAdd">Agregar al carrito</button>
          <a class="btn outline" href="./producto.html?id=${p.id}">Ver detalles</a>
        </div>
      </div>
    </div>`;
  setupZoom($('.zoomable img', $('#qvBody')));
  $('#qvAdd').addEventListener('click', ()=> addToCart(id,1));
  host.classList.add('open');
}

// ---------- DETALLE ----------
const cmToIn = (cm)=>cm/2.54;
const toUnitVal = (n, unit)=> unit==="cm"?n:+(cmToIn(n)).toFixed(1);
const shoeGuide=[{eu:36,us:4.5,col:23,foot_cm:22.5},{eu:37,us:5.5,col:24,foot_cm:23.5},{eu:38,us:6,col:25,foot_cm:24.0},{eu:39,us:7,col:26,foot_cm:24.5},{eu:40,us:7.5,col:27,foot_cm:25.0},{eu:41,us:8.5,col:28,foot_cm:26.0},{eu:42,us:9,col:29,foot_cm:26.5},{eu:43,us:10,col:30,foot_cm:27.5},{eu:44,us:10.5,col:31,foot_cm:28.0},{eu:45,us:11.5,col:32,foot_cm:29.0}];
const shirtGuide=[{talla:"XS",numero:34,pecho:86,hombro:40,largo:64,manga:60},{talla:"S",numero:36,pecho:92,hombro:42,largo:66,manga:61},{talla:"M",numero:38,pecho:98,hombro:44,largo:68,manga:62},{talla:"L",numero:40,pecho:104,hombro:46,largo:70,manga:63},{talla:"XL",numero:42,pecho:112,hombro:48,largo:72,manga:64}];
const pantsGuide=[{talla:"XS",numero:28,cintura:70,cadera:88,largo:96,estatura:"155–165"},{talla:"S",numero:30,cintura:76,cadera:94,largo:98,estatura:"160–170"},{talla:"M",numero:32,cintura:82,cadera:100,largo:100,estatura:"165–175"},{talla:"L",numero:34,cintura:88,cadera:106,largo:102,estatura:"170–180"},{talla:"XL",numero:36,cintura:96,cadera:114,largo:104,estatura:"175–185"}];

function specFor(p){
  if(p.type==="calzado") return {"Material":"Malla + sintético","Plantilla":"EVA","Rigidez":"Media","Contra frío":"No"};
  if(p.type==="camisetas") return {"Tejido":"Jersey","Material":"60% algodón / 40% poliéster","Elasticidad":"Media","Contra frío":"No"};
  if(p.type==="pantalones"||p.type==="pantalonetas") return {"Tejido":"Woven/Stretch","Material":"100% poliéster","Elasticidad":"Baja-Media","Contra frío":"Sí (ligero)"};
  return {"Material":"Composición variada","Elasticidad":"-","Contra frío":"-"};
}

function closestBy(arr, key, value){
  return arr.reduce((best,row)=> Math.abs(row[key]-value) < Math.abs(best[key]-value) ? row : best, arr[0]);
}

function renderDetail(containerId,id){
  const p=PRODUCTS.find(x=>x.id===id); const el=document.getElementById(containerId); if(!p){el.innerHTML="<p>No se encontró el producto.</p>"; return;}
  let unit="cm";
  const render=()=>{
    const now=p.discount>0?Math.round(p.price*(1-p.discount/100)):p.price;
    let guideHTML="";
    if(p.type==="calzado"){
      guideHTML=`<table class="table"><thead><tr><th>EU</th><th>US</th><th>COL</th><th>Largo pie (${unit})</th></tr></thead><tbody>${
        shoeGuide.map(r=>`<tr><td>${r.eu}</td><td>${r.us}</td><td>${r.col}</td><td>${unit==='cm'?r.foot_cm:toUnitVal(r.foot_cm,'in')}</td></tr>`).join("")
      }</tbody></table>`;
    } else if(p.type==="camisetas"){
      guideHTML=`<table class="table"><thead><tr><th>Talla</th><th>#</th><th>Pecho (${unit})</th><th>Hombro (${unit})</th><th>Largo (${unit})</th><th>Manga (${unit})</th></tr></thead><tbody>${
        shirtGuide.map(r=>`<tr><td>${r.talla}</td><td>${r.numero}</td><td>${unit==='cm'?r.pecho:toUnitVal(r.pecho,'in')}</td><td>${unit==='cm'?r.hombro:toUnitVal(r.hombro,'in')}</td><td>${unit==='cm'?r.largo:toUnitVal(r.largo,'in')}</td><td>${unit==='cm'?r.manga:toUnitVal(r.manga,'in')}</td></tr>`).join("")
      }</tbody></table>`;
    } else if(p.type==="pantalones"||p.type==="pantalonetas"){
      guideHTML=`<table class="table"><thead><tr><th>Talla</th><th>#</th><th>Cintura (${unit})</th><th>Cadera (${unit})</th><th>Largo (${unit})</th><th>Estatura (cm)</th></tr></thead><tbody>${
        pantsGuide.map(r=>`<tr><td>${r.talla}</td><td>${r.numero}</td><td>${unit==='cm'?r.cintura:toUnitVal(r.cintura,'in')}</td><td>${unit==='cm'?r.cadera:toUnitVal(r.cadera,'in')}</td><td>${unit==='cm'?r.largo:toUnitVal(r.largo,'in')}</td><td>${r.estatura}</td></tr>`).join("")
      }</tbody></table>`;
    } else { guideHTML=`<p class="meta">Este artículo no requiere guía de tallas.</p>`; }

    const specs=specFor(p);
    const specsRows=Object.entries(specs).map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    const revs=REVIEWS[id]||[];
    const reviewsHTML=revs.length?revs.map(r=>`<div class="card" style="box-shadow:none"><div class="pad"><div class="row" style="justify-content:space-between"><strong>${r.user}</strong><span class="meta">${r.date}</span></div><div style="font-weight:600">${r.title}</div><div class="meta">${r.body}</div></div></div>`).join(""):`<p class="meta">Aún no hay reseñas.</p>`;

    // Recomendador de talla (simple)
    let advisorHTML = '';
    if(p.type==="calzado"){
      advisorHTML = `<div class="card" style="box-shadow:none"><div class="pad">
        <strong>Recomendador de talla</strong>
        <div class="row" style="gap:8px;margin-top:8px">
          <label class="meta">Largo de pie (${unit})</label>
          <input id="adFoot" type="number" min="10" step="0.1" class="pill" placeholder="${unit==='cm'?'25.0':'9.8'}">
          <button id="adCalc" class="btn small">Calcular</button>
          <span id="adOut" class="badge"></span>
        </div>
      </div></div>`;
    } else if(p.type==="camisetas"){
      advisorHTML = `<div class="card" style="box-shadow:none"><div class="pad">
        <strong>Recomendador de talla</strong>
        <div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap">
          <label class="meta">Pecho (${unit})</label>
          <input id="adChest" type="number" min="60" step="1" class="pill" placeholder="${unit==='cm'?'98':'38.6'}">
          <button id="adCalc" class="btn small">Calcular</button>
          <span id="adOut" class="badge"></span>
        </div>
      </div></div>`;
    } else if(p.type==="pantalones"||p.type==="pantalonetas"){
      advisorHTML = `<div class="card" style="box-shadow:none"><div class="pad">
        <strong>Recomendador de talla</strong>
        <div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap">
          <label class="meta">Cintura (${unit})</label>
          <input id="adWaist" type="number" min="60" step="1" class="pill" placeholder="${unit==='cm'?'82':'32.3'}">
          <label class="meta">Cadera (${unit})</label>
          <input id="adHip" type="number" min="70" step="1" class="pill" placeholder="${unit==='cm'?'100':'39.4'}">
          <button id="adCalc" class="btn small">Calcular</button>
          <span id="adOut" class="badge"></span>
        </div>
      </div></div>`;
    }

    el.innerHTML=`<div class="container" style="padding:0">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><a class="btn small outline" href="./index.html">← Inicio</a><span class="meta">Stock y disponibilidad en tiempo real</span></div>
      <div class="row" style="gap:16px;flex-wrap:wrap">
        <div class="card" style="flex:1 1 360px;max-width:520px">
          <div class="img zoomable" style="height:380px"><img loading="lazy" src="${p.image}" srcset="${srcset(p.image)}" sizes="(max-width: 600px) 100vw, 480px" alt="${p.name}"></div>
          <div class="pad">${p.colors?`<div class="row" style="gap:8px"><span class="meta">Colores:</span>${p.colors.map(c=>`<span title="${c.name}" style="height:22px;width:22px;border-radius:9999px;border:1px solid var(--border);display:inline-block;background:${c.hex}"></span>`).join("")}</div>`:""}</div>
        </div>
        <div style="flex:1 1 360px;min-width:280px">
          <h1 style="margin:4px 0">${p.name}</h1>
          <div class="meta">${p.department} • ${p.sport} • ${p.type} • ${p.brand}</div>
          <div class="row" style="gap:8px;margin-top:6px"><span>${starsHTML(p.rating)}</span><span class="meta">${p.reviews} reseñas</span></div>
          <div class="price" style="margin:10px 0">${p.discount>0?`<span class="now" style="font-size:28px">${formatCOP(now)}</span><span class="old">${formatCOP(p.price)}</span><span class="meta">Ahorras ${formatCOP(p.price-now)}</span>`:`<span class="now" style="font-size:28px">${formatCOP(now)}</span>`}</div>
          <p class="meta">${p.description}</p>
          <div class="row" style="gap:8px;margin:10px 0" id="comprar"><button class="btn" id="dAdd">Agregar al carrito</button><a class="btn outline" href="#reviews">Ver reseñas</a></div>

          <div class="section">
            <div class="row" style="justify-content:space-between"><h3>Información del producto</h3><div><button id="btn-cm" class="btn small outline">cm</button> <button id="btn-in" class="btn small outline">in</button></div></div>
            <div class="card" style="box-shadow:none;margin-top:8px"><div class="pad"><strong>Especificaciones</strong><table class="table" style="margin-top:6px"><tbody>${specsRows}</tbody></table></div></div>
            ${advisorHTML}
            <div class="card" style="box-shadow:none;margin-top:8px"><div class="pad"><strong>Guía de tallas (${unit})</strong><div id="guide" style="margin-top:8px">${guideHTML}</div></div></div>
            <div id="reviews" class="card" style="box-shadow:none;margin-top:8px"><div class="pad">
              <div class="row" style="gap:6px;align-items:center"><strong>Reseñas de clientes</strong><span class="badge">${revs.length}</span>
                <select id="rvFilter" class="pill"><option value="0">Todas</option><option value="4">≥ 4★</option><option value="5">5★</option></select>
              </div>
              <div id="rvList" style="display:grid;gap:10px;margin-top:8px">${reviewsHTML}</div>
            </div></div>
          </div>
        </div>
      </div>
    </div>`;

    // zoom
    setupZoom($('.zoomable img', el));

    // unit toggles
    $("#btn-cm")?.addEventListener("click",()=>{unit="cm";render()});
    $("#btn-in")?.addEventListener("click",()=>{unit="in";render()});

    // add to cart
    $('#dAdd')?.addEventListener('click', ()=> addToCart(p.id,1));

    // advisor calc
    $('#adCalc')?.addEventListener('click', ()=>{
      const out = $('#adOut');
      if(p.type==="calzado"){
        const val = parseFloat($('#adFoot').value||'0'); if(!val) return;
        const cm = unit==='cm'? val : (val*2.54);
        const row = closestBy(shoeGuide,'foot_cm', cm);
        out.textContent = `Sugerida EU ${row.eu} (pie ~ ${row.foot_cm} cm)`;
      } else if(p.type==="camisetas"){
        const val = parseFloat($('#adChest').value||'0'); if(!val) return;
        const cm = unit==='cm'? val : (val*2.54);
        const row = closestBy(shirtGuide,'pecho', cm);
        out.textContent = `Sugerida ${row.talla} (#${row.numero})`;
      } else {
        const waist = parseFloat($('#adWaist').value||'0');
        const hip   = parseFloat($('#adHip').value||'0');
        if(!waist||!hip) return;
        const wcm = unit==='cm'? waist : (waist*2.54);
        const hcm = unit==='cm'? hip   : (hip*2.54);
        const byW = closestBy(pantsGuide,'cintura', wcm);
        const byH = closestBy(pantsGuide,'cadera', hcm);
        const pick = Math.max(pantsGuide.indexOf(byW), pantsGuide.indexOf(byH));
        const row = pantsGuide[pick];
        out.textContent = `Sugerida ${row.talla} (#${row.numero})`;
      }
    });

    // JSON-LD Product
    injectProductLD(p, now);
  };
  render();
}

// Zoom helper
function setupZoom(img){
  if(!img) return;
  const wrap = img.parentElement;
  wrap.classList.add('zoomable');
  wrap.addEventListener('mousemove', (e)=>{
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(1.2)';
  });
  wrap.addEventListener('mouseleave', ()=>{ img.style.transform = 'scale(1)'; });
}

// JSON-LD
function injectProductLD(p, price){
  if($('#ld-product')) $('#ld-product').remove();
  const ld = {
    "@context":"https://schema.org/",
    "@type":"Product",
    "name": p.name,
    "image": [p.image],
    "description": p.description,
    "brand": p.brand,
    "sku": p.id,
    "aggregateRating": { "@type":"AggregateRating", "ratingValue": p.rating, "reviewCount": p.reviews },
    "offers": { "@type":"Offer", "priceCurrency":"COP", "price": price, "availability": "https://schema.org/InStock", "url": location.href }
  };
  const s = document.createElement('script');
  s.type='application/ld+json'; s.id='ld-product';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

// ---------- SUPER BUSCADOR (overlay + voz) ----------
// ---------- SUPER BUSCADOR (overlay, sin voz) ----------
function initSuperSearch(){
  if(!document.getElementById('ss-styles')){
    const st = document.createElement('style');
    st.id='ss-styles';
    st.textContent = `
      .ss-overlay{position:fixed;inset:0;display:none;place-items:start;background:rgba(0,0,0,.28);z-index:120}
      .ss-overlay.open{display:grid}
      .ss-box{margin:10vh auto 0;width:min(880px,92vw);background:var(--surface);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow);overflow:hidden}
      .ss-head{display:flex;gap:8px;align-items:center;padding:10px;border-bottom:1px solid var(--border)}
      .ss-head select,.ss-head input{padding:8px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:inherit}
      .ss-head select{min-width:150px}
      .ss-head input{flex:1}
      .ss-body{max-height:52vh;overflow:auto}
      .ss-section{padding:10px}
      .ss-section h4{margin:6px 0 8px;font-size:12px;color:var(--muted)}
      .ss-item{display:flex;justify-content:space-between;align-items:center;padding:8px;border-radius:10px;cursor:pointer}
      .ss-item:hover{background:var(--surface-2)}
      .ss-chips{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
      .ss-chip{padding:4px 8px;border:1px solid var(--border);border-radius:9999px;font-size:12px;background:var(--surface-2)}
      .ss-foot{display:flex;justify-content:space-between;align-items:center;padding:8px;border-top:1px solid var(--border)}
      .ss-muted{font-size:12px;color:var(--muted)}
    `;
    document.head.appendChild(st);
  }
  if($('#ss')) return; // singleton

  const overlay = document.createElement('div');
  overlay.id='ss';
  overlay.className = 'ss-overlay';
  overlay.innerHTML = `
    <div class="ss-box" role="dialog" aria-modal="true" aria-label="Super Buscador">
      <div class="ss-head">
        <select id="ssDept"><option value="">Departamento…</option>${DEPARTMENTS.map(d=>`<option value="${d.slug}">${d.label}</option>`).join('')}</select>
        <select id="ssSubcat"><option value="">Subcategoría…</option>${SUBCATS.map(s=>`<option value="${s.id}">${s.label}</option>`).join('')}</select>
        <select id="ssSport"><option value="">Deporte…</option>${[...new Set(PRODUCTS.map(p=>p.sport))].sort().map(s=>`<option value="${s}">${s}</option>`).join('')}</select>
        <select id="ssBrand"><option value="">Marca…</option>${[...new Set(PRODUCTS.map(p=>p.brand))].sort().map(b=>`<option value="${b}">${b}</option>`).join('')}</select>
        <input id="ssQ" placeholder="Buscar (Ctrl/⌘+K)…"/>
        <button id="ssGo" class="btn small">Buscar</button>
        <button id="ssClose" class="btn small outline">Esc</button>
      </div>
      <div class="ss-body">
        <div class="ss-section">
          <div class="ss-chips" id="ssChips"></div>
          <div class="ss-chips" id="ssTrends">${["guayos","top deportivo","raqueta","jogger","pantaloneta"].map(t=>`<button class="ss-chip" data-trend="${t}">#${t}</button>`).join("")}</div>
        </div>
        <div class="ss-section">
          <h4>Sugerencias</h4>
          <div id="ssSuggestions"></div>
        </div>
        <div class="ss-section">
          <h4>Recientes</h4>
          <div id="ssRecent" class="ss-muted">Sin búsquedas recientes</div>
        </div>
      </div>
      <div class="ss-foot">
        <div class="ss-muted">Enter para aplicar • Esc para cerrar • ↑/↓ para navegar</div>
        <div class="ss-muted">Atajo: Ctrl/⌘ + K</div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const elQ = $('#ssQ'), elDept = $('#ssDept'), elSub = $('#ssSubcat'), elSport=$('#ssSport'), elBrand=$('#ssBrand');
  const btnGo = $('#ssGo'), btnClose = $('#ssClose'), sugg = $('#ssSuggestions'), chips = $('#ssChips'), recentBox = $('#ssRecent');

  // Recientes
  function getRecents(){ try{ return JSON.parse(localStorage.getItem('ms_recent')||'[]'); }catch{ return []; } }
  function pushRecent(entry){
    const arr = getRecents().filter(x=>JSON.stringify(x)!==JSON.stringify(entry));
    arr.unshift(entry); if(arr.length>6) arr.length=6;
    localStorage.setItem('ms_recent', JSON.stringify(arr));
  }
  function renderRecents(){
    const arr = getRecents();
    if(!arr.length){ recentBox.textContent = 'Sin búsquedas recientes'; return; }
    recentBox.innerHTML = arr.map((r,i)=>`<div class="ss-item" data-recent="${i}"><span>“${r.q||''}” ${(r.dept||'')+(r.subcat? ' • '+r.subcat:'')+(r.sport? ' • '+r.sport:'')+(r.brand? ' • '+r.brand:'')}</span><span class="meta">Ir</span></div>`).join('');
    $$('#ssRecent [data-recent]').forEach(el=> el.addEventListener('click', ()=> applyAndGo(arr[parseInt(el.dataset.recent)])));
  }

  // Chips (resumen filtros)
  function renderChips(){
    const list=[];
    const dept = elDept.value ? (DEPARTMENTS.find(d=>d.slug===elDept.value)?.label || elDept.value) : null;
    if(dept) list.push(`Dept: ${dept}`);
    const sub  = elSub.value ? (SUBCATS.find(s=>s.id===elSub.value)?.label || elSub.value) : null;
    if(sub) list.push(`Sub: ${sub}`);
    if(elSport.value) list.push(`Sport: ${elSport.value}`);
    if(elBrand.value) list.push(`Marca: ${elBrand.value}`);
    chips.innerHTML = list.length ? list.map(t=>`<span class="ss-chip">${t}</span>`).join('') : `<span class="ss-muted">Elige filtros o busca…</span>`;
  }

  // Sugerencias
  function renderSuggestions(){
    const q = elQ.value.toLowerCase().trim();
    const prod = PRODUCTS.filter(p => !q || p.name.toLowerCase().includes(q) || p.sport.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0,8);
    const sportS = [...new Set(PRODUCTS.map(p=>p.sport))].sort().filter(s => !q || s.toLowerCase().includes(q)).slice(0,5);
    const brandS = [...new Set(PRODUCTS.map(p=>p.brand))].sort().filter(b => !q || b.toLowerCase().includes(q)).slice(0,5);
    const htmlProd  = prod.map(p=>`<div class="ss-item" data-goto='{"q":"${q}","product":"${p.id}"}'><span>${p.name}</span><span class="meta">${p.department} • ${p.sport} • ${p.brand}</span></div>`).join('');
    const htmlSport = sportS.map(s=>`<div class="ss-item" data-goto='{"q":"${q}","sport":"${s}"}'><span>${s}</span><span class="meta">Deporte</span></div>`).join('');
    const htmlBrand = brandS.map(b=>`<div class="ss-item" data-goto='{"q":"${q}","brand":"${b}"}'><span>${b}</span><span class="meta">Marca</span></div>`).join('');
    sugg.innerHTML = htmlProd + htmlSport + htmlBrand || `<div class="ss-muted">Sin coincidencias</div>`;
    $$('#ssSuggestions [data-goto]').forEach(el=> el.addEventListener('click', ()=>{
      const payload = JSON.parse(el.dataset.goto);
      if(payload.product){ closeSS(); location.href = `./producto.html?id=${payload.product}`; return; }
      const entry = { q: payload.q || '', dept: elDept.value || '', subcat: elSub.value || '', sport: payload.sport || elSport.value || '', brand: payload.brand || elBrand.value || '' };
      applyAndGo(entry);
    }));
  }

  function buildURL(entry){
    const destSlug = entry.dept || 'novedades';
    const params = new URLSearchParams();
    if(entry.q) params.set('q', entry.q);
    if(entry.subcat) params.set('subcat', entry.subcat);
    if(entry.sport) params.set('sport', entry.sport);
    if(entry.brand) params.set('brand', entry.brand);
    const qs = params.toString();
    return `./${destSlug}.html${qs ? ('?'+qs) : ''}`;
  }
  function applyAndGo(entry){ pushRecent(entry); closeSS(); location.href = buildURL(entry); }

  function openSS(){ overlay.classList.add('open'); elQ.focus(); renderChips(); renderSuggestions(); renderRecents(); }
  function closeSS(){ overlay.classList.remove('open'); }

  // Tendencias
  $$('#ssTrends [data-trend]').forEach(b=> b.addEventListener('click', ()=>{
    elQ.value = b.dataset.trend; renderSuggestions(); renderChips();
  }));

  // Eventos
  $('#ssClose')?.addEventListener('click', closeSS);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeSS(); });
  [elQ, elDept, elSub, elSport, elBrand].forEach(el=>{
    el.addEventListener('input', ()=>{ renderChips(); renderSuggestions(); });
    el.addEventListener('change', ()=>{ renderChips(); renderSuggestions(); });
  });
  btnGo.addEventListener('click', ()=> applyAndGo({ q: elQ.value.trim(), dept: elDept.value, subcat: elSub.value, sport: elSport.value, brand: elBrand.value }));

  // Atajos + input header abre overlay
  document.addEventListener('keydown', (e)=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openSS(); }
    if(e.key==='Escape'){ closeSS(); }
  });
  const headerQ = document.getElementById('q');
  if(headerQ){
    headerQ.setAttribute('readonly','readonly');
    headerQ.addEventListener('focus', openSS);
    headerQ.addEventListener('click', openSS);
    // Mantiene tu texto:
    headerQ.placeholder = 'busca aqui lo que nescesitas';
  }
}


// ---------- BOOT ----------
function currentLabelFromPage(page){
  return page==="home" ? "Inicio" :
         page==="novedades" ? "Novedades" :
         page==="hombre" ? "Hombre" :
         page==="mujer" ? "Mujer" :
         page==="junior" ? "Línea Junior" : null;
}
function registerSW(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./assets/service-worker.js').catch(()=>{});
  }
}
function setupGlobalNav(){
  const page = document.body.dataset.page || "home";
  const currentLabel = currentLabelFromPage(page);
  document.getElementById("nav")?.insertAdjacentHTML("beforeend", navHTML(currentLabel));
  document.getElementById("toggleTheme")?.addEventListener("click", ()=> document.body.classList.toggle("dark"));
  startPromoTimer();
  initSuperSearch();
  ensureCartCTA();
  updateCartCTA();
  registerSW();
}

document.addEventListener("DOMContentLoaded", ()=>{
  const page = document.body.dataset.page || "home";
  setupGlobalNav();

  if(page==="home"){ renderHome(); }

  if(page==="novedades"||page==="hombre"||page==="mujer"||page==="junior"){
    const depMap={novedades:"Novedades",hombre:"Hombre",mujer:"Mujer",junior:"Línea Junior"};
    let state={query:"",sorter:"featured",selectedSports:new Set(),selectedTypes:new Set(),selectedBrands:new Set()};

    // Leer params
    const params = new URLSearchParams(location.search);
    const urlSubcat = params.get("subcat") || "todo";
    const urlQ = (params.get("q")||"").toLowerCase().trim();
    const urlSport = params.get("sport");
    const urlBrand = params.get("brand");

    // Pintar filtros laterales si existen
    const sportBox=document.getElementById("sportBox");
    const typeBox=document.getElementById("typeBox");
    const brandBox=document.getElementById("brandBox");
    if(sportBox) sportBox.innerHTML = sports.map(s=>`<label class="row" style="justify-content:space-between"><span>${s}</span><input class="sport-filter" type="checkbox" value="${s}"></label>`).join("");
    if(typeBox) typeBox.innerHTML   = types.map(t=>`<label class="row" style="justify-content:space-between"><span>${t}</span><input class="type-filter" type="checkbox" value="${t}"></label>`).join("");
    if(brandBox) brandBox.innerHTML = brands.map(b=>`<label class="row" style="justify-content:space-between"><span>${b}</span><input class="brand-filter" type="checkbox" value="${b}"></label>`).join("");

    // Preseleccionar
    const q=document.getElementById("q"); if(q){ q.value = urlQ; state.query = urlQ; }
    if(urlSport){ state.selectedSports.add(urlSport); $$('.sport-filter').forEach(el=>{ if(el.value===urlSport) el.checked=true; }); }
    if(urlBrand){ state.selectedBrands.add(urlBrand); $$('.brand-filter').forEach(el=>{ if(el.value===urlBrand) el.checked=true; }); }

    // Listeners
    $$(".sport-filter").forEach(el=>el.addEventListener("change",(e)=>{const v=e.target.value;state.selectedSports.has(v)?state.selectedSports.delete(v):state.selectedSports.add(v);renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands}); renderChipsBar(state,urlSubcat);} ));
    $$(".type-filter").forEach(el=>el.addEventListener("change",(e)=>{const v=e.target.value;state.selectedTypes.has(v)?state.selectedTypes.delete(v):state.selectedTypes.add(v);renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands}); renderChipsBar(state,urlSubcat);} ));
    $$(".brand-filter").forEach(el=>el.addEventListener("change",(e)=>{const v=e.target.value;state.selectedBrands.has(v)?state.selectedBrands.delete(v):state.selectedBrands.add(v);renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands}); renderChipsBar(state,urlSubcat);} ));
    const sorter=document.getElementById("sorter");
    sorter?.addEventListener("change",(e)=>{state.sorter=e.target.value;renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands});});
    q?.addEventListener("input",(e)=>{state.query=e.target.value.toLowerCase().trim();renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands}); renderChipsBar(state,urlSubcat);});

    // Render inicial
    renderList({containerId:"grid",department:depMap[page],subcat:urlSubcat,query:state.query,sorter:state.sorter,selectedSports:state.selectedSports,selectedTypes:state.selectedTypes,selectedBrands:state.selectedBrands});
    renderChipsBar(state,urlSubcat);
  }

  if(page==="producto"){
    const id = new URLSearchParams(location.search).get("id");
    renderDetail("product", id);
  }

  document.querySelectorAll(".bottom-nav a").forEach(a=>{
    const key=a.dataset.bnav;
    const page = document.body.dataset.page || "home";
    if((page==="home" && key==="home") || (page==="novedades" && (key==="deals"||key==="search"))) a.classList.add("active");
  });

  document.getElementById("helpOpen")?.addEventListener("click", (e)=>{ e.preventDefault(); document.getElementById("helpDrawer")?.classList.add("open") });
  document.getElementById("helpClose")?.addEventListener("click", ()=> document.getElementById("helpDrawer")?.classList.remove("open"));
});
