// script.js
console.log('[script.js] Lädt und wird ausgeführt...');
// Dieses Skript sorgt für die Interaktivität der Hotspots im Zimmerbild.
// Anfängerhinweis: Kommentare wie dieser erklären, was einzelne Abschnitte machen.

// Tooltip für Hotspots beim Überfahren mit der Maus
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('playMusic') === '1') {
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
      bgAudio.play();
    }
    sessionStorage.removeItem('playMusic');
  }
  console.log('[script.js] DOMContentLoaded ausgelöst');

  // Tooltip für Hotspots wie gehabt
  const tooltip = document.createElement('div');
  tooltip.style.position = 'fixed';
  tooltip.style.padding = '6px 12px';
  tooltip.style.background = 'rgba(3, 3, 3, 0.7)';
  tooltip.style.color = '#fff';
  tooltip.style.borderRadius = '5px';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.fontSize = '14px';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '1000';
  document.body.appendChild(tooltip);

  // Text-Bubble für Hotspot-Uhr
  let bubble = null;
  function showBubble(text, x, y, isRadio = false) {
    if (bubble) bubble.remove();
    bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.position = 'fixed';
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    bubble.style.zIndex = '2000';
    bubble.style.userSelect = 'none';

    // Markiere Bubble als Radio-Bubble, falls nötig
    if (isRadio) {
      bubble.dataset.radio = "true";
    }

    // Schließen-Button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '12px';
    closeBtn.style.right = '12px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '22px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#888';
    closeBtn.style.padding = '0';
    closeBtn.style.lineHeight = '1';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Prüfe, ob es eine Radio-Bubble ist
      if (bubble && bubble.dataset.radio === "true") {
        if (podcastAudio) {
          podcastAudio.pause();
          podcastAudio.currentTime = 0;
        }
      }
      bubble.remove();
      closedPopupsCount++;
      console.log('[Popup geschlossen] closedPopupsCount:', closedPopupsCount, '/', totalPopupsToClose);
      tryShowEndScreen();
    });
    bubble.appendChild(closeBtn);

    // Text
    const textDiv = document.createElement('div');
    textDiv.textContent = text;
    textDiv.style.paddingRight = '22px';
    bubble.appendChild(textDiv);

    document.body.appendChild(bubble);
  }

  // Audio-Element für Podcast anlegen (nur eins pro Seite)
  let podcastAudio = null;

  // --- Endscreen-Logik: Zähle geschlossene Popups/Bubbles ---
  const allHotspots = Array.from(document.querySelectorAll('.hotspot')).filter(h => !h.hasAttribute('href'));
  let closedPopupsCount = 0;
  const totalPopupsToClose = allHotspots.length;

  function tryShowEndScreen() {
    if (closedPopupsCount >= totalPopupsToClose) {
      // Endscreen anzeigen
      const blackout = document.createElement('div');
      blackout.style.position = 'fixed';
      blackout.style.top = 0;
      blackout.style.left = 0;
      blackout.style.width = '100vw';
      blackout.style.height = '100vh';
      blackout.style.background = 'black';
      blackout.style.zIndex = 10000;
      blackout.id = 'blackout-end';
      document.body.appendChild(blackout);
      // Stoppe Hintergrundmusik
      const bgAudio = document.getElementById('bg-audio');
      if (bgAudio) {
        bgAudio.pause();
      }
      // Spiele Husten-Sound
      const coughAudio = new Audio('sounds/husten.mp3');
      coughAudio.play();
      coughAudio.addEventListener('ended', () => {
        blackout.style.background = 'black url("assets/door_end.jpg") no-repeat center center';
        blackout.style.backgroundSize = 'cover';
      });
    }
  }



  document.querySelectorAll('.hotspot').forEach(hotspot => {
    console.log('[script.js] Hotspot gefunden:', hotspot, 'ID:', hotspot.dataset.id, 'Title:', hotspot.title);
    // Tooltip wie gehabt
    hotspot.addEventListener('mouseenter', e => {
      tooltip.textContent = hotspot.title;
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX + 10) + 'px';
      tooltip.style.top = (e.clientY + 10) + 'px';
    });
    hotspot.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 10) + 'px';
      tooltip.style.top = (e.clientY + 10) + 'px';
    });
    hotspot.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    // Für alle Hotspots, die einen passenden Eintrag in bubbles.json haben, Bubble anzeigen
    hotspot.style.cursor = 'pointer';
    hotspot.addEventListener('click', async (e) => {
      // Hotspot-Ende-Feature: Nur Hotspots ohne href zählen
      if (!hotspot.hasAttribute('href')) {
        // Keine Set-Logik mehr nötig. Hotspot-Interaktion bleibt erhalten.
      }
      console.log('[script.js] Hotspot geklickt:', hotspot, 'ID:', hotspot.dataset.id, 'Title:', hotspot.title);
      // Podcast (Audio) immer stoppen, sobald ein Hotspot geklickt wird
      if (podcastAudio) {
        podcastAudio.pause();
        podcastAudio.currentTime = 0;
      }
      const id = hotspot.dataset.id;
      const title = hotspot.getAttribute('title');
      console.log("Hotspot ID:", id);

      // Spezialfall: Brief
      if (id === 'letter' || title === 'Brief') {
        console.log('[script.js] Brief-Hotspot geklickt');
        e.preventDefault();
        // Vorher: Alle offenen Text-Bubbles schließen
        const openBubble = document.querySelector('.bubble');
        if (openBubble) openBubble.remove();
        // Pop-up Overlay erzeugen
        if (window.briefOverlay) window.briefOverlay.remove();
        if (window.briefPopup) window.briefPopup.remove();
        const overlay = document.createElement('div');
        overlay.className = 'brief-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(24, 24, 32, 0.85)';
        overlay.style.zIndex = '2999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.transition = 'opacity 0.2s';
        document.body.appendChild(overlay);
        window.briefOverlay = overlay;

        // Pop-up Fenster
        const popup = document.createElement('div');
        popup.className = 'brief-popup';
        popup.style.position = 'relative';
        popup.style.background = 'rgba(32,32,40,0.96)';
        popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.45)';
        popup.style.borderRadius = '18px';
        popup.style.padding = '32px 32px 28px 32px';
        popup.style.zIndex = '3000';
        popup.style.maxWidth = '600px';
        popup.style.width = '90vw';
        popup.style.textAlign = 'center';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.alignItems = 'center';
        overlay.appendChild(popup);

        // Schließen-Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'brief-popup-close';
        closeBtn.addEventListener('click', () => {
          if (window.briefOverlay) window.briefOverlay.remove();
          if (window.briefPopup) window.briefPopup.remove();
        });
        popup.appendChild(closeBtn);

        // Bild (Briefpapier)
        const img = document.createElement('img');
        img.src = 'assets/brief.jpg';
        img.alt = 'Brief';
        img.className = 'brief-popup-letter-img';
        popup.appendChild(img);

        // Text aus bubbles.json laden
        try {
          const response = await fetch('bubbles.json');
          const data = await response.json();
          const text = (data['letter'] && data['letter'].text) ? data['letter'].text : 'Kein Text gefunden.';
          const textDiv = document.createElement('div');
          textDiv.className = 'brief-popup-text';
          textDiv.textContent = text;
          popup.appendChild(textDiv);
        } catch (err) {
          const textDiv = document.createElement('div');
          textDiv.className = 'brief-popup-text';
          textDiv.textContent = 'Fehler beim Laden des Brief-Textes.';
          popup.appendChild(textDiv);
        }

        // Overlay click schließt Popup
        overlay.addEventListener('click', (ev) => {
          if (ev.target === overlay) {
            if (window.briefOverlay) window.briefOverlay.remove();
            if (window.briefPopup) window.briefPopup.remove();
          }
        });

        window.briefPopup = popup;
        return;
      }

      // Spezialfall: Foto
      if (id === 'photo' || title === 'Foto') {
        console.log('[script.js] Foto-Hotspot geklickt');
        e.preventDefault();
        // Vorher: Alle offenen Text-Bubbles schließen
        const openBubble = document.querySelector('.bubble');
        if (openBubble) openBubble.remove();
        // Pop-up Overlay erzeugen
        if (window.briefOverlay) window.briefOverlay.remove();
        if (window.briefPopup) window.briefPopup.remove();
        const overlay = document.createElement('div');
        overlay.className = 'brief-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(24, 24, 32, 0.85)';
        overlay.style.zIndex = '2999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.transition = 'opacity 0.2s';
        document.body.appendChild(overlay);
        window.briefOverlay = overlay;

        // Pop-up Fenster
        const popup = document.createElement('div');
        popup.className = 'brief-popup';
        popup.style.position = 'relative';
        popup.style.background = 'rgba(32,32,40,0.96)';
        popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.45)';
        popup.style.borderRadius = '18px';
        popup.style.padding = '32px 32px 28px 32px';
        popup.style.zIndex = '3000';
        popup.style.maxWidth = '600px';
        popup.style.width = '90vw';
        popup.style.textAlign = 'center';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.alignItems = 'center';
        overlay.appendChild(popup);

        // Schließen-Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'brief-popup-close';
        closeBtn.addEventListener('click', () => {
          if (window.briefOverlay) window.briefOverlay.remove();
          if (window.briefPopup) window.briefPopup.remove();
        });
        popup.appendChild(closeBtn);

        // Bild (Familienfoto)
        const img = document.createElement('img');
        img.src = 'assets/familienfoto.jpg';
        img.alt = 'Familienfoto';
        img.className = 'brief-popup-letter-img';
        popup.appendChild(img);

        // Text aus bubbles.json laden (wie beim Brief)
        try {
          const response = await fetch('bubbles.json');
          const data = await response.json();
          const text = (data['photo'] && data['photo'].text) ? data['photo'].text : 'Kein Text gefunden.';
          const textDiv = document.createElement('div');
          textDiv.className = 'brief-popup-text';
          textDiv.textContent = text;
          popup.appendChild(textDiv);
        } catch (err) {
          const textDiv = document.createElement('div');
          textDiv.className = 'brief-popup-text';
          textDiv.textContent = 'Fehler beim Laden des Foto-Textes.';
          popup.appendChild(textDiv);
        }

        // Overlay click schließt Popup
        overlay.addEventListener('click', (ev) => {
          if (ev.target === overlay) {
            if (window.briefOverlay) window.briefOverlay.remove();
            if (window.briefPopup) window.briefPopup.remove();
            closedPopupsCount++;
            console.log('[Popup geschlossen] closedPopupsCount:', closedPopupsCount, '/', totalPopupsToClose);
            tryShowEndScreen();
          }
        });

        window.briefPopup = popup;
        return;
      }
      // Wenn Hotspot einen href hat, Standardverhalten erlauben (Seitenwechsel)
      if (hotspot.hasAttribute('href')) return;
      e.preventDefault();
      console.log("Hotspot ID:", id);

      // Spezialfall: Radio (Podcast abspielen)
      if (title === 'Radio' || id === 'radio') {
        console.log('[Hotspot Radio geklickt]');
        console.log('[script.js] Radio-Hotspot geklickt');
        // Falls schon ein Podcast läuft, stoppe ihn
        if (podcastAudio) {
          podcastAudio.pause();
          podcastAudio.currentTime = 0;
        }
        podcastAudio = new Audio('sounds/podcast.mp3');
        podcastAudio.play().then(()=>console.log('[script.js] Audio gestartet')).catch(err=>console.error('[script.js] Audio Fehler:',err));
        // --- Bubble auch für Radio anzeigen ---
        // Position bestimmen (wie unten im else-Zweig)
        let x, y;
        if (hotspot.hasAttribute('data-x') && hotspot.hasAttribute('data-y')) {
          const img = document.querySelector('.room-bg');
          const imgRect = img.getBoundingClientRect();
          x = imgRect.left + parseInt(hotspot.getAttribute('data-x'));
          y = imgRect.top + parseInt(hotspot.getAttribute('data-y'));
        } else {
          const rect = hotspot.getBoundingClientRect();
          x = rect.left;
          y = rect.top;
        }
        try {
          const response = await fetch('bubbles.json');
          const data = await response.json();
          if (data[id] && data[id].text) {
            showBubble(data[id].text, x, y, true);
          } else {
            showBubble('Hier läuft entspannte Musik...', x, y, true);
          }
        } catch (err) {
          showBubble('Fehler beim Laden des Textes.', x, y, true);
        }
        return;
      }

      // Wenn data-x und data-y gesetzt sind, dann linke obere Ecke der Bubble genau dort
      let x, y;
      if (hotspot.hasAttribute('data-x') && hotspot.hasAttribute('data-y')) {
        const img = document.querySelector('.room-bg');
        const imgRect = img.getBoundingClientRect();
        x = imgRect.left + parseInt(hotspot.getAttribute('data-x'));
        y = imgRect.top + parseInt(hotspot.getAttribute('data-y'));
        console.log('verwendet x:', x);
        console.log('verwendet y:', y);
      } else {
        const rect = hotspot.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
        console.log('verwendet x:', x);
        console.log('verwendet y:', y);
      }
      try {
        const response = await fetch('bubbles.json');
        const data = await response.json();
        console.log('Hotspot id:', id);
        console.log('Verfügbare Keys in bubbles.json:', Object.keys(data));
        if (data[id] && data[id].text) {
          showBubble(data[id].text, x, y);
        } else {
          showBubble('Kein Text gefunden.', x, y);
        }

      } catch (err) {
        showBubble('Fehler beim Laden des Textes.', x, y);
      }
    });
  });
});

