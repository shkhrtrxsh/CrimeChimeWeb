import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import userReducer from './reducers/user'
import roleReducer from './reducers/role'
import permissionReducer from './reducers/permission'
import permissionModuleReducer from './reducers/permission-module'
import searchReducer from './reducers/permission-module'
import reportReducer from './reducers/report'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
    permissionModule: permissionModuleReducer, 
    search: searchReducer,
    report: reportReducer
  },
})