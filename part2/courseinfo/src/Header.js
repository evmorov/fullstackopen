import React from 'react';

const Header = ({ course: { name } }) => {
  return <h2>{name}</h2>;
};

export default Header;
