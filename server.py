# Importiere die nötigen Module
from http.server import HTTPServer, SimpleHTTPRequestHandler  # Für den einfachen Webserver
import webbrowser  # Um den Browser automatisch zu öffnen
import os  # Für Dateipfade und Arbeitsverzeichnis

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    """
    Startet einen einfachen lokalen Webserver und öffnet automatisch den Browser.

    Argumente:
        server_class: Die Server-Klasse, standardmäßig HTTPServer.
        handler_class: Die Handler-Klasse, standardmäßig SimpleHTTPRequestHandler.
        port: Der Port, auf dem der Server laufen soll (Standard: 8000).
    """
    server_address = ('', port)  # '' bedeutet, dass auf allen Netzwerkadressen gelauscht wird
    httpd = server_class(server_address, handler_class)  # Erzeuge den Server
    print(f'Starting server on port {port}...')
    print(f'Open your browser and go to http://localhost:{port}')

    # Starte den Server in einem eigenen Thread, damit das Programm weiterläuft
    import threading
    server_thread = threading.Thread(target=httpd.serve_forever)
    server_thread.daemon = True  # Thread endet, wenn das Hauptprogramm endet
    server_thread.start()

    # Öffne den Standardbrowser automatisch mit der Startseite
    webbrowser.open(f'http://localhost:{port}/index.html')

    # Halte das Hauptprogramm am Leben, bis Strg+C gedrückt wird
    try:
        while True:
            pass  # Endlosschleife, um das Programm laufen zu lassen
    except KeyboardInterrupt:
        # Wenn der Benutzer Strg+C drückt, wird der Server sauber beendet
        print('\nShutting down server...')
        httpd.shutdown()

if __name__ == '__main__':
    # Setze das Arbeitsverzeichnis auf den Ordner, in dem sich dieses Skript befindet
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run()  # Starte den Server
