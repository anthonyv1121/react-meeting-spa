import React from 'react';
import { btn } from './Button.module.scss';
// import styles from './Button.module.scss';

const Button = () => {
  return (
    <>
      <button
        className={btn}
        onClick={() => alert('I am styled with CSS Modules')}
      >
        I am button 2 - Press Me
      </button>
    </>
  );
};
export default Button;