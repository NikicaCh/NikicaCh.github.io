import React, {useEffect, useState} from 'react'
import {BrowserView, MobileView} from 'react-device-detect';
import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://127.0.0.1:4001";

const ENDPOINT = "https://shredder-server.herokuapp.com/";


const Mobile = (props) => {

    const [welcome, setWelcome] = useState("")
    useEffect( () => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            type: "mobile",
        }
        socket.on("connect", () => {
            socket.emit("customObj", obj)
        })
        socket.on("hello", (msg) => {
            console.log("RECEIVED")
            setWelcome(msg)
        })
        return( () => {
            socket.emit("disconect", obj)
        })
    }, [])


    return (
        <div className="mobile">
            <h1>{welcome}</h1>
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