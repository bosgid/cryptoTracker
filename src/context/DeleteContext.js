import React, { useReducer } from 'react';

const DeleteContext = React.createContext();

const Reducer = (deleteList, action) => {
  switch (action.type) {

    case 'add_to_delete_list':
      return [...deleteList, action.payload];

    case 'remove_from_delete_list':
      return deleteList.filter((currency) => currency.name !== action.payload.name);

    case 'clear_delete_list':
      return [];

    default:
      return deleteList;
  }
}

const DeleteProvider = ({ children }) => {
  const [deleteList, dispatch] = useReducer(Reducer, [])

  const addToDeleteList = (currency) => {
    dispatch({ type: 'add_to_delete_list', payload: currency })
  }

  const removeFromDeleteList = (currency) => {
    dispatch({ type: 'remove_from_delete_list', payload: currency })
  }

  const clearDeleteList = () => {
    dispatch({ type: 'clear_delete_list' })
  }


  return (
    <DeleteContext.Provider value={{ deleteList, actions: { addToDeleteList, removeFromDeleteList, clearDeleteList } }}>
      {children}
    </DeleteContext.Provider>
  )
}

export { DeleteContext, DeleteProvider };