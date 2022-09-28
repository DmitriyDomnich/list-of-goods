import React from 'react';
import GoodsList from '../components/GoodsList';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return <div className='bg-indigo-100 h-full min-h-screen overflow-x-hidden flex flex-col p-5 '>
    <Outlet />
    <GoodsList />
  </div>;
}

export default HomePage;