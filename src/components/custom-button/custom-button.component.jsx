import React from 'react';
import './custom-button.styles.css';

const CustomButton = ({ children, onClickCallback, ...props }) => (
  <button className={`btn ${props.btnClass}`} onClick={(event) => onClickCallback(event)}>
    {children}
  </button>
);

export default CustomButton;
