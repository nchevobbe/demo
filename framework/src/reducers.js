const initialState = {
  log: null
};

function handleLog(action) {
  if (action.data) {
    console.trace();
  }

  return {
    log: action.data
  }
}

const rootReducer = (state = initialState, action) => {
  if (action && action.type === "LOG") {
    return handleLog(action);
  }
  return state;
};
export default rootReducer;