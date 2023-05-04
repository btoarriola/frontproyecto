class SocketService {
    constructor(url) { //va a recibir la ruta del lugar de donde s va a conectar (servidor websocker?)
      this.url = url;
      this.socket = null;
      this.listeners = {};
    }
  
    connect() {
      return new Promise((resolve, reject) => {
        this.socket = new WebSocket(this.url);
  
        this.socket.onopen = () => {
          console.log('Connected to WebSocket server');
          resolve();
        };
  
        this.socket.onerror = error => {
          console.error('WebSocket error', error);
          reject(error);
        };
  
        this.socket.onmessage = event => {
          const { type, payload } = JSON.parse(event.data);
          const callbacks = this.listeners[type] || [];
          callbacks.forEach(callback => callback(payload));
        };
      });
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        console.log('Disconnected from WebSocket server');
      }
    }
  
    send(type, payload) {
      const message = JSON.stringify({ type, payload });
      this.socket.send(message);
    }
  
    on(type, callback) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }
  
    off(type, callback) {
      const callbacks = this.listeners[type] || [];
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  
    isConnected() {
      return this.socket && this.socket.readyState === WebSocket.OPEN;
    }
  }
  