import React, { FunctionComponent, useEffect, useState } from 'react';
import Cards from '../../Components/Cards';
import { ICard } from '../../interfaces/cards.interface';
import StyledHome from './styled';

interface IProps {}

const Home: FunctionComponent<IProps> = ({}) => {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/cards')
      .then((r) => r.json())
      .then((r) => {
        console.log({ r });

        setCards(r);
      });
  }, []);

  return (
    <StyledHome className="mt-5">
      <Cards cards={cards} />
    </StyledHome>
  );
};

export default Home;
