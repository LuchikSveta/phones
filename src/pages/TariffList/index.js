import React from 'react';
import Card from '../../components/Card';
import TariffCard from "../../components/TariffCard";
import CreateTariff from "../../components/ModalWindow/CreateTariff";
import './style.scss';
import {openModal} from "../../actions";
import {connect} from "react-redux";
import store from '../../store';


function TariffList(props) {
  const sortFunc = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  };
  return (
    <div className="tariff-list">
      <Card
        onClick={() => store.dispatch(openModal(CreateTariff))}
      >
        <div className="create-tariff">
          <h2>Cоздать тариф</h2>
        </div>
      </Card>
      {
        props.tariffs.sort(sortFunc).map((tariff)=> (
          <TariffCard
            tariff={tariff}
            key={tariff._id}
          />
        ))
      }
    </div>
  )
}

const mapStateToProps=function(store) {
  return {
    tariffs: store.tariffs
  }
}

export default connect(mapStateToProps)(TariffList);