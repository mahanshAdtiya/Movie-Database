
//action types
export const ADD_FAV="ADD_FAV"


//action creators

export const reset = () => ({
  type: "reset",
  
});





export const addFav = (update)=>({
  type:ADD_FAV,
  payload:update
})