# 📱 AR Textos Informativos - ArUco

Una aplicación web de Realidad Aumentada que detecta códigos ArUco y muestra textos informativos en 3D.

## ✨ Características

- 🎯 Detección de códigos ArUco en tiempo real
- 📝 Textos 3D informativos personalizables
- 🎨 Animaciones y efectos visuales
- 📱 Compatible con móviles y tablets
- 🌐 Funciona directamente en el navegador
- 🔧 Fácil de personalizar y expandir

## 🚀 Cómo usar

1. **Accede a la aplicación**: Abre `index.html` en tu navegador web
2. **Permite acceso a la cámara**: Acepta los permisos cuando se soliciten
3. **Genera códigos ArUco**: Utiliza cualquier generador online de códigos ArUco
4. **Escanea**: Apunta la cámara hacia un código ArUco
5. **¡Disfruta!**: Los textos informativos aparecerán en 3D

## 📋 Configuración de códigos ArUco

### Generadores recomendados:
- [ArUco Marker Generator](https://chev.me/arucogen/)
- [ArUco Generator Online](https://chev.me/arucogen/)

### IDs incluidos por defecto:
- **ID 0**: Mensaje de bienvenida
- **ID 1**: Información técnica
- **ID 2**: Manual de usuario
- **ID 3**: Estadísticas
- **ID 4**: Información de contacto

## 🛠️ Personalización

### Agregar nuevo marcador dinámicamente:

```javascript
agregarMarcador(
    5,                           // ID del ArUco
    'Mi Título',                 // Título principal
    'Contenido informativo\nCon múltiples líneas', // Contenido
    '¡Mensaje destacado!'        // Texto destacado
);
```

### Modificar estilos de texto:

Los textos tienen tres estilos predefinidos:
- `texto-principal`: Títulos principales
- `texto-secundario`: Contenido informativo
- `texto-destacado`: Mensajes importantes

## 📁 Estructura del proyecto

```
├── index.html          # Aplicación principal
├── README.md          # Este archivo
├── patterns/          # Patrones ArUco (se crean automáticamente)
└── js/               # Scripts adicionales (opcional)
```

## 🔧 Instalación para desarrollo

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ar-textos-aruco.git
cd ar-textos-aruco
```

2. Abre con un servidor local (recomendado):
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000
```

3. Accede a `http://localhost:8000`

## 📱 Compatibilidad

- ✅ Chrome (Android/iOS)
- ✅ Safari (iOS)
- ✅ Firefox (Android)
- ✅ Edge (Android)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [A-Frame](https://aframe.io/) - Framework de WebXR
- [AR.js](https://ar-js-org.github.io/AR.js/) - Biblioteca de Realidad Aumentada
- [ArUco](https://docs.opencv.org/4.x/d5/dae/tutorial_aruco_detection.html) - Sistema de marcadores

---

💡 **Tip**: Para mejores resultados, imprime los códigos ArUco en papel blanco y úsalos en buena iluminación.
