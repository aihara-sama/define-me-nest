import React, { FunctionComponent } from 'react';
import { ICard } from '../../interfaces/cards.interface';
import Card from './Card';

interface IProps {
  cards: ICard[];
}

const Cards: FunctionComponent<IProps> = ({ cards }) => {
  return (
    <div className="flex gap-7 flex-wrap">
      {cards.map((card, idx) => (
        <Card key={idx} card={card} />
      ))}
    </div>
  );
};

export default Cards;
