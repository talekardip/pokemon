'use client'
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import BackButton from '../../atoms/BackButton/BackButton';
import { endpoints } from '@/app/utils/Endpoints';


interface ModalControlsProps {
  id: number;
}


const ModalControlButtons: React.FC<ModalControlsProps> = ({id }) => {

  const [curId, setCurId] = useState<number>(id);
  const [nextId, setNextId] = useState<number>(id + 1);
  const [prevId, setPrevId] = useState<number>(id > 1 ? id - 1 : 1);


  useEffect(() => {
    setCurId(id);
    setNextId(id + 1);
    setPrevId(id > 1 ? id - 1 : 1);
  }, [id]);


  return (
    <div className="flex items-center">
      <Link href={`${endpoints.navigatePokemonPage}${prevId}`} passHref>
        <button

          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
          aria-label="Previous"
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>


      <BackButton />


      <Link href={`${endpoints.navigatePokemonPage}${nextId}`} passHref>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Next"
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default ModalControlButtons;
