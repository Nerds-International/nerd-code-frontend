import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(serverUrl, {
            transports: ['websocket'],
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [serverUrl]);

    return socket;
};

export default useWebSocket;
