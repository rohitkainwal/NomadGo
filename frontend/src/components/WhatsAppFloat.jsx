import { FaWhatsapp } from "react-icons/fa";


const WhatsAppFloat = () => {
  const phoneNumber = "918813867972"; // replace with your WhatsApp Business number (with country code)
  const message = "Hello, I’m interested in your services";

  return (
    <>
     
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
    </>
  );
};

export default WhatsAppFloat;
