import React from 'react';
import {useState, useEffect} from 'react';
import './style.scss';
import ModalWindow from '../index';
import store from "../../../store";
import {connect} from 'react-redux';
import {closeModal} from "../../../actions";
import {setTariff} from "../../../actions";

function AddServices(props) {
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(()=> {
    setSelectedServices(props.selectedServices);
  }, [props.selectedServices]);

  const addServices = () => {
    fetch('/tariff/addServices',{
      method: "POST",
      body:  JSON.stringify({
        id: props.id,
        services: selectedServices,
      }),
      headers: {
        'Content-Type': 'application/json',
      }})
      .then(res => {
        res.json().then(body => {
          if (body.message) {
            alert(body.message);
          } else if (body.tariff) {
            store.dispatch(setTariff(body.tariff));
          }
          store.dispatch(closeModal());
        });
      })
      .catch(err => {
        alert(err);
        store.dispatch(closeModal());
      });
  }

  const selectService = (id) => {
    let newSelectedServices;

    if(selectedServices.includes(id)) {
      newSelectedServices = selectedServices.filter((s_id) => s_id !== id);
    } else {
      newSelectedServices = [...selectedServices];
      newSelectedServices.push(id);
    }
    setSelectedServices(newSelectedServices);
  }

  return (
    <ModalWindow
      title="Услуги"
      onClick={addServices}
    >
      <div className="add-services__body">
        <ul>
          {
            props.services.map((service) => {
              const className = "add-services__service-item " + (selectedServices.includes(service._id) ? "add-services__service-item_active" : "");
              return (
                <li
                  key={service._id}
                  onClick={() => selectService(service._id)}
                  className={className}
                >{service.name}</li>
              );
            })
          }
        </ul>
      </div>
    </ModalWindow>
  );
}

const mapStateToProps = (state, props) => {
  const tariff = state.tariffs.find((tariff) => tariff._id === props.id);
  const selectedServices = tariff ? [...tariff.activeServices] : []
  return {
    services: state.services,
    selectedServices,
  }
}
export default connect(mapStateToProps)(AddServices);