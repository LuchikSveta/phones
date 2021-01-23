const initial = []

function tariffs(state=initial, action) {
  let newState;
  switch (action.type) {
    case 'SET_TARIFFS':
      return action.tariffs;
    case 'ADD_TARIFF':
      newState = [...state];
      newState.push(action.tariff);
      return newState;
    case 'SET_TARIFF':
      newState = state.filter((tariff) => tariff._id !== action.tariff._id);
      newState.push(action.tariff);
      return newState;
    default:
      return state;
  }
}

export default tariffs;