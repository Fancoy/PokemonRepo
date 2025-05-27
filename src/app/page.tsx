'use client'
import PokemonsComp from "@/components/pokemonsComp";
import PokeNavBar from "@/components/pokeNavBarComp";
import PokemonCard from "@/model/pokemonCard";
import { useEffect, useState } from "react";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";

interface PokemonListResponse {
  items: PokemonCard[];
  nextPage?: string;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonCard[]>();
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(null);
  const [previousPageTokens, setPreviousPageTokens] = useState<(string | null)[]>([]);

  const fetchData = async (pageToken?: string) => {
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
        setPokemons(pokemons);
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

  const handleNextPage = () => {
    if (nextPageToken) {
      setPreviousPageTokens(prev => [...prev, currentPageToken]);
      fetchData(nextPageToken);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageTokens.length > 0) {
      const previousToken = previousPageTokens[previousPageTokens.length - 1];
      setPreviousPageTokens(prev => prev.slice(0, -1));
      fetchData(previousToken || undefined);
    } else {
      fetchData();
    }
  };

  const handleFirstPage = () => {
    setPreviousPageTokens([]);
    setCurrentPageToken(null);
    fetchData();
  };

  return (
    <>
      <PokeNavBar></PokeNavBar>
      {pokemons ? (
        <>
          <PokemonsComp pokemons={pokemons}></PokemonsComp>
          
          <Container className="mb-4">
            <Row>
              <Col className="d-flex justify-content-center gap-2">
                {/* First Page Button */}
                <Button
                  variant="outline-primary"
                  onClick={handleFirstPage}
                  disabled={loading || !currentPageToken}
                >
                  First
                </Button>

                {/* Previous Page Button */}
                <Button
                  variant="outline-primary"
                  onClick={handlePreviousPage}
                  disabled={loading || previousPageTokens.length === 0}
                >
                  Previous
                </Button>

                {/* Next Page Button */}
                <Button
                  variant="primary"
                  onClick={handleNextPage}
                  disabled={loading || !nextPageToken}
                >
                  Next
                </Button>
              </Col>
            </Row>

            {/* Page Info */}
            <Row className="mt-2">
              <Col className="text-center">
                <small className="text-muted">
                  {pokemons.length > 0 && (
                    <>
                      Showing {pokemons.length} Pokemon
                      {nextPageToken && " • More available"}
                      {!nextPageToken && currentPageToken && " • Last page"}
                    </>
                  )}
                </small>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Container>
          <Row className="justify-content-md-center p-2">
            <Spinner className='p-2' animation='border' role='status' />
          </Row>
          <Row className="justify-content-md-center p-2">
            Loading Pokémons...
          </Row>
        </Container>
      )}
    </>
  );
}