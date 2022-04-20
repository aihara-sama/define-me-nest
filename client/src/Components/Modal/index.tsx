import React, { FunctionComponent, useEffect, useState } from 'react';
import classnames from 'classnames';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const duration = 500;

const Modal: FunctionComponent<IProps> = ({ open, setOpen, children }) => {
  // Cmp state
  const [isModalClosed, setIsModalClosed] = useState(true);

  // Vars
  const classes = classnames({
    'opacity-100': open,
    'opacity-0': !open,
    'h-0': isModalClosed,
  });

  // Effects
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setIsModalClosed(true);
      }, duration);
    } else {
      setIsModalClosed(false);
    }
  }, [open]);

  // Handlers
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div
      onClick={closeModal}
      className={`${classes} fixed transition overflow-hidden duration-500 backdrop-blur-sm flex justify-center items-center top-0 right-0 bottom-0 left-0`}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
