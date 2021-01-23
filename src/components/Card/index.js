import React from 'react';
import './style.scss';

function Card(props) {

  return (
    <div
      onClick={props.onClick}
      className="card"
    >
      {
        props.children
      }
    </div>
  )
}

export default Card;