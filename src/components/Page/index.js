import React from 'react';
import './style.scss';
import { useHistory } from "react-router-dom";

function Page(props) {
  const history = useHistory();
  return (
    <React.Fragment>
      <header className="header">
        <a href="#"
          onClick={(e) => {
            e.preventDefault();
            history.push('/');
          }}
        >
          <h1 className="header__title">Мобильные услуги</h1>
        </a>
      </header>
      <div className="page-wrapper">
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default Page;