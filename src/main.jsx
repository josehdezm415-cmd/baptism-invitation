import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, ChevronLeft, ChevronRight, Gift, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import './styles.css';

const invitation = {
  babyName: 'Denzel Boel Ayala',
  dayName: 'Sábado',
  date: '25 de julio, 2026',
  time: '3:00 p.m.',
  parents: 'Kathy Lazo y Victor Ayala',
  year: '2026',
  eventStartIso: '2026-07-25T15:00:00-06:00',
  eventEndIso: '2026-07-25T18:00:00-06:00',
  rsvpDeadline: 'cuando puedas',
  rsvpName: 'RSVP',
  rsvpPhoneDisplay: '7956 7733',
  rsvpPhoneWa: '50379567733',
  reception: {
    name: 'Ciudad Dorada Casa Club',
    address: 'Ciudad Dorada, San Salvador',
    mapUrl: 'https://maps.app.goo.gl/4TtBxDXb8QvcPNL78?g_st=ic',
    wazeUrl: 'https://waze.com/ul/hd42teqh0y'
  },
  dressCode: 'Semi formal',
  giftNote: 'Si deseas tener un detalle con Denzel, agradecemos regalo de sobre.'
};

const siteUrl = 'https://josehdezm415-cmd.github.io/baptism-invitation/';

function formatGoogleDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function getCountdownParts(targetIso) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days, hours, minutes };
}

const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Bautizo de ${invitation.babyName}`)}&dates=${formatGoogleDate(invitation.eventStartIso)}/${formatGoogleDate(invitation.eventEndIso)}&details=${encodeURIComponent(`Acompáñanos a celebrar el bautizo de ${invitation.babyName}. RSVP: ${invitation.rsvpPhoneDisplay}. ${siteUrl}`)}&location=${encodeURIComponent(`${invitation.reception.name}, ${invitation.reception.address}`)}`;

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { threshold: [0.25, 0.5, 0.75] });

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Button({ href, children, variant = 'primary', icon: Icon, ...props }) {
  return (
    <a className={`button ${variant}`} href={href} {...props}>
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
    </a>
  );
}

function Nav() {
  const navItems = useMemo(() => [
    { id: 'detalles', label: 'Detalles' },
    { id: 'fotos', label: 'Fotos' },
    { id: 'ubicaciones', label: 'Ubicaciones' },
    { id: 'rsvp', label: 'RSVP' }
  ], []);
  const active = useActiveSection(navItems.map(item => item.id));

  return (
    <nav className="topbar" aria-label="Navegación">
      {navItems.map(item => (
        <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getCountdownParts(invitation.eventStartIso));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getCountdownParts(invitation.eventStartIso));
    }, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Cuenta regresiva">
      <p>Faltan</p>
      <div>
        <strong>{timeLeft.days}</strong><span>días</span>
        <strong>{timeLeft.hours}</strong><span>horas</span>
        <strong>{timeLeft.minutes}</strong><span>min</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Invitación principal">
      <div className="halo halo-one" />
      <div className="halo halo-two" />
      <Nav />

      <div className="hero-showcase">
        <div className="hero-photo" aria-hidden="true">
          <img src="./photos/baby-smile-fill.jpg" alt="" />
        </div>

        <div className="hero-card">
          <Sparkles className="card-star top-star" size={19} aria-hidden="true" />
          <span className="ornate-cross hero-cross" aria-hidden="true" />
          <p className="eyebrow">Con amor y gratitud</p>
          <h1>Bautizo de<br /><span>{invitation.babyName}</span></h1>
          <p className="intro">Nos encantaría que nos acompañes a celebrar este momento especial en la vida de nuestra familia.</p>

          <div className="date-block" aria-label="Fecha del evento">
            <span className="day">{invitation.dayName}</span>
            <strong>{invitation.date}</strong>
            <span className="time">{invitation.time}</span>
          </div>

          <Countdown />

          <div className="hero-actions">
            <Button href="#rsvp" icon={MessageCircle}>Confirmar asistencia</Button>
            <Button href="#ubicaciones" variant="ghost" icon={MapPin}>Ver ubicación</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details() {
  const cards = [
    {
      icon: CalendarDays,
      label: 'Celebración',
      title: invitation.reception.name,
      body: invitation.reception.address,
      small: `${invitation.dayName}, ${invitation.date} · ${invitation.time}`
    },
    {
      icon: Sparkles,
      label: 'Vestimenta',
      title: invitation.dressCode,
      body: 'Te sugerimos tonos claros o neutros para acompañar el estilo de la celebración.',
      small: 'Gracias por acompañarnos'
    },
    {
      icon: Gift,
      label: 'Regalo',
      title: 'Sobre',
      body: invitation.giftNote,
      small: 'Tu presencia es lo más importante'
    }
  ];

  return (
    <section id="detalles" className="section details">
      <div className="section-heading">
        <p className="eyebrow">Detalles</p>
        <h2>Un día para compartir en familia</h2>
      </div>

      <div className="detail-grid">
        {cards.map(({ icon: Icon, label, title, body, small }) => (
          <article key={label}>
            <div className="icon-mark"><Icon size={20} aria-hidden="true" /></div>
            <span className="label">{label}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <p className="small">{small}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Blessing() {
  return (
    <section className="blessing" aria-label="Bendición">
      <span className="ornate-cross blessing-cross" aria-hidden="true" />
      <p className="quote">“Que Dios bendiga siempre su camino y llene su vida de amor, fe y alegría.”</p>
      <p className="signature">Con cariño,<br />{invitation.parents}</p>
    </section>
  );
}

const photoSlides = [
  {
    label: 'Foto 1',
    title: 'Dulce sonrisa',
    caption: 'Un momento lleno de ternura y alegría.',
    src: './photos/baby-smile-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 2',
    title: 'Nuestro pequeño amor',
    caption: 'Una sonrisa que ilumina a toda la familia.',
    src: './photos/baby-chair-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 3',
    title: 'En familia',
    caption: 'Recuerdos especiales compartidos con mucho cariño.',
    src: './photos/family-christmas-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 4',
    title: 'Desde el inicio',
    caption: 'Bendecido desde sus primeros días.',
    src: './photos/newborn-blanket-fill.jpg',
    position: 'center center'
  }
];

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setCurrent(index => (index + 1) % photoSlides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (index) => setCurrent((index + photoSlides.length) % photoSlides.length);
  const activeSlide = photoSlides[current];

  return (
    <section id="fotos" className="section photos">
      <div className="section-heading centered">
        <p className="eyebrow">Momentos especiales</p>
        <h2>Un pequeño recuerdo para compartir</h2>
      </div>

      <div
        className="slideshow-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="slide-stage" aria-live="polite">
          {photoSlides.map((slide, index) => (
            <article
              key={slide.label}
              className={`photo-slide ${index === current ? 'active' : ''}`}
              aria-hidden={index !== current}
            >
              <img src={slide.src} alt={`${slide.title} — ${slide.caption}`} style={{ objectPosition: slide.position }} />
            </article>
          ))}
        </div>

        <div className="slide-copy">
          <p className="eyebrow">Galería</p>
          <h3>{activeSlide.title}</h3>
          <p>{activeSlide.caption}</p>
          <p className="small">Usa las flechas o los puntos para ver más fotos.</p>
        </div>

        <div className="slide-controls" aria-label="Controles de fotos">
          <button className="slide-button prev" type="button" aria-label="Foto anterior" onClick={() => goTo(current - 1)}>
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button className="slide-button next" type="button" aria-label="Siguiente foto" onClick={() => goTo(current + 1)}>
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="slide-dots" aria-label="Seleccionar foto">
        {photoSlides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={index === current ? 'active' : ''}
            aria-label={`Ver ${slide.label}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="ubicaciones" className="section locations">
      <div className="section-heading">
        <p className="eyebrow">Ubicaciones</p>
        <h2>Cómo llegar</h2>
      </div>

      <div className="location-grid">
        <article className="location-card">
          <MapPin size={22} aria-hidden="true" />
          <h3>{invitation.reception.name}</h3>
          <p>{invitation.reception.address}</p>
          <div className="map-links">
            <a className="text-link google-maps-link" href={invitation.reception.mapUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>
            <a className="text-link waze-link" href={invitation.reception.wazeUrl} target="_blank" rel="noopener noreferrer">Abrir en Waze</a>
          </div>
        </article>
      </div>
    </section>
  );
}

function RSVP() {
  const makeWhatsappUrl = (message) => `https://wa.me/${invitation.rsvpPhoneWa}?text=${encodeURIComponent(message)}`;
  const rsvpOptions = [
    {
      label: 'Confirmar asistencia por WhatsApp',
      message: `Hola, sí asistiré al bautizo de ${invitation.babyName}.`
    },
    {
      label: 'Confirmo que no podré asistir por WhatsApp',
      message: `Hola, gracias por la invitación al bautizo de ${invitation.babyName}. No podré asistir, pero les deseo muchas bendiciones.`
    }
  ];

  return (
    <section id="rsvp" className="section rsvp">
      <div className="rsvp-card">
        <p className="eyebrow">RSVP</p>
        <h2>Confirma tu asistencia</h2>
        <p>Por favor confirma <strong>{invitation.rsvpDeadline}</strong> para poder preparar todo con cariño.</p>
        <div className="quick-rsvp" aria-label="Opciones rápidas de RSVP">
          {rsvpOptions.map(option => (
            <a key={option.label} href={makeWhatsappUrl(option.message)} target="_blank" rel="noopener noreferrer">
              {option.label}
            </a>
          ))}
        </div>
        <div className="rsvp-actions">
          <Button href={`tel:${invitation.rsvpPhoneWa}`} variant="ghost" icon={Phone}>Llamar</Button>
          <Button href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" variant="ghost" icon={CalendarDays}>Guardar fecha</Button>
        </div>
        <p className="small">Contacto: {invitation.rsvpPhoneDisplay}</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <main>
      <Hero />
      <Details />
      <PhotoSlideshow />
      <Blessing />
      <Locations />
      <RSVP />
      <footer>Bautizo de {invitation.babyName} · {invitation.year}</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
