import React from 'react';
import { PlaceCard } from './PlaceCard';
import { SectionProps } from '../types';

export const ResultSection: React.FC<SectionProps> = ({ title, icon, items, colorClass }) => {
  return (
    <section className="py-8 animate-fade-in-up">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-${colorClass.split('-')[1]}-600`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <PlaceCard key={index} place={item} index={index} />
        ))}
      </div>
    </section>
  );
};
