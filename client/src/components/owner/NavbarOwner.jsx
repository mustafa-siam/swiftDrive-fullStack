import React from 'react';
import { assets} from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user}=useAppContext()
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <img src={assets.logo} alt="" />
    <Link to={"/"} className="ml-2 text-xl">SwiftDrive</Link>
  </div>
  <div className="navbar-end gap-2">
   Welcome {user?.name}
  </div>
</div>
    );
};

export default NavbarOwner;