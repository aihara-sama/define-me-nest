import React, { FunctionComponent } from 'react';
import { ICardsCategory } from '../../interfaces/common';
import CardsCategoryItem from './CardsCategoryItem';

interface IProps {
  cardsCategories: ICardsCategory[];
  editCardsCategory: (cardsCategory: ICardsCategory) => void;
  removeCardsCategory: (cardsCategoryId: number) => void;
  closePopover: () => void;
}

const CardsCategoriesList: FunctionComponent<IProps> = ({
  cardsCategories,
  removeCardsCategory,
  editCardsCategory,
  closePopover,
}) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~

  // ~~~~~ Cmp state ~~~~~

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~

  // ~~~~~ Handlers ~~~~~

  // ~~~~~ Vars ~~~~~

  const topCardsCategoryItem = cardsCategories.find(
    (cardsCategory) => cardsCategory.category === 'All',
  );

  return (
    <ul className="w-72 rounded-md overflow-auto hide-scroll">
      {topCardsCategoryItem && (
        <CardsCategoryItem
          disableCRUDBtns
          closePopover={closePopover}
          key={topCardsCategoryItem.id}
          removeCardsCategory={removeCardsCategory}
          editCardsCategory={editCardsCategory}
          cardsCategory={topCardsCategoryItem}
        />
      )}
      {cardsCategories
        .filter((cardsCategory) => cardsCategory.category !== 'All')
        .map((cardsCategory) => (
          <CardsCategoryItem
            closePopover={closePopover}
            key={cardsCategory.id}
            removeCardsCategory={removeCardsCategory}
            editCardsCategory={editCardsCategory}
            cardsCategory={cardsCategory}
          />
        ))}
    </ul>
  );
};

export default CardsCategoriesList;
