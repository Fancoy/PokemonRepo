"use client";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, NavDropdown } from 'react-bootstrap';

interface PokeNavBarCompProps {
  onTypeFilter?: (type: string | null) => void;
  selectedType?: string | null;
}

export default function PokeNavBarComp({ onTypeFilter, selectedType }: PokeNavBarCompProps = {}) {
  const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
    'Rock', 'Ghost', 'Dragon', 'Steel', 'Fairy'
  ];

  const getCustomStyle = (type: string): React.CSSProperties => {
    const customColors: { [key: string]: React.CSSProperties } = {
      'Poison': { backgroundColor: '#8b3a9c', color: 'white' },
      'Ground': { backgroundColor: '#8b4513', color: 'white' },
      'Psychic': { backgroundColor: '#9932cc', color: 'white' },
      'Rock': { backgroundColor: '#696969', color: 'white' },
      'Fairy': { backgroundColor: '#ff69b4', color: 'white' },
      'Normal': { backgroundColor: '#A8A878', color: 'white' },
      'Fire': { backgroundColor: '#F08030', color: 'white' },
      'Water': { backgroundColor: '#6890F0', color: 'white' },
      'Electric': { backgroundColor: '#F8D030', color: 'black' },
      'Grass': { backgroundColor: '#78C850', color: 'white' },
      'Ice': { backgroundColor: '#98D8D8', color: 'black' },
      'Fighting': { backgroundColor: '#C03028', color: 'white' },
      'Flying': { backgroundColor: '#A890F0', color: 'white' },
      'Bug': { backgroundColor: '#A8B820', color: 'white' },
      'Ghost': { backgroundColor: '#705898', color: 'white' },
      'Dragon': { backgroundColor: '#7038F8', color: 'white' },
      'Steel': { backgroundColor: '#B8B8D0', color: 'black' }
    };
    
    return customColors[type] || { backgroundColor: '#68A090', color: 'white' };
  };

  const handleTypeClick = (type: string) => {
    if (onTypeFilter) {
      if (selectedType === type) {
        onTypeFilter(null);
      } else {
        onTypeFilter(type);
      }
    }
  };

  const handleAllClick = () => {
    if (onTypeFilter) {
      onTypeFilter(null);
    }
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        className="shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%,rgb(255, 0, 0) 100%)',
          borderBottom: '3px solid #ffd700'
        }}
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand 
            href='/' 
            className="fw-bold fs-3"
            style={{
              color: '#ffd700',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px'
            }}
          >
           Pokédex
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              borderColor: '#ffd700',
              backgroundColor: 'rgba(255, 215, 0, 0.1)'
            }}
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                href='/'
                className={`px-3 py-2 mx-1 rounded ${!selectedType ? 'active' : ''}`}
                style={{
                  color: !selectedType ? '#ffd700' : '#e0e0e0',
                  fontWeight: !selectedType ? 'bold' : 'normal',
                  backgroundColor: !selectedType ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                  transition: 'all 0.3s ease',
                  border: !selectedType ? '1px solid #ffd700' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!selectedType) return;
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffd700';
                }}
                onMouseLeave={(e) => {
                  if (!selectedType) return;
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#e0e0e0';
                }}
              >
                Home
              </Nav.Link>
              
              {onTypeFilter && (
                <>
                  <style jsx>{`
                    .custom-dropdown .dropdown-menu {
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                      border: 2px solid #ffd700 !important;
                      border-radius: 8px !important;
                      padding: 8px 0 !important;
                      box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
                      margin-top: 8px !important;
                    }
                    
                    .custom-dropdown .dropdown-item {
                      background-color: transparent !important;
                      color: #e0e0e0 !important;
                      border: 1px solid transparent !important;
                      margin: 2px 8px !important;
                      border-radius: 6px !important;
                      padding: 8px 16px !important;
                      transition: all 0.3s ease !important;
                    }
                    
                    .custom-dropdown .dropdown-item:hover {
                      background-color: rgba(255, 255, 255, 0.1) !important;
                      border-color: rgba(255, 215, 0, 0.5) !important;
                      color: #ffd700 !important;
                    }
                    
                    .custom-dropdown .dropdown-item.active-custom {
                      background-color: rgba(255, 215, 0, 0.3) !important;
                      color: #ffd700 !important;
                      font-weight: bold !important;
                      border: 1px solid #ffd700 !important;
                    }
                    
                    .custom-dropdown .dropdown-divider {
                      border-color: #ffd700 !important;
                      margin: 8px 16px !important;
                      opacity: 0.5 !important;
                    }
                  `}</style>
                  
                  <NavDropdown 
                    title={
                      <span style={{ color: '#e0e0e0', fontWeight: '500' }}>
                       Filter by Type
                      </span>
                    }
                    id="type-dropdown"
                    className="mx-1 custom-dropdown"
                  >
                    <NavDropdown.Item 
                      onClick={handleAllClick}
                      className={!selectedType ? 'active-custom' : ''}
                    >
                     Show All Pokemon
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    
                    {pokemonTypes.map((type) => (
                      <NavDropdown.Item
                        key={type}
                        onClick={() => handleTypeClick(type)}
                        className={`d-flex align-items-center ${selectedType === type ? 'active-custom' : ''}`}
                      >
                        <span 
                          className="badge rounded-pill px-2 py-1 me-3"
                          style={{
                            fontSize: '0.7rem',
                            minWidth: '65px',
                            textAlign: 'center',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            ...getCustomStyle(type)
                          }}
                        >
                          {type}
                        </span>
                        <span style={{ fontSize: '0.9rem' }}>
                          {type} Type
                        </span>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </>
              )}

              {selectedType && (
                <Nav.Link 
                  className="d-flex align-items-center px-3 py-2 mx-1"
                  style={{
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderRadius: '20px',
                    border: '1px solid #ffd700'
                  }}
                >
                  <span 
                    style={{ 
                      color: '#ffd700', 
                      marginRight: '8px',
                      fontWeight: '500' 
                    }}
                  >
                    🔍 Filtering:
                  </span>
                  <span 
                    className="badge px-3 py-2 rounded-pill"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      ...getCustomStyle(selectedType)
                    }}
                  >
                    {selectedType}
                  </span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}