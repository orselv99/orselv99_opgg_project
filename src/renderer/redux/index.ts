import { configureStore } from '@reduxjs/toolkit';
import { CommonReducer } from './common';

export const Store = configureStore({
	reducer: {
		common: CommonReducer
	},
	preloadedState: {},
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
