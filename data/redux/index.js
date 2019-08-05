import { createSlice, configureStore } from 'redux-starter-kit';

// creating action and reducer at the same time, i.e slice
// defining name of slice, initial state and the reducer function
// the type of the action is defined by the keys of reducer object
// action => setting the user's name and checking if he/she is an admin (setUser)

const userSlice = createSlice({
    slice: 'user',
    initialState: {
        username: '',
        admin: 0,
    },
    reducers: {
        setUser: (user=initialState, action) => {
            user.username = action.payload.username;
            user.admin = action.payload.admin
        }
    }
});

// separating slice into actions and reducers
const { actions, reducer } = userSlice;

// defining different types of actions
export const { setUser } = actions;

// combining reducers and creating store
const store = configureStore({
    reducer: reducer
});

export default store;