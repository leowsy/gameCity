import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";

const QRCode = () => {
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod;

  let qrCodeData = "";
  let payment = "";

  if (paymentMethod === "WeChat Pay") {
    qrCodeData = "https://example.com/qrcode/wechat";
    payment = "Wechat Pay";
  } else if (paymentMethod === "Alipay") {
    qrCodeData = "https://example.com/qrcode/alipay";
    payment = "Alipay";
  }

  return (
    <div className="qr-code-container">
      <h1>{payment} Instructions</h1>
      <h4>
        To complete your payment, please scan this QR code with {payment}.
      </h4>
      <div className="qr-code">
        <QRCodeCanvas value={qrCodeData} size={128} />
      </div>
    </div>
  );
};

export default QRCode;
