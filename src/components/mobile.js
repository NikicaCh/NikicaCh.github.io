import React, {useEffect} from 'react'
import {BrowserView, MobileView} from 'react-device-detect';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

// const ENDPOINT = "https://shredder-server.herokuapp.com/";


const Mobile = (props) => {

    useEffect( () => {
        const socket = socketIOClient(ENDPOINT);
        let obj = {
            type: "mobile",
        }
        socket.on("connect", () => {
            socket.emit("customObj", obj)
        })
        return( () => {
            socket.emit("disconect", obj)
        })
    }, [])


    return (
        <div className="mobile">
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