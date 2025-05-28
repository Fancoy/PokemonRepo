'use client'
import PokemonsComp from "@/components/pokemonsComp";
import PokeNavBar from "@/components/pokeNavBarComp";
import PokemonCard from "@/model/pokemonCard";
import { useEffect, useState } from "react";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";

import { getPokemonTypes } from "@/utils/pokemonTypeUtils";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState<PokemonCard[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonCard[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  
  const POKEMON_PER_PAGE = 50;

  const fetchPokemonsFromJson = async () => {
    setLoading(true);
    try {
      console.log('Attempting to fetch /pokemons.json...');
      const response = await fetch('/pokemons.json');
      console.log('Response status:', response.status, response.statusText);
      
      if (response.ok) {
        const pokemonData: PokemonCard[] = await response.json();
        console.log('Loaded Pokemon from JSON:', pokemonData.length);
        console.log('Sample Pokemon:', pokemonData[0]);
        
        setAllPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } else {
        console.error('Failed to fetch pokemons.json:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokemon from JSON:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedPokemons = (pokemons: PokemonCard[], page: number) => {
    const startIndex = (page - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;
    const paginatedPokemons = pokemons.slice(startIndex, endIndex);
    
    setDisplayedPokemons(paginatedPokemons);
    setTotalPages(Math.ceil(pokemons.length / POKEMON_PER_PAGE));
  };

  useEffect(() => {
    fetchPokemonsFromJson();
  }, []);

  useEffect(() => {
    if (filteredPokemons.length > 0) {
      updateDisplayedPokemons(filteredPokemons, currentPage);
    }
  }, [filteredPokemons, currentPage]);

  const handleTypeFilter = (type: string | null) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filtering
    
    if (type === null) {
      setFilteredPokemons(allPokemons);
    } else {
      filterPokemonsByType(type);
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
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageJump = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div 
      className="min-vh-100"
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          minHeight: '100vh'
        }}
      >
        <PokeNavBar onTypeFilter={handleTypeFilter} selectedType={selectedType} />
        {displayedPokemons.length > 0 ? (
        <>
          <PokemonsComp pokemons={displayedPokemons}></PokemonsComp>
          
          <Container className="mb-4">
            <Row>
              <Col className="d-flex justify-content-center gap-2 align-items-center">
                <Button
                  variant="outline-primary"
                  onClick={handlePreviousPage}
                  disabled={loading || currentPage === 1}
                >
                  Previous
                </Button>

                <span className="mx-3">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="primary"
                  onClick={handleNextPage}
                  disabled={loading || currentPage === totalPages}
                >
                  Next
                </Button>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col className="text-center">
                <small className="text-muted">
                  Showing {displayedPokemons.length} of {filteredPokemons.length} Pokemon
                  {selectedType && ` (${selectedType}-type)`}
                  {" • "}
                  Page {currentPage} of {totalPages}
                </small>
              </Col>
            </Row>

            {/* Page number buttons for quick navigation */}
            {totalPages > 1 && (
              <Row className="mt-2">
                <Col className="d-flex justify-content-center gap-1 flex-wrap">
                  {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 10) {
                      pageNum = i + 1;
                    } else {
                      // Show pages around current page
                      const start = Math.max(1, currentPage - 4);
                      const end = Math.min(totalPages, start + 9);
                      pageNum = start + i;
                      if (pageNum > end) return null;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "primary" : "outline-secondary"}
                        size="sm"
                        onClick={() => handlePageJump(pageNum)}
                        disabled={loading}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </Col>
              </Row>
            )}
          </Container>
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
      </div>
    </div>
  );
}