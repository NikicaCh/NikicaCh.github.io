import React from 'react'
import QRCode from 'qrcode.react';



const QrHolder = () => {
    return (
        <div className="qr-holder">
            <QRCode value={`https://shredder-app.herokuapp.com/mobile?code=132`} bgColor="transparent" fgColor="#2f5fa7" renderAs="svg"/>
        </div>
    )
}

export default QrHolder