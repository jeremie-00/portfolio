import { toast } from "react-toastify";

export const showToast = (
  type: "success" | "error" | "warn" | "info",
  message: string
) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
