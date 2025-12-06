import React, { useState, useCallback } from 'react';
import { fetchCityGuide } from './services/geminiService';
import { CityGuideData, LoadingState } from './types';
import { ResultSection } from './components/ResultSection';
import { SkeletonLoader } from './components/SkeletonLoader';
import { SearchIcon, MapPinIcon, BedIcon, UtensilsIcon, TrendingUpIcon, InfoIcon } from './components/Icons';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<CityGuideData | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading('loading');
    setError(null);
    setData(null);

    try {
      const result = await fetchCityGuide(query);
      setData(result);
      setLoading('success');
    } catch (err) {
      setError("Failed to generate city guide. Please try again later or check your connection.");
      setLoading('error');
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-orange-400" />
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight text-orange-400 hidden sm:block">explorer.<span className="text-black">ai</span></h1>
            </div>

          <form onSubmit={handleSearch} className="relative flex items-center flex-1 max-w-md ml-4 gap-2">
              
  <div className="relative flex-1">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Where to next? (e.g., Kyoto)"
      className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full text-slate-800 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
    />
    <SearchIcon className="absolute left-3.5 top-2.5 w-5 h-5 text-slate-400" />
  </div>

  <button
    type="submit"
    className="bg-orange-400 rounded-3xl md:px-4  md:text-base text-sm px-3 py-2.5 text-sm font-semibold text-white hover:opacity-100 whitespace-nowrap"
  >
    Search
  </button>

</form>


        </div>
      </header>

      <main className="flex-1 w-full">
        {loading === 'idle' && (
          <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
             <div className="bg-white p-6 rounded-full shadow-lg mb-8 animate-bounce">
                <MapPinIcon className="w-12 h-12 text-blue-500" />
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
               Discover Your Next Adventure
             </h2>
             <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
               Enter a city name above to get an intelligent, curated guide featuring the best spots, hotels, and restaurants with honest pros & cons.
             </p>
          </div>
        )}

        {loading === 'loading' && <SkeletonLoader />}

        {loading === 'error' && (
          <div className="flex flex-col items-center justify-center h-[50vh] px-4 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <InfoIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Oops, something went wrong</h3>
            <p className="text-slate-600">{error}</p>
            <button 
                onClick={handleSearch}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
                Try Again
            </button>
          </div>
        )}

        {loading === 'success' && data && (
          <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-12">
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{data.cityName}</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">{data.overview}</p>
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-orange-600 text-sm font-medium border border-blue-100">
                                <TrendingUpIcon className="w-4 h-4 mr-2" />
                                Best time: {data.bestTimeToVisit}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                                <span className="mr-2">$</span>
                                Currency: {data.currency}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <ResultSection 
              title="Must-Visit Spots" 
              icon={<MapPinIcon className="w-6 h-6 text-purple-600" />}
              items={data.spots} 
              colorClass="bg-purple-50 text-purple-600"
            />
            
            <ResultSection 
              title="Top Hotels" 
              icon={<BedIcon className="w-6 h-6 text-blue-600" />}
              items={data.hotels}
              colorClass="bg-blue-50 text-blue-600" 
            />
            
            <ResultSection 
              title="Culinary Gems" 
              icon={<UtensilsIcon className="w-6 h-6 text-orange-600" />}
              items={data.restaurants}
              colorClass="bg-orange-50 text-orange-600" 
            />
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ICT Project </p>
            <p><span className="font-semibold">Areej Afraz - 01-136252-012</span></p>
            <p><span className="font-semibold">Javeria Abbas - 01-136252-010</span></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
