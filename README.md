# Simulador de Microbioma Intestinal con Análisis IA

## Descripción general
Esta aplicación web permite explorar la dinámica de un ecosistema intestinal ficticio compuesto por 20 especies microbianas. El usuario puede elegir distintos patrones de alimentación para simular cambios mensuales, visualizar la evolución en gráficos interactivos y solicitar un análisis experto generado con Gemini para obtener recomendaciones personalizadas y un plan de comidas.

## Características principales
- **Simulación dietaria:** elige entre dieta industrializada, mediterránea, cetogénica o vegana para observar cómo varían las abundancias relativas de bacterias beneficiosas, oportunistas y generalistas.
- **Visualizaciones interactivas:** un gráfico de dona muestra el balance actual de especies y un gráfico de áreas ilustra la evolución temporal; ambos se actualizan tras cada simulación.
- **Ficha de especies:** cada microbio incluye emoji, rol ecológico, abundancia actual y una descripción accesible mediante una tarjeta interactiva.
- **Asistente IA integrado:** un modal invoca una función serverless que llama a Gemini para resumir el estado del microbioma, detallar implicaciones en salud y proponer tres recomendaciones dietéticas.
- **Plan de comidas personalizado:** tras obtener el análisis, es posible generar un menú de un día alineado con las recomendaciones previas.

## Estructura del proyecto
```
Microbiomesimulator/
├── public/                 # Frontend estático (HTML, Tailwind vía CDN, Chart.js y Showdown)
│   ├── index.html          # Interfaz de usuario y contenedores de gráficos/modales
│   └── script.js           # Lógica de simulación, render de gráficos y llamadas a la API
├── netlify/
│   └── functions/          # Funciones serverless que actúan como backend seguro
│       ├── analyze.js      # Solicita a Gemini un informe del microbioma
│       └── meal-plan.js    # Genera un plan de comidas a partir del análisis
├── netlify.toml            # Configuración de despliegue y redirecciones para Netlify
├── package.json            # Metadatos del proyecto (sin dependencias locales obligatorias)
└── README.md
```

## Requisitos previos
- Node.js 18+ para ejecutar el entorno de desarrollo local y el CLI de Netlify.
- Una cuenta de Google AI Studio y la clave de API de Gemini (`GEMINI_API_KEY`).
- (Opcional) [Netlify CLI](https://docs.netlify.com/cli/get-started/) para emular funciones serverless localmente.

## Ejecución local
1. Instala Netlify CLI si aún no lo tienes:
   ```bash
   npm install -g netlify-cli
   ```
2. Ubicado en la raíz del repositorio, exporta la clave de Gemini para que las funciones puedan utilizarla:
   ```bash
   export GEMINI_API_KEY="tu_clave_secreta"
   ```
   En Windows PowerShell usa:
   ```powershell
   $Env:GEMINI_API_KEY="tu_clave_secreta"
   ```
3. Inicia el entorno local con soporte para funciones serverless:
   ```bash
   netlify dev
   ```
4. Abre `http://localhost:8888` en tu navegador. Los cambios en `public/index.html` o `public/script.js` se reflejarán al recargar.

> Si solo deseas previsualizar la interfaz sin las llamadas a IA, puedes servir el directorio `public/` con cualquier servidor estático (por ejemplo `npx serve public`). Las funciones que dependen de la API de Gemini no estarán disponibles en ese modo.

## Flujo de uso
1. Selecciona una dieta en el panel de control.
2. Pulsa **"Simular 1 Mes"** para recalcular las abundancias según el modelo heurístico.
3. Observa el estado del ecosistema en los gráficos y tarjetas de especies.
4. Haz clic en **"Analizar y Recomendar"** para obtener un informe elaborado por Gemini dentro de un modal.
5. Desde el modal, genera un **plan de comidas de 1 día** basado en las recomendaciones.
6. Utiliza **"Reiniciar Ecosistema"** para restaurar las abundancias iniciales y empezar de nuevo.

## Despliegue en Netlify
1. Crea un nuevo sitio en Netlify y conecta el repositorio.
2. En la sección **Site settings → Environment variables**, define `GEMINI_API_KEY` con tu clave privada.
3. Configura la carpeta de publicación (`public`) y el directorio de funciones (`netlify/functions`) si Netlify no los detecta automáticamente.
4. Realiza el deploy. Las rutas `/api/analyze` y `/api/meal-plan` se redirigen a las funciones serverless según `netlify.toml`.

## Seguridad y buenas prácticas
- Nunca expongas la clave de Gemini en el frontend; se inyecta únicamente en las funciones serverless.
- Considera implementar límites de uso y manejo de errores adicional en producción para evitar abusos o costes inesperados.
- Las simulaciones representan un modelo educativo simplificado; no sustituyen asesoramiento médico profesional.

## Créditos
Aplicación desarrollada por Martin Vazquez (Chief Science Officer, Heritas). Este README fue generado para documentar la arquitectura y uso de la herramienta.
