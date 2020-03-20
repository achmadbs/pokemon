import styled from 'styled-components';
import pokemon from '../../Pokemon.jpg';

export const Body = styled.div({
  background: `url(${pokemon}) no-repeat center`,
  backgroundSize: 'cover'
});

export const Wrapper = styled.div({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center'
});

export const DivWrap = styled.div({
  borderTop: '0.2px solid',
  '& img': {
    backgroundColor: '#fff',
    objectFit: 'contain',
    objectPosition: '30px 0',
    width: 300,
  },
});

export const Base = styled.p(props => ({
  paddingBottom: '0.89em',
  textIndent: props.desc? '1em' : '',
  wordWrap: 'break-word'
}))

export const Text = styled.p({
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontSize: 24,
  paddingTop: '1em'
});

export const Head = styled.p({
  textIndent: '1em',
  fontWeight: 'bold',
  fontSize: 20,
  color: 'black'
});