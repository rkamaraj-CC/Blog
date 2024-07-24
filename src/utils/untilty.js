"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default class Utility {
  static toastMessage(message: string) {
    return toast(message);
  }
}

// You can create a separate component to render the ToastContainer
export function ToastMessage() {
  return (
    <ToastContainer
      className={"Toastify"}
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

// Example usage in your main component:
// Call Utility.toastMessage("Your message here") to display a toast message
