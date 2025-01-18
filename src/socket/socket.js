import { io } from 'socket.io-client';

const BE_BASE_URL = process.env.REACT_APP_BE_BASE_URL;

const socket = io(BE_BASE_URL);

export default socket;