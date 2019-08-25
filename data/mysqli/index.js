import { getUserInfo, getStudentsInfo, getAdminInfo } from './getInfo';
import { takeAttendance, getAttendance, updateAttendance } from './manageAttendance';
import { addLocation, updateLocation, deleteLocation } from './manageLocations';
import { addStudent, updateStudent, deleteStudent } from './manageStudents';
import { addUserLocation, deleteUserLocation } from './manageUserLocations';
import { addUser, updateUser, deleteUser } from './manageUsers';
import userLogin from './userLogin';

export {
    getUserInfo, getStudentsInfo, getAdminInfo,
    takeAttendance, getAttendance, updateAttendance,
    addLocation, updateLocation, deleteLocation,
    addStudent, updateStudent, deleteStudent,
    addUserLocation, deleteUserLocation,
    addUser, updateUser, deleteUser,
    userLogin
}