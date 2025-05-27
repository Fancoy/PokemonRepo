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
        const fetchData = async () => {
            const resp = await fetch('/api/pokemon/' + pokemon_id);
            if (resp.ok) {
                const pokemon: Pokemon = await resp.json();
                setPokemon(pokemon);
            }
            setPokemonLoaded(true);
        };

        fetchData()
            .catch(error => {
                console.error(error);
                setPokemonLoaded(true);
            });
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
                    </div>
                )}
            </Container>
        </>
    );
}