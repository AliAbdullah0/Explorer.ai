import React from 'react';
import { Place } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface PlaceCardProps {
  place: Place;
  index: number;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, index }) => {
  const imageSeed = encodeURIComponent(place.name.replace(/\s+/g, '-').toLowerCase());
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/600/400`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={imageUrl} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
          {place.priceRange}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{place.name}</h3>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{place.description}</p>
        
        <div className="mt-auto space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2 flex items-center">
               Advantages
            </h4>
            <ul className="space-y-1">
              {place.advantages.map((adv, i) => (
                <li key={i} className="flex items-start text-sm text-slate-600">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2 flex items-center">
               Disadvantages
            </h4>
            <ul className="space-y-1">
              {place.disadvantages.map((dis, i) => (
                <li key={i} className="flex items-start text-sm text-slate-600">
                  <XCircleIcon className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
