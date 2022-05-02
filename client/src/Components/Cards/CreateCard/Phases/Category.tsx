import {
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  cardsCategoriesSelector,
  cardsSelector,
} from '../../../../app/selectors';
import { useGetCardsCategoriesQuery } from '../../../../app/services/cards-categories';
import { ICardsCategory } from '../../../../interfaces/common';
import CardsCategoriesList from '../../../CardsCategoriesList';
import ChangeIcon from '../../../Icons/ChangeIcon';
import CloseIcon from '../../../Icons/CloseIcon';
import EditIcon from '../../../Icons/EditIcon';
import GlobeIcon from '../../../Icons/Globe';
import PlusIcon from '../../../Icons/PlusIcon';
import CardsCategoriesPopup from '../../../Popups/CardsCategoriesPopup/index';

export const CategoryContext = React.createContext<{
  setCardsCategoryName: React.Dispatch<React.SetStateAction<string>>;
}>({ setCardsCategoryName: () => {} });

interface IProps {
  onInputChange: (e: SyntheticEvent) => void;
}

const Category: FunctionComponent<IProps> = ({ onInputChange }) => {
  // Redux state
  const { draftCreateCard } = useSelector(cardsSelector);

  // Ref
  const globeIconRef = useRef<SVGSVGElement>(null);

  // Cmp state
  const [open, setOpen] = useState(false);

  // Hooks

  // Handlers

  // Effects
  return (
    <div className={`relative transition-all duration-300`}>
      <p className="text-lg mb-3">Category</p>
      <div className="mb-5">
        <div className="pr-1 flex items-center justify-between hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400 text-lg">
          <span>{draftCreateCard.category}</span>

          <GlobeIcon
            globeIconRef={globeIconRef}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            color=""
            className=""
          />
          <CardsCategoriesPopup
            anchorEl={globeIconRef.current}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
