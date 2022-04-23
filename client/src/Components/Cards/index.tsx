import React, { FunctionComponent } from 'react';
import { ICard } from '../../interfaces/cards.interface';
import Card from './ViewVard';

interface IProps {
  cards: ICard[];
}

const Cards: FunctionComponent<IProps> = ({ cards }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7">
      {cards.map((card, idx) => (
        <Card key={idx} card={card} />
      ))}
    </div>
  );
};

export default Cards;
