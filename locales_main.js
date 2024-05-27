var cambiar=0;

function mostrar1() {
    if(cambiar==0){
        document.getElementById("mostrar_1").style.visibility = "visible";
        document.getElementById("mostrar_1").style.display = "block";
        document.getElementById("btn").innerHTML = "Ocultar";
        cambiar=1;    
    }else{
        document.getElementById("mostrar_1").style.visibility = "hidden";
        document.getElementById("mostrar_1").style.display = "none";
        document.getElementById("btn").innerHTML = "Mostrar más";
        cambiar=0;  
    }
}

var cambiar=3;

function mostrar2() {
    if(cambiar==3){
        document.getElementById("mostrar_2").style.visibility = "visible";
        document.getElementById("mostrar_2").style.display = "block";
        document.getElementById("btn2").innerHTML = "Ocultar";
        cambiar=2;    
    }else{
        document.getElementById("mostrar_2").style.visibility = "hidden";
        document.getElementById("mostrar_2").style.display = "none";
        document.getElementById("btn2").innerHTML = "Mostrar más ";
        cambiar=3;  
    }
}


/* ARRAY CON LA PRECARGA DE FOTOS */
var imagenes = new Array()
imagenes[0]=new Image()
imagenes[0].src="https://i.postimg.cc/Fs48CpYv/IMG-20240228-104938483-MFNR.jpg"
imagenes[1]=new Image()
imagenes[1].src="https://i.postimg.cc/qqRhpyRv/IMG-20240228-104818712-MFNR.jpg"
imagenes[2]=new Image()
imagenes[2].src="https://i.postimg.cc/7ZWCwmJG/IMG-20240314-082014.jpg"
imagenes[3]=new Image()
imagenes[3].src="https://i.postimg.cc/WbRcLr4N/IMG-20240314-082009.jpg"

/* ARRAY CON NOMBRES DE ARTISTAS */
var artistas = ["Florencia Madariaga", "Fernando Brizuela, Andrés Toro", "Ignacio Noé", "Julián Bernatene", "Juan Carlos Alonso", "Mauricio Rinaldi", "Daniel Ramón Baca", "Zoveck Estudio", "Lucho Olivera", "Colin Harrison"]; 

/* GLOBALES PARA CONTENEDOR Y COLECCIÓN DE PIEZAS */
var caja, todasPiezas; 
/* ÍNDICE INICIAL PARA RECORRER LAS IMÁGENES */
var cadaImagen = 0; 
/* CADENA DE TEXTO CON PARTE DE FONDO PARA PIEZAS VERTICALES */
var fondo0 = "radial-gradient(circle at center top, white 9px, transparent 10px), radial-gradient(circle at right center, transparent 10px, white 11px), radial-gradient(circle at center bottom, white 9px, transparent 10px), radial-gradient(circle at left center, transparent 10px, white 11px), url("; 
/* CADENA DE TEXTO CON PARTE DE FONDO PARA PIEZAS HORIZONTALES */
var fondo1 = "radial-gradient(circle at center bottom, transparent 9px, white 11px), radial-gradient(circle at right center, white 10px, transparent 10px), radial-gradient(circle at center top, transparent 9px, white 11px), radial-gradient(circle at left center, white 10px, transparent 10px), url("; 
/* ARRAY PARA LOS ÍNDICES DEL TOTAL DE PIEZAS */
var cantPiezas = []; 
/* ARRAY PARA LOS ÍNDICES EXTRAÍDOS DEL ANTERIOR */
var copiaCantPiezas = []; 


/* FUNCIÓN INICIAL PARA CREAR PUZZLE Y MOSTRAR PRIMERA IMAGEN */
function puzzle() {
  /* REFIERE AL CONTENEDOR */
  caja = document.querySelector("figure"); 

  /* RECORRE COMO 7 FILAS LA CREACIÓN DE PIEZAS */
  for(f=0, d=0; f<=6; f++) {
    /* RECORRE COMO 9 COLUMNAS CREANDO PIEZAS EN CADA FILA */ 
    for(c=0; c<=8; c++) {
      /* CREA UN VALOR QUE SERÁ 0 Ó 1 ALTERNADOS */
      dir = d%2; 
      /* CREA UN DIV PARA CADA PIEZA */
      pieza = document.createElement("div"); 
      /* AGREGA UNA CLASE ALTERNANDO ENTRE 'p0' Y 'p1' */ 
      pieza.setAttribute("class","p"+dir, false); 
      /* LES POSICIONA EL INICIO UNA A 50px DE LA OTRA */
      pieza.style.left = c*50 + "px"; 
      pieza.style.top = f*50 + "px"; 

      /* SI LA CLASE SE FORMÓ COMO 'p0' ...*/
      if(dir==0) {
        /* ... SE PONE SU FONDO INLINE AGREGANDO LA FOTO CORRESPONDIENTE */
        pieza.style.backgroundImage = fondo0 + imagenes[cadaImagen].src + ")"; 
        /* CON LA POSICIÓN CALCULADA PARA LAS VERTICALES */
        pieza.style.backgroundPosition = "center top, 0 0, center bottom, right center, "+ (35-50*c) +"px "+ (25-50*f) +"px"; 
      }
      /* SI LA CLASE SE FORMÓ COMO 'p1' ...*/
      else {
        /* ... SE PONE SU FONDO INLINE AGREGANDO LA FOTO CORRESPONDIENTE */
        pieza.style.backgroundImage = fondo1 + imagenes[cadaImagen].src + ")";
        /* CON LA POSICIÓN CALCULADA PARA LAS HORIZONTALES */
        pieza.style.backgroundPosition = "center top, right center, center bottom, left center, "+ (25-50*c) +"px "+ (35-50*f) +"px"; 
      }

      /* Y SE AGREGAN AL CONTENEDOR */
      caja.appendChild(pieza); 

      /* SE INSERTA UN NÚMERO CORRELATIVO COMO ELEMENTO DEL ARRAY (PARA MEZCLAR DESPUÉS) */
      cantPiezas[d] = d; 
      /* SE INCREMENTA ESE NÚMERO PARA LA SIGUIENTE VUELTA */ 
      ++d; 
    }
  }

  /* SE RECORRE EL ARRAY GLOBAL DE ÍNDICES DE FOTO PARA MEZCLAR LOS VALORES */
  for (i=0; i<cantPiezas.length; i++) {
    /* SE CAPTURA ELEMENTO SEGÚN i EN UNA VARIABLE */
    algunaPieza = cantPiezas[i]; 
    /* SE CREA UN NUEVO ÍNDICE (LOCAL) AL AZAR */
    nI = Math.floor(Math.random()*cantPiezas.length); 
    /* SE INTERCAMBIAN LOS VALORES EN EL ARRAY GLOBAL DE ÍNDICES DE FOTO */
    cantPiezas[i] = cantPiezas[nI]; 
    cantPiezas[nI] = algunaPieza; 
  }

  /* AGREGA UN TÍTULO CON EL AUTOR */
  caja.title = artistas[cadaImagen];  

  /* REFERENCIA A COLECCIÓN DE PIEZAS */
  todasPiezas = document.querySelectorAll("figure div"); 

  /* AUMENTA ÍNDICE DE IMAGEN PARA QUE LA SIGUIENTE FUNCIÓN EMPIECE POR LA SEGUNDA */
  cadaImagen++; 

  /* MUESTRA PRIMERA IMAGEN 4 SEGUNDOS Y EMPIEZA SECUENCIA DE CAMBIO DE FONDOS */
  setTimeout(cambia, 4000); 
}


/* REEMPLAZA LOS FONDOS EN CADA PIEZA */
function cambia() {
  /* CAMBIA TÍTULO CON EL AUTOR */
  caja.title = artistas[cadaImagen];  

  /* SI EL ARRAY DE ÍNDICES DE PIEZAS NO ESTÁ VACÍO */
  if(cantPiezas.length != 0){
    /* ELIGE UN ELEMENTO (QUE ES UN ÍNDICE NUMÉRICO) AL AZAR */
    extrae = Math.floor(Math.random()*cantPiezas.length); 
    /* ELIMINA ESE VALOR DEL ARRAY ORIGINAL ... */
    pieza = cantPiezas.pop(); 
    /* ... Y LO PASA AL COMIENZO DEL ARRAY "COPIA" */
    copiaCantPiezas.unshift(pieza); 
    /* TOMA ESE ELEMENTO COMO UN NÚMERO DE ÍNDICE ... */
    indice = copiaCantPiezas[0]; 
    /* ... PARA APUNTAR A UNA PIEZA DE COLECCIÓN DE DIV'S */
    estaPieza = todasPiezas[+indice]; 
    /* Y LE CAMBIA EL FONDO SEGÚN SEA DE LAS HORIZONTALES O VERTICALES */
    estaPieza.style.backgroundImage = (estaPieza.className == "p0")? fondo0 + imagenes[cadaImagen].src + ")" : fondo1 + imagenes[cadaImagen].src + ")"
    /* REPITE CADA 150ms HASTA VACIAR EL ARRAY ORIGINAL (CAMBIO DE TODAS LAS PIEZAS) */
    setTimeout(cambia, 150); 
  }

  /* SI EL ARRAY ESTÁ VACÍO */
  else {
    /* VUELVE A LLENAR EL ARRAY CON LOS NÚMEROS DE LA "COPIA" */
    cantPiezas = copiaCantPiezas.slice(); 
    /* VACÍA EL ARRAY DE COPIA */
    copiaCantPiezas = []; 
    /* SI EL ÍNDICE DE FOTOS LLEGA A FINAL, REINICIA, SI NO, AUMENTA EN 1 */ 
    cadaImagen = (cadaImagen == imagenes.length-1)? 0 : ++cadaImagen;
    /* REPITE LA FUNCIÓN EN 4 SEGUNDOS (MUESTRA LA FOTO) */
    setTimeout(cambia, 4000); 
  }
}


onload = puzzle; 



