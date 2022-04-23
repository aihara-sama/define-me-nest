import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { cardsSelector } from '../../../../app/selectors';

interface IProps {
  onInputChange: (e: SyntheticEvent) => void;
}

const Category: FunctionComponent<IProps> = ({ onInputChange }) => {
  const { draftEditCard } = useSelector(cardsSelector);

  return (
    <div className={`relative transition-all duration-300`}>
      <p className=" mb-3">Category</p>
      <div className="mb-5">
        <input
          value={draftEditCard.category}
          name="category"
          onChange={onInputChange}
          placeholder="Chemistry..."
          className="hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400"
        />
      </div>
    </div>
  );
};

export default Category;
