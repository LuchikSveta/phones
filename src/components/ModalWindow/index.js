import React from 'react';
import './style.scss';
import store from "../../store";
import {closeModal} from "../../actions";

function ModalWindow(props) {

  return (
    <div className="modal-background">
      <div className="modal-window">
        <h2 className="modal-window__title">{props.title}</h2>
        <div className="modal-window__body">
          {props.children}
        </div>
        <div className="modal-window__buttons-group">
          <button
            className="button"
            onClick={()=>store.dispatch(closeModal())}
          >Отмена</button>
          <button
            className="button button-ok"
            onClick={props.onClick}
          >Ок</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;