import React, { FunctionComponent, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { modalsSelector } from '../../app/selectors';
import modalsSlice from '../../app/slices/modalSlice';
import CreateCard from '../Cards/CreateCard';
import EditCard from '../Cards/EditCard';

interface IProps {}

const Modal: FunctionComponent<IProps> = ({ children }) => {
  const { open, modal } = useSelector(modalsSelector);

  // Cmp state

  // Hooks
  const dispatch = useDispatch();

  // Vars
  const classes = classnames({
    'h-0': !open,
  });

  // Handlers
  const closeModal = () => dispatch(modalsSlice.actions.closeModal());

  return (
    <div
      onClick={closeModal}
      className={`${classes} fixed overflow-hidden backdrop-blur-sm flex justify-center items-center top-0 right-0 bottom-0 left-0`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {modal === 'create-card' && <CreateCard />}
        {modal === 'edit-card' && <EditCard />}
      </div>
    </div>
  );
};

export default Modal;
