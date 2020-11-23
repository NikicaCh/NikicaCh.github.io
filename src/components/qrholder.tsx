import React from 'react'
import QRCode from 'qrcode.react';



const QrHolder = () => {
    return (
        <div className="qr-holder">
            <QRCode value={`https://shredder-app.herokuapp.com/mobile?code=132`} bgColor="#F5CFB1" />
        </div>
    )
}

export default QrHolder