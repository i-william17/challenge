'use client';

import React, { useEffect, useState } from 'react';

const SkipGrid = () => {
    const [skips, setSkips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkip, setSelectedSkip] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                const res = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
                const data = await res.json();

                const formattedSkips = data.map(skip => {
                    const priceBeforeVat = parseFloat(skip.price_before_vat);
                    const vatPercentage = parseFloat(skip.vat);
                    let finalPrice = priceBeforeVat;

                    if (!isNaN(priceBeforeVat) && !isNaN(vatPercentage)) {
                        const vatAmount = priceBeforeVat * (vatPercentage / 100);
                        finalPrice = (priceBeforeVat + vatAmount);
                    }

                    return {
                        ...skip,
                        price: Math.round(finalPrice),
                        name: `${skip.size} Yard Skip`,
                        savings: Math.round(finalPrice * 0.2),
                        originalPrice: Math.round(finalPrice * 1.2)
                    };
                });

                setSkips(formattedSkips);
                const eightYardSkip = formattedSkips.find(skip => skip.size === 8);
                if (eightYardSkip) setSelectedSkip(eightYardSkip);
            } catch (err) {
                console.error('Failed to fetch skips', err);
                setSkips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSkips();
    }, []);

    const filteredSkips = skips.filter(skip => {
        if (activeTab === 'road') return skip.allowed_on_road;
        if (activeTab === 'heavy') return skip.allows_heavy_waste;
        return true;
    });

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-800 text-lg font-medium">Loading skip options...</p>
                <p className="text-slate-500 text-sm mt-1">Finding the best deals in NR32</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 px-4 py-8 pb-24">
            <div className="max-w-6xl mx-auto">
                {/* Progress Stepper - Responsive version */}
                <div className="w-full mb-8 sm:mb-12">
                    <div className="relative">
                        {/* Mobile stepper - compact version */}
                        <div className="sm:hidden flex justify-between items-center px-2">
                            {['Postcode', 'Waste', 'Skip', 'Permit', 'Date', 'Pay'].map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center relative z-10"
                                    style={{ width: `${100 / 6}%` }}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${index < 2 ? 'bg-teal-600 text-white' :
                                            index === 2 ? 'bg-teal-500 text-white ring-2 ring-teal-400' :
                                                'bg-slate-200 text-slate-600'}`}>
                                        {index < 2 ? '✓' : index + 1}
                                    </div>
                                    <span className={`text-[10px] mt-1 text-center font-medium
                    ${index <= 2 ? 'text-slate-800' : 'text-slate-500'}`}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                            {/* Progress line */}
                            <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 z-0">
                                <div
                                    className="h-full bg-teal-600 transition-all duration-300"
                                    style={{ width: `${selectedSkip ? '50%' : '16.66%'}` }}
                                ></div>
                            </div>
                        </div>

                        {/* Desktop stepper - full version */}
                        <div className="hidden sm:flex items-center justify-center">
                            {['Postcode', 'Waste Type', 'Select Skip', 'Permit Check', 'Choose Date', 'Payment'].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${index < 2 ? 'bg-teal-600' :
                                                index === 2 ? 'bg-teal-500 ring-4 ring-teal-500/20' :
                                                    'bg-slate-200'}`}>
                                            {index < 2 ? (
                                                <span className="text-white font-medium">✓</span>
                                            ) : (
                                                <span className={`font-medium ${index === 2 ? 'text-white' : 'text-slate-600'}`}>
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-xs mt-2 text-center font-medium
                      ${index <= 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                                            {step}
                                        </span>
                                    </div>
                                    {index < 5 && (
                                        <div className={`h-1 w-12 mx-1 ${index < 2 ? 'bg-teal-600' : 'bg-slate-200'} rounded-full`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-3 text-slate-900">Choose Your Skip Size</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Select the skip sixe that best suits your needs
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg bg-slate-200 p-1">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'all' ? 'bg-white shadow text-teal-600' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            All Skips
                        </button>
                        <button
                            onClick={() => setActiveTab('road')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'road' ? 'bg-white shadow text-teal-600' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            Road Allowed
                        </button>
                        <button
                            onClick={() => setActiveTab('heavy')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'heavy' ? 'bg-white shadow text-teal-600' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            Heavy Waste
                        </button>
                    </div>
                </div>

                {/* Skip Grid */}
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
                    {filteredSkips.map((skip) => {
                        const isSelected = selectedSkip && skip.id === selectedSkip.id;
                        const hirePeriodText = `${skip.hire_period_days} day hire`;

                        return (
                            <div
                                key={skip.id}
                                className={`
                  relative bg-white rounded-xl overflow-hidden 
                  shadow-sm cursor-pointer transition-all duration-200 border
                  ${isSelected ? 'ring-2 ring-teal-500 border-teal-200' : 'border-slate-200 hover:shadow-md'}
                  ${skip.forbidden ? 'opacity-70' : ''}
                `}
                                onClick={() => !skip.forbidden && setSelectedSkip(skip)}
                            >
                                {skip.forbidden && (
                                    <div className="absolute inset-0 bg-slate-100/80 z-10 flex items-center justify-center">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                                            Currently Unavailable
                                        </span>
                                    </div>
                                )}

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">{skip.name}</h2>
                                            <p className="text-slate-500 text-sm">{hirePeriodText}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {skip.allowed_on_road && (
                                                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                                                    Road
                                                </span>
                                            )}
                                            {skip.allows_heavy_waste && (
                                                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                                                    Heavy
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="h-40 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                                        <div className="text-slate-400 text-sm">
                                            {skip.size} Yard Skip Image
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <span className="text-slate-500 text-sm">Total price</span>
                                            <p className="text-2xl font-bold text-teal-600">
                                                £{skip.price}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400 line-through">£{skip.originalPrice}</span>
                                            <span className="block text-emerald-600 text-xs font-bold">Save £{skip.savings}</span>
                                        </div>
                                    </div>

                                    <button
                                        className={`
                      w-full py-3 rounded-lg transition-all flex justify-center items-center
                      font-medium text-sm
                      ${isSelected
                                                ? 'bg-teal-600 text-white cursor-default'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                            }
                      ${skip.forbidden ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            !skip.forbidden && setSelectedSkip(skip);
                                        }}
                                        disabled={isSelected || skip.forbidden}
                                    >
                                        {skip.forbidden ? 'Not Available' : isSelected ? 'Selected' : 'Select This Skip'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Selected Skip Panel */}
                {selectedSkip && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-6 shadow-lg z-50">
                        <div className="max-w-6xl mx-auto flex justify-between items-center">
                            <div>
                                <p className="text-slate-600 text-sm">Selected skip</p>
                                <p className="text-lg font-bold text-slate-900">
                                    {selectedSkip.name} • £{selectedSkip.price}
                                    {selectedSkip.allowed_on_road && (
                                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Road Allowed</span>
                                    )}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setSelectedSkip(null)}
                                    className="px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition"
                                >
                                    Change
                                </button>
                                <button
                                    onClick={() => alert(`Proceeding with ${selectedSkip.name} for £${selectedSkip.price}`)}
                                    className="px-6 py-2 rounded-lg font-medium bg-teal-600 text-white hover:bg-teal-700 transition"
                                >
                                    Continue to Booking
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkipGrid;