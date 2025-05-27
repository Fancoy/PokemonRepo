'use client'
import PokemonsComp from "@/components/pokemonsComp";
import PokeNavBar from "@/components/pokeNavBarComp";
import PokemonCard from "@/model/pokemonCard";
import { useEffect, useState } from "react";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";

import { getPokemonTypes } from "@/utils/pokemonTypeUtils";

interface PokemonListResponse {
  items: PokemonCard[];
  nextPage?: string;
}

export default function Home() {
  const [allPokemons, setAllPokemons] = useState<PokemonCard[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(null);
  const [previousPageTokens, setPreviousPageTokens] = useState<(string | null)[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [allPokemonsLoaded, setAllPokemonsLoaded] = useState(false);

  const fetchAllPokemons = async () => {
    setLoading(true);
    try {
      let allPokemonData: PokemonCard[] = [];
      let currentToken: string | null = null;
      
      do {
        let url = '/api/pokemon';
        if (currentToken) {
          url += `?nextPage=${encodeURIComponent(currentToken)}`;
        }

        const resp = await fetch(url);
        if (resp.ok) {
          const response: PokemonListResponse = await resp.json();
          allPokemonData = [...allPokemonData, ...response.items];
          currentToken = response.nextPage || null;
        } else {
          break;
        }
      } while (currentToken);

      setAllPokemons(allPokemonData);
      setFilteredPokemons(allPokemonData);
      setAllPokemonsLoaded(true);
      console.log('Loaded all Pokemon:', allPokemonData.length);
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (pageToken?: string) => {
    if (selectedType) {
      return;
    }

    setLoading(true);
    try {
      let url = '/api/pokemon';
      if (pageToken) {
        url += `?nextPage=${encodeURIComponent(pageToken)}`;
      }

      const resp = await fetch(url);
      if (resp.ok) {
        const response: PokemonListResponse = await resp.json();
        const pokemons: PokemonCard[] = response.items;
        console.log(pokemons);
        setFilteredPokemons(pokemons);
        setNextPageToken(response.nextPage || null);
        setCurrentPageToken(pageToken || null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeFilter = (type: string | null) => {
    setSelectedType(type);
    
    if (type === null) {
      if (allPokemonsLoaded && allPokemons.length > 0) {
        const pageSize = 50;
        setFilteredPokemons(allPokemons.slice(0, pageSize));
        setPreviousPageTokens([]);
        setCurrentPageToken(null);
      } else {
        fetchData();
      }
    } else {
      if (!allPokemonsLoaded) {
        fetchAllPokemons().then(() => {
          filterPokemonsByType(type);
        });
      } else {
        filterPokemonsByType(type);
      }
      setPreviousPageTokens([]);
      setCurrentPageToken(null);
      setNextPageToken(null);
    }
  };

  const filterPokemonsByType = (type: string) => {
    if (!allPokemons.length) return;
    
    console.log('Filtering by type:', type);
    
    const filtered = allPokemons.filter(pokemon => {
      const pokemonTypes = pokemon.pokemonType || getPokemonTypes(pokemon.pokemonName);
      const hasType = pokemonTypes.includes(type);
      
      console.log(`${pokemon.pokemonName} types:`, pokemonTypes, 'has', type, ':', hasType);
      return hasType;
    });
    
    setFilteredPokemons(filtered);
    console.log(`Filtered ${filtered.length} Pokemon of type ${type}`);
  };

  const handleNextPage = () => {
    if (selectedType || !nextPageToken) return;
    
    setPreviousPageTokens(prev => [...prev, currentPageToken]);
    fetchData(nextPageToken);
  };

  const handlePreviousPage = () => {
    if (selectedType) return;
    
    if (previousPageTokens.length > 0) {
      const previousToken = previousPageTokens[previousPageTokens.length - 1];
      setPreviousPageTokens(prev => prev.slice(0, -1));
      fetchData(previousToken || undefined);
    } else {
      fetchData();
    }
  };

  const handleFirstPage = () => {
    if (selectedType) return;
    
    setPreviousPageTokens([]);
    setCurrentPageToken(null);
    fetchData();
  };

  useEffect(() => {
    if (selectedType && !allPokemonsLoaded) {
      fetchAllPokemons();
    }
  }, [selectedType, allPokemonsLoaded]);

  return (
    <>
      <PokeNavBar onTypeFilter={handleTypeFilter} selectedType={selectedType} />
      {filteredPokemons.length > 0 ? (
        <>
          <PokemonsComp pokemons={filteredPokemons}></PokemonsComp>
          
          {!selectedType && (
            <Container className="mb-4">
              <Row>
                <Col className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={handleFirstPage}
                    disabled={loading || !currentPageToken}
                  >
                    First
                  </Button>

                  <Button
                    variant="outline-primary"
                    onClick={handlePreviousPage}
                    disabled={loading || previousPageTokens.length === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handleNextPage}
                    disabled={loading || !nextPageToken}
                  >
                    Next
                  </Button>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col className="text-center">
                  <small className="text-muted">
                    {filteredPokemons.length > 0 && (
                      <>
                        Showing {filteredPokemons.length} Pokemon
                        {nextPageToken && " • More available"}
                        {!nextPageToken && currentPageToken && " • Last page"}
                      </>
                    )}
                  </small>
                </Col>
              </Row>
            </Container>
          )}

          {selectedType && (
            <Container className="mb-4">
              <Row>
                <Col className="text-center">
                  <small className="text-muted">
                    Showing {filteredPokemons.length} {selectedType}-type Pokemon
                  </small>
                </Col>
              </Row>
            </Container>
          )}
        </>
      ) : loading ? (
        <Container>
          <Row className="justify-content-md-center p-2">
            <Spinner className='p-2' animation='border' role='status' />
          </Row>
          <Row className="justify-content-md-center p-2">
            {selectedType ? `Loading ${selectedType} Pokemon...` : 'Loading Pokémons...'}
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="justify-content-md-center p-2">
            <h4>No Pokemon found</h4>
          </Row>
          {selectedType && (
            <Row className="justify-content-md-center p-2">
              <p>No {selectedType}-type Pokemon available</p>
            </Row>
          )}
        </Container>
      )}
    </>
  );
}