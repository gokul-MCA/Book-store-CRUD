import React, { useState } from "react";
import { MdClose } from "react-icons/md";


const PopUp = ({ renderContent, label }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(!open)}>{label}</button>
      {open && (
        <div className="absolute top-[50%] left-[50%] z-10 rounded-lg bg-slate-100 py-4 px-8 shadow-2xl translate-x-[-50%] translate-y-[-50%] ">
          <button className="absolute top-4 right-4" onClick={() => setOpen(false)}>
            <MdClose className="h-6 w-full "/>
          </button>
          { renderContent(setOpen)}
        </div>
      )}
    </>
  );
};

export default PopUp;
