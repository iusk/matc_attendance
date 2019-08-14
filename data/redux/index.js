import { createSlice, configureStore } from 'redux-starter-kit';

// creating action and reducer at the same time, i.e slice
// defining name of slice, initial state and the reducer function
// the type of the action is defined by the keys of reducer object
// action => setting the user's name and checking if he/she is an admin (setUser)

const userSlice = createSlice({
    slice: 'user',
    initialState: {
        userInfo: {
            username: '',
            admin: 0,
        },
        adminInfo:{
            locations: [], // array of strings
            users: [] // array of map of userId, username, admin, verified
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo.username = action.payload.username;
            state.userInfo.admin = action.payload.admin
        },
        setAdminInfo: (state, action) => {
            state.adminInfo.locations = action.payload.locations;
            state.adminInfo.users = action.payload.users;
            state.adminInfo.user_locations = action.payload.user_locations;
        },
        updateLocations: (state, action) => {
            state.adminInfo.locations = action.payload;
        },
        updateUsers: (state, action) => {
            state.adminInfo.users = action.payload;
        },
        updateUserLocations: (state, action) => {
            state.adminInfo.users_locations = action.payload;
        }
    }
});

// separating slice into actions and reducers
const { actions, reducer } = userSlice;

// defining different types of actions
export const { setUser, setAdminInfo, updateLocations, updateUsers, updateUserLocations } = actions;

// combining reducers and creating store
const store = configureStore({
    reducer: reducer
});

export default store;