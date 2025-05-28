'use client'
import Pokemon from '@/model/pokemon';
import { useEffect, useState } from 'react';
import { Container, Image, Spinner} from 'react-bootstrap';
import PokemonComponent from './pokemon';
import PokeNavBar from '@/components/pokeNavBarComp';
import React from 'react';

type Params = {
    params: Promise<{ pokemon_id: string }>
}

export default function PokemonPage({ params }: Params) {
    const { pokemon_id } = React.use(params);
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [isPokemonLoaded, setPokemonLoaded] = useState(false);

    useEffect(() => {
        const fetchPokemonFromJson = async () => {
            try {
                const response = await fetch('/pokemons.json');
                if (response.ok) {
                    const allPokemons: Pokemon[] = await response.json();
                    const foundPokemon = allPokemons.find(p => 
                        p.pokemonNumber?.toString() === pokemon_id
                    );
                    
                    if (foundPokemon) {
                        setPokemon(foundPokemon);
                        console.log('Found Pokemon:', foundPokemon);
                    } else {
                        console.log('Pokemon not found with ID:', pokemon_id);
                        setPokemon(undefined);
                    }
                } else {
                    console.error('Failed to fetch pokemons.json');
                    setPokemon(undefined);
                }
            } catch (error) {
                console.error('Error loading Pokemon from JSON:', error);
                setPokemon(undefined);
            } finally {
                setPokemonLoaded(true);
            }
        };

        if (pokemon_id) {
            fetchPokemonFromJson();
        }
    }, [pokemon_id]);

    return (
        <>
            <PokeNavBar />
            <Container>
                {isPokemonLoaded ? (
                    pokemon ? (
                        <PokemonComponent pokemon={pokemon} />
                    ) : (
                        <div className="text-center">
                            <h3 className="text-danger">😵 Pokémon Not Found!</h3>
                            <p className="text-muted">
                                Could not find a Pokemon with ID: <strong>{pokemon_id}</strong>
                            </p>
                            <Image 
                                className="img-fluid rounded" 
                                src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png" 
                                alt="Pokemon not found"
                            />
                        </div>
                    )
                ) : (
                    <div className="text-center">
                        <Spinner animation="border" role="status" variant="primary" />
                        <h4>🔍 Loading Pokémon...</h4>
                        <p className="text-muted">Searching for Pokemon ID: {pokemon_id}</p>
                    </div>
                )}
            </Container>
        </>
    );
}