"use client";

import { Badge } from "react-bootstrap";

interface PokemonTypeBadgeCompProps {
   pokemonTypes: string[];
}

export default function PokemonTypeBadgeComp(props: PokemonTypeBadgeCompProps) {
   
   const getTypeStyle = (pokemonType: string) => {
       const typeStyles: { [key: string]: { bg?: string, style?: React.CSSProperties } } = {
           'Water': { bg: 'primary' },
           'Fire': { bg: 'danger' },
           'Grass': { bg: 'success' },
           'Electric': { bg: 'warning' },
           'Normal': { bg: 'secondary' },
           'Ice': { bg: 'info' },
           'Fighting': { bg: 'danger' },
           'Ground': { 
               style: { 
                   backgroundColor: '#8B4513', 
                   color: 'white',
                   border: 'none'
               } 
           },
           'Flying': { bg: 'info' },
           'Poison': { 
               style: { 
                   backgroundColor: '#8B3A9C', 
                   color: 'white',
                   border: 'none'
               } 
           },
           'Psychic': { 
               style: { 
                   backgroundColor: '#9932CC', 
                   color: 'white',
                   border: 'none'
               } 
           },
           'Bug': { bg: 'success' },
           'Rock': { 
               style: { 
                   backgroundColor: '#696969', 
                   color: 'white',
                   border: 'none'
               } 
           },
           'Ghost': { bg: 'dark' },
           'Dragon': { bg: 'primary' },
           'Dark': { bg: 'dark' },
           'Steel': { bg: 'secondary' },
           'Fairy': { 
               style: { 
                   backgroundColor: '#FF69B4', 
                   color: 'white',
                   border: 'none'
               } 
           }
       };
       
       return typeStyles[pokemonType] || { bg: 'secondary' };
   };

   return (
       <span className="d-flex flex-wrap gap-1">
           {props.pokemonTypes?.map((pokemonType, index) => {
               const typeStyle = getTypeStyle(pokemonType);
               
               if (typeStyle.style) {
                   return (
                       <Badge 
                           key={index} 
                           style={typeStyle.style}
                           className="me-1"
                       >
                           {pokemonType}
                       </Badge>
                   );
               } else {
                   return (
                       <Badge 
                           key={index} 
                           bg={typeStyle.bg}
                           className="me-1"
                       >
                           {pokemonType}
                       </Badge>
                   );
               }
           })}
       </span>
   );
}