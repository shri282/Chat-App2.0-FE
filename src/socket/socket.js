import { io } from 'socket.io-client';

const socket = io('http://localhost:2001');

export default socket;