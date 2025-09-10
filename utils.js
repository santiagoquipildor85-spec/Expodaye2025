// Utilidades para la aplicación AR de códigos ArUco

/**
 * Clase principal para manejar marcadores ArUco
 */
class ArUcoManager {
    constructor() {
        this.activeMarkers = new Map();
        this.scene = null;
        this.markersContainer = null;
        this.initialized = false;
    }

    /**
     * Inicializa el manager
     */
    init() {
        this.scene = document.querySelector('a-scene');
        if (!this.scene) {
            console.error('No se encontró la escena A-Frame');
            return false;
        }
        
        this.initialized = true;
        console.log('ArUcoManager inicializado correctamente');
        return true;
    }

    /**
     * Agrega un nuevo marcador dinámicamente
     * @param {number} id - ID del marcador ArUco
     * @param {string} titulo - Título principal
     * @param {string} contenido - Contenido informativo
     * @param {string} destacado - Texto destacado
     * @param {Object} opciones - Opciones adicionales
     */
    agregarMarcador(id, titulo, contenido, destacado, opciones = {}) {
        if (!this.initialized) {
            console.error('ArUcoManager no está inicializado');
            return false;
        }

        if (!isValidMarkerId(id)) {
            console.error(`ID de marcador inválido: ${id}`);
            return false;
        }

        // Configuración por defecto
        const config = {
            position: opciones.position || ArConfig.textPositions,
            animations: opciones.animations || {},
            colors: opciones.colors || {},
            ...opciones
        };

        try {
            // Crear el marcador
            const marker = this.crearElementoMarcador(id);
            
            // Crear el contenido
            const entity = this.crearContenidoMarcador(id, titulo, contenido, destacado, config);
            
            // Ensamblar
            marker.appendChild(entity);
            this.scene.appendChild(marker);
            
            // Registrar marcador activo
            this.activeMarkers.set(id, {
                element: marker,
                config: { titulo, contenido, destacado, ...config }
            });
            
            console.log(`Marcador ArUco ID ${id} agregado exitosamente`);
            return true;
            
        } catch (error) {
            console.error(`Error al agregar marcador ${id}:`, error);
            return false;
        }
    }

    /**
     * Crea el elemento marcador base
     * @param {number} id - ID del marcador
     * @returns {HTMLElement} Elemento marcador
     */
    crearElementoMarcador(id) {
        const marker = document.createElement('a-marker');
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('preset', 'custom');
        marker.setAttribute('url', `patterns/pattern-aruco-${id}.patt`);
        marker.setAttribute('id', `marker-${id}`);
        
        // Eventos de marcador
        marker.addEventListener('markerFound', () => {
            console.log(`Marcador ${id} detectado`);
            this.onMarkerFound(id);
        });
        
        marker.addEventListener('markerLost', () => {
            console.log(`Marcador ${id} perdido`);
            this.onMarkerLost(id);
        });
        
        return marker;
    }

    /**
     * Crea el contenido del marcador
     * @param {number} id - ID del marcador
     * @param {string} titulo - Título
     * @param {string} contenido - Contenido
     * @param {string} destacado - Texto destacado
     * @param {Object} config - Configuración
     * @returns {HTMLElement} Entidad con contenido
     */
    crearContenidoMarcador(id, titulo, contenido, destacado, config) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('id', `content-${id}`);
        entity.setAttribute('position', '0 0 0');
        
        // Animación de entrada
        entity.setAttribute('animation', ArConfig.animations.entrance);
        
        // Crear elementos de texto
        const tituloElement = this.crearTexto(titulo, config.position.title || '0 1 0', 'texto-principal', config.animations.title);
        const contenidoElement = this.crearTexto(contenido, config.position.content || '0 0.2 0', 'texto-secundario');
        const destacadoElement = this.crearTexto(destacado, config.position.highlight || '0 -0.5 0', 'texto-destacado', config.animations.highlight);
        
        // Agregar elementos a la entidad
        entity.appendChild(tituloElement);
        entity.appendChild(contenidoElement);
        entity.appendChild(destacadoElement);
        
        return entity;
    }

    /**
     * Crea un elemento de texto
     * @param {string} valor - Texto a mostrar
     * @param {string} posicion - Posición del texto
     * @param {string} mixin - Mixin de estilo
     * @param {string} animacion - Animación opcional
     * @returns {HTMLElement} Elemento de texto
     */
    crearTexto(valor, posicion, mixin, animacion = null) {
        const textElement = document.createElement('a-text');
        textElement.setAttribute('value', valor);
        textElement.setAttribute('position', posicion);
        textElement.setAttribute('mixin', mixin);
        
        if (animacion) {
            textElement.setAttribute('animation', animacion);
        }
        
        return textElement;
    }

    /**
     * Elimina un marcador
     * @param {number} id - ID del marcador a eliminar
     */
    eliminarMarcador(id) {
        const markerData = this.activeMarkers.get(id);
        if (markerData) {
            markerData.element.remove();
            this.activeMarkers.delete(id);
            console.log(`Marcador ${id} eliminado`);
            return true;
        }
        console.warn(`Marcador ${id} no encontrado`);
        return false;
    }

    /**
     * Actualiza el contenido de un marcador existente
     * @param {number} id - ID del marcador
     * @param {Object} nuevoContenido - Nuevo contenido
     */
    actualizarMarcador(id, nuevoContenido) {
        const markerData = this.activeMarkers.get(id);
        if (!markerData) {
            console.warn(`Marcador ${id} no encontrado para actualizar`);
            return false;
        }

        const entity = markerData.element.querySelector(`#content-${id}`);
        if (!entity) {
            console.error(`Contenido del marcador ${id} no encontrado`);
            return false;
        }

        // Actualizar textos
        if (nuevoContenido.titulo) {
            const titulo = entity.children[0];
            titulo.setAttribute('value', nuevoContenido.titulo);
        }
        
        if (nuevoContenido.contenido) {
            const contenido = entity.children[1];
            contenido.setAttribute('value', nuevoContenido.contenido);
        }
        
        if (nuevoContenido.destacado) {
            const destacado = entity.children[2];
            destacado.setAttribute('value', nuevoContenido.destacado);
        }

        // Actualizar configuración local
        markerData.config = { ...markerData.config, ...nuevoContenido };
        
        console.log(`Marcador ${id} actualizado`);
        return true;
    }

    /**
     * Obtiene lista de marcadores activos
     * @returns {Array} Lista de IDs de marcadores activos
     */
    obtenerMarcadoresActivos() {
        return Array.from(this.activeMarkers.keys());
    }

    /**
     * Callback cuando se detecta un marcador
     * @param {number} id - ID del marcador detectado
     */
    onMarkerFound(id) {
        // Implementar lógica personalizada aquí
        console.log(`¡Marcador ${id} detectado!`);
        
        // Ejemplo: agregar efecto visual
        const marker = this.activeMarkers.get(id);
        if (marker) {
            const entity = marker.element.querySelector(`#content-${id}`);
            if (entity) {
                entity.setAttribute('animation__found', 'property: scale; to: 1.1 1.1 1.1; dur: 300');
            }
        }
    }

    /**
     * Callback cuando se pierde un marcador
     * @param {number} id - ID del marcador perdido
     */
    onMarkerLost(id) {
        // Implementar lógica personalizada aquí
        console.log(`Marcador ${id} perdido`);
        
        // Ejemplo: remover efecto visual
        const marker = this.activeMarkers.get(id);
        if (marker) {
            const entity = marker.element.querySelector(`#content-${id}`);
            if (entity) {
                entity.removeAttribute('animation__found');
            }
        }
    }
}

/**
 * Utilidades generales
 */
const ArUtils = {
    /**
     * Genera un código ArUco usando una API externa
     * @param {number} id - ID del marcador
     * @param {number} size - Tamaño en píxeles
     * @returns {string} URL de la imagen del código
     */
    generarCodigoArUco(id, size = 200) {
        return `https://chev.me/arucogen/aruco_${id}.png?size=${size}`;
    },

    /**
     * Descarga un código ArUco
     * @param {number} id - ID del marcador
     * @param {number} size - Tamaño en píxeles
     */
    descargarCodigoArUco(id, size = 200) {
        const url = this.generarCodigoArUco(id, size);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aruco_${id}.png`;
        link.click();
    },

    /**
     * Valida si el navegador soporta AR
     * @returns {boolean} True si soporta AR
     */
    validarSoporteAR() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    },

    /**
     * Solicita permisos de cámara
     * @returns {Promise<boolean>} True si se otorgaron permisos
     */
    async solicitarPermisosCamara() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            console.error('Error al solicitar permisos de cámara:', error);
            return false;
        }
    },

    /**
     * Formatea texto para mostrar en AR
     * @param {string} texto - Texto a formatear
     * @param {number} maxLineas - Máximo número de líneas
     * @returns {string} Texto formateado
     */
    formatearTexto(texto, maxLineas = 5) {
        const lineas = texto.split('\n');
        if (lineas.length > maxLineas) {
            return lineas.slice(0, maxLineas).join('\n') + '\n...';
        }
        return texto;
    },

    /**
     * Obtiene información del dispositivo
     * @returns {Object} Información del dispositivo
     */
    obtenerInfoDispositivo() {
        return {
            esMovil: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            esTactil: 'ontouchstart' in window,
            orientacion: screen.orientation ? screen.orientation.angle : 0,
            ancho: window.innerWidth,
            alto: window.innerHeight
        };
    }
};

// Instancia global del manager
const arManager = new ArUcoManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        arManager.init();
    }, 1000);
});

// Función de conveniencia para agregar marcadores (compatibilidad con el HTML existente)
function agregarMarcador(id, titulo, contenido, destacado, opciones = {}) {
    return arManager.agregarMarcador(id, titulo, contenido, destacado, opciones);
}
