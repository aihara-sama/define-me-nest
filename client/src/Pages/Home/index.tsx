import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import Cards from '../../Components/Cards';
// import Cards from '../../Components/Cards';
import { ICard } from '../../interfaces/cards.interface';
// import StyledHome from './styled';

interface IProps {}

const Home: FunctionComponent<IProps> = ({}) => {
  // Redux state
  const { items } = useAppSelector((state) => state.cards);

  return (
    <div className="mt-5">
      <Cards cards={items} />
    </div>
  );
};

export default Home;
