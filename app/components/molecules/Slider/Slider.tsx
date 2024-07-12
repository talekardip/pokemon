"use client";
import React, { useState, useEffect } from 'react';
import MultiSlider from '../../atoms/Multislider/MultiSlider';
import { useRouter } from 'next/navigation';

interface Stats {
    hp: [number, number];
    attack: [number, number];
    defense: [number, number];
    speed: [number, number];
    spAttack: [number, number];
    spDef: [number, number];
}

const initialStats: Stats = {
    hp: [0, 200],
    attack: [0, 200],
    defense: [0, 200],
    speed: [0, 200],
    spAttack: [0, 200],
    spDef: [0, 200],
};

const Slider: React.FC = () => {
    const [stats, setStats] = useState<Stats>(initialStats);
    const [modifiedStats, setModifiedStats] = useState<Set<keyof Stats>>(new Set());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSliderChange = (name: keyof Stats, values: [number, number]) => {
        const newStats = {
            ...stats,
            [name]: values,
        };
        setStats(newStats);

        const newModifiedStats = new Set(modifiedStats);
        
        if (JSON.stringify(values) === JSON.stringify(initialStats[name])) {
            newModifiedStats.delete(name);
        } else {
            newModifiedStats.add(name);
        }
        setModifiedStats(newModifiedStats);

        const modifiedStatsObject: Partial<Stats> = {};
        newModifiedStats.forEach((stat) => {
            modifiedStatsObject[stat] = newStats[stat];
        });

        const currentParams = new URLSearchParams(window.location.search);
        if (newModifiedStats.size > 0) {
            currentParams.set('stats', JSON.stringify(modifiedStatsObject));
        } else {
            currentParams.delete('stats');
        }
        router.push(`?${currentParams.toString()}`);
    };

    const resetStats = () => {
        setStats(initialStats);
        setModifiedStats(new Set());
        console.log('stats reset');

        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('stats');
        router.push(`?${currentParams.toString()}`);
    };

    const applyStats = () => {
        console.log('Applied Stats:', stats);
    };

    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        const statsParam = currentParams.get('stats');
        if (statsParam) {
            const newStats = JSON.parse(statsParam);
            setStats((prevStats) => ({
                ...prevStats,
                ...newStats,
            }));
            setModifiedStats(new Set(Object.keys(newStats) as Array<keyof Stats>));
        }
    }, []);

    return (
        <div className="relative inline-block w-full">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
            >
                <div className="text-sm">Dropdown</div>
                <svg
                    className={`ml-2 h-4 w-4 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div>
                    <div className="hidden md:block absolute right-0 bg-white shadow-md rounded-lg p-4 mt-2 z-10 w-[450px]">
                        {Object.keys(stats).map((stat) => (
                            <div className="flex items-center space-x-4 p-2" key={stat}>
                                <label className="w-20 font-semibold text-sm">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                                <MultiSlider
                                    key={`${stat}-${stats[stat as keyof Stats].toString()}`} // Force re-render by changing key
                                    className="w-[80%] h-6"
                                    orientation="horizontal"
                                    min={0}
                                    max={200}
                                    value={stats[stat as keyof Stats]}
                                    onChange={(values) => handleSliderChange(stat as keyof Stats, values)}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                onClick={resetStats}
                            >
                                Reset
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md" onClick={applyStats}>
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg p-4 mt-2 z-10 w-full">
                        {Object.keys(stats).map((stat) => (
                            <div className="flex items-center space-x-4 p-2" key={stat}>
                                <label className="w-20 font-semibold text-sm">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                                <MultiSlider
                                    key={`${stat}-${stats[stat as keyof Stats].toString()}`} // Force re-render by changing key
                                    className="w-[80%] h-6"
                                    orientation="horizontal"
                                    min={0}
                                    max={200}
                                    value={stats[stat as keyof Stats]}
                                    onChange={(values) => handleSliderChange(stat as keyof Stats, values)}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                onClick={resetStats}
                            >
                                Reset
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md" onClick={applyStats}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slider;
