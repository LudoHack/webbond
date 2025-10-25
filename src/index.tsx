import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer for HTML responses
app.use(renderer)

// Main page
app.get('/', (c) => {
  return c.render(
    <main>
      {/* Hero Section */}
      <section id="hero" class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-badge">🏢 Vive donde siempre quisiste vivir</div>
            <h1 class="hero-title">The Bond Departamentos</h1>
            <p class="hero-subtitle">Tu inversión inteligente en la zona de mayor crecimiento de Santa Cruz</p>
            <div class="hero-features">
              <div class="hero-feature">
                <i class="fas fa-map-marker-alt"></i>
                <span>Av. Banzer, 5º y 6º Anillo</span>
              </div>
              <div class="hero-feature">
                <i class="fas fa-dollar-sign"></i>
                <span>Desde $us 69,900</span>
              </div>
              <div class="hero-feature">
                <i class="fas fa-chart-line"></i>
                <span>Plusvalía 40-50% en 5 años</span>
              </div>
            </div>
            <div class="hero-cta">
              <a href="#contacto" class="btn btn-primary btn-lg">
                <i class="fas fa-calendar-check"></i> Agenda tu Visita
              </a>
              <a href="#calculadora" class="btn btn-secondary btn-lg">
                <i class="fas fa-calculator"></i> Calcula tu Cuota
              </a>
            </div>
          </div>
        </div>
        <div class="hero-scroll">
          <a href="#beneficios">
            <i class="fas fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" class="benefits-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">¿Por qué elegir The Bond?</span>
            <h2 class="section-title">Beneficios que Marcan la Diferencia</h2>
            <p class="section-subtitle">Inversión inteligente en el corazón de la zona más próspera de Santa Cruz</p>
          </div>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <h3>Precio Competitivo</h3>
              <p class="benefit-highlight">45% más económico</p>
              <p>que el promedio de la zona norte ($us 1,510/m²)</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-location-arrow"></i>
              </div>
              <h3>Ubicación Estratégica</h3>
              <p class="benefit-highlight">Av. Banzer</p>
              <p>Cerca de 3 universidades importantes y en zona de alto desarrollo</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Alta Plusvalía</h3>
              <p class="benefit-highlight">40-50% en 5 años</p>
              <p>Zona con 43% de licencias de construcción en Santa Cruz</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-credit-card"></i>
              </div>
              <h3>Financiamiento Flexible</h3>
              <p class="benefit-highlight">Crédito social disponible</p>
              <p>Financiamiento propio a 1 año + opciones bancarias</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-university"></i>
              </div>
              <h3>Demanda Garantizada</h3>
              <p class="benefit-highlight">3 universidades cercanas</p>
              <p>UCEBOL, UNIVALLE, UDI a menos de 3km</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-coins"></i>
              </div>
              <h3>Rentabilidad Comprobada</h3>
              <p class="benefit-highlight">ROI 6-7% anual</p>
              <p>Alquiler desde $us 350-450/mes para 1 dormitorio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section id="departamentos" class="property-types-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">Nuestros Departamentos</span>
            <h2 class="section-title">Encuentra tu Espacio Ideal</h2>
            <p class="section-subtitle">Espacios amplios y funcionales desde 85m²</p>
          </div>
          <div class="property-types-grid">
            <div class="property-card">
              <div class="property-badge">Preventa</div>
              <div class="property-image">
                <i class="fas fa-home"></i>
              </div>
              <div class="property-info">
                <h3>1 Dormitorio</h3>
                <div class="property-specs">
                  <span><i class="fas fa-bed"></i> 1 Dormitorio</span>
                  <span><i class="fas fa-bath"></i> 1 Baño</span>
                  <span><i class="fas fa-ruler-combined"></i> Desde 85m²</span>
                </div>
                <div class="property-price">
                  <span class="price-label">Desde</span>
                  <span class="price-amount">$us 69,900</span>
                  <span class="price-detail">$us 822/m²</span>
                </div>
                <div class="property-features">
                  <p><i class="fas fa-check"></i> Ideal para profesionales jóvenes</p>
                  <p><i class="fas fa-check"></i> Perfect para inversión y renta</p>
                  <p><i class="fas fa-check"></i> ROI 6-7% anual garantizado</p>
                </div>
                <a href="#contacto" class="btn btn-primary btn-block">Más Información</a>
              </div>
            </div>
            <div class="property-card featured">
              <div class="property-badge featured-badge">Más Popular</div>
              <div class="property-image">
                <i class="fas fa-home"></i>
              </div>
              <div class="property-info">
                <h3>2 Dormitorios</h3>
                <div class="property-specs">
                  <span><i class="fas fa-bed"></i> 2 Dormitorios</span>
                  <span><i class="fas fa-bath"></i> 2 Baños</span>
                  <span><i class="fas fa-ruler-combined"></i> Desde 105m²</span>
                </div>
                <div class="property-price">
                  <span class="price-label">Desde</span>
                  <span class="price-amount">$us 89,900</span>
                  <span class="price-detail">$us 856/m²</span>
                </div>
                <div class="property-features">
                  <p><i class="fas fa-check"></i> Perfect para parejas y familias</p>
                  <p><i class="fas fa-check"></i> Espacios funcionales optimizados</p>
                  <p><i class="fas fa-check"></i> Alta demanda de alquiler</p>
                </div>
                <a href="#contacto" class="btn btn-primary btn-block">Reserva Ahora</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" class="calculator-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">Planifica tu Inversión</span>
            <h2 class="section-title">Calculadora de Financiamiento</h2>
            <p class="section-subtitle">Descubre cuánto pagarías mensualmente</p>
          </div>
          <div class="calculator-container">
            <div class="calculator-card">
              <div class="calculator-form">
                <div class="form-group">
                  <label>Precio del Departamento</label>
                  <select id="propertyPrice" class="form-control">
                    <option value="69900">1 Dormitorio - $us 69,900</option>
                    <option value="89900">2 Dormitorios - $us 89,900</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Enganche (20-30%)</label>
                  <input type="range" id="downPayment" class="form-range" min="20" max="30" value="20" step="1" />
                  <div class="range-labels">
                    <span id="downPaymentValue">20%</span>
                    <span id="downPaymentAmount">$us 13,980</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Plazo (años)</label>
                  <select id="term" class="form-control">
                    <option value="10">10 años</option>
                    <option value="15">15 años</option>
                    <option value="20" selected>20 años</option>
                    <option value="25">25 años</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tasa de Interés Anual (%)</label>
                  <input type="number" id="interestRate" class="form-control" value="6" min="4" max="10" step="0.5" />
                </div>
                <button onclick="calculatePayment()" class="btn btn-primary btn-block btn-lg">
                  <i class="fas fa-calculator"></i> Calcular Cuota
                </button>
              </div>
              <div id="calculatorResult" class="calculator-result" style="display: none;">
                <h3>Tu Cuota Mensual</h3>
                <div class="result-amount" id="monthlyPayment">$us 0</div>
                <div class="result-details">
                  <div class="result-item">
                    <span>Monto a Financiar</span>
                    <strong id="loanAmount">$us 0</strong>
                  </div>
                  <div class="result-item">
                    <span>Total a Pagar</span>
                    <strong id="totalPayment">$us 0</strong>
                  </div>
                  <div class="result-item">
                    <span>Intereses Totales</span>
                    <strong id="totalInterest">$us 0</strong>
                  </div>
                </div>
                <div class="result-info">
                  <p><i class="fas fa-info-circle"></i> Ingreso mínimo requerido: <strong id="minIncome">$us 0</strong>/mes</p>
                  <p><i class="fas fa-lightbulb"></i> Considera que la cuota no debe superar el 30% de tus ingresos</p>
                </div>
                <a href="#contacto" class="btn btn-secondary btn-block">Solicitar Pre-aprobación</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" class="location-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">Ubicación Privilegiada</span>
            <h2 class="section-title">En el Corazón de la Zona Norte</h2>
            <p class="section-subtitle">Av. Banzer entre 5º y 6º Anillo - Zona de mayor crecimiento</p>
          </div>
          <div class="location-content">
            <div class="location-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.097623547076!2d-63.13965892499478!3d-17.759499483155645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7000181b1bb%3A0xbf1164ed9480f382!2sThe%20Bond%20Departamentos!5e0!3m2!1ses!2sbo!4v1729857634123!5m2!1ses!2sbo" 
                width="100%" 
                height="450" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div class="location-features">
              <h3>¿Qué hay cerca?</h3>
              <div class="location-category">
                <h4><i class="fas fa-university"></i> Universidades</h4>
                <ul>
                  <li><i class="fas fa-check-circle"></i> UCEBOL - 2.5km</li>
                  <li><i class="fas fa-check-circle"></i> UNIVALLE - 3km</li>
                  <li><i class="fas fa-check-circle"></i> UDI - 2km</li>
                </ul>
              </div>
              <div class="location-category">
                <h4><i class="fas fa-shopping-cart"></i> Comercios y Servicios</h4>
                <ul>
                  <li><i class="fas fa-check-circle"></i> Supermercados - 1-2km</li>
                  <li><i class="fas fa-check-circle"></i> Bancos y servicios - Zona</li>
                  <li><i class="fas fa-check-circle"></i> Restaurantes y cafeterías</li>
                </ul>
              </div>
              <div class="location-category">
                <h4><i class="fas fa-road"></i> Conectividad</h4>
                <ul>
                  <li><i class="fas fa-check-circle"></i> Centro: 20-25 minutos</li>
                  <li><i class="fas fa-check-circle"></i> Acceso directo Av. Banzer</li>
                  <li><i class="fas fa-check-circle"></i> Rutas principales cercanas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Services Section */}
      <section id="servicios" class="services-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Vive donde siempre quisiste vivir</h2>
            <p class="section-subtitle">Todo lo que necesitas a pocos minutos de distancia</p>
          </div>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-utensils"></i>
              </div>
              <h3>Restaurantes</h3>
              <p>Variedad gastronómica a tu alcance</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <h3>Supermercados</h3>
              <p>Compras diarias sin complicaciones</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-bread-slice"></i>
              </div>
              <h3>Panaderías</h3>
              <p>Pan fresco todas las mañanas</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-hospital"></i>
              </div>
              <h3>Hospitales</h3>
              <p>Atención médica de calidad cerca</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-dumbbell"></i>
              </div>
              <h3>Gimnasios</h3>
              <p>Mantén tu estilo de vida activo</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-tree"></i>
              </div>
              <h3>Parques</h3>
              <p>Espacios verdes para relajarte</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-pills"></i>
              </div>
              <h3>Farmacias</h3>
              <p>Salud y bienestar siempre disponible</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <h3>Escuelas</h3>
              <p>Educación de calidad para tus hijos</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-paw"></i>
              </div>
              <h3>Veterinarias</h3>
              <p>Cuidado profesional para tus mascotas</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <h3>Cajeros</h3>
              <p>Acceso fácil a servicios bancarios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="inversion" class="investment-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">Oportunidad de Inversión</span>
            <h2 class="section-title">Rentabilidad Comprobada</h2>
            <p class="section-subtitle">Protege tu patrimonio y genera ingresos pasivos</p>
          </div>
          <div class="investment-grid">
            <div class="investment-card">
              <div class="investment-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>Plusvalía Proyectada</h3>
              <div class="investment-value">40-50%</div>
              <p>Apreciación estimada en 5 años</p>
              <div class="investment-comparison">
                <div class="comparison-item">
                  <span>Hoy</span>
                  <strong>$us 69,900</strong>
                </div>
                <i class="fas fa-arrow-right"></i>
                <div class="comparison-item">
                  <span>2030</span>
                  <strong>$us 100,000+</strong>
                </div>
              </div>
            </div>
            <div class="investment-card">
              <div class="investment-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <h3>Ingresos por Alquiler</h3>
              <div class="investment-value">6-7%</div>
              <p>ROI anual en alquileres</p>
              <div class="rental-details">
                <div class="rental-item">
                  <span>1 Dormitorio</span>
                  <strong>$us 350-450/mes</strong>
                </div>
                <div class="rental-item">
                  <span>2 Dormitorios</span>
                  <strong>$us 450-550/mes</strong>
                </div>
              </div>
            </div>
            <div class="investment-card">
              <div class="investment-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Protección Patrimonial</h3>
              <div class="investment-value">100%</div>
              <p>Activo en dólares resistente a devaluación</p>
              <ul class="investment-benefits">
                <li><i class="fas fa-check"></i> Inversión en ladrillo</li>
                <li><i class="fas fa-check"></i> Demanda garantizada</li>
                <li><i class="fas fa-check"></i> Zona en crecimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments Section */}
      <section id="perfiles" class="segments-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">¿A quién está dirigido?</span>
            <h2 class="section-title">Ideal para Ti</h2>
            <p class="section-subtitle">The Bond se adapta a diferentes perfiles y necesidades</p>
          </div>
          <div class="segments-grid">
            <div class="segment-card">
              <div class="segment-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <h3>Profesionales Jóvenes</h3>
              <p class="segment-age">25-35 años</p>
              <p>Tu primera inversión inmobiliaria en la zona más prometedora. Genera renta mientras trabajas.</p>
              <div class="segment-features">
                <span class="segment-tag">Primera vivienda</span>
                <span class="segment-tag">Inversión-renta</span>
                <span class="segment-tag">ROI 6-7%</span>
              </div>
              <p class="segment-price">Desde $us 69,900</p>
            </div>
            <div class="segment-card featured">
              <div class="segment-badge">Más Popular</div>
              <div class="segment-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Parejas y Familias</h3>
              <p class="segment-age">28-38 años</p>
              <p>El hogar que tu familia merece. Espacios funcionales, zona segura, cerca de colegios y servicios.</p>
              <div class="segment-features">
                <span class="segment-tag">2 Dormitorios</span>
                <span class="segment-tag">Zona familiar</span>
                <span class="segment-tag">Crédito social</span>
              </div>
              <p class="segment-price">Desde $us 89,900</p>
            </div>
            <div class="segment-card">
              <div class="segment-icon">
                <i class="fas fa-briefcase"></i>
              </div>
              <h3>Inversores</h3>
              <p class="segment-age">35-55 años</p>
              <p>Diversifica tu patrimonio con activos reales. Alta plusvalía proyectada y demanda garantizada.</p>
              <div class="segment-features">
                <span class="segment-tag">Múltiples unidades</span>
                <span class="segment-tag">Plusvalía 40-50%</span>
                <span class="segment-tag">Descuentos</span>
              </div>
              <p class="segment-price">Paquetes desde 2 unidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" class="contact-section">
        <div class="container">
          <div class="section-header">
            <span class="section-label">Agenda tu Visita</span>
            <h2 class="section-title">Hablemos de tu Futuro</h2>
            <p class="section-subtitle">Nuestro equipo está listo para asesorarte</p>
          </div>
          <div class="contact-container">
            <div class="contact-info">
              <h3>Información de Contacto</h3>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Ubicación</h4>
                  <p>Av. Banzer entre 5º y 6º Anillo<br/>Zona Norte, Santa Cruz de la Sierra</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                  <h4>Teléfono / WhatsApp</h4>
                  <p><a href="tel:+59176154045">+591 76154045</a></p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:ventas@edificiothebond.es">ventas@edificiothebond.es</a></p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                  <h4>Horario de Atención</h4>
                  <p>Lunes a Viernes: 9:00 - 18:00<br/>Sábados: 9:00 - 13:00</p>
                </div>
              </div>
              <div class="contact-social">
                <h4>Síguenos</h4>
                <div class="social-links">
                  <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                  <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                  <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
                  <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
            <div class="contact-form-container">
              <form id="contactForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>Nombre Completo *</label>
                    <input type="text" name="name" class="form-control" required />
                  </div>
                  <div class="form-group">
                    <label>Teléfono *</label>
                    <input type="tel" name="phone" class="form-control" required />
                  </div>
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Perfil *</label>
                  <select name="segment" class="form-control" required>
                    <option value="">Selecciona tu perfil</option>
                    <option value="professional">Profesional Joven (Primera vivienda)</option>
                    <option value="couple">Pareja/Familia (Hogar familiar)</option>
                    <option value="investor">Inversor (Múltiples unidades)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Departamento de Interés *</label>
                  <select name="property" class="form-control" required>
                    <option value="">Selecciona</option>
                    <option value="1bed">1 Dormitorio - $us 69,900</option>
                    <option value="2bed">2 Dormitorios - $us 89,900</option>
                    <option value="multiple">Múltiples unidades</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Mensaje</label>
                  <textarea name="message" class="form-control" rows="4"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">
                  <i class="fas fa-paper-plane"></i> Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>¿Listo para Invertir en tu Futuro?</h2>
            <p>Preventa exclusiva con descuentos especiales. ¡No pierdas esta oportunidad!</p>
            <div class="cta-buttons">
              <a href="#contacto" class="btn btn-primary btn-lg">
                <i class="fas fa-calendar-check"></i> Agenda tu Visita
              </a>
              <a href="https://wa.me/59176154045" target="_blank" class="btn btn-whatsapp btn-lg">
                <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
              </a>
            </div>
            <div class="cta-features">
              <div class="cta-feature">
                <i class="fas fa-tag"></i>
                <span>Descuento por pronto pago</span>
              </div>
              <div class="cta-feature">
                <i class="fas fa-gift"></i>
                <span>Bonos en preventa</span>
              </div>
              <div class="cta-feature">
                <i class="fas fa-handshake"></i>
                <span>Financiamiento flexible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-col">
              <h3>The Bond Departamentos</h3>
              <p>Tu inversión inteligente en la zona de mayor crecimiento de Santa Cruz de la Sierra.</p>
              <div class="footer-social">
                <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
                <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><a href="#beneficios">Beneficios</a></li>
                <li><a href="#departamentos">Departamentos</a></li>
                <li><a href="#calculadora">Calculadora</a></li>
                <li><a href="#ubicacion">Ubicación</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Contacto</h4>
              <ul>
                <li><i class="fas fa-phone"></i> +591 76154045</li>
                <li><i class="fas fa-envelope"></i> ventas@edificiothebond.es</li>
                <li><i class="fas fa-map-marker-alt"></i> Av. Banzer, 5º-6º Anillo</li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Horarios</h4>
              <ul>
                <li>Lunes a Viernes</li>
                <li>9:00 AM - 6:00 PM</li>
                <li>Sábados</li>
                <li>9:00 AM - 1:00 PM</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 The Bond Departamentos. Todos los derechos reservados.</p>
            <p>Desarrollado con ❤️ en Santa Cruz de la Sierra</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/59176154045" target="_blank" class="whatsapp-float">
        <i class="fab fa-whatsapp"></i>
      </a>

      {/* JavaScript */}
      <script src="/static/app.js"></script>
    </main>
  )
})

// API endpoint for contact form
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    
    // Here you would typically:
    // 1. Validate the data
    // 2. Store in database (D1)
    // 3. Send email notification
    // 4. Integrate with CRM
    
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

export default app
