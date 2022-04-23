import { iteratorSymbol } from 'immer/dist/internal';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useRefSelector, useRefState } from '../../app/hooks';
import { cardsSelector } from '../../app/selectors';
import { useGetCardsByTitleAndCatMutation } from '../../app/services/cards-service';
import cardsSlice from '../../app/slices/cardsSlice';
function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight,
  );
}
interface IProps {}

const Search: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~
  const cards = useSelector(cardsSelector);

  // ~~~~~ Cmp state ~~~~~
  const [searchInput, setSearchInput] = useRefState('');
  const [searchCategory, setSearchCategory] = useState('');

  // ~~~~~ Refs ~~~~~
  const offset = useRef(0);

  // ~~~~~ Handlers ~~~~~

  // ~~~~~ Hooks ~~~~~
  const [search, { data, error, isLoading }] =
    useGetCardsByTitleAndCatMutation();

  const dispatch = useDispatch();

  const onSearchInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
    offset.current = 0;
  };

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    search({
      category: searchCategory,
      search: searchInput,
    });
  }, [searchInput]);

  useEffect(() => {
    if (Array.isArray(data)) {
      if (offset.current === 0) {
        dispatch(cardsSlice.actions.setCards(data));
      } else {
        const _cards = [...cards.items, ...data];
        dispatch(cardsSlice.actions.setCards(_cards));
      }
      offset.current = data.length + offset.current;
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', (event) => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = 200;

      if (currentScroll > documentHeight) {
        search({
          category: searchCategory,
          search: searchInput,
          offset: offset.current,
        });
      }
    });
  }, []);

  return (
    <div className="self-center">
      <input
        onChange={onSearchInputChange}
        className="bg-transparent border border-solid border-[#36363673] outline-none p-1 pl-3 rounded-md placeholder:text-[#a7a5a573] text-[#ffffffd0] ml-3 text-lg"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
