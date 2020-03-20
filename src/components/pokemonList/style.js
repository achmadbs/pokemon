import styled from 'styled-components';
import pokemon from '../../Pokemon.jpg';
import { Link } from 'react-router-dom';

export const Card = styled.div({
  width: '100%',
  display: 'grid',
  position: 'relative',
  backgroundColor: '#f4f4f4',
  opacity: 0.9,
  borderRadius: 8,
  margin: '16px 0',
  transition: 'transform',
  ':hover': {
    transform: 'scale(1.1)',
    opacity: 1
  },
  '& img': {
    objectFit: 'scale-down',
    display: 'block',
    margin: '20px auto'
  }
});

export const Text = styled.p(props => ({
  textAlign: props.header? 'align-left' : 'center',
  fontWeight: 'bold',
  padding: props.header? '8px 0px 0px' : '0px 0px 16px',
  textTransform: 'capitalize',
  textIndent: props.header? '1.5em' : 0,
  fontSize: props.header? 20 : '',
  borderBottom: props.header? '1px solid' : '',
  backgroundColor: props.header? 'rgba(192, 192, 192, 0.2)' : ''
}));

export const Body = styled.div({
  background: `url(${pokemon}) no-repeat center`,
  backgroundSize: 'cover'
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'black',
  '&:hover':{
    textDecoration: 'none',
    color: 'black'
  }
});

export const WrapButton = styled.div(props => ({
  verticalAlign: 'center',
  position: 'relative',
  '& button':{
    position: 'absolute',
    top: 0,
    left: -50,
    transform: props.left ? 'translateY(350%) translateX(-50%)' : 'translateY(350%) translateX(840%)',
    fontSize: 100,
    zIndex: 2,
    opacity: 0.2,
    borderRadius: 80,
  },
  '& button:hover': {
    opacity: 0.7
  }
}));