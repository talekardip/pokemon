'use client'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import FilterModal from '../FilterModal/FilterModal';

const Hamburger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className='bg-SECONDARY h-full'>
      
      <FaBars size={40} onClick={toggleModal}/>
      
      {isModalOpen && <FilterModal onClose={toggleModal} />}
    
    </div>
  )
}


export default Hamburger;
