import { ClickAwayListener, Fade, Paper, Popper } from '@mui/material';
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import {
  useCreateCardsCategoryMutation,
  useGetCardsCategoriesQuery,
} from '../../../../app/services/cards-categories';
import { setInputValue } from '../../../../helpers';
import { ICardsCategory } from '../../../../interfaces/common';
import CardsCategoriesList from '../../../CardsCategoriesList';
import CloseIcon from '../../../Icons/CloseIcon';
import PlusIcon from '../../../Icons/PlusIcon';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  anchorEl: Element | null;
}

// This component CRUDs cards categories
const CardsCategoriesPopup: FunctionComponent<IProps> = ({
  open,
  setOpen,
  anchorEl,
}) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const { data: fetchedCardsCategories = [] } = useGetCardsCategoriesQuery();
  const [sendCreateCardsCategory, { data: createdCardsCategory, isSuccess }] =
    useCreateCardsCategoryMutation();

  // ~~~~~ Cmp state ~~~~~
  const [cardsCategories, setCardsCategories] = useState<ICardsCategory[]>([]);
  const [cardsCategoryNameInput, setCardsCategoryNameInput] = useState('');

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    setCardsCategories(fetchedCardsCategories);
  }, [fetchedCardsCategories]);

  useEffect(() => {
    if (createdCardsCategory) {
      addCardsCategory(createdCardsCategory);
    }
  }, [createdCardsCategory]);
  // ~~~~~ Handlers ~~~~~

  const handleSendCreateCardsCategory = (e: SyntheticEvent) => {
    if (doesCardsCategoryExist()) return;
    if (!cardsCategoryNameInput.length) return;

    sendCreateCardsCategory({
      category: cardsCategoryNameInput,
    });

    e.preventDefault();
  };
  const addCardsCategory = (cardsCategory: ICardsCategory) => {
    setCardsCategories((_cardsCategories) => [
      ..._cardsCategories,
      cardsCategory,
    ]);
  };
  const editCardsCategory = (cardsCategory: ICardsCategory) => {
    setCardsCategories((_cardsCategories) =>
      _cardsCategories.map((_cardsCategory) => {
        if (cardsCategory.id === _cardsCategory.id) {
          _cardsCategory = { ...cardsCategory };
        }
        return _cardsCategory;
      }),
    );
  };
  const removeCardsCategory = (cardsCategoryId: number) => {
    setCardsCategories((_cardsCategories) =>
      _cardsCategories.filter(
        ({ id: _cardsCategoryId }) => cardsCategoryId !== _cardsCategoryId,
      ),
    );
  };

  const clearCardsCategoryNameInput = () => setCardsCategoryNameInput('');

  const getFilteredCardsCategories = () =>
    cardsCategories.filter((cardsCategory) =>
      cardsCategory.category
        .toLowerCase()
        .includes(cardsCategoryNameInput.toLowerCase()),
    );

  const doesCardsCategoryExist = () =>
    !!cardsCategories.find(
      (cardsCategory) => cardsCategory.category === cardsCategoryNameInput,
    );

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={'top-end'}
      transition
      className="bottom-[15px] right-[-5px]"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            style={{
              background: 'transparent',
            }}
            className="bg-gradient poper-shadow"
          >
            <div className="flex flex-col h-[252px] rounded-md">
              <div>
                <div className="flex items-center pr-1">
                  <form onSubmit={handleSendCreateCardsCategory}>
                    <input
                      value={cardsCategoryNameInput}
                      onChange={(e) =>
                        setInputValue(e, setCardsCategoryNameInput)
                      }
                      placeholder="New category..."
                      className="w-[218px] bg-gradient outline-none p-1 pl-3 rounded-md placeholder:text-gray-500 text-[#ffffffd0]  text-lg"
                    />
                  </form>

                  <div className="flex gap-2">
                    <div className="p-1 bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md">
                      <PlusIcon
                        onClick={handleSendCreateCardsCategory}
                        color=""
                        className=""
                      />
                    </div>
                    <div>
                      <CloseIcon
                        onClick={clearCardsCategoryNameInput}
                        className="text-[#dbdbdb] cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md"
                        color="rgb(107 114 128)"
                      />
                    </div>
                  </div>
                </div>
                <hr className="border-[#36363673] mt-1" />
                {/* <CloseIcon
                onClick={clearCardsCategoryNameInput}
                className="absolute top-[9px] right-[22px] cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md"
                color="rgb(107 114 128)"
              /> */}
              </div>
              <CardsCategoriesList
                editCardsCategory={editCardsCategory}
                removeCardsCategory={removeCardsCategory}
                cardsCategories={getFilteredCardsCategories()}
                closePopover={() => setOpen(false)}
              />
            </div>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default CardsCategoriesPopup;
