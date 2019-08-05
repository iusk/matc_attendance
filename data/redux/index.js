import { createSlice, configureStore } from 'redux-starter-kit'; 

const userSlice = createSlice({
    slice: 'user', // name of the slice
    initialState: {
        username: '',
        admin: 0,
    }, // define initial state
    reducers: { // creates action and reducer at the same time
        setUser: (action) => {
            state.username = action.payload.username;
            state.admin = action.payload.admin
        } // action.type = setUsername, don't need switch statements to see type
    }
});

// separating slice into actions and reducers
const { actions, reducer } = userSlice;

// defining different types of actions
const { setUser } = actions;

export function getUserInfo(id) {
    console.log('inside');
    const payload = { username: 'test', admin: 1 };
    setUser(payload);
    // fetch('https://iusk.000webhostapp.com/matc_attendance/getUserInfo.php', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         id: id
    //     })
    // }).then((response) => response.json())
    // .then((responseJson) => {
    //     console.log('inside ' + responseJson);
    //     const payload = { username: responseJson['username'], admin: responseJson['admin'] };
    //     dispatch(setUser(payload));
    // }).catch((error) => {
    //     console.warn(error);
    // })
}

// combining reducers and creating store
const store = configureStore({
    reducer: reducer
});

export default store;