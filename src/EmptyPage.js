import React from 'react';
import { useHistory } from 'react-router-dom';

const EmptyPage = () => {
  const history = useHistory(); // Initialize useHistory

  return (
    <div>
      <h1>Empty Page</h1>
      {/* Replace with your icon component or icon image */}
      <span className="icon" onClick={() => history.goBack()}>
        &#9664; Go Back
      </span>
    </div>
  );
};

export default EmptyPage;
