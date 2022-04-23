import { ButtonBase } from '@mui/material';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSelector, modalsSelector } from '../../../app/selectors';
import { useRemoveCardMutation } from '../../../app/services/cards-service';
import cardsSlice from '../../../app/slices/cardsSlice';
import modalsSlice from '../../../app/slices/modalSlice';
import { ICard } from '../../../interfaces/cards.interface';

interface IProps {
  card: ICard;
}

const Card: FunctionComponent<IProps> = ({ card }) => {
  // Redux state
  const { draftEditCard } = useSelector(cardsSelector);
  const { open } = useSelector(modalsSelector);

  // Hooks
  const dispatch = useDispatch();
  const [removeCard, { isSuccess }] = useRemoveCardMutation();

  // Handlers
  const onEditCardClick = () => {
    dispatch(
      cardsSlice.actions.setDraftEditCard({
        ...card,
      }),
    );
    dispatch(modalsSlice.actions.openModal('edit-card'));
  };

  const onRemoveCard = () => {
    removeCard(card.id);
  };

  useEffect(() => {
    isSuccess && dispatch(cardsSlice.actions.removeCard(card.id));
  }, [isSuccess]);

  return (
    <div className=" p-3 border border-solid border-gray-500 rounded-md sm:h-[600px] ">
      <img
        className="object-cover w-full md:h-48 sm:h-56"
        src={`http://localhost:4000/uploads/${card.imageName}`}
        alt=""
      />
      <p className="my-2 text-center text-xl">{card.title}</p>
      <p className="sm:h-[300px] md:h-[208px] hide-scroll overflow-auto">
        {card.description}
      </p>
      <hr className="my-4 border-gray-800" />

      <div className="flex gap-4 flex-col justify-between">
        <ButtonBase
          onClick={onEditCardClick}
          className="w-full text-lg transition-colors duration-200 border border-solid border-blue-500 px-8 py-1 rounded-md text-blue-500 hover:bg-sky-700 hover:text-white"
        >
          Edit
        </ButtonBase>
        <ButtonBase
          onClick={onRemoveCard}
          className="w-full text-lg ml-auto transition-colors duration-200 border border-solid border-red-500 px-8 py-1 rounded-md text-red-500 hover:bg-red-900 hover:text-white"
        >
          Remove
        </ButtonBase>
      </div>
    </div>
  );
};

export default Card;
