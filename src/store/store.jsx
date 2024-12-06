import { configureStore } from '@reduxjs/toolkit';


import rootReducer from './rootReducers'
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Mặc định là true, bạn có thể thêm cấu hình khác nếu cần
    }),
});
export default store;
