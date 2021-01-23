import {combineReducers} from 'redux';
import modalWindow from './modalWindow';
import tariffs from './tariffs';
import services from './services';

export default combineReducers({
    modalWindow,
    tariffs,
    services,
})