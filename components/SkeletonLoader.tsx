import React from 'react';

const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse">
    <div className="h-48 bg-slate-200"></div>
    <div className="p-5 space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      <div className="space-y-2 pt-4">
        <div className="h-4 bg-green-50 rounded w-1/3"></div>
        <div className="h-3 bg-slate-100 rounded w-full"></div>
        <div className="h-3 bg-slate-100 rounded w-full"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-red-50 rounded w-1/3"></div>
        <div className="h-3 bg-slate-100 rounded w-full"></div>
      </div>
    </div>
  </div>
);

export const SkeletonLoader = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
        <div className="flex space-x-4">
            <div className="h-8 bg-slate-200 rounded w-24 animate-pulse"></div>
            <div className="h-8 bg-slate-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {[1, 2, 3].map((section) => (
        <div key={section}>
          <div className="h-8 bg-slate-200 rounded w-48 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <CardSkeleton key={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
