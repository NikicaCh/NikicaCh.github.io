import React, {useEffect, useState} from 'react'

import socketIOClient from "socket.io-client";

import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

const ENDPOINT = "http://127.0.0.1:443";

// const ENDPOINT = "https://shredder-server.herokuapp.com/";


const ChooseMode = (props) => {
    const [response, setResponse] = useState("");

    const passCode = uid()

    useEffect( () => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            type: "main",
            passCode: passCode
        }
        socket.on("connect", () => {
            socket.emit("customObj", obj)
        })
        return( () => {
            socket.emit("disconect", obj)
        })
    }, [])

    const sendMsg = (msg) => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            msg: msg,
            type: "main",
            passCode: passCode
        }
        socket.emit("HELLO", obj)
    }



    return (
        <div>
            <input type="text" onChange={(e) => {
                sendMsg(e.target.value)
            }}></input>
        </div>
        
    )
}


export default ChooseMode;