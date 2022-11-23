import io from "socket.io-client";

const SOCKET_URL = "http://192.168.0.105:4000/"

export const socket = io(SOCKET_URL);