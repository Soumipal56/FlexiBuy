import React from 'react';

const ProceedButton = ({ onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-semibold py-4 px-8 rounded-xl transition-all flex justify-center items-center text-lg
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 active:scale-95'
        }
      `}
    >
      Proceed with Selected Plan
    </button>
  );
};

export default ProceedButton;
