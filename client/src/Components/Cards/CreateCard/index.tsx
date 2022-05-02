import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import BackArrowIcon from '../../Icons/BackArrow';
import CloseIcon from '../../Icons/CloseIcon';
import Title from './Phases/Title';
import Image from './Phases/Image';
import Description from './Phases/Description';
import Category from './Phases/Category';
import { cardsSelector, modalsSelector } from '../../../app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import cardsSlice from '../../../app/slices/cardsSlice';
import { useCreateCardMutation } from '../../../app/services/cards-service';
import modalsSlice from '../../../app/slices/modalSlice';
import { Carousel } from 'react-responsive-carousel';

export interface IProps {}
export type TPhase = 'Image' | 'Description';
const phases: TPhase[] = ['Image', 'Description'];

const CreateCard: FunctionComponent<IProps> = () => {
  // Redux statex
  const { items: cards, draftCreateCard } = useSelector(cardsSelector);
  const { open } = useSelector(modalsSelector);

  // Cmp state
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phase, setPhase] = useState<TPhase>(phases[phaseIdx]);

  // Hooks
  const dispatch = useDispatch();
  const [createCard, { data: createdCard }] = useCreateCardMutation();

  // Handlers
  const closeModal = () => dispatch(modalsSlice.actions.closeModal());

  const onInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    dispatch(
      cardsSlice.actions.setDraftCreateCard({
        ...draftCreateCard,
        [name]: value,
      }),
    );
  };

  const setNextPhase = () => {
    if (nextBtnDisabled) return;
    setPhaseIdx((prev) => (prev === phases.length - 1 ? prev : prev + 1));
  };

  const setPrevPhase = () => {
    setPhaseIdx((prev) => (prev === 0 ? prev : prev - 1));
  };

  const setCardImageName = (imageName: string) => {
    dispatch(
      cardsSlice.actions.setDraftCreateCard({ ...draftCreateCard, imageName }),
    );
  };

  const resetDraftCreateCard = () => {
    dispatch(cardsSlice.actions.resetDraftCreateCard());
  };

  // Effects
  useEffect(() => {
    setPhase(phases[phaseIdx]);
  }, [phaseIdx]);

  useEffect(() => resetDraftCreateCard, []);

  useEffect(() => {
    if (createdCard) {
      dispatch(cardsSlice.actions.addCard(createdCard));
      closeModal();
    }
  }, [createdCard]);

  // Vars
  let nextBtnDisabled: boolean = false;

  switch (phase) {
    case 'Description':
      nextBtnDisabled =
        !draftCreateCard.title ||
        !draftCreateCard.description ||
        !draftCreateCard.category;
      break;
  }

  return (
    <div className="text-gray-300 border  text-2xl w-[28rem] border-solid border-gray-500 rounded-md p-4 bg-gradient">
      <div className="flex">
        <ButtonBase onClick={setPrevPhase}>
          <BackArrowIcon className="cursor-pointer" color="rgb(107 114 128)" />
        </ButtonBase>
        <ButtonBase className="ml-auto " onClick={closeModal}>
          <CloseIcon
            className="cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md"
            color="rgb(107 114 128)"
          />
        </ButtonBase>
      </div>
      <hr className="border-gray-500 my-3" />
      <div>
        <Carousel
          className=""
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          selectedItem={phaseIdx}
        >
          <Image phase={phase} onImageNameChange={setCardImageName} />
          <div className={`text-left`}>
            <Title
              onInputChange={onInputChange}
              disabled={!draftCreateCard.title}
            />
            <Description onInputChange={onInputChange} />
          </div>
        </Carousel>
      </div>
      <ButtonBase
        disabled={nextBtnDisabled}
        onClick={
          phaseIdx === phases.length - 1
            ? createCard.bind(null, draftCreateCard)
            : setNextPhase
        }
        className={`mb-3 w-full border border-solid border-gray-500 py-2 rounded-md transition duration-200  ${
          !nextBtnDisabled ? 'hover:bg-sky-900' : 'cursor-default'
        }`}
      >
        {phaseIdx === phases.length - 1 ? 'Create' : 'Next'}
      </ButtonBase>
    </div>
  );
};

export default CreateCard;
