import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsCategoriesSelector } from '../../../../app/selectors';
import { useCreateCardsCategoryMutation } from '../../../../app/services/cards-categories';
import cardsCategoriesSlice from '../../../../app/slices/cardsCategoriesSlice';
import { ICardsCategory } from '../../../../interfaces/common';
import PlusIcon from '../../../Icons/PlusIcon';

interface IProps {
  filterCardsCategories(cardsCategoryName: string): void;
  addCardsCategory: (cardsCategory: ICardsCategory) => void;
  cardsCategories: ICardsCategory[];
}

const SearchCardsCategories: FunctionComponent<IProps> = ({
  filterCardsCategories,
  addCardsCategory,
  cardsCategories,
}) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const [sendCreateCardsCategory, { data: createdCardsCategory, isSuccess }] =
    useCreateCardsCategoryMutation();

  // ~~~~~ Cmp state ~~~~~
  const [cardsCategoryName, setCardsCategoryName] = useState('');

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    if (createdCardsCategory) {
      addCardsCategory(createdCardsCategory);
    }
  }, [createdCardsCategory]);

  useEffect(() => {
    filterCardsCategories(cardsCategoryName);
  }, [cardsCategoryName]);

  // ~~~~~ Handlers ~~~~~
  const onCreateCardsCategory = () => {
    if (
      !cardsCategories.find(
        (cardsCategory) => cardsCategory.category === cardsCategoryName,
      )
    ) {
      sendCreateCardsCategory({
        category: cardsCategoryName,
      });
    }
  };
  const onCardsCategoryNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setCardsCategoryName(value);
  };
  const onClearCardsCategoryName = () => setCardsCategoryName('');

  return (
    <div>
      <input
        value={cardsCategoryName}
        onChange={onCardsCategoryNameChange}
        placeholder="New category..."
        className="pr-9 w-full bg-transparent border border-solid border-[#36363673] outline-none p-1 pl-3 rounded-md placeholder:text-gray-500 text-[#ffffffd0]  text-lg"
      />
      <PlusIcon onClick={onCreateCardsCategory} color="" className="" />
    </div>
  );
};

export default SearchCardsCategories;
