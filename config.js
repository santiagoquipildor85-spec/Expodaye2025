// Configuración para la aplicación AR de códigos ArUco
const ArConfig = {
    // Configuración de marcadores
    markers: {
        // Configuración por defecto para nuevos marcadores
        default: {
            position: "0 0 0",
            scale: "1 1 1",
            rotation: "0 0 0"
        },
        
        // Configuración específica por ID de marcador
        specific: {
            1: {
                title: "¡Hola!",
                content: "Soy German",
                highlight: "👋 ¡Saludos!",
                animations: {
                    title: "property: rotation; to: 0 360 0; loop: true; dur: 8000",
                    content: "property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 2000",
                    highlight: "property: position; to: 0 -0.1 0; dir: alternate; loop: true; dur: 1500"
                }
            },
            2: {
                title: "¡Hola!",
                content: "Soy Fernanfloo",
                highlight: "🎮 ¡A jugar!",
                animations: {
                    title: "property: rotation; to: 0 -360 0; loop: true; dur: 10000",
                    content: "property: scale; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 1800",
                    highlight: "property: position; to: 0 -0.1 0; dir: alternate; loop: true; dur: 2200"
                }
            },
            3: {
                title: "¡Hola!",
                content: "Soy Rubius",
                highlight: "🔥 ¡Épico!",
                animations: {
                    title: "property: rotation; to: 0 360 0; loop: true; dur: 12000",
                    content: "property: scale; to: 1.15 1.15 1.15; dir: alternate; loop: true; dur: 2500",
                    highlight: "property: position; to: 0 -0.1 0; dir: alternate; loop: true; dur: 1800"
                }
            }
        }
    },
    
    // Configuración de estilos de texto
    textStyles: {
        principal: {
            font: "roboto",
            align: "center",
            width: 6,
            color: "#ffffff",
            backgroundColor: "#1e3a8a",
            opacity: 0.9
        },
        secundario: {
            font: "roboto",
            align: "center", 
            width: 8,
            color: "#e5e7eb",
            backgroundColor: "#374151",
            opacity: 0.8
        },
        destacado: {
            font: "roboto",
            align: "center",
            width: 5,
            color: "#fbbf24",
            backgroundColor: "#dc2626",
            opacity: 0.9
        }
    },
    
    // Configuración de posiciones de texto
    textPositions: {
        title: "0 1 0",
        content: "0 0.2 0", 
        highlight: "0 -0.5 0"
    },
    
    // Configuración de animaciones
    animations: {
        entrance: "property: scale; from: 0 0 0; to: 1 1 1; dur: 500",
        rotation: "property: rotation; to: 0 360 0; loop: true; dur: 10000",
        bounce: "property: position; dir: alternate; loop: true; dur: 2000",
        pulse: "property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 1000"
    },
    
    // Configuración de la cámara AR
    arSettings: {
        trackingMethod: "best",
        sourceType: "webcam",
        debugUIEnabled: false,
        detectionMode: "mono_and_matrix",
        matrixCodeType: "4x4_BCH_13_5_5"
    },
    
    // Configuración de interfaz
    ui: {
        loadingTime: 3000,        // Tiempo de pantalla de carga en ms
        instructionsTime: 10000,  // Tiempo antes de ocultar instrucciones en ms
        showInstructions: true,   // Mostrar instrucciones
        showLoading: true         // Mostrar pantalla de carga
    }
};

// Función para obtener configuración de marcador
function getMarkerConfig(id) {
    return ArConfig.markers.specific[id] || {
        title: `Marcador ${id}`,
        content: `Información para el código ArUco ID: ${id}`,
        highlight: "Configurar contenido"
    };
}

// Función para validar ID de marcador
function isValidMarkerId(id) {
    return typeof id === 'number' && id >= 0 && id <= 1023; // Rango válido ArUco
}

// Exportar configuración para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArConfig;
}

// Función para actualizar configuración dinámicamente
function updateMarkerConfig(id, newConfig) {
    if (isValidMarkerId(id)) {
        ArConfig.markers.specific[id] = {
            ...ArConfig.markers.specific[id],
            ...newConfig
        };
        console.log(`Configuración del marcador ${id} actualizada`);
        return true;
    }
    console.error(`ID de marcador inválido: ${id}`);
    return false;
}

// Función para agregar nuevo marcador a la configuración
function addMarkerConfig(id, title, content, highlight, animations = {}) {
    if (isValidMarkerId(id)) {
        ArConfig.markers.specific[id] = {
            title,
            content,
            highlight,
            animations
        };
        console.log(`Nuevo marcador ${id} agregado a la configuración`);
        return true;
    }
    console.error(`ID de marcador inválido: ${id}`);
    return false;
}

