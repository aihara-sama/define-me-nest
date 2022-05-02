import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { cardsSelector } from '../../../../app/selectors';

interface IProps {
  onInputChange: (e: SyntheticEvent) => void;
  disabled: boolean;
}

const Title: FunctionComponent<IProps> = ({ onInputChange }) => {
  // Redux state
  const { draftCreateCard } = useSelector(cardsSelector);

  return (
    <div className={`relative transition-all duration-300`}>
      <p className="text-lg mb-3">Title</p>
      <div className="mb-5">
        <input
          value={draftCreateCard.title}
          name="title"
          onChange={onInputChange}
          placeholder="Atom..."
          className="hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400 text-lg"
        />
      </div>
    </div>
  );
};

export default Title;
