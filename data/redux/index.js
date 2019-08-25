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
        // save user's basic information when the app gets loaded
        setUser: (state, action) => {
            state.userInfo.username = action.payload.username;
            state.userInfo.admin = action.payload.admin;
            state.userInfo.locations = action.payload.locations;
        },
        // save user's students names based on default location when app starts and default location changes
        setDefaultLocationStudents: (state, action) => {
            state.userInfo.students = action.payload;
        },
        // update locations for the user when location changes are made from admin control panel
        updateUserInfoLocations: (state, action) => {
            state.userInfo.locations = action.payload;
        },
        // set attendance when user submits/updates the attendance form
        setAttendance: (state, action) => {
            state.attendanceInfo = action.payload;
        },
        // update one attendance from view attendance screen
        updateAttendanceInfo: (state, action) => {
            state.attendanceInfo[action.payload.date] = action.payload.attendance
        },
        // get the locations and users when admins go to admin control panel
        setAdminInfo: (state, action) => {
            state.adminInfo.locations = action.payload.locations;
            state.adminInfo.users = action.payload.users;
            state.adminInfo.userLocations = action.payload.userLocations;
        },
        // update locations when admins add/remove/update location
        updateLocations: (state, action) => {
            state.adminInfo.locations = action.payload;
        },
        // update users when admins add/remove/update location
        updateUsers: (state, action) => {
            state.adminInfo.users = action.payload;
        },
        // update the assignment of users to locations upon admin request
        updateUserLocations: (state, action) => {
            state.adminInfo.userLocations = action.payload;
        }
    }
});

// separating slice into actions and reducers
const { actions, reducer } = userSlice;

// defining different types of actions
export const { 
    setUser, 
    setDefaultLocationStudents, 
    updateUserInfoLocations, 
    setAttendance,
    updateAttendanceInfo,
    setAdminInfo, 
    updateLocations, 
    updateUsers, 
    updateUserLocations
} = actions;

// combining reducers and creating store
const store = configureStore({
    reducer: reducer
});

export default store;