import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";
import { toast } from "react-hot-toast";

export const downloadReceipt = async (appointmentData) => {
  const element = document.getElementById("receipt-content");
  if (!element) return toast.error("Receipt element not found.");

  try {
    const blob = await domtoimage.toBlob(element);
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Appointment_Receipt_${appointmentData?.razorpay?.paymentId || "unknown"}.pdf`);
      toast.success("Receipt downloaded successfully!");
    };
  } catch (error) {
    console.error("Error generating receipt:", error);
    toast.error("Failed to download receipt. Try again later.");
  }
};