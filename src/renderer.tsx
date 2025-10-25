import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="The Bond Departamentos - Tu inversión inteligente en la zona de mayor crecimiento de Santa Cruz. Desde $us 69,900 con financiamiento flexible." />
        <meta name="keywords" content="departamentos santa cruz, zona norte, inversión inmobiliaria, the bond, preventa departamentos" />
        <title>The Bond Departamentos | Inversión Inteligente en Zona Norte</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </head>
      <body>
        {/* Navigation */}
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a href="/">
                <span class="brand-name">The Bond</span>
                <span class="brand-subtitle">Departamentos</span>
              </a>
            </div>
            <button class="navbar-toggle" id="navbarToggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul class="navbar-menu" id="navbarMenu">
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#departamentos">Departamentos</a></li>
              <li><a href="#calculadora">Calculadora</a></li>
              <li><a href="#ubicacion">Ubicación</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contacto" class="btn btn-primary btn-sm">Contacto</a></li>
            </ul>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
})
