// components/RazorpayScriptLoader.jsx
import { useEffect } from "react";

export default function RazorpayScriptLoader() {
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
