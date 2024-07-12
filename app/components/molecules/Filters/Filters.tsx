import React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider';
import SearchBox from '../SearchBox/SearchBox';
import Hamburger from '../Hamburger/Hamburger';


const Filters = () => {

  return (
    <div className="flex justify-between items-center gap-5  py-4 rounded-md">
      <div className="flex w-4/5 md:w-1/2">
        <SearchBox  />
      </div>
      <div className=' hidden md:flex justify-between w-1/2 g-auto'>
        <div className="w-[170px]">
          <Dropdown items={['Normal', 'Fighting', 'Flying', 'Poison', 'Ground','dark','ghost','grass','water']} label="Type" />
        </div>
        <div className="w-[170px]">
          <Dropdown items={['Male','Female','genderless']} label="Gender" />
        </div>
        <div className="w-[170px]">
          <Slider  />
        </div>
      </div>
      <div className=' flex md:hidden justify-between h-full'>

        <Hamburger />

      </div>
    </div>
  );
};

export default Filters;