import React, { FunctionComponent } from 'react';
import { ICard } from '../../../interfaces/cards.interface';

interface IProps {
  card: ICard;
}

const Card: FunctionComponent<IProps> = ({ card }) => {
  return (
    <div className="w-[223px] p-3 border border-solid border-gray-500 rounded-md h-[400px]">
      <img
        className="object-cover h-[130px]"
        src={`http://localhost:4000/uploads/${card.imageName}`}
        alt=""
      />
      <p className="my-2 text-center text-xl">{card.title}</p>
      <p className="h-[186px] hide-scroll overflow-auto">{card.description}</p>
    </div>
  );
};

export default Card;
