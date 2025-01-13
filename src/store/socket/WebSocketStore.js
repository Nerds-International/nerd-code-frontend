import { makeAutoObservable } from 'mobx';
import io from 'socket.io-client';

class WebSocketStore {
    socket = null;

    constructor() {
        makeAutoObservable(this);
        // this.initWebSocket();
    }

    initWebSocket = () => {
        this.socket = io('http://localhost:3000', {
            transports: ['websocket'],
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
