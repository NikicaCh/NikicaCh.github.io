import React, {useEffect, useState} from 'react'
import {BrowserView, MobileView, isBrowser,isMobile} from 'react-device-detect';
import socketIOClient from "socket.io-client";
import  { Redirect } from 'react-router-dom'


const ENDPOINT = "http://127.0.0.1:4001";

// const ENDPOINT = "https://shredder-server.herokuapp.com/";


const Mobile = (): JSX.Element => {
    const [question, setQuestion] = useState("")
    const [welcome, setWelcome] = useState("")
    const [nameInput, setNameInput] = useState(false)
    const [name, setName] = useState("")
    useEffect( () => {
        console.log(isBrowser, isMobile)
        // if(isBrowser ) {
        //     console.log('redirect')
        //     window.location.replace("/")
        // }
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            type: "mobile",
        }
        socket.on("connect", () => {
            let code = window.location.search.substring(6) // the code from the QR
            socket.emit("join", code)
            socket.emit("customObj", obj)
            socket.emit("mobile", code)
        })
        socket.on("hello", (msg:string) => {
            console.log("RECEIVED")
            setWelcome(msg)
            if ("vibrate" in navigator) {
                navigator.vibrate(1000);
              }       
            })
        socket.on("ask", (msg:string) => {
            console.log(msg)
        })
        interface ask {
            question: string
            room: string
        }
        socket.on("question", (obj:ask) => {
            console.log("receive")
            setQuestion(obj.question)
        })
        socket.on("1", (obj:ask) => {
            if ("vibrate" in navigator) {
              navigator.vibrate(1000);
            }
            setNameInput(!nameInput)
        })
        
        return( () => {
            socket.emit("disconect", obj)
        })
    }, [])


    const sendMsg = (msg:string, number:string) => {
        const socket = socketIOClient(ENDPOINT);
        let code = window.location.search.substring(6)
        let obj = {
            msg: msg,
            type: "answer",
            passCode: code
        }
        socket.emit(number, obj)
    }
    return (
        <div className="mobile">
            <h1>{welcome}</h1>
            <h1>{question}</h1>
            {
                nameInput
                ? <form onSubmit={(e) => {
                    e.preventDefault()
                    sendMsg(name, "11")
                    setNameInput(false)
                }}>
                    <input type="text" placeholder="Your name:" onChange={(e) => {setName(e.target.value)}}></input>
                  </form>
                : undefined
            }
            <BrowserView>
                <h1>This is rendered only in browser</h1>
            </BrowserView>
            <MobileView>
                <h1>This is rendered only on mobile</h1>
            </MobileView>
        </div>
    )
}


export default Mobile