import React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider'; // Assuming you have a Slider component

interface FilterModalProps {
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">×</button>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center w-full border border-gray-300 rounded">
                        <Dropdown items={['Normal + 8 More', 'Fighting', 'Flying', 'Poison', 'Ground']} label="Type" />
                        
                    </div>
                    <div className="flex justify-between items-center w-full border border-gray-300 rounded">
                        <Dropdown items={['Male + 2 More']} label="Gender" />
                        
                    </div>
                    <div className="flex justify-between items-center w-full  border border-gray-300 rounded">
                        <Slider  />
                        
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded">Reset</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
