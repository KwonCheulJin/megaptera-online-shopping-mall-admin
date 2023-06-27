import styled from 'styled-components';
import { OrderOption } from '../types';

type Props = {
  options: OrderOption[]
}

const Container = styled.div`
  display: flex;
`;

const OptionsContainer = styled.div`
  display: flex;
  p {
    &:last-child {
      margin-left: 1rem;
    }
  }
`;

export default function Options({ options }:Props) {
  return (
    <Container>
      <p>(</p>
      <OptionsContainer>
        {options.map((option, index) => {
          if (index <= 0) {
            return (
              <p key={option.name}>
                {option.name}
                :
                {' '}
                {option.item.name}
                ,
              </p>
            );
          }
          return (
            <p key={option.name}>
              {option.name}
              :
              {' '}
              {option.item.name}
              {' '}
            </p>
          );
        })}
      </OptionsContainer>
      <p>)</p>
    </Container>
  );
}
