import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Body, DivWrap, Head, Wrapper, Text, Base } from './style';
import { Container, Grid, Card, Progress, Label, Loader } from 'semantic-ui-react';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

const PokemonDetails = ({ match }) => {
  const [pokeData, setPokeData] = useState([]);
  const [pokeStatusList, setPokeStatusList] = useState({
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: ''
  });
  const [desc, setDesc] = useState('');
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPokemonDetails();
  },[])

  const getPokemonDetails = async() => {
    const { id } = match.params;
    setIsLoading(true);
    const rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const detailsData = rawData?.data || [];
    const rawSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const description = rawSpecies?.data?.flavor_text_entries;

    let {
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense,
      descrip
    } = ''

    description.filter(desc => {
      if(desc.version.name === 'alpha-sapphire' && desc.language.name === 'en') {
        return descrip = desc.flavor_text
      }
    });

    const pokeType = detailsData.types.map(type => type.type.name)

    detailsData.stats.map(stat => {
      switch(stat.stat.name) {
        case 'hp':
          hp = stat.base_stat;
          break;
        case 'attack':
          attack = stat.base_stat;
          break;
        case 'defense':
          defense = stat.base_stat;
          break;
        case 'speed':
          speed = stat.base_stat;
          break;
        case 'special-attack':
          specialAttack = stat.base_stat;
          break;
        case 'special-defense':
          specialDefense = stat.base_stat;
          break;
        default:
          break;
      }
    });

    setPokeData(detailsData);
    setPokeStatusList({
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense
    });
    setDesc(descrip);
    setTypes(pokeType);
    setIsLoading(false);
  }

  const renderLoading = () => {
    return isLoading && (
      <Loader active size='massive'/>
    );
  }

  const pokemonDetail = () => {
    const { hp, attack, defense, speed, specialAttack, specialDefense } = pokeStatusList;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Grid.Row>
              <Base>Hp</Base>
            </Grid.Row>
            <Grid.Row>
              <Base>Attack</Base>
            </Grid.Row>
            <Grid.Row>
              <Base>Defense</Base>
            </Grid.Row>
            <Grid.Row>
              <Base>Speed</Base>
            </Grid.Row>
            <Grid.Row>
              <Base>SpecialAttack</Base>
            </Grid.Row>
            <Grid.Row>
              <Base>SpecialDefense</Base>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={9}>
            {
              isLoading ? renderLoading() : 
              <>
                <Grid.Row>
                  <Progress progress='value' value={hp} color='purple' size='small'/>
                </Grid.Row>
                <Grid.Row>
                  <Progress progress='value' value={attack} color='purple' size='small'/>
                </Grid.Row>
                  <Grid.Row>
                  <Progress progress='value' value={defense} color='purple' size='small'/>
                </Grid.Row>
                <Grid.Row>
                  <Progress progress='value' value={speed} color='purple' size='small'/>
                </Grid.Row>
                <Grid.Row>
                  <Progress progress='value' value={specialAttack} color='purple' size='small'/>
                </Grid.Row>
                <Grid.Row>
                  <Progress progress='value' value={specialDefense} color='purple' size='small'/>
                </Grid.Row>
              </>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  const pokeBaseStatus = () => {
    const { id, name } = pokeData
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
      <DivWrap>
        <Grid columns={16}>
          <Grid.Column width={5}>
            {
              isLoading?
                renderLoading() :
                  <img src={url} alt="pokemon" wrapped='true'/>
            }
          </Grid.Column>
          <Grid.Column width={11}>
            <Text>{name}</Text>
            {pokemonDetail()}
          </Grid.Column>
        </Grid>
      </DivWrap>
    );
  }

  const pokeStatus = () => {
    const { id } = pokeData;
    return (
      <Wrapper>
        <Card style={{width: '100%'}}>
          <Card.Content extra style={{backgroundColor: 'rgba(192, 192, 192, 0.2)',}}>
            <Grid>
              <Grid.Column width={2}>
                <Head># {id}</Head>
              </Grid.Column>
              <Grid.Column width={2} floated='right'>
                {
                  types.map(type => {
                    return (
                      <Label key={type} style={{backgroundColor: `#${TYPE_COLORS[type]}`,color: 'white', textTransform:'capitalize'}}>
                        {type}
                      </Label>
                    );
                  })
                }
              </Grid.Column>
            </Grid>
          </Card.Content>
            {pokeBaseStatus()}
            <Base desc>{desc}</Base>
        </Card>
      </Wrapper>     
    );
  }

  return (
    <Body>
      <Container>
        <div style={{height: '100vh'}}>
          {pokeStatus()}
        </div>
      </Container>
    </Body>
  )
}

export default PokemonDetails