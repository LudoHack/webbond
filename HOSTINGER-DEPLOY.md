# 🚀 Guía de Deployment a Hostinger

## 📋 Tabla de Contenidos

1. [Opción 1: HTML Estático (RECOMENDADO para Hostinger)](#opción-1-html-estático)
2. [Opción 2: Cloudflare Pages + Dominio Hostinger (MEJOR OPCIÓN)](#opción-2-cloudflare-pages)
3. [Opción 3: Node.js en Hostinger](#opción-3-nodejs)

---

## ⭐ OPCIÓN 1: HTML Estático en Hostinger

### ✅ **Ventajas**
- Funciona en cualquier plan de Hostinger
- No requiere Node.js
- Rápido y simple
- Compatible con cPanel

### 📦 **Archivos Preparados**

Ya está todo listo en: `/home/user/webapp/the-bond-hostinger.zip`

**Contenido del ZIP:**
```
hostinger-static/
├── index.html          # Página principal con todo el HTML
├── .htaccess          # Configuración Apache (HTTPS, cache, etc.)
└── static/
    ├── style.css      # Estilos CSS
    └── app.js         # JavaScript
```

### 🔧 **Pasos para Subir a Hostinger**

#### **Método 1: File Manager (cPanel)**

1. **Acceder a Hostinger**
   - Ve a https://hpanel.hostinger.com
   - Login con tu cuenta
   - Selecciona tu dominio

2. **Abrir File Manager**
   - En el panel, busca "File Manager" o "Administrador de archivos"
   - Click en "File Manager"

3. **Navegar a public_html**
   - En la izquierda, click en `public_html`
   - Esta es la carpeta raíz de tu sitio web

4. **Limpiar carpeta (si ya hay archivos)**
   ```
   - Selecciona todos los archivos existentes
   - Click en "Delete" o "Eliminar"
   ```

5. **Subir el ZIP**
   - Click en "Upload" o "Subir archivos"
   - Selecciona `the-bond-hostinger.zip`
   - Espera a que termine la carga

6. **Extraer el ZIP**
   - Click derecho en `the-bond-hostinger.zip`
   - Selecciona "Extract" o "Extraer"
   - Se creará carpeta `hostinger-static`

7. **Mover archivos al root**
   ```
   - Entra a la carpeta hostinger-static/
   - Selecciona TODOS los archivos (index.html, .htaccess, static/)
   - Click en "Move" o "Mover"
   - Destino: /public_html
   - Confirmar
   ```

8. **Eliminar carpeta vacía**
   - Elimina la carpeta `hostinger-static` (ya vacía)
   - Elimina `the-bond-hostinger.zip`

9. **Estructura final en public_html:**
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   └── static/
       ├── style.css
       └── app.js
   ```

10. **Verificar**
    - Ve a tu dominio: `https://tudominio.com`
    - Deberías ver The Bond Departamentos funcionando

---

#### **Método 2: FTP (FileZilla)**

1. **Obtener credenciales FTP**
   - En Hostinger panel
   - Busca "FTP Accounts" o "Cuentas FTP"
   - Copia: Host, Username, Password, Puerto (21)

2. **Conectar con FileZilla**
   - Abre FileZilla
   - Host: `ftp.tudominio.com`
   - Usuario: tu usuario FTP
   - Contraseña: tu password FTP
   - Puerto: 21
   - Click "Quickconnect"

3. **Navegar a public_html**
   - En el panel derecho (servidor remoto)
   - Entra a carpeta `public_html`

4. **Subir archivos**
   - En el panel izquierdo (tu computadora)
   - Navega a donde descargaste el ZIP
   - Extrae el ZIP localmente
   - Selecciona todo de `hostinger-static/`
   - Arrastra al panel derecho (public_html)

5. **Verificar**
   - Ve a tu dominio
   - Debería funcionar

---

### ⚠️ **Problemas Comunes**

#### **Problema 1: No se ven los estilos**

**Solución:**
```
1. Verifica que la carpeta static/ esté en public_html/
2. En File Manager, verifica permisos:
   - static/ → 755
   - style.css → 644
   - app.js → 644
```

#### **Problema 2: Errores 404**

**Solución:**
```
1. Verifica que .htaccess esté en public_html/
2. En cPanel, verifica que mod_rewrite esté habilitado
3. Si no funciona, contacta soporte Hostinger
```

#### **Problema 3: Formulario de contacto no funciona**

**Nota:**
```
El formulario requiere backend (API).
Con HTML estático solo, el formulario NO enviará emails.

Soluciones:
a) Usa un servicio de formularios: FormSpree, Netlify Forms
b) Implementa API en PHP (ver más abajo)
c) Usa Cloudflare Pages (Opción 2)
```

---

### 📧 **Bonus: Hacer Funcionar el Formulario (PHP)**

Crea archivo `contact.php` en `public_html`:

```php
<?php
// contact.php - Handler para formulario de contacto

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = htmlspecialchars($data['name']);
    $phone = htmlspecialchars($data['phone']);
    $email = htmlspecialchars($data['email']);
    $segment = htmlspecialchars($data['segment']);
    $property = htmlspecialchars($data['property']);
    $message = htmlspecialchars($data['message']);
    
    // Email configuration
    $to = "ventas@edificiothebond.es";
    $subject = "Nuevo Lead - The Bond Departamentos";
    
    $email_content = "
    Nuevo contacto desde la web:
    
    Nombre: $name
    Teléfono: $phone
    Email: $email
    Perfil: $segment
    Propiedad de Interés: $property
    Mensaje: $message
    ";
    
    $headers = "From: noreply@tudominio.com";
    
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode([
            'success' => true,
            'message' => 'Gracias por tu interés. Nos contactaremos contigo pronto.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al enviar el formulario.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido.'
    ]);
}
?>
```

Luego modifica `static/app.js`, cambia la línea del fetch:

```javascript
// Busca esta línea:
const response = await fetch('/api/contact', {

// Cámbiala por:
const response = await fetch('/contact.php', {
```

---

## 🌟 OPCIÓN 2: Cloudflare Pages + Dominio Hostinger (MEJOR OPCIÓN)

### ✅ **Ventajas**
- **GRATIS** (sin costos mensuales)
- **Ultra rápido** (CDN global)
- **SSL automático**
- **Formulario funciona** (tiene backend)
- **Auto-deploy** desde GitHub
- Usas tu dominio de Hostinger

### 🚀 **Pasos**

#### **Parte 1: Deploy a Cloudflare**

1. **Crear cuenta Cloudflare**
   - Ve a https://dash.cloudflare.com/sign-up
   - Regístrate gratis

2. **Crear proyecto Pages**
   - En dashboard, click "Workers & Pages"
   - Click "Create application"
   - Click "Pages"
   - Click "Connect to Git"
   - Autoriza GitHub
   - Selecciona: `LudoHack/webbond`

3. **Configurar build**
   ```
   Project name: the-bond
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Espera 2-3 minutos
   - Obtendrás: `https://the-bond.pages.dev`

#### **Parte 2: Conectar Dominio de Hostinger**

1. **En Cloudflare Dashboard**
   - Ve a tu proyecto "the-bond"
   - Click "Custom domains"
   - Click "Set up a custom domain"
   - Ingresa: `tudominio.com`
   - Te dará records DNS para configurar

2. **En Hostinger Panel**
   - Ve a "DNS / Name Servers"
   - Opción A - DNS Records (más fácil):
     ```
     Agregar record CNAME:
     Name: www
     Points to: the-bond.pages.dev
     TTL: 3600
     
     Agregar record A:
     Name: @
     Points to: [IP que te dio Cloudflare]
     TTL: 3600
     ```
   
   - Opción B - Nameservers (más potente):
     ```
     Cambiar nameservers a:
     ns1.cloudflare.com
     ns2.cloudflare.com
     ```

3. **Esperar propagación**
   - DNS tarda 1-24 horas
   - Cloudflare te notificará cuando esté listo

4. **Verificar**
   - Ve a tu dominio
   - Debería cargar desde Cloudflare

---

## 🔧 OPCIÓN 3: Node.js en Hostinger

### ⚠️ **Requiere**
- Plan Business o superior de Hostinger
- Acceso SSH
- Node.js habilitado

### 📋 **Pasos**

1. **Verificar si tienes Node.js**
   - Login a Hostinger panel
   - Busca "Node.js" en el menú
   - Si no aparece, tu plan NO lo soporta

2. **Si tienes Node.js:**

   a) **Acceder por SSH**
   ```bash
   ssh usuario@tudominio.com
   ```

   b) **Clonar repositorio**
   ```bash
   cd ~
   git clone https://github.com/LudoHack/webbond.git
   cd webbond
   ```

   c) **Instalar dependencias**
   ```bash
   npm install
   npm install @hono/node-server
   ```

   d) **Build**
   ```bash
   npm run build
   ```

   e) **Iniciar con PM2**
   ```bash
   npm install -g pm2
   pm2 start server-node.js --name the-bond
   pm2 startup
   pm2 save
   ```

3. **Configurar dominio**
   - En Hostinger, configura reverse proxy
   - Apunta a `localhost:3000`

---

## 🎯 **Recomendación Final**

**Para ti, recomiendo:**

1. **Primera opción**: **Cloudflare Pages + tu dominio Hostinger**
   - Es GRATIS
   - Más rápido
   - Formulario funciona
   - SSL automático
   - No pagas hosting

2. **Segunda opción**: **HTML estático en Hostinger**
   - Si quieres usar el hosting que ya pagas
   - Necesitas agregar PHP para el formulario

---

## 📞 **Soporte**

- **Hostinger**: https://www.hostinger.com/support
- **Cloudflare**: https://community.cloudflare.com

---

## ✅ **Checklist Post-Deployment**

- [ ] Web carga correctamente
- [ ] Estilos CSS se ven bien
- [ ] JavaScript funciona (calculadora, formulario)
- [ ] Google Maps carga
- [ ] WhatsApp flotante funciona
- [ ] Formulario envía (si aplicable)
- [ ] SSL/HTTPS habilitado
- [ ] Dominio apunta correctamente

---

**¿Qué opción prefieres?**

1. HTML estático en Hostinger (simple pero formulario limitado)
2. Cloudflare Pages + tu dominio (GRATIS y completo)
3. Node.js en Hostinger (si tu plan lo permite)
