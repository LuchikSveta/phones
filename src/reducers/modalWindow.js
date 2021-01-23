const initial = {
	isOpen: false,
  modal: null,
  props: {}
}

function modalWindow(state=initial, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
      	isOpen: true,
        modal: action.modal,
        props: action.props,
      };
    case 'CLOSE_MODAL':
      return {
      	isOpen: false,
        modal: null,
        props: {},
      };
    default:
      return state;
  }
}

export default modalWindow;