"use client";
import { Flip, toast, ToastContainer } from "react-toastify";
import { Result } from "../types/globalType";

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

export const ToastNotification = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Flip}
  />
);

export const handleResponseToast = <T,>(response: Result<T>) => {
  const { data, serverError, validationErrors } = response;

  if (data && data.success) {
    const { status, message } = data;
    showToast(status, message);
    return true;
  }

  if (data && !data.success) {
    const { status, message } = data;
    showToast(status, message);
    return false;
  }

  if (serverError) {
    showToast("error", serverError);
    return false;
  }

  if (validationErrors) {
    const firstErrorKey = Object.keys(validationErrors)[0];
    const firstError = validationErrors[firstErrorKey]?._errors?.[0];

    if (firstError) {
      showToast("warn", firstError);
    }
    return false;
  }

  return false;
};
