import { makeAutoObservable } from 'mobx';
import io from 'socket.io-client';

class WebSocketStore {
    socket = null;

    constructor() {
        makeAutoObservable(this);
    }

    initWebSocket = () => {
        this.socket = io('http://localhost:3000', {
            transports: ['websocket'],
            pingInterval: 10000,
            pingTimeout: 5000,
        });

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        return this.socket;
    };

    setSocket = (newSocket) => {
        this.socket = newSocket;
    };

    getSocket = () => {
        return this.socket;
    };

    closeWebSocket = () => {
        if (this.socket) {
            this.socket.close();
        }
    };
}

export const webSocketStore = new WebSocketStore();
export { WebSocketStore };
