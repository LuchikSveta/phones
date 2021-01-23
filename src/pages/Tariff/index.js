import React from 'react';
import store from "../../store";
import {connect} from "react-redux";
import './style.scss';
import {openModal, setTariff} from "../../actions";
import AddServices from '../../components/ModalWindow/AddServices';

class Tariff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      name: '',
      description: '',
      cost: '',
    };
    this.changeEdited = this.changeEdited.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  changeEdited() {
    const tariffInfo = {};
    const isEdited = !this.state.isEdited
    if (isEdited) {
      tariffInfo.name = this.props.tariff.name;
      tariffInfo.description = this.props.tariff.description;
      tariffInfo.cost = this.props.tariff.cost;
    }
    this.setState({
      isEdited,
      ...tariffInfo
    })
  }

  tariffOnChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  saveChanges() {
    const id = this.props.tariff._id;
    const {name, description, cost} = this.state;
    if (isNaN(cost)) {
      alert("Неверный формат стоимости.")
      return;
    }
    fetch('/tariff/edit',{
      method: "POST",
      body:  JSON.stringify({
        id,
        name,
        description,
        cost,
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
            this.changeEdited();
          }
        });
      })
      .catch(err => {
        alert(err);
      });
  }


  render() {

    if (!this.props.tariff.activeServices) return null;

    const sortFunc = (a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }
    return (
      <div className="tariff-page">
        <div className="tariff-page__buttons-group">
          <button
            className="button"
            onClick={this.changeEdited}
          >
            {
              this.state.isEdited ?
              "Просмотр"  : "Редактирование"
            }
          </button>
          <button
            className="button"
            onClick={() => store.dispatch(openModal(AddServices, {id: this.props.tariff._id}))}
          >Изменить услуги</button>
        </div>
        {
          this.state.isEdited ?
            <div className="tariff-page__edit">
              <input
                className="input"
                placeholder="Название"
                type="text"
                value={this.state.name}
                onChange={(e)=>this.tariffOnChange('name', e.target.value)}
              />
              <textarea
                className="input"
                placeholder="Описание"
                rows="3"
                value={this.state.description}
                onChange={(e)=>this.tariffOnChange('description', e.target.value)}
              />
              <input
                className="input"
                placeholder="Стоимость"
                type="text"
                value={this.state.cost}
                onChange={(e)=>this.tariffOnChange('cost', e.target.value)}
              />
              <button
                className="button"
                onClick={this.saveChanges}
              >Сохранить</button>
            </div> :
            <div className="tariff-page__view">
              <h2 className="tariff-page__name">
                {this.props.tariff.name}
              </h2>
              <p className="tariff-page__description">
                {this.props.tariff.description}
              </p>
              <span className="tariff-page__cost">
                Стоимость: {this.props.tariff.cost}р.
              </span>
            </div>
        }
        <div className="tariff-page__active-services">
          <h3 className="tariff-page__active-services-title">Активные услуги:</h3>
          <ul>
            {
              this.props.tariff.activeServices.sort(sortFunc).map(service => (
                <li
                  key={service._id}
                >
                  {service.name}
                </li>
              ))
            }
          </ul>
        </div>

      </div>
    );
  }

}

const mapStateToProps = function(store, props) {
  const tariff = {...store.tariffs.find((tariff) => tariff._id === props.routeProps.match.params.id)};
  if (tariff.activeServices) {
    const activeServices = tariff.activeServices;
    tariff.activeServices = [];
    activeServices.forEach((serviceId) => {
      const service = store.services.find((service) => service._id === serviceId);
      if (service) {
        tariff.activeServices.push(service);
      }
    });
  }

  return {
    tariff,
  }
}

export default connect(mapStateToProps)(Tariff);