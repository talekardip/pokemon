'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface ModalCardProps {
  image?:any;
  title?:any;
  pokemonData?: any;
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

const ModalImageCard: React.FC<ModalCardProps> = ({ image,title,pokemonData}) => {
  const [fromcolor,setFromColor] = useState<any>();
  const [tocolor,setToColor] = useState<any>();
  // switch (pokemonData?.types[0]?.toLowerCase()) {
  //   case 'normal':
  //     fromcolor = 'from-NORMAL';
  //     break;
  //   case 'ice':
  //     fromcolor = 'from-ICE';
  //     break;
  //   case 'fighting':
  //     fromcolor = 'from-FIGHTING';
  //     break;
  //   case 'flying':
  //     fromcolor = 'from-FLYING';
  //     break;
  //   case 'poison':
  //     fromcolor = 'from-POISON';
  //     break;
  //   case 'ground':
  //     fromcolor = 'from-GROUND';
  //     break;
  //   case 'rock':
  //     fromcolor = 'from-ROCK';
  //     break;
  //   case 'bug':
  //     fromcolor = 'from-BUG';
  //     break;
  //   case 'ghost':
  //     fromcolor = 'from-GHOST';
  //     break;
  //   case 'steel':
  //     fromcolor = 'from-STEEL';
  //     break;
  //   case 'fire':
  //     fromcolor = 'from-FIRE';
  //     break;
  //   case 'water':
  //     fromcolor = 'from-WATER';
  //     break;
  //   case 'grass':
  //     fromcolor = 'from-GRASS';
  //     break;
  //   case 'electric':
  //     fromcolor = 'from-ELECTRIC';
  //     break;
  //   case 'psychic':
  //     fromcolor = 'from-PSYCHIC';
  //     break;
  //   case 'dragon':
 
  //     fromcolor = 'from-DRAGON';
  //     break;
  //   case 'dark':
  //     fromcolor = 'from-DARK';
  //     break;
  //   case 'fairy':
  //     fromcolor = 'from-FAIRY';
  //     break;
  //   default:
  //     fromcolor = '';
  //     break;
  // }
 
 
 
  // switch (pokemonData?.types[1]?.toLowerCase() || pokemonData?.types[0]?.toLowerCase()) {
  //   case 'normal':
  //     tocolor = 'to-NORMAL';
  //     break;
  //   case 'ice':
  //     tocolor = 'to-ICE';
  //     break;
  //   case 'fighting':
  //     tocolor = 'to-FIGHTING';
  //     break;
  //   case 'flying':
  //     tocolor = 'to-FLYING';
  //     break;
  //   case 'poison':
  //     tocolor = 'to-POISON';
  //     break;
  //   case 'ground':
  //     tocolor = 'to-GROUND';
  //     break;
  //   case 'rock':
  //     tocolor = 'to-ROCK';
  //     break;
  //   case 'bug':
  //     tocolor = 'to-BUG';
  //     break;
  //   case 'ghost':
  //     tocolor = 'to-GHOST';
  //     break;
  //   case 'steel':
  //     tocolor = 'to-STEEL';
  //     break;
  //   case 'fire':
  //     tocolor = 'to-FIRE';
  //     break;
  //   case 'water':
  //     tocolor = 'to-WATER';
  //     break;
  //   case 'grass':
  //     tocolor = 'to-GRASS';
  //     break;
  //   case 'electric':
  //     tocolor = 'to-ELECTRIC';
  //     break;
  //   case 'psychic':
  //     tocolor = 'to-PSYCHIC';
  //     break;
  //   case 'dragon':
 
  //   tocolor = 'to-DRAGON';
  //     break;
  //   case 'dark':
  //     tocolor = 'to-DARK';
  //     break;
  //   case 'fairy':
  //     tocolor = 'to-FAIRY';
  //     break;
  //   default:
  //     tocolor = '';
  //     break;
  // }
  useEffect(() => {
    if (pokemonData) {
      setFromColor(`from-${getColor(pokemonData?.types[0]?.toLowerCase())}`)
      setToColor(`to-${getColor(pokemonData?.types[1]?.toLowerCase() || pokemonData?.types[0]?.toLowerCase())}`)
    } else {
      console.error('pokemonData is undefined');
    }

  }, [pokemonData]);
  return (
    
    <div>

      <Link href={`/pokemon/${pokemonData?pokemonData.id:''}`}>
        <div
          className={`max-w-[170px] md:w-[200px] sm:w-[200px] h-[250px] rounded overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer bg-gradient-to-b ${fromcolor} ${tocolor}`}
        >

          <div className="flex h-full flex-col justify-center items-center">
            <div className='pt-5 h-3/4 '>
              <Image width={100} height={100} src={ pokemonData && pokemonData.image?pokemonData.image:""} alt='image' className='object-contain h-full ' />
            </div>
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ModalImageCard;
