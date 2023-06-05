import { io } from "socket.io-client";
import React from "react";
export const socket = io();
// app context
export const AppContext = React.createContext();
