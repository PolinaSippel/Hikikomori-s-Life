# Hikikomori-s-Life
Hikikomori kommt aus dem Japanischen und bedeutet „sich zurückziehen“. Der Begriff beschreibt Menschen, die sich in eine selbstgewählte langfristige Isolation begeben. Das Phänomen ist nicht auf Japan beschränkt, sondern lässt sich auch in anderen Teilen der Welt beobachten.

Unser Projekt entsteht im Kontext des Moduls Generative Gestaltung und beschäftigt sich mit dem Einfluss von Social Media auf das Erleben von Einsamkeit.

## Konzept
Eine interaktive, spielbare Webseite, die auf kreative Weise über das Phänomen Hikikomori informiert. Unser Ziel ist es, ein digitales Erlebnis zu schaffen, das sowohl emotional berührt als auch faktenbasiert aufklärt.

## Idee 
Unser Projekt „Hikikomori’s Life“ entstand aus der Auseinandersetzung mit dem Thema mentale Gesundheit im digitalen Zeitalter. Ausgangspunkt war die Frage, wie psychische Belastung, gesellschaftlicher Druck und digitale Einsamkeit zusammenwirken – besonders bei jungen Menschen.
Nach ersten Recherchen zu „Mental Health & Social Media“ stießen wir auf das japanische Phänomen der Hikikomori: Menschen, die sich über Monate oder Jahre komplett aus dem sozialen Leben zurückziehen und meist nicht einmal mehr ihr Zimmer verlassen.

Diese Entdeckung war der Startpunkt für unsere Idee: eine interaktive Erfahrung zu gestalten, die dieses stille, oft unsichtbare Leben greifbar macht – nicht durch Zahlen oder Fakten, sondern durch Atmosphäre, Objekte, Gedankenfragmente. Aus diesem Wunsch entstand die Figur Kenshin.

Kenshin ist fiktiv – und doch basiert seine Geschichte auf vielen realen Erzählungen. Er war ein ruhiger, angepasster Jugendlicher. In der Schule funktionierte er, zu Hause wurde er nicht gehört. Sein Vater war streng, seine Mutter still. Mit der Zeit begannen kleine Risse in seinem Alltag – Konzentrationsprobleme, Schlaflosigkeit, sozialer Rückzug. Irgendwann blieb er einfach im Zimmer. Tage, Wochen, Monate. Das Zimmer wurde zur Grenze. Dahinter: Rückzug, Überforderung, und das leise Verschwinden aus der Welt.

In unserem Spiel erkunden die Spieler:innen Kenshins Zimmer. Sie klicken sich durch persönliche Gegenstände – alte Bücher, ein Familienfoto, ein vergilbter Wasserkocher, ein nie beantworteter Brief. Jeder Gegenstand erzählt einen Ausschnitt. Kein linearer Plot, sondern eine fragmentarische Erinnerungsschicht, wie ein stiller Monolog aus Dingen, Gedanken und Geräuschen.

Technisch basiert das Projekt auf einer einfachen Webseite (HTML/CSS/JS), ergänzt durch selbst gestaltete Grafiken und Audioelemente. Die gesamte konzeptionelle Entwicklung – von der Themenfindung über Sketches bis hin zu Quest-Struktur und Objektplanung – ist dokumentiert in unserem FigmaJam-Board:

🔗 FigmaJam: 
https://www.figma.com/board/larR9UVHEG3UY4vYYLBiXv/genAI?node-id=402-1355&t=RO2gLeLRmaPmCUS5-1

Hikikomori’s Life ist unser Versuch, das Unsichtbare sichtbar zu machen – mit Empathie, ohne Mitleid, ohne Urteil.

## Struktur
- index.html: Hauptseite mit interaktiven Hotspots
- style.css: Styling für das Layout und die Hotspots
- script.js: Interaktive Logik für Hotspots
- assets/: Ordner für Bilder und Audios
- bubbles.json: Textinhalte für Bubbles
- server.py: Lokaler Webserver  

## Features
- Interaktives Zimmerbild mit klickbaren Hotspots
- **Computer-Hotspot:** Öffnet ein Overlay mit einem Screenshot (computer-bildschirm.jpg), kein Seitenwechsel, kein Text-Bubble
- **Flyer-Hotspot:** Öffnet ein Overlay mit dem Flyer-Bild (flyer.jpg), kein Seitenwechsel, kein Text-Bubble
- **Brief- und Foto-Hotspot:** Öffnen Popup-Overlays mit Bild und Text aus bubbles.json
- Weitere Hotspots zeigen Text-Bubbles mit individuellen Inhalten
- Overlays sind per Schließen-Button oder ESC-Taste schließbar
- Responsive Design, moderne UI/UX

## Lokale Entwicklung & Start
1. **Voraussetzungen:**
   - Python 3 (für lokalen Webserver)
   - Ein moderner Browser (Chrome, Firefox, Edge)

2. **Projekt starten:**
   - Im Projektordner ein Terminal öffnen
   - Lokalen Server starten:
     ```
     python server.py
     ```
   - Die Seite öffnet sich automatisch im Browser (ansonsten http://localhost:8000/start.html aufrufen)

3. **Bedienung:**
   - Mit der Maus über das Zimmerbild fahren, Hotspots werden als klickbare Bereiche angezeigt
   - Computer- und Flyer-Hotspot öffnen ein großes Overlay mit Bild
   - Brief und Foto zeigen ein Popup mit Bild und Text
   - Andere Hotspots zeigen Text-Bubbles

## Assets
- Alle Bilder liegen im Ordner `assets/`
- Textinhalte für Bubbles in `bubbles.json`

## Hinweise
- Für eigene Erweiterungen können weitere Hotspots und Overlays analog ergänzt werden
- Bei Problemen bitte Browser-Cache leeren (Strg+F5)