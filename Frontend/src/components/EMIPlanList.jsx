import React from 'react';
import EmiPlanCard from './EmiPlanCard';

const EMIPlanList = ({ plans, selectedPlanIdx, onSelect }) => {
  return (
    <div className="space-y-3 mb-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {plans.map((plan, idx) => (
        <EmiPlanCard 
          key={idx} 
          plan={plan} 
          isSelected={selectedPlanIdx === idx}
          onSelect={() => onSelect(idx)}
        />
      ))}
    </div>
  );
};

export default EMIPlanList;
