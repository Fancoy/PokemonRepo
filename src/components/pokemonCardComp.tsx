"use client";

import PokemonCard from "@/model/pokemonCard";
import { Card } from "react-bootstrap";
import PokemonTypeBadgeComp from "./pokemonTypeBadgeComp";
import { getPokemonTypes } from "@/utils/pokemonTypeUtils";

interface PokemonCardCompProps {
   pokemon: PokemonCard;
}

export default function PokemonCardComp(props: PokemonCardCompProps) {
   const pokemonUrl = `/pokemon/${props.pokemon.pokemonNumber}`;
   
   const pokemonTypes = props.pokemon.pokemonType || getPokemonTypes(props.pokemon.pokemonName);

   return (
       <a href={pokemonUrl}>
           <Card>
               <Card.Img variant="top" src={props.pokemon.mainImage} alt={props.pokemon.pokemonName} />
               <Card.Body>
                   <Card.Title>{props.pokemon.pokemonName}</Card.Title>
                   <div className="mt-2">
                       <PokemonTypeBadgeComp pokemonTypes={pokemonTypes} />
                   </div>
               </Card.Body>
           </Card>
       </a>
   );
}