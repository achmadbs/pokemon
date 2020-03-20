import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Body, Text, StyledLink, WrapButton } from './style';
import { Grid, Container, Loader, Icon } from 'semantic-ui-react';

const PokemonList = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextPage, setNextPage] = useState([]);
  const [prevPage, setPrevPage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activePage]);

  const fetchData = async() => {
    setIsLoading(true);
    const pokeData = await axios.get(activePage);
    const pokeList = pokeData?.data || [];

    setData(pokeList.results);
    setNextPage(pokeList.next);
    setPrevPage(pokeList.previous);
    setIsLoading(false);
  }

  const handleNextPage = () => {
    setActivePage(nextPage);
  }

  const handlePrevPage = () => {
    setActivePage(prevPage);
  }

  const renderLoading = () => {
    return isLoading && ( 
      <Loader active size = 'massive' />
    );
  }
  
  const pokeList = () => {
    return (
      <Grid>
        <Grid.Row>
          {
            data.map(data => {
              const { name, url } = data;
              const pokeId = url.split('').splice(-3, 2).join('').replace('/','');
              return (
                <Grid.Column width={4} key={pokeId}>
                  <Card>
                    <StyledLink to={`/pokemon-details/${pokeId}`}>
                      <Text header># {pokeId}</Text>
                      {
                        isLoading? 
                          renderLoading() :
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`} alt="img"/>
                      }         
                      <Text>{name}</Text>
                    </StyledLink>
                  </Card>
                </Grid.Column>
              );
            })
          }
        </Grid.Row>
      </Grid>
    );
  }

  const renderPrevButton = () => {
    const hide = prevPage !== null;
    return hide &&(
      <WrapButton left>
        <button onClick={handlePrevPage}>
          <Icon name='angle left'/>
        </button>
      </WrapButton>
    );
  }

  const renderNextButton = () => {
    const hide = nextPage !== null;
    return hide &&(
      <WrapButton>
        <button onClick={handleNextPage}>
          <Icon name='angle right'/>
        </button>
      </WrapButton>
    );
  }

  return (
    <Body>
      <Container>
        {console.log(data)}
        {renderPrevButton()}
        {renderNextButton()}
        {pokeList()}
      </Container>
    </Body>
  );
}

export default PokemonList;
