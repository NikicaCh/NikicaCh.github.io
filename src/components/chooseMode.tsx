import React, {useEffect, useState} from 'react'


import socketIOClient from "socket.io-client";

import ShortUniqueId from 'short-unique-id';
import { Type } from 'typescript';
import QrHolder from './qrholder';

const uid = new ShortUniqueId();

// const ENDPOINT = "http://127.0.0.1:4001";

const ENDPOINT = "https://shredder-server.herokuapp.com/";


  interface props {
    scroll: boolean
  }


const ChooseMode: React.FC<props> = (props): JSX.Element => {
    const [response, setResponse] = useState("");
    const [passCode, setPassCode] = useState("");
    const [scroll, setScroll] = useState(false)

    useEffect( () => {
        if(scroll !== props.scroll) {
            setTimeout(() => {
                setScroll(props.scroll)
            }, .5)
        }
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
                setScroll(true)
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
        <div  className={scroll ? "choose choose-scroll" : "choose"}>
            <img className={scroll ? `cover cover-part2-scroll` : "cover"} src={require("../icons/cover-part2.png")}></img>
            <img className={scroll ? `cover cover-part1-scroll` : "cover"} src={require("../icons/cover-part1.png")}></img>
            <img className={scroll ? `paper11 paper11-scroll` : "paper11"} src={require("../icons/paper1-part1.png")}></img>
            <span  className={scroll ? `text1 paper11-scroll` : "text1"}>SCAN</span>
            <img className={scroll ? `paper12 paper12-scroll` : "paper12"} src={require("../icons/paper1-part2.png")}></img>
            <span  className={scroll ? `text2 paper12-scroll` : "text2"}>the QR</span>
            {
                scroll
                ? undefined
                : <QrHolder code={passCode}/>
            }
            <div className={ scroll ? `typewriter` : "none"}>
                <h1>Welcome to my portfolio.</h1>
            </div>
            {/* <span>In order to continue to the STORY, scan the QR code with your phone.</span>
            <h1>{passCode}</h1>
            <QRCode value={`https://shredder-app.herokuapp.com/mobile?code=${passCode}`} /> */}
            {/* <button
                onClick={() => {
                    Ask()
                }}
            >ASK</button> */}
            {/* <input type="text" onChange={(e) => {
                sendMsg(e.target.value)
            }}></input> */}
        </div>
        
    )
}


export default ChooseMode;