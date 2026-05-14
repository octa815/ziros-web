// ============================================================
//  ZIROS — LA ALKAZABA · ELDA 2026
//  Lógica principal: tiempo, renderizado, modal, navegación
// ============================================================

'use strict';

// ── Estado ────────────────────────────────────────────────
let viewingEntry      = null;
let currentFocusTrigger = null;
let activeNavTab      = 'menus';
let vibeInterval      = null;

// ── Mensajes motivadores por tipo de comida ───────────────
const VIBES = {
  almuerzo:  ['☀️ ¡Buenos días, guerrero!', '🥐 La mañana no espera', '⚡ Carga pilas para el día', '🎺 Que suene la banda'],
  aperitivo: ['🥂 El aperitivo no se rechaza', '🫒 Las aceitunas llaman', '🎉 La fiesta está en la mesa', '💃 Tiempo de tertulia'],
  comida:    ['🍽️ A por todas, que hay mucho menú', '🔥 Aquí se come en serio', '👨‍🍳 El cocinero lo ha dado todo', '🏆 El plato principal te espera', '🎶 Come, que el pasodoble da fuerzas'],
  cena:      ['🌙 La cena es el alma de la fiesta', '🕯️ Noche de Ziros, noche grande', '🥩 El plato fuerte de la jornada', '✨ Los mejores momentos empiezan ahora', '🍷 Brindis pendiente'],
  madrugada: ['🌟 Los valientes quedan en pie', '🦉 Mañana ya descansarás', '🎊 La madrugada es para los elegidos', '🔥 Todavía queda fiesta', '🌙 Elda nunca duerme'],
  default:   ['🎉 Que vivan los Moros y Cristianos', '🏰 Ziros en La Alkazaba', '⚔️ Por la tradición de Elda'],
};

// ── Utilidades de tiempo ──────────────────────────────────

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatCurrentTime(date) {
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  return `${days[date.getDay()]} · ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// Cuenta atrás compacta (sin segundos)
function formatCountdown(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return '¡Ya!';
  const totalSecs = Math.floor(diff / 1000);
  const days  = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins  = Math.floor((totalSecs % 3600) / 60);
  if (days > 0)  return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

// Cuenta atrás detallada con segundos (para Idella)
function formatCountdownFull(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return null; // Ha pasado
  const totalSecs = Math.floor(diff / 1000);
  const days  = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins  = Math.floor((totalSecs % 3600) / 60);
  const secs  = totalSecs % 60;
  return { days, hours, mins, secs };
}

function getProgress(entry) {
  const now   = new Date();
  const total = entry.end - entry.start;
  const elapsed = now - entry.start;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

function getTimeRemaining(entry) {
  const diff = entry.end - new Date();
  if (diff <= 0) return null;
  const totalMins = Math.ceil(diff / 60000);
  const hours = Math.floor(totalMins / 60);
  const mins  = totalMins % 60;
  if (hours > 0) return `${hours}h ${mins}m restantes`;
  return `${mins} min restantes`;
}

// ── Cálculo del estado ────────────────────────────────────

function getCurrentState() {
  const now = new Date();
  for (const entry of TIMELINE) {
    if (now >= entry.start && now < entry.end) {
      return { type: 'active', entry };
    }
  }
  const upcoming = TIMELINE.find(e => e.start > now);
  if (!upcoming) return { type: 'post-event' };
  if (now < TIMELINE[0].start) return { type: 'pre-event', next: upcoming };
  return { type: 'between', next: upcoming };
}

// ── Hora actual ───────────────────────────────────────────

function renderCurrentTime() {
  const el = document.getElementById('current-time');
  if (el) el.textContent = formatCurrentTime(new Date());
}

// ── Renderizado principal ─────────────────────────────────

function renderState() {
  const mealDisplay = document.getElementById('meal-display');
  const dishListEl  = document.getElementById('dish-list');
  if (!mealDisplay || !dishListEl) return;

  dishListEl.innerHTML = '';

  if (viewingEntry) {
    renderMealCard(viewingEntry, 'vista', mealDisplay);
    updateMadrugadaMode(viewingEntry.mealType);
    return;
  }

  const state = getCurrentState();
  switch (state.type) {
    case 'active':
      renderMealCard(state.entry, 'ahora', mealDisplay);
      updateMadrugadaMode(state.entry.mealType);
      break;
    case 'between':
      renderMealCard(state.next, 'proxima', mealDisplay);
      updateMadrugadaMode(null);
      break;
    case 'pre-event':
      renderPreEvent(state.next, mealDisplay);
      updateMadrugadaMode(null);
      break;
    case 'post-event':
      renderPostEvent(mealDisplay);
      updateMadrugadaMode(null);
      break;
  }
}

function updateMadrugadaMode(mealType) {
  document.body.classList.toggle('mode-madrugada', mealType === 'madrugada');
}

// ── Tarjeta de comida ─────────────────────────────────────

function renderMealCard(entry, mode, container) {
  const isActive   = mode === 'ahora';
  const isUpcoming = mode === 'proxima';

  const badgeHTML = isActive
    ? `<span class="badge badge-ahora" role="status">● AHORA</span>`
    : isUpcoming
    ? `<span class="badge badge-proxima">PRÓXIMA</span>`
    : `<span class="badge badge-vista">VISTA PREVIA</span>`;

  let timeExtra = '';
  if (isActive) {
    const pct = getProgress(entry).toFixed(1);
    const rem = getTimeRemaining(entry) || '';
    const msgs = VIBES[entry.mealType] || VIBES.default;
    const firstMsg = msgs[Math.floor(Math.random() * msgs.length)];
    timeExtra = `
      <div class="progress-wrap">
        <div class="progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de la comida">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-label">${rem}</span>
      </div>
      <div class="meal-vibe" id="meal-vibe" aria-live="off">${firstMsg}</div>`;
  } else if (isUpcoming) {
    const cd = formatCountdown(entry.start);
    timeExtra = `
      <div class="countdown-wrap" aria-live="off">
        <div class="countdown-label">Empieza en</div>
        <div class="countdown-value" id="countdown-value">${cd}</div>
        <div class="countdown-start">a las ${formatTime(entry.start)}</div>
      </div>`;
  }

  const icon = MEAL_ICONS[entry.mealType] || '🍽️';
  const collapseId = `dishes-collapse-${entry.id}`;

  let dishesHTML = '';
  const allFlat = flattenDishes(entry);
  if (allFlat.length) {
    const previewNames = allFlat.slice(0, 3).map(d => escapeHtml(d.name)).join(' · ');
    const preview = allFlat.length > 3 ? previewNames + ' · …' : previewNames;

    const hasSections = entry.dishes[0] && entry.dishes[0].items !== undefined;
    let dishItemsHTML = '';
    let idx = 0;
    if (hasSections) {
      for (const sec of entry.dishes) {
        if (sec.section) {
          dishItemsHTML += `<div class="dish-section-label">${escapeHtml(sec.section)}</div>`;
        }
        for (const dish of (sec.items || [])) {
          dishItemsHTML += buildDishButton(dish, idx++, entry.id);
        }
      }
    } else {
      for (const dish of entry.dishes) {
        dishItemsHTML += buildDishButton(dish, idx++, entry.id);
      }
    }

    dishesHTML = `
      <div class="dishes-section">
        <button class="dishes-toggle"
                aria-expanded="false"
                aria-controls="${collapseId}">
          <span class="dishes-toggle-icon" aria-hidden="true">▾</span>
          <span class="dishes-toggle-label">Ver platos</span>
          <span class="dishes-toggle-preview">${preview}</span>
        </button>
        <div class="dishes-collapse" id="${collapseId}" hidden>
          ${dishItemsHTML}
        </div>
      </div>`;
  }

  container.innerHTML = `
    <div class="meal-card type-${entry.mealType} fade-in" role="region" aria-label="${entry.mealLabel} · ${entry.dayLabel}">
      <div class="meal-card-header">
        <div class="meal-badge-row">
          ${badgeHTML}
          <span class="badge badge-day">${entry.dayLabel}</span>
        </div>
        <div class="meal-name-wrap">
          <span class="meal-icon" aria-hidden="true">${icon}</span>
          <h2 class="meal-name">${entry.mealLabel.toUpperCase()}</h2>
        </div>
        <div class="meal-time">${formatTime(entry.start)} — ${formatTime(entry.end)}</div>
        ${timeExtra}
      </div>
      ${dishesHTML}
    </div>`;

  const toggleBtn = container.querySelector('.dishes-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const collapse = document.getElementById(collapseId);
      if (!collapse) return;
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      if (isExpanded) collapse.setAttribute('hidden', '');
      else collapse.removeAttribute('hidden');
    });

    container.querySelectorAll('.dish-item').forEach(btn => {
      btn.addEventListener('click', onDishClick);
    });
  }

  if (isActive) startVibeRotation(entry);
}

function startVibeRotation(entry) {
  if (vibeInterval) clearInterval(vibeInterval);
  const msgs = VIBES[entry.mealType] || VIBES.default;
  let i = 0;
  vibeInterval = setInterval(() => {
    const el = document.getElementById('meal-vibe');
    if (!el) { clearInterval(vibeInterval); return; }
    i = (i + 1) % msgs.length;
    el.classList.add('vibe-fade');
    setTimeout(() => {
      el.textContent = msgs[i];
      el.classList.remove('vibe-fade');
    }, 300);
  }, 5000);
}

// ── Pre-evento: cuenta atrás al Pasodoble Idella ──────────

function renderPreEvent(firstEntry, container) {
  const now = new Date();
  const isBeforeIdella = now < PRIMERA_DIANA;

  if (isBeforeIdella) {
    const cd = formatCountdownFull(PRIMERA_DIANA) || { days: 0, hours: 0, mins: 0, secs: 0 };
    container.innerHTML = `
      <div class="pre-event-card fade-in" role="region" aria-label="Cuenta atrás para el Pasodoble Idella">
        <p class="idella-eyebrow">⚔️ Las fiestas empiezan en</p>
        <div class="idella-countdown" aria-live="polite" aria-atomic="true" id="idella-countdown-wrap">
          <div class="idella-unit">
            <span class="idella-num" id="icd-days">${pad(cd.days)}</span>
            <span class="idella-lbl">días</span>
          </div>
          <span class="idella-sep" aria-hidden="true">:</span>
          <div class="idella-unit">
            <span class="idella-num" id="icd-hours">${pad(cd.hours)}</span>
            <span class="idella-lbl">horas</span>
          </div>
          <span class="idella-sep" aria-hidden="true">:</span>
          <div class="idella-unit">
            <span class="idella-num" id="icd-mins">${pad(cd.mins)}</span>
            <span class="idella-lbl">min</span>
          </div>
          <span class="idella-sep" aria-hidden="true">:</span>
          <div class="idella-unit">
            <span class="idella-num" id="icd-secs">${pad(cd.secs)}</span>
            <span class="idella-lbl">seg</span>
          </div>
        </div>
        <div class="idella-info">
          <strong>Pasodoble Idella</strong><br>
          Entrada de Bandas · Jueves 28 de Mayo · 19:30<br>
          <span class="idella-director">Dir. Blanca García Rodríguez</span>
        </div>
        <button class="idella-lyrics-btn" id="idella-lyrics-btn" aria-label="Ver letra del Pasodoble Idella">
          🎵 Ver letra de Idella
        </button>
      </div>`;

    const idellaEvt = EVENTOS.flatMap(d => d.events).find(e => e.lyrics);
    if (idellaEvt) {
      const btn = document.getElementById('idella-lyrics-btn');
      if (btn) btn.addEventListener('click', () => openLyricsModal(idellaEvt));
    }

  } else {
    // Entre Idella (19:30) y la primera cena (21:00)
    const cd = formatCountdown(firstEntry.start);
    container.innerHTML = `
      <div class="pre-event-card fade-in" role="region" aria-label="Cuenta atrás para la primera comida">
        <p class="pre-event-title">¡Las fiestas ya han comenzado!</p>
        <div class="pre-event-countdown" id="pre-countdown">${cd}</div>
        <p class="pre-event-info">
          Primera comida: <strong>${firstEntry.mealLabel}</strong><br>
          ${firstEntry.dayLabel} · ${formatTime(firstEntry.start)}
        </p>
      </div>`;
  }
}

// ── Post-evento ────────────────────────────────────────────

function renderPostEvent(container) {
  container.innerHTML = `
    <div class="post-event-card fade-in" role="region" aria-label="Las fiestas han terminado">
      <span class="post-event-emoji" aria-hidden="true">🎉</span>
      <h2 class="post-event-title">¡Hasta el año que viene!</h2>
      <p class="post-event-sub">Las fiestas de 2026 han concluido.<br>Nos vemos en 2027, Ziros.</p>
    </div>`;
}

// ── Helpers de platos ─────────────────────────────────────

function flattenDishes(entry) {
  if (!entry.dishes || !entry.dishes.length) return [];
  if (entry.dishes[0].items !== undefined) {
    return entry.dishes.flatMap(sec => sec.items || []);
  }
  return entry.dishes;
}

function buildDishButton(dish, idx, entryId) {
  return `
      <button class="dish-item"
              style="--i:${idx}"
              data-dish-index="${idx}"
              data-entry-id="${entryId}"
              aria-label="Ver información sobre ${escapeHtml(dish.name)}">
        <span class="dish-item-dot" aria-hidden="true"></span>
        <span class="dish-item-content">
          <span class="dish-item-name">${escapeHtml(dish.name)}</span>
          ${dish.desc ? `<span class="dish-item-preview">${escapeHtml(truncate(dish.desc, 60))}</span>` : ''}
        </span>
        <span class="dish-item-arrow" aria-hidden="true">›</span>
      </button>`;
}

// ── Lista de platos ───────────────────────────────────────

function renderDishList(entry, container, isPreview) {
  if (!entry.dishes || !entry.dishes.length) { container.innerHTML = ''; return; }

  const previewClass = isPreview ? ' preview-item' : '';
  const tabIndex     = isPreview ? 'tabindex="-1"' : '';

  const items = entry.dishes.map((dish, i) => `
    <button class="dish-item${previewClass}"
            ${tabIndex}
            data-dish-index="${i}"
            data-entry-id="${entry.id}"
            aria-label="Ver información sobre ${dish.name}">
      <span class="dish-item-dot" aria-hidden="true"></span>
      <span class="dish-item-content">
        <span class="dish-item-name">${escapeHtml(dish.name)}</span>
        ${dish.desc ? `<span class="dish-item-preview">${escapeHtml(truncate(dish.desc, 60))}</span>` : ''}
      </span>
      <span class="dish-item-arrow" aria-hidden="true">›</span>
    </button>`).join('');

  container.innerHTML = `
    <p class="dish-list-title">${isPreview ? 'Próximos platos' : 'Platos'}</p>
    ${items}`;

  if (!isPreview) {
    container.querySelectorAll('.dish-item').forEach(btn => {
      btn.addEventListener('click', onDishClick);
    });
  }
}

// ── Modal de plato ────────────────────────────────────────

function onDishClick(e) {
  const btn = e.currentTarget;
  const entry = TIMELINE.find(t => t.id === btn.dataset.entryId);
  if (!entry) return;
  const dish = flattenDishes(entry)[parseInt(btn.dataset.dishIndex, 10)];
  if (!dish) return;
  currentFocusTrigger = btn;
  openDishModal(dish, entry.mealType);
}

function openLyricsModal(evt) {
  const modal    = document.getElementById('dish-modal');
  const overlay  = document.getElementById('modal-overlay');
  const nameEl   = document.getElementById('modal-dish-name');
  const descEl   = document.getElementById('modal-dish-desc');
  const iconEl   = document.getElementById('modal-icon');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !overlay) return;

  modal.classList.add('lyrics-mode');
  iconEl.textContent = '🎵';
  nameEl.textContent = evt.lyricsTitle || evt.name;

  const stanzasHTML = evt.lyrics.map(stanza =>
    `<div class="lyrics-stanza">${stanza.map(line => `<p class="lyrics-line">${escapeHtml(line)}</p>`).join('')}</div>`
  ).join('');
  descEl.innerHTML = `<div class="lyrics-body">${stanzasHTML}</div>`;

  modal.removeAttribute('hidden');
  overlay.classList.add('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));

  document.body.style.overflow = 'hidden';
  closeBtn.focus();
  modal.addEventListener('keydown', trapFocus);
  document.addEventListener('keydown', onEscapeModal);
}

function openDishModal(dish, mealType) {
  const modal    = document.getElementById('dish-modal');
  const overlay  = document.getElementById('modal-overlay');
  const nameEl   = document.getElementById('modal-dish-name');
  const descEl   = document.getElementById('modal-dish-desc');
  const iconEl   = document.getElementById('modal-icon');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !overlay) return;

  nameEl.textContent = dish.name;
  descEl.textContent = dish.desc || 'Sin descripción disponible.';
  iconEl.textContent = MEAL_ICONS[mealType] || '🍽️';

  modal.removeAttribute('hidden');
  overlay.classList.add('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));

  document.body.style.overflow = 'hidden';
  closeBtn.focus();
  modal.addEventListener('keydown', trapFocus);
  document.addEventListener('keydown', onEscapeModal);
}

function closeDishModal() {
  const modal   = document.getElementById('dish-modal');
  const overlay = document.getElementById('modal-overlay');
  if (!modal || !overlay) return;

  modal.classList.remove('open', 'lyrics-mode');
  overlay.classList.remove('visible');
  modal.addEventListener('transitionend', () => modal.setAttribute('hidden', ''), { once: true });
  document.body.style.overflow = '';
  modal.removeEventListener('keydown', trapFocus);
  document.removeEventListener('keydown', onEscapeModal);
  if (currentFocusTrigger) { currentFocusTrigger.focus(); currentFocusTrigger = null; }
}

function onEscapeModal(e) { if (e.key === 'Escape') closeDishModal(); }

// ── Panel de navegación ───────────────────────────────────

function buildNavPanel() {
  switchNavTab(activeNavTab, false);
}

const TAB_ORDER = ['menus', 'programa', 'comparsas'];

function renderTabContent(tabId, container) {
  if (tabId === 'menus')          renderTabMenus(container);
  else if (tabId === 'programa')  renderTabPrograma(container);
  else if (tabId === 'comparsas') renderTabComparsas(container);
}

function switchNavTab(tabId, animate) {
  const prevTab = activeNavTab;
  activeNavTab = tabId;

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const content = document.getElementById('nav-tab-content');
  if (content) content.setAttribute('aria-labelledby', `tab-btn-${tabId}`);
  if (!content) return;

  if (animate && prevTab !== tabId) {
    const fromRight = TAB_ORDER.indexOf(tabId) > TAB_ORDER.indexOf(prevTab);
    content.classList.add(fromRight ? 'tab-from-right' : 'tab-from-left');
    renderTabContent(tabId, content);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      content.classList.remove('tab-from-right', 'tab-from-left');
    }));
  } else {
    renderTabContent(tabId, content);
  }
}

// ── Pestaña: Menús ────────────────────────────────────────

function renderTabMenus(container) {
  const state = getCurrentState();
  const currentId = (viewingEntry || state.entry || state.next || {}).id || '';

  const groups = {};
  for (const entry of TIMELINE) {
    if (!groups[entry.dayLabel]) groups[entry.dayLabel] = [];
    groups[entry.dayLabel].push(entry);
  }

  container.innerHTML = Object.entries(groups).map(([day, entries]) => {
    const meals = entries.map(entry => {
      const isCurrent = entry.id === currentId;
      return `
        <button class="nav-meal-btn${isCurrent ? ' is-current' : ''}"
                data-entry-id="${entry.id}"
                aria-label="${day} — ${entry.mealLabel} (${formatTime(entry.start)})${isCurrent ? ', menú actual' : ''}">
          <span class="nav-meal-icon" aria-hidden="true">${MEAL_ICONS[entry.mealType] || '🍽️'}</span>
          <span class="nav-meal-name">${entry.mealLabel}</span>
          <span class="nav-meal-time">${formatTime(entry.start)}</span>
        </button>`;
    }).join('');

    return `
      <div class="nav-day-group">
        <div class="nav-day-label">${day}</div>
        ${meals}
      </div>`;
  }).join('');

  container.querySelectorAll('.nav-meal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const entry = TIMELINE.find(t => t.id === btn.dataset.entryId);
      if (entry) { setViewingEntry(entry); closeNavPanel(); }
    });
  });
}

// ── Pestaña: Programa ─────────────────────────────────────

function renderTabPrograma(container) {
  const now = new Date();

  container.innerHTML = EVENTOS.map((day, dayIdx) => {
    const evts = day.events.map((evt, evtIdx) => {
      const isPast     = evt.datetime < now;
      const isUpcoming = !isPast && (evt.datetime - now) < 3600000;
      const hasOrder   = !!evt.order;
      const hasLyrics  = !!evt.lyrics;
      const orderBadge = hasOrder
        ? `<span class="ev-order-badge order-${evt.order.toLowerCase()}">Orden ${evt.order} · Ver detalles →</span>`
        : '';
      const lyricsBadge = hasLyrics
        ? `<button class="ev-lyrics-btn" data-day-idx="${dayIdx}" data-evt-idx="${evtIdx}" aria-label="Ver letra de ${escapeHtml(evt.lyricsTitle || evt.name)}">🎵 Ver letra de ${escapeHtml(evt.lyricsTitle || evt.name)}</button>`
        : '';
      const orderAttrs = hasOrder
        ? `data-order="${evt.order}" role="button" tabindex="0" aria-label="${escapeHtml(evt.name)} — Ver Orden ${evt.order}"`
        : '';
      return `
        <div class="ev-item${isPast ? ' ev-past' : ''}${evt.highlight ? ' ev-highlight' : ''}${isUpcoming ? ' ev-upcoming' : ''}${hasOrder ? ' ev-has-order' : ''}" ${orderAttrs}>
          <div class="ev-time">${evt.time}</div>
          <div class="ev-body">
            <div class="ev-name">${escapeHtml(evt.name)}</div>
            <div class="ev-desc">${escapeHtml(evt.desc)}</div>
            ${orderBadge}
            ${lyricsBadge}
          </div>
        </div>`;
    }).join('');

    return `
      <div class="ev-day-group">
        <div class="ev-day-label">${day.dayLabel}</div>
        ${evts}
      </div>`;
  }).join('');

  container.querySelectorAll('.ev-item[data-order]').forEach(item => {
    item.addEventListener('click', () => showComparsa(item.dataset.order));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showComparsa(item.dataset.order); }
    });
  });

  container.querySelectorAll('.ev-lyrics-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const evt = EVENTOS[+btn.dataset.dayIdx].events[+btn.dataset.evtIdx];
      openLyricsModal(evt);
    });
  });
}

// ── Ir directamente a un orden de marcha ──────────────────

function showComparsa(orderKey) {
  switchNavTab('comparsas', true);
  requestAnimationFrame(() => {
    const block = document.getElementById(`order-block-${orderKey}`);
    if (!block) return;
    block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    block.classList.add('order-highlight');
    setTimeout(() => block.classList.remove('order-highlight'), 1600);
  });
}

// ── Pestaña: Comparsas ────────────────────────────────────

function renderTabComparsas(container) {
  const orders = Object.entries(COMPARSA_ORDERS).map(([key, order]) => {
    const bandos = order.bandos.map(bando => {
      const items = bando.comparsas.map(comp => {
        const isOwn = comp === OWN_COMPARSA;
        return `<li class="comparsa-item${isOwn ? ' comparsa-own' : ''}" ${isOwn ? 'aria-label="' + comp + ' — nuestra comparsa"' : ''}>
          ${isOwn ? '<span class="comparsa-star" aria-hidden="true">★</span>' : '<span class="comparsa-num" aria-hidden="true">›</span>'}
          ${escapeHtml(comp)}
          ${isOwn ? '<span class="comparsa-tag">Ziros</span>' : ''}
        </li>`;
      }).join('');

      return `
        <div class="bando-block bando-${bando.id}">
          <div class="bando-header">${escapeHtml(bando.name)}</div>
          <ol class="comparsa-list">${items}</ol>
        </div>`;
    }).join('');

    return `
      <div class="order-block" id="order-block-${key}">
        <div class="order-header">
          <span class="order-letter">${key}</span>
          <span class="order-label">${order.label}</span>
        </div>
        ${bandos}
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="comparsa-intro">
      <p>Comparsa propia: <strong class="own-highlight">Moros Marroquíes</strong> (Bando Moro)</p>
    </div>
    ${orders}`;
}

// ── Abrir / cerrar nav panel ──────────────────────────────

function openNavPanel() {
  const panel   = document.getElementById('nav-panel');
  const overlay = document.getElementById('nav-overlay');
  const toggle  = document.getElementById('nav-toggle');
  if (!panel || !overlay) return;

  buildNavPanel();
  panel.removeAttribute('hidden');
  overlay.classList.add('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    panel.classList.add('open');
    panel.classList.add('panel-open');
  }));

  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('nav-close');
  if (closeBtn) closeBtn.focus();
  panel.addEventListener('keydown', trapFocusNav);
  document.addEventListener('keydown', onEscapeNav);

  setupScrollTop();
}

function setupScrollTop() {
  const content = document.getElementById('nav-tab-content');
  if (!content || document.getElementById('panel-scroll-top')) return;

  const btn = document.createElement('button');
  btn.id = 'panel-scroll-top';
  btn.className = 'panel-scroll-top';
  btn.setAttribute('aria-label', 'Volver al inicio del panel');
  btn.innerHTML = '↑';
  btn.addEventListener('click', () => content.scrollTo({ top: 0, behavior: 'smooth' }));

  document.getElementById('nav-panel').appendChild(btn);

  content.addEventListener('scroll', () => {
    btn.classList.toggle('visible', content.scrollTop > 120);
  }, { passive: true });
}

function closeNavPanel() {
  const panel   = document.getElementById('nav-panel');
  const overlay = document.getElementById('nav-overlay');
  const toggle  = document.getElementById('nav-toggle');
  if (!panel || !overlay) return;

  panel.classList.remove('open', 'panel-open');
  overlay.classList.remove('visible');
  panel.addEventListener('transitionend', () => panel.setAttribute('hidden', ''), { once: true });
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  panel.removeEventListener('keydown', trapFocusNav);
  document.removeEventListener('keydown', onEscapeNav);
  toggle.focus();
}

function onEscapeNav(e) { if (e.key === 'Escape') closeNavPanel(); }

// ── Modo manual / automático ──────────────────────────────

function setViewingEntry(entry) {
  viewingEntry = entry;
  const banner = document.getElementById('live-mode-banner');
  if (banner) banner.removeAttribute('hidden');
  renderState();
}

function backToLive() {
  viewingEntry = null;
  const banner = document.getElementById('live-mode-banner');
  if (banner) banner.setAttribute('hidden', '');
  renderState();
}

// ── Trampa de foco (accesibilidad) ───────────────────────

function getFocusable(el) {
  return [...el.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )];
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const modal = document.getElementById('dish-modal');
  if (!modal) return;
  const focusable = getFocusable(modal);
  if (!focusable.length) return;
  if (e.shiftKey) {
    if (document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
  } else {
    if (document.activeElement === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus(); }
  }
}

function trapFocusNav(e) {
  if (e.key !== 'Tab') return;
  const panel = document.getElementById('nav-panel');
  if (!panel) return;
  const focusable = getFocusable(panel);
  if (!focusable.length) return;
  if (e.shiftKey) {
    if (document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
  } else {
    if (document.activeElement === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus(); }
  }
}

// ── Utilidades ────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max).trimEnd() + '…';
}

// ── Tick: cada segundo ────────────────────────────────────

function animateDigit(el, newVal) {
  if (!el || el.textContent === newVal) return;
  el.textContent = newVal;
  el.classList.remove('digit-pop');
  void el.offsetWidth; // reflow para reiniciar animación
  el.classList.add('digit-pop');
}

let lastVibSec = -1;
function triggerVibration(secsLeft) {
  if (!navigator.vibrate) return;
  if (secsLeft === lastVibSec) return;
  lastVibSec = secsLeft;
  if (secsLeft === 60)  navigator.vibrate([200, 100, 200, 100, 400]);
  if (secsLeft === 30)  navigator.vibrate([100, 50, 100, 50, 100]);
  if (secsLeft === 10)  navigator.vibrate(300);
  if (secsLeft <= 5 && secsLeft > 0) navigator.vibrate(100);
}

function tick() {
  renderCurrentTime();

  if (viewingEntry) return;

  const state = getCurrentState();
  const now   = new Date();

  // Cuenta atrás a Idella (con segundos)
  if (state.type === 'pre-event' && now < PRIMERA_DIANA) {
    const cd = formatCountdownFull(PRIMERA_DIANA);
    if (cd) {
      const d = document.getElementById('icd-days');
      const h = document.getElementById('icd-hours');
      const m = document.getElementById('icd-mins');
      const s = document.getElementById('icd-secs');
      if (d) animateDigit(d, pad(cd.days));
      if (h) animateDigit(h, pad(cd.hours));
      if (m) animateDigit(m, pad(cd.mins));
      if (s) animateDigit(s, pad(cd.secs));

      // Modo dramático: últimos 30 minutos
      const secsLeft = Math.floor((PRIMERA_DIANA - now) / 1000);
      const isDramatic = secsLeft <= 1800;
      document.body.classList.toggle('drama-mode', isDramatic);
      if (isDramatic) triggerVibration(secsLeft);
    }
    return;
  }

  // Cuenta atrás entre-comidas (sin segundos)
  if (state.type === 'between' || (state.type === 'pre-event' && now >= PRIMERA_DIANA)) {
    const target = state.next.start;
    const el = document.getElementById('countdown-value') || document.getElementById('pre-countdown');
    if (el) el.textContent = formatCountdown(target);
  }

  // Barra de progreso comida activa
  if (state.type === 'active') {
    const fill  = document.querySelector('.progress-fill');
    const label = document.querySelector('.progress-label');
    if (fill)  fill.style.width = `${getProgress(state.entry).toFixed(1)}%`;
    if (label) label.textContent = getTimeRemaining(state.entry) || '';
  }
}

// ── Refresco completo si cambia el estado ─────────────────

let lastStateKey = '';

function fullRefresh() {
  if (viewingEntry) return;
  const state = getCurrentState();
  const key   = state.type + (state.entry || state.next || {}).id || '';
  if (key !== lastStateKey) {
    lastStateKey = key;
    renderState();
  }
}

// ── Swipe to close ────────────────────────────────────────

function setupSwipeDown(elementId, closeCallback) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let startY = 0;
  let allowClose = false;

  el.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    const scrollable = el.querySelector('.nav-tab-content') || el;
    allowClose = scrollable.scrollTop <= 0;
  }, { passive: true });

  el.addEventListener('touchend', e => {
    if (allowClose && e.changedTouches[0].clientY - startY > 100) closeCallback();
  }, { passive: true });
}

// ── Embers flotantes ──────────────────────────────────────

function createEmbers() {
  const colors = [
    'rgba(200,168,75,0.7)',
    'rgba(255,202,64,0.6)',
    'rgba(224,37,53,0.55)',
    'rgba(255,140,50,0.5)',
  ];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'ember';
    const size = Math.random() * 4 + 2;
    el.style.cssText = [
      `left:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `--drift:${(Math.random() - 0.5) * 120}px`,
      `animation-duration:${Math.random() * 9 + 7}s`,
      `animation-delay:${Math.random() * 10}s`,
    ].join(';');
    document.body.appendChild(el);
  }
}

// ── Efecto ripple en botones ──────────────────────────────

function addRipple(el) {
  const trigger = e => {
    const rect = el.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const span = document.createElement('span');
    span.className = 'ripple-span';
    span.style.left = x + 'px';
    span.style.top  = y + 'px';
    el.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  };
  el.addEventListener('touchstart', trigger, { passive: true });
  el.addEventListener('click', trigger);
}

function setupRipples() {
  document.querySelectorAll('.top-nav-btn, .browse-btn').forEach(addRipple);
  document.addEventListener('click', e => {
    const btn = e.target.closest('.dish-item, .nav-meal-btn');
    if (btn) addRipple(btn);
  });
}

// ── Inicialización ────────────────────────────────────────

// ── Easter egg: 5 taps en el logo ────────────────────────

function setupEasterEgg() {
  const header = document.getElementById('app-header');
  if (!header) return;
  let taps = 0, timer = null;

  header.addEventListener('click', () => {
    taps++;
    clearTimeout(timer);
    timer = setTimeout(() => { taps = 0; }, 1500);

    if (taps >= 5) {
      taps = 0;
      fireConfetti();
    }
  });
}

function fireConfetti() {
  const colors = ['#c8a84b', '#e02535', '#ffca40', '#f0ece4', '#1d4ed8'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = [
      `left:${Math.random() * 100}vw`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `width:${Math.random() * 8 + 4}px`,
      `height:${Math.random() * 8 + 4}px`,
      `animation-duration:${Math.random() * 1.5 + 1}s`,
      `animation-delay:${Math.random() * 0.5}s`,
      `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
    ].join(';');
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

function init() {
  createEmbers();
  setupRipples();
  setupEasterEgg();
  renderState();
  tick();

  setInterval(tick, 1000);
  setInterval(fullRefresh, 30000);

  // Top-nav acceso rápido
  document.querySelectorAll('.top-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeNavTab = btn.dataset.tab;
      openNavPanel();
    });
  });

  // Nav panel
  document.getElementById('nav-toggle').addEventListener('click', openNavPanel);
  document.getElementById('nav-close').addEventListener('click', closeNavPanel);
  document.getElementById('nav-overlay').addEventListener('click', closeNavPanel);

  // Pestañas del panel
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchNavTab(btn.dataset.tab, true));
  });

  // Modal de plato
  document.getElementById('modal-close').addEventListener('click', closeDishModal);
  document.getElementById('modal-overlay').addEventListener('click', closeDishModal);

  // Volver al modo automático
  document.getElementById('back-to-live').addEventListener('click', backToLive);

  // Gestos táctiles
  setupSwipeDown('dish-modal', closeDishModal);
  setupSwipeDown('nav-panel', closeNavPanel);
}

document.addEventListener('DOMContentLoaded', init);
