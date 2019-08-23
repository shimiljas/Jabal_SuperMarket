import React from 'react';
import PropTypes from 'prop-types';
import DotsVertical from 'mdi-react/DotsVerticalIcon';

const DealerCard = ({
  name,
  address,
  email,
  website,
  logo,
}) => (
  <div className="dealer__list-card-layout">
    <div className="dealer-logo">
      <img src={logo} className="logo" alt="dealer" />
    </div>
    <div className="dealer-content">
      <div className="header">{name}</div>
      <div className="body">
        <div>{address}</div>
        <div className="text">{email}</div>
        <div className="text">{website}</div>
      </div>
      <div className="email">
        <a className="email" href={`mailto:${email}`}>Send Email</a>
      </div>
      <div className="more-options"><DotsVertical color="#737373" /></div>
    </div>
  </div>
);

DealerCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};


export default DealerCard;
