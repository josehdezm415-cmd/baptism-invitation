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

function SacredCrossIcon({ className = '' }) {
  return (
    <span className={`sacred-cross ${className}`} aria-hidden="true">
      <svg viewBox="0 0 180 180" role="img" focusable="false">
        <defs>
          <linearGradient id="crossGold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff5cb" />
            <stop offset="46%" stopColor="#d8ad55" />
            <stop offset="100%" stopColor="#9b681e" />
          </linearGradient>
          <linearGradient id="doveGold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8e7ad" />
            <stop offset="100%" stopColor="#b98732" />
          </linearGradient>
        </defs>
        <path className="cross-line cross-vertical" d="M78 20 C80 54 80 126 78 160" />
        <path className="cross-line cross-horizontal" d="M42 62 C64 60 98 60 126 62" />
        <path className="dove-body" d="M92 76 C101 68 113 74 116 88 C119 103 132 111 150 111 C136 123 114 122 103 109 C95 101 87 86 92 76 Z" />
        <path className="dove-wing" d="M112 83 C126 69 137 56 144 45 C149 58 143 71 130 82 C141 78 151 72 158 64 C158 78 145 91 126 99" />
        <path className="dove-feather" d="M119 103 C132 100 146 94 158 86 C155 102 139 114 116 116" />
        <path className="dove-tail" d="M94 111 C78 114 58 122 43 137" />
        <path className="dove-tail soft" d="M98 119 C78 124 59 132 45 147" />
        <circle className="dove-eye" cx="101" cy="79" r="1.8" />
      </svg>
    </span>
  );
}

const petals = [
  { x: 4, size: 11, duration: 30, delay: -4, drift: 54, opacity: 0.38, rotate: 26, color: 'white' },
  { x: 9, size: 7, duration: 38, delay: -20, drift: -34, opacity: 0.24, rotate: -18, color: 'cream' },
  { x: 14, size: 10, duration: 34, delay: -10, drift: 42, opacity: 0.32, rotate: 52, color: 'blush' },
  { x: 20, size: 6, duration: 42, delay: -28, drift: -48, opacity: 0.22, rotate: 12, color: 'gold' },
  { x: 26, size: 13, duration: 36, delay: -16, drift: 62, opacity: 0.3, rotate: -42, color: 'cream' },
  { x: 31, size: 8, duration: 32, delay: -2, drift: -28, opacity: 0.26, rotate: 36, color: 'white' },
  { x: 37, size: 10, duration: 45, delay: -31, drift: 38, opacity: 0.23, rotate: -30, color: 'blush' },
  { x: 43, size: 7, duration: 29, delay: -8, drift: -56, opacity: 0.28, rotate: 66, color: 'gold' },
  { x: 49, size: 12, duration: 40, delay: -24, drift: 44, opacity: 0.34, rotate: -12, color: 'white' },
  { x: 55, size: 9, duration: 35, delay: -13, drift: -40, opacity: 0.28, rotate: 44, color: 'cream' },
  { x: 61, size: 6, duration: 46, delay: -35, drift: 58, opacity: 0.2, rotate: -56, color: 'blush' },
  { x: 68, size: 11, duration: 31, delay: -5, drift: -36, opacity: 0.31, rotate: 18, color: 'white' },
  { x: 73, size: 8, duration: 39, delay: -19, drift: 46, opacity: 0.24, rotate: -22, color: 'gold' },
  { x: 79, size: 10, duration: 43, delay: -27, drift: -60, opacity: 0.27, rotate: 58, color: 'cream' },
  { x: 84, size: 7, duration: 33, delay: -12, drift: 32, opacity: 0.25, rotate: -34, color: 'blush' },
  { x: 90, size: 12, duration: 37, delay: -22, drift: -42, opacity: 0.29, rotate: 40, color: 'white' },
  { x: 96, size: 8, duration: 44, delay: -30, drift: 34, opacity: 0.22, rotate: -64, color: 'gold' },
  { x: 2, size: 6, duration: 41, delay: -26, drift: 64, opacity: 0.19, rotate: 72, color: 'cream' },
  { x: 18, size: 8, duration: 48, delay: -37, drift: -52, opacity: 0.18, rotate: -72, color: 'white' },
  { x: 34, size: 7, duration: 50, delay: -41, drift: 48, opacity: 0.17, rotate: 24, color: 'blush' },
  { x: 52, size: 9, duration: 47, delay: -33, drift: -44, opacity: 0.2, rotate: -28, color: 'cream' },
  { x: 70, size: 6, duration: 52, delay: -45, drift: 40, opacity: 0.17, rotate: 60, color: 'gold' }
];

function PetalLayer() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          key={`${petal.color}-${index}`}
          className={`petal petal-${petal.color}`}
          style={{
            '--petal-x': `${petal.x}vw`,
            '--petal-size': `${petal.size}px`,
            '--petal-duration': `${petal.duration}s`,
            '--petal-delay': `${petal.delay}s`,
            '--petal-drift': `${petal.drift}px`,
            '--petal-drift-soft': `${Math.round(petal.drift * 0.45)}px`,
            '--petal-drift-reverse': `${Math.round(petal.drift * -0.22)}px`,
            '--petal-opacity': petal.opacity,
            '--petal-rotate': `${petal.rotate}deg`
          }}
        />
      ))}
    </div>
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
          <SacredCrossIcon className="hero-cross" />
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
      <SacredCrossIcon className="blessing-cross" />
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
  },
  {
    label: 'Foto 5',
    title: 'Dulces sueños',
    caption: 'Dormidito, recordándonos que los momentos más pequeños también son bendiciones.',
    src: './photos/denzel-car-seat-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 6',
    title: 'Primer abrazo',
    caption: 'Un abrazo lleno de ternura y amor desde el primer día.',
    src: './photos/denzel-first-hug-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 7',
    title: 'Con su primo',
    caption: 'Un recuerdo dulce con su primo, lleno de cariño y sonrisas compartidas.',
    src: './photos/denzel-family-kitchen-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 8',
    title: 'Cómplices en amarillo',
    caption: 'Un lazo especial que crece con cada abrazo y cada mirada.',
    src: './photos/denzel-brazil-brother-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 9',
    title: 'Agüita y bendición',
    caption: 'Que cada gotita recuerde la pureza y la alegría de este camino.',
    src: './photos/denzel-bath-blessing-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 10',
    title: 'Besitos de tío',
    caption: 'El cariño de un tío también se guarda en esos besitos llenos de ternura.',
    src: './photos/denzel-dad-kiss-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 11',
    title: 'Con tía',
    caption: 'Un recuerdo dulce junto a su tía, cerquita del corazón.',
    src: './photos/denzel-mom-selfie-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 12',
    title: 'Con su prima',
    caption: 'Un momento dulce con su prima, lleno de sonrisas y ternura.',
    src: './photos/denzel-cousin-yellow-selfie-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 13',
    title: 'Pequeño explorador',
    caption: 'Con esa mirada tierna, llenas de luz cada día.',
    src: './photos/denzel-blue-cap-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 14',
    title: 'Cuidado de tío',
    caption: 'En brazos de su tío, cada momento se vuelve seguro y especial.',
    src: './photos/denzel-dad-bottle-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 15',
    title: 'Bienvenido, amor',
    caption: 'Desde tus primeros minutos, llegaste rodeado de amor y bendiciones.',
    src: './photos/denzel-hospital-dad-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 16',
    title: 'Celebrando con abuela',
    caption: 'Un momento lleno de cariño con abuela, de esos que se guardan para siempre.',
    src: './photos/denzel-grandma-celebration-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 17',
    title: 'Con papá frente al mar',
    caption: 'Un recuerdo lleno de calma, amor y la alegría de estar en brazos de papá.',
    src: './photos/denzel-papa-ocean-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 18',
    title: 'Con su primita',
    caption: 'Un recuerdo tierno con su primita, cuidándolo con una sonrisa llena de amor.',
    src: './photos/denzel-primita-newborn-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 19',
    title: 'Pequeñito recién llegado',
    caption: 'Un instante lleno de paz, ternura y la bendición de una nueva vida.',
    src: './photos/denzel-newborn-hospital-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 20',
    title: 'Primer abrazo de mamá',
    caption: 'El primer instante de amor, piel con piel, guardado para siempre.',
    src: './photos/denzel-mama-first-moment-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 21',
    title: 'Luces y sonrisas',
    caption: 'Un recuerdo brillante, lleno de alegría y ternura en familia.',
    src: './photos/denzel-mama-lights-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 22',
    title: 'Cerquita del corazón',
    caption: 'Un momento sencillo y dulce, de esos que dicen amor sin palabras.',
    src: './photos/denzel-mama-mirror-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 23',
    title: 'Con su tío',
    caption: 'Un abrazo tranquilo y lleno de cariño desde sus primeros días.',
    src: './photos/denzel-other-uncle-newborn-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 24',
    title: 'Con mamá y papá',
    caption: 'Aunque ese día estaba serio, el amor de mamá y papá lo rodeaba por completo.',
    src: './photos/denzel-parents-grumpy-birthday-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 25',
    title: 'En brazos de mamá',
    caption: 'Un recuerdo de los primeros días, lleno de ternura y paz.',
    src: './photos/denzel-mama-hospital-arms-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 26',
    title: 'Noche en familia',
    caption: 'Una noche especial, rodeado de cariño y luces bonitas.',
    src: './photos/denzel-night-family-city-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 27',
    title: 'Dulce compañía',
    caption: 'Un momento tranquilo que se queda guardado en el corazón.',
    src: './photos/denzel-mama-mirror-baby-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 28',
    title: 'Bajo su bendición',
    caption: 'Que la Virgen lo acompañe siempre con amor y protección.',
    src: './photos/denzel-guadalupe-mama-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 29',
    title: 'Con sus primos',
    caption: 'Alegrías de familia que hacen más bonito cada recuerdo.',
    src: './photos/denzel-pool-cousins-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 30',
    title: 'Familia y fe',
    caption: 'Un recuerdo especial junto a quienes lo acompañan con amor.',
    src: './photos/denzel-church-family-grandma-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 31',
    title: 'Cariño de prima',
    caption: 'Un momento tierno con su prima, lleno de cuidado y cariño.',
    src: './photos/denzel-cousin-kiss-newborn-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 32',
    title: 'Con abuela en la iglesia',
    caption: 'Un abrazo de abuela frente al altar, lleno de fe y cariño.',
    src: './photos/denzel-grandma-church-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 33',
    title: 'Miradas de cariño',
    caption: 'De esos momentos sencillos donde el amor se nota en la mirada.',
    src: './photos/denzel-loving-arms-restaurant-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 34',
    title: 'Tarde de descanso',
    caption: 'Un ratito tranquilo, disfrutando la calma y la compañía.',
    src: './photos/denzel-hammock-uncle-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 35',
    title: 'Risas en el trabajo',
    caption: 'Una sonrisa que convierte cualquier lugar en un recuerdo feliz.',
    src: './photos/denzel-pink-shirt-shoulders-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 36',
    title: 'Siesta en casa',
    caption: 'Un descanso dulce, acompañado de paz y mucho amor.',
    src: './photos/denzel-home-nap-cat-fill.jpg',
    position: 'center center'
  },
  {
    label: 'Foto 37',
    title: 'Navidad en familia',
    caption: 'Un abrazo navideño lleno de amor, calor de hogar y alegría.',
    src: './photos/denzel-christmas-parents-fill.jpg',
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
          <div className="photo-viewport">
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

          <div className="slide-controls" aria-label="Controles de fotos">
            <button className="slide-button prev" type="button" aria-label="Foto anterior" onClick={() => goTo(current - 1)}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button className="slide-button next" type="button" aria-label="Siguiente foto" onClick={() => goTo(current + 1)}>
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="slide-copy">
          <p className="eyebrow">Galería</p>
          <h3>{activeSlide.title}</h3>
          <p>{activeSlide.caption}</p>
          <p className="slide-hint">Puedes usar las flechas o puntos para ver más fotos.</p>
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
    <>
      <PetalLayer />
      <main>
        <Hero />
        <Details />
        <PhotoSlideshow />
        <Blessing />
        <Locations />
        <RSVP />
        <footer>Bautizo de {invitation.babyName} · {invitation.year}</footer>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
