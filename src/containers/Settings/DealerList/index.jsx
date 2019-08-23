import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from '../../../data/dealerList';
import DealerCard from '../component/dealerListCard';

class DealerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: data,
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div className="settings">
        <h3 className="page-title">Dealer List</h3>
        <div className="settings__password">
          <div className="dealerList__head">
            <div className="dealer__section left">{list.length} Stores</div>
            <div
              className="dealer__section right"
              role="presentation"
            >
              <Link className="link" to="/pages/settings/add">Add User</Link>
            </div>
          </div>
          <div>
            {list.map((dealer) => {
              const {
                dealerName, address, email, website, imageURL,
              } = dealer;
              return (
                <DealerCard
                  key={dealerName}
                  logo={imageURL}
                  name={dealerName}
                  address={address}
                  email={email}
                  website={website}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DealerList;
