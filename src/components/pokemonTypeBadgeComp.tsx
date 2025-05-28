"use client";

interface PokemonTypeBadgeCompProps {
   pokemonTypes: string[];
}

export default function PokemonTypeBadgeComp(props: PokemonTypeBadgeCompProps) {
   
   const getTypeColor = (pokemonType: string): string => {
       const typeColors: { [key: string]: string } = {
           'Normal': '#A8A878',
           'Fire': '#F08030',
           'Water': '#6890F0',
           'Electric': '#F8D030',
           'Grass': '#78C850',
           'Ice': '#98D8D8',
           'Fighting': '#C03028',
           'Poison': '#8b3a9c',
           'Ground': '#8b4513',
           'Flying': '#A890F0',
           'Psychic': '#9932cc',
           'Bug': '#A8B820',
           'Rock': '#696969',
           'Ghost': '#705898',
           'Dragon': '#7038F8',
           'Dark': '#705848',
           'Steel': '#B8B8D0',
           'Fairy': '#ff69b4'
       };
       
       return typeColors[pokemonType] || '#68A090';
   };

   const getTextColor = (pokemonType: string): string => {
       return ['Electric', 'Ice', 'Steel'].includes(pokemonType) ? 'black' : 'white';
   };

   return (
       <div className="d-flex flex-wrap gap-1">
           {props.pokemonTypes?.map((pokemonType, index) => (
               <div
                   key={index}
                   style={{
                       backgroundColor: getTypeColor(pokemonType),
                       color: getTextColor(pokemonType),
                       fontSize: '12px',
                       fontWeight: 'bold',
                       textTransform: 'uppercase',
                       borderRadius: '3px',
                       marginRight: '3px'
                       
                   }}
               >
                   {pokemonType}
               </div>
           ))}
       </div>
   );
}