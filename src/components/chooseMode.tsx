import React, {useEffect, useState} from 'react'
import QRCode from 'qrcode.react';


import socketIOClient from "socket.io-client";

import ShortUniqueId from 'short-unique-id';
import { Type } from 'typescript';

const uid = new ShortUniqueId();

// const ENDPOINT = "http://127.0.0.1:4001";

const ENDPOINT = "https://shredder-server.herokuapp.com/";


const ChooseMode = (): JSX.Element => {
    const [response, setResponse] = useState("");
    const [passCode, setPassCode] = useState("")


    useEffect( () => {
        
        const socket = socketIOClient(ENDPOINT);
        const pass = uid()
        setPassCode(pass)
        
        socket.on("connect", () => {
            
            let obj = {
                type: "main",
                passCode: passCode
            }
            socket.emit("join", pass)
            socket.emit("customObj", obj)

            socket.on("mobile-connected", (room:string) => {
                console.log("redirecting...")
                window.location.replace("/story")
            })
        })
        return( () => {
            socket.emit("disconect")
        })
    }, [])

    const Ask = () => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            question: "What Colour",
            room: passCode
        }
        socket.emit('ask', obj);
        console.log("CLICK")
    }

    // const Emit = (socket, name:string, message:string) => { // Universal EMIT function for emmiting questions etc...
    //     socket.emit(`${name}`, message)
    // }

    const sendMsg = (msg:string) => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            msg: msg,
            type: "main",
            passCode: passCode
        }
        socket.emit("HELLO", obj)
    }



    return (
        <div  className="choose">
            <span>In order to continue to the STORY, scan the QR code with your phone.</span>
            <h1>{passCode}</h1>
            <QRCode value={`https://shredder-app.herokuapp.com/mobile?code=${passCode}`} />
            <button
                onClick={() => {
                    Ask()
                }}
            >ASK</button>
            {/* <input type="text" onChange={(e) => {
                sendMsg(e.target.value)
            }}></input> */}
        </div>
        
    )
}


export default ChooseMode;