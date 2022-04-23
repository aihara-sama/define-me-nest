import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { cardsSelector } from '../../../../app/selectors';

interface IProps {
  onInputChange: (e: SyntheticEvent) => void;
}

const Description: FunctionComponent<IProps> = ({ onInputChange }) => {
  const { draftEditCard } = useSelector(cardsSelector);

  return (
    <div className={`relative transition-all duration-300`}>
      <p className=" mb-3">Description</p>
      <div className="mb-5">
        <textarea
          value={draftEditCard.description}
          name="description"
          onChange={onInputChange}
          placeholder="An atom is..."
          className="min-h-[287px] hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400"
        ></textarea>
      </div>
    </div>
  );
};

export default Description;
