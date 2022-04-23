import React, { FunctionComponent, useState } from 'react';
import logoIcon from '../../assets/images/logo.svg';
import ButtonBase from '@mui/material/ButtonBase';
import Search from '../Search';
import modalsSlice from '../../app/slices/modalSlice';
import { useDispatch } from 'react-redux';

interface IProps {}

const Header: FunctionComponent<IProps> = () => {
  // Hooks
  const dispatch = useDispatch();

  const openModal = () =>
    dispatch(modalsSlice.actions.openModal('create-card'));

  return (
    <div>
      <div className="flex">
        <img src={logoIcon} alt="" className="cursor-pointer" />
        <Search />
        <ButtonBase
          onClick={openModal}
          className="ml-auto transition-colors duration-200 border border-solid border-blue-500 px-6 rounded-md text-blue-500 hover:bg-sky-700 hover:text-white"
        >
          Create
        </ButtonBase>
      </div>
      <hr className="mt-4 border-gray-800" />
    </div>
  );
};

export default Header;
