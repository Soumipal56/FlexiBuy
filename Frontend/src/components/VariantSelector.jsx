import React from 'react';

const VariantSelector = ({ variants, selectedIdx, onSelect }) => {
  return (
    <div className="mt-auto pt-6 border-t border-gray-100 w-full text-center">
      <p className="text-sm font-medium text-gray-500 mb-4">Available in {variants.length} finishes</p>
      <div className="flex justify-center gap-3">
        {variants.map((v, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedIdx === idx 
                ? 'border-brand-500 ring-4 ring-brand-100 scale-110' 
                : 'border-transparent hover:scale-110 shadow-sm'
            }`}
            style={{ backgroundColor: v.color }}
            aria-label={`Select ${v.label}`}
            title={v.label}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
