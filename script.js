// ==========================================
// 🏛 LINGUA MEMECOIN ($LNG) - SCRIPT PRINCIPAL
// ==========================================

// --- 1. MOTOR DE ANIMACIÓN DEL ACORDEÓN INTERACTIVO (FAQs) ---
function conmutarFaq(id) {
    const contenedor = document.getElementById(`a${id}-wrapper`);
    const icono = document.getElementById(`icon-faq-${id}`);
    
    if (contenedor.style.maxHeight && contenedor.style.maxHeight !== '0px') {
        contenedor.style.maxHeight = '0px';
        icono.style.transform = 'rotate(0deg)';
        icono.innerText = '+';
    } else {
        // Cierra los otros de manera limpia para mejorar la visualización
        for (let i = 1; i <= 10; i++) {
            const c = document.getElementById(`a${i}-wrapper`);
            const ic = document.getElementById(`icon-faq-${i}`);
            if(c) c.style.maxHeight = '0px';
            if(ic) { ic.style.transform = 'rotate(0deg)'; ic.innerText = '+'; }
        }
        // Abre el seleccionado midiendo su altura real en píxeles
        contenedor.style.maxHeight = contenedor.scrollHeight + "px";
        icono.style.transform = 'rotate(45deg)';
        icono.innerText = '×';
    }
}

// --- 2. FUNCIÓN PARA COPIAR LA DIRECCIÓN DE CONTRATO (CA) ---
function copiarContrato() {
    const caTexto = document.getElementById("ca-text").innerText;
    const botonCopiar = document.getElementById("btn-copiar");

    navigator.clipboard.writeText(caTexto).then(() => {
        const esIngles = document.getElementById("btn-en").classList.contains("bg-[#DFD5C6]");
        botonCopiar.innerText = esIngles ? "Copied! ✓" : "¡Copiado! ✓";
        botonCopiar.style.backgroundColor = "#22c55e"; // Cambio a color de éxito (Verde)
        botonCopiar.style.color = "#ffffff";

        setTimeout(() => {
            botonCopiar.innerText = esIngles ? "Copy CA" : "Copiar CA";
            botonCopiar.style.backgroundColor = "#DFD5C6"; // Regreso a estética mineral (Arena)
            botonCopiar.style.color = "#0d0f12";
        }, 2000);
    }).catch(err => console.error("Error al copiar al portapapeles: ", err));
}

// --- 3. INTERACTIVIDAD DEL GRÁFICO (DONUT CHART) ---
function mostrarDetalle(porcentaje, seccion) {
    document.getElementById('pct-centro').innerText = porcentaje;
    document.getElementById('lbl-centro').innerText = seccion;
}

function restaurarDetalle() {
    document.getElementById('pct-centro').innerText = "1B";
    document.getElementById('lbl-centro').innerText = "Suministro";
}

// --- 4. MOTOR DE EFECTO VISUAL: LETRAS CLÁSICAS EN CASCADA ---
function iniciarFondoAnimado() {
    const canvas = document.getElementById('bg-letras');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function ajustarPantalla() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    ajustarPantalla();
    window.addEventListener('resize', ajustarPantalla);

    // Caracteres basados en la filosofía lapidaria del proyecto
    const alfabeto = "ΛΒΓΔΕΖΗΘΙΚΛΜΝΞOΠΡΣΤΥΦΧΨΩABCDEFGHIJKLMNOPQRSTUVWXYZ🪶🏛📜";
    const letras = alfabeto.split("");
    const tamañoFuente = 16;
    const columnas = Math.floor(canvas.width / tamañoFuente);
    const caidaY = Array(columnas).fill(1);

    function dibujar() {
        ctx.fillStyle = 'rgba(13, 15, 18, 0.06)'; // Crea un efecto sutil de difuminado continuo
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(223, 213, 198, 0.12)'; // Tono caliza opaco
        ctx.font = tamañoFuente + 'px Cinzel, serif';

        for (let i = 0; i < caidaY.length; i++) {
            const texto = letras[Math.floor(Math.random() * letras.length)];
            ctx.fillText(texto, i * tamañoFuente, caidaY[i] * tamañoFuente);
            if (caidaY[i] * tamañoFuente > canvas.height && Math.random() > 0.975) {
                caidaY[i] = 0;
            }
            caidaY[i]++;
        }
    }
    setInterval(dibujar, 33); // Renderizado óptimo a ~30 FPS sin sobrecargar la CPU móvil
}

// --- 5. MÓDULO DE IDENTIDAD GEODINÁMICA POR IP ---
async function detectarGuardian() {
    const guardianBox = document.getElementById('guardian-name');
    const guardianEmoji = document.getElementById('guardian-emoji');
    try {
        const respuesta = await fetch('https://ipapi.co/json/');
        if (!respuesta.ok) throw new Error();
        const datos = await respuesta.json();
        const pais = datos.country_code;
        
        const guardianes = {
            HN: { emoji: "🦜", nombre: "Ara Macao (Honduras)" },
            MX: { emoji: "🦅", nombre: "Aquila Chrysaetos (México)" },
            SV: { emoji: "🪶", nombre: "Torogoz (El Salvador)" },
            NI: { emoji: "🦜", nombre: "Guardabarranco (Nicaragua)" },
            CO: { emoji: "🦅", nombre: "Vultur Gryphus (Colombia)" },
            EC: { emoji: "🦅", nombre: "Vultur Gryphus (Ecuador)" }
        };

        if (guardianes[pais]) {
            guardianEmoji.innerText = guardianes[pais].emoji;
            guardianBox.innerText = guardianes[pais].nombre;
        } else {
            guardianEmoji.innerText = "🦜";
            guardianBox.innerText = "Ara Macao (Origen Universal)";
        }
    } catch (e) {
        guardianEmoji.innerText = "🦜";
        guardianBox.innerText = "Ara Macao (Origen Global)";
    }
}

// --- 6. MOTOR DE TRADUCCIÓN INTERNACIONAL (I18N) ---
const textos = {
    es: {
        tTokenomics: "Distribución de Tokens y Propiedad",
        subTokenomics: "Suministro fijo de 1,000,000,000 $LNG. Autoridades de emisión y bloqueo completamente renunciadas.",
        tFaq: "Preguntas Frecuentes",
        subFaq: "Respuestas técnicas y culturales sobre el ecosistema descentralizado.",
        q1: "¿Qué es Lingua MemeCoin y por qué se define como un movimiento cultural?",
        a1: "A diferencia de los tokens puramente especulativos, Lingua es un manifiesto de identidad descentralizado sobre Solana. Nace en Honduras con el propósito de celebrar la diversidad lingüística regional, utilizando el código abierto para conectar historias humanas en la Web3 sin depender de capitales privados.",
        q2: "¿Por qué se pospuso la preventa del token $LNG?",
        a2: "Priorizamos la seguridad técnica absoluta sobre la prisa comercial. Decidimos postergar el lanzamiento para auditar y blindar los contratos automatizados de distribución masiva, protegiendo los fondos de nuestra comunidad contra vulnerabilidades de código.",
        q3: "¿Qué significa que las autoridades de emisión (Mint) y bloqueo (Freeze) estén renunciadas?",
        a3: "Significa que el código del token es 100% inmutable. Nadie (ni el equipo desarrollador) puede crear nuevos tokens para inflar el suministro ni congelar los fondos de las billeteras de los usuarios, garantizando un entorno libre de censura.",
        q4: "¿Cómo funciona el Sistema de Identidad Geodinámica?",
        a4: "La interfaz detecta de forma segura tu ubicación geográfica aproximada mediante IP para asignarte un guardián cultural nativo (como la Ara Macao en Honduras, el Águila Real en México o el Torogoz en El Salvador), adaptando la narrativa del sitio a tu identidad.",
        q5: "¿Cómo puedo participar en la gobernanza abierta del proyecto?",
        a5: "Al ser un ecosistema basado en GitHub bajo licencia MIT, cualquier actualización de la interfaz o la documentación es propuesta de forma transparente. La comunidad actúa como un filtro colectivo aprobando o mejorando el repositorio.",
        q6: "¿Qué ventajas ofrece usar el estándar Token-2022 de Solana en este proyecto?",
        a6: "El estándar Token-2022 (SPL de funcionalidad extendida) nos permite blindar características avanzadas de inmutabilidad directamente en el código de la blockchain de Solana, asegurando que las reglas de transparencia y las restricciones de impuestos (Tax) sean perpetuas y no modificables por terceros.",
        q7: "¿Por qué la tasa de transacción (Tax) está fijada en 0.0001% y cuál es su plan futuro?",
        a7: "Al desplegar el contrato inteligente utilizando herramientas no-code, la plataforma nos obligó técnicamente a integrar un porcentaje de comisión, a pesar de que nuestra meta máxima original era dejarlo estrictamente en cero. Debido a esto, fijamos un valor casi imperceptible de 0.0001%. No obstante, en futuras actualizaciones del ecosistema se modificará la tasa a un 3.5% definitivo. Este fondo se utilizará de forma transparente para asegurar los pagos operativos, el mantenimiento de la infraestructura técnica, la ejecución de futuras quemas de tokens y el financiamiento de programas de recompensas directas para los usuarios.",
        q8: "¿Cómo puedo auditar la Dirección de Contrato (CA) de forma independiente?",
        a8: "La transparencia es total. Puedes copiar nuestra CA pública y pegarla en cualquier explorador de bloques de Solana reconocido, como Solscan o Solana Explorer. Allí podrás verificar en tiempo real que los permisos de emisión (Mint) y congelamiento (Freeze) marcan 'None' o 'Revoked'.",
        q9: "¿Por qué el suministro total está fijado estrictamente en 1,000,000,000 $LNG?",
        a9: "Establecemos un límite estricto para garantizar un modelo no inflacionario. Al haber renunciado a la autoridad de acuñación, es matemáticamente imposible que se creen nuevos tokens en el futuro, protegiendo la proporción de distribución comunitaria original.",
        q10: "¿De qué manera el proyecto asegura que no ocurrirá un retiro masivo de fondos (Rug Pull)?",
        a10: "El 35% del suministro destinado al Pool de Liquidez se programa para ser enviado a una dirección muerta (Burn Address). Al destruir las llaves del par comercial, nadie tiene la facultad técnica de retirar la liquidez del mercado, protegiendo las transacciones colectivas de la comunidad."
    },
    en: {
        tTokenomics: "Token Allocation & Ownership",
