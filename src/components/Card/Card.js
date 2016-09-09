import React, { PropTypes } from 'react';

import styles from 'styles';

const Card = (props) => (
  <div className={styles.card}>
    {props.children}
  </div>
);

Card.PropTypes = {
  children: PropTypes.object.isRequired,
};

export default Card;