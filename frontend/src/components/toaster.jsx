import React, { useContext } from "react";
import useToast from "../hooks/useToast";

const Toaster = () => {
  const { toast } = useToast();

  if (!Array.isArray(toast)) return null;
  return (
    <>
      {toast.map((toast) => (
        <div className="border-2 border-red-100 rounded-lg absolute bottom-20 right-20 h-[10%] w-[20%] shadow-lg">
          <div className="flex items-center justify-center h-full text-xl font-semibold" key={toast.id}>{toast.message}</div>
        </div>
      ))}
    </>
  );
};

export default Toaster;
