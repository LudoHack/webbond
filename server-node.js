// Servidor Node.js para Hostinger
// Alternativa a Cloudflare Workers

import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

// Configuración del puerto
const PORT = process.env.PORT || 3000

// Servir archivos estáticos
app.use('/static/*', serveStatic({ root: './public' }))

// Importar rutas de la aplicación principal
// Nota: Necesitarás adaptar src/index.tsx para que funcione sin JSX rendering
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="The Bond Departamentos - Tu inversión inteligente en la zona de mayor crecimiento de Santa Cruz. Desde $us 69,900 con financiamiento flexible.">
    <title>The Bond Departamentos | Inversión Inteligente en Zona Norte</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <!-- Tu contenido HTML aquí -->
    <div id="app">
        <h1>The Bond Departamentos</h1>
        <p>Cargando...</p>
    </div>
    
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

// API endpoint para formulario de contacto
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    console.log('Contact form submission:', body)
    
    return c.json({ 
      success: true, 
      message: 'Gracias por tu interés. Nos contactaremos contigo pronto.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Error al enviar el formulario. Por favor intenta nuevamente.' 
    }, 500)
  }
})

// Iniciar servidor
serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
