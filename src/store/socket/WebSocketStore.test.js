import { WebSocketStore } from './WebSocketStore'; // Предполагается, что ваш класс находится в файле WebSocketStore.js
import io from 'socket.io-client';

jest.mock('socket.io-client');

describe('WebSocketStore', () => {
    let webSocketStore;
    let mockSocket;

    beforeEach(() => {
        mockSocket = {
            on: jest.fn(),
            close: jest.fn(),
            connected: true,
        };
        io.mockReturnValue(mockSocket);
        webSocketStore = new WebSocketStore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('initWebSocket initializes the socket with pingInterval and pingTimeout', () => {
        webSocketStore.initWebSocket();

        expect(io).toHaveBeenCalledWith('http://localhost:3000', {
            transports: ['websocket'],
            pingInterval: 10000,
            pingTimeout: 5000,
        });

        expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
        expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    });

    test('closeWebSocket closes the socket', () => {
        webSocketStore.initWebSocket();
        webSocketStore.closeWebSocket();
        expect(mockSocket.close).toHaveBeenCalled();
    });

    test('setSocket sets a new socket', () => {
        const newSocket = { connected: true };
        webSocketStore.setSocket(newSocket);
        expect(webSocketStore.getSocket()).toStrictEqual(newSocket);
    });

    test('getSocket returns the current socket', () => {
        const newSocket = { connected: true };
        webSocketStore.setSocket(newSocket);
        expect(webSocketStore.getSocket()).toStrictEqual(newSocket);
    });
});
