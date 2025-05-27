import Pokemon from "@/model/pokemon";
import { Row, Col, Container, Image, ProgressBar, Card, ListGroup, Badge } from 'react-bootstrap';
import PokemonTypeBadgeComp from "@/components/pokemonTypeBadgeComp";

type Props = {
    pokemon: Pokemon;
}

export default function PokemonComponent(props: Props) {
    const { pokemon } = props;

    const getFamilyTag = (pokemon: Pokemon, evolution: string) => {
        if (evolution === pokemon.devolution) {
          return <Badge bg="danger">⬇️ Devolution</Badge>
        }
        if (evolution === pokemon.pokemonName) {
          return <Badge bg="primary">⭐ Current</Badge>
        }
        if (evolution === pokemon.evolution) {
          return <Badge bg="success">⬆️ Evolution</Badge>
        }
        return <></>
    }

    const getTypeEmoji = (type: string) => {
        const emojis: { [key: string]: string } = {
            'Water': '💧',
            'Fire': '🔥',
            'Grass': '🌱',
            'Electric': '⚡',
            'Psychic': '🔮',
            'Fighting': '👊',
            'Poison': '☠️',
            'Ground': '🌍',
            'Flying': '🪶',
            'Bug': '🐛',
            'Rock': '🪨',
            'Ghost': '👻',
            'Dragon': '🐉',
            'Dark': '🌑',
            'Steel': '⚔️',
            'Ice': '❄️',
            'Fairy': '🧚',
            'Normal': '⚪'
        };
        return emojis[type] || '❓';
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <h1 className="text-center text-primary display-4">🌟 {pokemon.pokemonName} 🌟</h1>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <Image 
                        src={pokemon.mainImage} 
                        alt="pokemonImage" 
                        thumbnail 
                        className="border border-warning border-5 rounded-circle"
                    />
                </Col>
                
                <Col>
                    <Card className="border-primary border-3">
                        <Card.Header className="bg-gradient-primary text-black text-center">
                            <h4>⚔️ Battle Power Stats ⚔️</h4>
                        </Card.Header>
                        <Card.Body className="bg-light">
                            <Row>
                                <Col>💨 Speed:</Col>
                                <Col><ProgressBar variant="info" now={pokemon.speed} label={`${pokemon.speed} 💨`} animated /></Col>
                            </Row>
                            <Row>
                                <Col>❤️ Health:</Col>
                                <Col><ProgressBar variant="danger" now={pokemon.healthPoints} label={`${pokemon.healthPoints} ❤️`} animated /></Col>
                            </Row>
                            <Row>
                                <Col>⚡ Attack:</Col>
                                <Col><ProgressBar variant="warning" now={pokemon.attack} label={`${pokemon.attack} ⚡`} animated /></Col>
                            </Row>
                            <Row>
                                <Col>🛡️ Defense:</Col>
                                <Col><ProgressBar variant="success" now={pokemon.defense} label={`${pokemon.defense} 🛡️`} animated /></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <Card className="border-info border-3">
                        <Card.Header className="bg-info text-black text-center">Pokémon Types</Card.Header>
                        <Card.Body className="bg-light text-center">
                            <div className="h4">
                                {pokemon.pokemonType.map((type, index) => (
                                    <span key={index} className="d-inline-block">
                                        <span className="h3">{getTypeEmoji(type)}</span>
                                        <PokemonTypeBadgeComp pokemonTypes={[type]} />
                                    </span>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card className="border-success border-3">
                        <Card.Header className="bg-success text-black text-center">🔄 Evolution Journey 🔄</Card.Header>
                        <ListGroup variant="flush">
                            {pokemon.evolutionFamily.map((evolution, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center bg-light">
                                    <span className="h5">🎯 {evolution}</span>
                                    {getFamilyTag(pokemon, evolution)}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}