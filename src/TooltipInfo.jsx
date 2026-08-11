import React, { useState } from 'react';

export const TooltipInfo = ({ 
  text = "A este consumo se aplicará un factor multiplicador debido a las pérdidas que sufre un coche eléctrico durante el proceso de recarga, que se estiman en un 10%." 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center shrink-0">
      <button
        type="button"
        className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 text-[11px] font-mono font-bold flex items-center justify-center hover:bg-slate-600 focus:outline-none cursor-pointer border border-slate-600 shrink-0"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Más información"
      >
        i
      </button>

      {isOpen && (
        <div className="absolute z-20 w-60 p-2.5 mt-2 text-xs text-white bg-slate-800 rounded-lg shadow-xl border border-slate-700 -left-24 sm:left-1/2 sm:-translate-x-1/2 top-full">
          {text}
        </div>
      )}
    </div>
  );
};