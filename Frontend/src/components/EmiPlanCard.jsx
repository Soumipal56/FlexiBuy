import React from 'react';

const EmiPlanCard = ({ plan, isSelected, onSelect }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      onClick={onSelect}
      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
        isSelected 
          ? 'border-brand-500 bg-brand-50/50 shadow-md ring-4 ring-brand-500/10' 
          : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-gray-900 text-lg">
          {formatCurrency(plan.monthlyAmount)} <span className="text-sm font-medium text-gray-500">x {plan.months} months</span>
        </h4>
        <span className="font-medium text-gray-700 text-sm">
          {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
        </span>
      </div>
      
      {plan.cashback > 0 && (
        <div className="mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
          Additional cashback of {formatCurrency(plan.cashback)}
        </div>
      )}
    </div>
  );
};

export default EmiPlanCard;
