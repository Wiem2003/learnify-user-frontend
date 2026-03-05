export function apiBaseUrl(): string {
    const host = window.location.hostname; // localhost / 192.168.1.14 / 192.168.1.14.nip.io
    const backendHost = (host === 'localhost' || host === '127.0.0.1') ? 'localhost' : host;
    return `http://${backendHost}:8080`;
  }