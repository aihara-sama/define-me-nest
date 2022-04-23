import React, { FunctionComponent, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPhase } from '..';
import { cardsSelector, modalsSelector } from '../../../../app/selectors';
import { useUploadImageMutation } from '../../../../app/services/cards-service';
import cardsSlice from '../../../../app/slices/cardsSlice';
import { DEFAULT_CARD_IMAGE_NAME } from '../../../../constants';
import ChangeIcon from '../../../Icons/ChangeIcon';
import CloseIcon from '../../../Icons/CloseIcon';

interface IProps {
  onImageNameChange: (imageName: string) => void;
  phase: TPhase;
}

const Image: FunctionComponent<IProps> = ({ phase, onImageNameChange }) => {
  // Redux state
  const { draftCreateCard } = useSelector(cardsSelector);

  // Hooks
  const [uploadImage, { data }] = useUploadImageMutation();
  const dispatch = useDispatch();

  // Handlers
  const onImageChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const image = target.files![0];

    if (!image) {
      return;
    }

    const fd = new FormData();
    fd.append('file', image);

    uploadImage(fd);
  };
  const onRemoveCardImage = () =>
    dispatch(
      cardsSlice.actions.setDraftCreateCard({
        ...draftCreateCard,
        imageName: DEFAULT_CARD_IMAGE_NAME,
      }),
    );

  useEffect(() => {
    data &&
      dispatch(
        cardsSlice.actions.setDraftCreateCard({
          ...draftCreateCard,
          imageName: data,
        }),
      );
  }, [data]);

  return (
    <div
      className={`mb-4 relative [transition-property:width] duration-300 ${
        phase === 'Image' ? 'left-0 w-[100%]' : 'left-[100%] w-0'
      }`}
    >
      <span className="bg-[#00000030] top-0 right-0 bottom-0 left-0 absolute"></span>
      <img
        src={`http://localhost:4000/uploads/${draftCreateCard.imageName}`}
        alt=""
        className="object-cover w-full h-[560px]"
        // height={130}
      />
      <label>
        <input type="file" className="hidden" onChange={onImageChange} />
        <ChangeIcon
          color="#959595"
          className={`hover:fill-[#6c6c6c] transition duration-200 absolute top-2 right-12 cursor-pointer ${
            phase === 'Image' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </label>
      <CloseIcon
        className={`absolute top-2 right-2 cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md ${
          phase === 'Image' ? 'opacity-100' : 'opacity-0'
        }`}
        color="rgb(107 114 128)"
        onClick={onRemoveCardImage}
      />
    </div>
  );
};

export default Image;
