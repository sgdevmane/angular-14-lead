#!/usr/bin/env python3
import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # If path is empty, serve index.html
        if not path:
            path = 'index.html'
        
        # Check if the requested file exists
        if os.path.exists(path) and os.path.isfile(path):
            # File exists, serve it normally
            super().do_GET()
        else:
            # File doesn't exist, check if it's a potential route
            # If it doesn't have a file extension, serve index.html for SPA routing
            if '.' not in os.path.basename(path):
                self.path = '/index.html'
                super().do_GET()
            else:
                # File with extension doesn't exist, return 404
                super().do_GET()
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Set proper MIME type for markdown files
        if self.path.endswith('.md'):
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
        
        super().end_headers()

if __name__ == '__main__':
    PORT = 8080
    
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()