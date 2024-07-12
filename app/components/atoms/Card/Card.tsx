'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { endpoints } from '@/app/utils/Endpoints';

interface CardProps {
  pokemonData: any;
  isTitle: boolean;
}

const getColor=(type:any)=>{
  switch (type.toLowerCase()) {
    case 'normal':
      return 'NORMAL';
    case 'ice':
      return 'ICE';
    case 'fighting':
      return 'FIGHTING';
    case 'flying':
      return 'FLYING';
    case 'poison':
      return 'POISON';
    case 'ground':
      return 'GROUND';
    case 'rock':
      return 'ROCK';
    case 'bug':
      return 'BUG';
    case 'ghost':
      return 'GHOST';
    case 'steel':
      return 'STEEL';
    case 'fire':
      return 'FIRE';
    case 'water':
      return 'WATER';
    case 'grass':
      return 'GRASS';
    case 'electric':
      return 'ELECTRIC';
    case 'psychic':
      return 'PSYCHIC';
    case 'dragon':
      return 'DRAGON';
    case 'dark':
      return 'DARK';
    case 'fairy':
      return 'FAIRY';
    default:
      return 'NORMAL';
  }
}

const Card: React.FC<CardProps> = ({ pokemonData, isTitle }) => {
  const [id, setId] = useState()
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [fromcolor,setFromColor] = useState<any>();
  const [tocolor,setToColor] = useState<any>();

  useEffect(() => {
    if (pokemonData) {

      setId(pokemonData?.id);
      setName(pokemonData?.name);
      setImage(pokemonData?.image);
      setFromColor(`from-${getColor(pokemonData?.types[0]?.toLowerCase())}`)
      setToColor(`to-${getColor(pokemonData?.types[1]?.toLowerCase() || pokemonData?.types[0]?.toLowerCase())}`)
    } else {
      console.error('pokemonData is undefined');
    }

  }, [pokemonData]);


  return (
    <div>
      
      <Link href={`${endpoints.navigatePokemonPage}${id}`}>
        <div
          className={`w-full max-w-[170px]  h-[250px] rounded overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer bg-gradient-to-b ${fromcolor} ${tocolor}`}          
        >

          <div className="flex h-full flex-col justify-center items-center">
            <div className='pt-5 h-3/4 '>
              <Image width={100} height={100} src={image ? image : ''} alt='image' className='object-contain h-full ' />
            </div>
            {isTitle && (
              <>
                <div className="font-bold text-xl mt-5 mb-2 px-3">{name}</div>
                <div className="text-gray-700 text-base px-3 pb-5 justify-center items-center">
                  <p className='text-center'>{id}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>

  );
};

export default Card;
