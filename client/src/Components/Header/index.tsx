import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import logoIcon from '../../assets/images/logo.svg';
import ButtonBase from '@mui/material/ButtonBase';
import Modal from '../Modal';
import backIcon from '../../assets/images/back-arrow.svg';
import BackArrowIcon from '../Icons/BackArrow';
import CloseIcon from '../Icons/CloseIcon';
import ChangeCardImage from '../../assets/images/change-card-image.svg';
import ChangeIcon from '../Icons/ChangeIcon';
interface IProps {}

type TPhase = 'image' | 'title' | 'description' | 'category';

const phases: TPhase[] = ['image', 'title', 'description', 'category'];

const Header: FunctionComponent<IProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [phasesIdx, setPhasesIdx] = useState(0);

  const [phase, setPhase] = useState<TPhase>(phases[phasesIdx]);

  const [imageName, setImageName] = useState('default-card.svg');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setPhase(phases[phasesIdx]);
  }, [phasesIdx]);

  const uploadImage = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const image = target.files![0];

    if (!image) {
      return;
    }

    const fd = new FormData();
    fd.append('file', image);

    fetch('http://localhost:4000/file', {
      method: 'PUT',
      body: fd,
    })
      .then((r) => r.json())
      .then((r) => {
        console.log({ r });

        setImageName(r.fileName);
      });
  };

  return (
    <div>
      <div className="flex">
        <img src={logoIcon} alt="" className="cursor-pointer" />
        <ButtonBase
          onClick={() => {
            setModalOpen(true);
          }}
          className="ml-auto transition-colors duration-200 border border-solid border-blue-500 px-6 rounded-md text-blue-500 hover:bg-sky-700 hover:text-white"
        >
          Create
        </ButtonBase>
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <div className="text-gray-300 border  text-2xl w-80 border-solid border-gray-500 rounded-md p-4">
            <div className="flex">
              <ButtonBase
                onClick={() => {
                  setPhasesIdx((prev) => (prev === 0 ? prev : prev - 1));
                }}
              >
                <BackArrowIcon
                  className="cursor-pointer"
                  color="rgb(107 114 128)"
                />
              </ButtonBase>
              <ButtonBase
                className="ml-auto "
                onClick={() => setModalOpen(false)}
              >
                <CloseIcon
                  className="cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md"
                  color="rgb(107 114 128)"
                />
              </ButtonBase>
            </div>
            <hr className="border-gray-500 my-3" />
            <div className="relative overflow-hidden flex">
              <div
                className={`relative transition-all duration-400 ${
                  phase === 'image' ? 'left-0 w-[100%]' : 'left-[100%] w-0'
                }`}
              >
                <img
                  src={`http://localhost:4000/uploads/${imageName}`}
                  alt=""
                  className="darken object-cover w-full h-[130px]"
                  height={130}
                />
                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                  <ChangeIcon
                    color="#959595"
                    className={`hover:fill-[#6c6c6c] transition duration-200 absolute top-2 right-12 cursor-pointer ${
                      phase === 'image' ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </label>
                <CloseIcon
                  className={`absolute top-2 right-2 cursor-pointer bg-opacity-20 bg-gray-500 transition duration-200 hover:bg-opacity-40 rounded-md ${
                    phase === 'image' ? 'opacity-100' : 'opacity-0'
                  }`}
                  color="rgb(107 114 128)"
                  onClick={() => {
                    setImageName('default-card.svg');
                  }}
                />
              </div>
              <div
                className={`relative transition-all duration-400 ${
                  phase === 'title' ? 'left-0 w-[100%]' : 'left-[100%] w-0'
                }`}
              >
                <p className=" mb-3">Title</p>
                <div className="mb-5">
                  <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Atom..."
                    className="hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400"
                  ></textarea>
                </div>
              </div>
              <div
                className={`relative transition-all duration-300 ${
                  phase === 'description'
                    ? 'left-0 w-[100%]'
                    : 'left-[100%] w-0'
                }`}
              >
                <p className=" mb-3">Description</p>
                <div className="mb-5">
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="An atom is..."
                    className="hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400"
                  ></textarea>
                </div>
              </div>
              <div
                className={`relative transition-all duration-300 ${
                  phase === 'category' ? 'left-0 w-[100%]' : 'left-[200%] w-0'
                }`}
              >
                <p className=" mb-3">Category</p>
                <div className="mb-5">
                  <textarea
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Chemistry..."
                    className="hide-scroll w-full bg-transparent border border-solid border-gray-500 outline-none rounded-md pl-2 py-1 text-gray-400"
                  ></textarea>
                </div>
              </div>
            </div>
            <ButtonBase
              onClick={() => {
                if (phasesIdx === phases.length - 1) {
                  fetch('http://localhost:4000/cards', {
                    method: 'POST',
                    body: JSON.stringify({
                      title,
                      category,
                      description,
                      imageName,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(() => {
                    setModalOpen(false);
                  });
                } else {
                  setPhasesIdx((prev) =>
                    prev === phases.length - 1 ? prev : prev + 1,
                  );
                }
              }}
              className="mb-3 w-full border border-solid border-gray-500 py-2 rounded-md transition duration-200 hover:bg-sky-900"
            >
              {phasesIdx === phases.length - 1 ? 'Create' : 'Next'}
            </ButtonBase>
          </div>
        </Modal>
      </div>
      <hr className="mt-4 border-gray-800" />
    </div>
  );
};

export default Header;
