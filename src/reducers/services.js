const initial = []

function services(state=initial, action) {
  switch (action.type) {
    case 'SET_SERVICES':
      return action.services;
    default:
      return state;
  }
}

export default services;