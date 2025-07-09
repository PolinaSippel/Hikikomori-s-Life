# Hikikomori-s-Life
Hikikomori kommt aus dem Japanischen und bedeutet „sich zurückziehen“. Der Begriff beschreibt Menschen, die sich in eine selbstgewählte langfristige Isolation begeben. Das Phänomen ist nicht auf Japan beschränkt, sondern lässt sich auch in anderen Teilen der Welt beobachten.

Unser Projekt entsteht im Kontext des Moduls Generative Gestaltung und beschäftigt sich mit dem Einfluss von Social Media auf das Erleben von Einsamkeit.

## Konzept
Eine interaktive, spielbare Webseite, die auf kreative Weise über das Phänomen Hikikomori informiert. Unser Ziel ist es, ein digitales Erlebnis zu schaffen, das sowohl emotional berührt als auch faktenbasiert aufklärt.

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
