import React, {
  FunctionComponent,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSelector } from '../../../app/selectors';
import {
  useEditCardsCategoryMutation,
  useRemoveCardsCategoryMutation,
} from '../../../app/services/cards-categories';
import cardsSlice from '../../../app/slices/cardsSlice';
import { setInputValue } from '../../../helpers';
import { ICardsCategory } from '../../../interfaces/common';
import { CategoryContext } from '../../Cards/CreateCard/Phases/Category';
import CloseIcon from '../../Icons/CloseIcon';
import EditIcon from '../../Icons/EditIcon';
import SaveIcon from '../../Icons/SaveIcon';

interface IProps {
  cardsCategory: ICardsCategory;
  disableCRUDBtns?: boolean;
  editCardsCategory: (cardsCategory: ICardsCategory) => void;
  removeCardsCategory: (cardsCategoryId: number) => void;
  closePopover: () => void;
}

const CategoryItem: FunctionComponent<IProps> = ({
  cardsCategory,
  disableCRUDBtns,
  editCardsCategory,
  removeCardsCategory,
  closePopover,
}) => {
  // ~~~~~ Redux state ~~~~~
  const { draftCreateCard } = useSelector(cardsSelector);

  // ~~~~~ Hooks ~~~~~
  const dispatch = useDispatch();
  const [
    sendEditCardsCategory,
    { data: editedCardsCategory, isSuccess: isCardEdited },
  ] = useEditCardsCategoryMutation();
  const [sendRemoveCardsCategory, { isSuccess: isCardRemoved }] =
    useRemoveCardsCategoryMutation();

  // ~~~~~ Cmp state ~~~~~
  const [cardsCategoryName, setCardsCategoryName] = useState(
    cardsCategory.category,
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // ~~~~~ Refs ~~~~~
  const cardsCategoryNameInputRef = useRef<HTMLInputElement>(null);
  const isSaveIconPressed = useRef(false);
  const isRemoveIconPressed = useRef(false);

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    if (editedCardsCategory) {
      editCardsCategory(editedCardsCategory);
      isSaveIconPressed.current = false;
      setIsEditMode(false);
    }
  }, [editedCardsCategory]);

  useEffect(() => {
    if (isCardRemoved) {
      removeCardsCategory(cardsCategory.id);
    }
  }, [isCardRemoved]);

  // ~~~~~ Handlers ~~~~~
  const handleSendEditCardsCategory = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    sendEditCardsCategory({
      cardsCategory: { category: cardsCategoryName },
      cardsCategoryId: cardsCategory.id,
    });
  };
  const handleSaveIconPressed = (e: SyntheticEvent) => {
    isSaveIconPressed.current = true;
  };
  const handleRemoveIconPressed = () => {
    isRemoveIconPressed.current = true;
  };
  const handleRemoveIconReleased = () => {
    isRemoveIconPressed.current = false;
  };
  const clearCardsCategoryName = (e: SyntheticEvent) => {
    e.stopPropagation();
    setCardsCategoryName('');
    cardsCategoryNameInputRef.current?.focus();
  };
  const handleSendRemoveCardsCategory = (e: SyntheticEvent) => {
    e.stopPropagation();
    sendRemoveCardsCategory(cardsCategory.id);
  };

  const setDefaults = () => {
    if (isSaveIconPressed.current || isRemoveIconPressed.current) return;
    setIsEditMode(false);
    setCardsCategoryName(cardsCategory.category);
  };

  const enterEditMode = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsEditMode(true);
    cardsCategoryNameInputRef.current?.focus();
  };

  const selectCardsCategory = (e: SyntheticEvent) => {
    dispatch(
      cardsSlice.actions.setDraftCreateCard({
        ...draftCreateCard,
        category: cardsCategoryName,
      }),
    );
    closePopover();
  };

  return (
    <li
      onClick={selectCardsCategory}
      className="py-1 flex items-center justify-between pl-3 pr-1 my-1 cursor-pointer hover:bg-[#ffffff14] border-solid border-gray-500 bg-transparent text-gray-400 text-lg rounded-md"
    >
      <form onSubmit={handleSendEditCardsCategory}>
        <input
          onClick={(e) => isEditMode && e.stopPropagation()}
          onBlur={setDefaults}
          ref={cardsCategoryNameInputRef}
          className={`bg-transparent outline-none w-full ${
            isEditMode ? 'cursor-text' : 'cursor-pointer'
          }`}
          value={cardsCategoryName}
          onChange={(e) => setInputValue(e, setCardsCategoryName)}
          readOnly={!isEditMode}
        />
      </form>

      {!disableCRUDBtns && (
        <div className="flex items-center gap-3">
          {isEditMode ? (
            <SaveIcon
              onMouseDown={handleSaveIconPressed}
              onClick={handleSendEditCardsCategory}
              color=""
              className=""
            />
          ) : (
            <EditIcon color="" className="" onClick={enterEditMode} />
          )}
          <CloseIcon
            onMouseDown={handleRemoveIconPressed}
            onMouseUp={handleRemoveIconReleased}
            onClick={
              isEditMode
                ? clearCardsCategoryName
                : handleSendRemoveCardsCategory
            }
            className="cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md"
            color="rgb(107 114 128)"
          />
        </div>
      )}
    </li>
  );
};

export default CategoryItem;
