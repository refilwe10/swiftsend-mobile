// auth.js - Session management helper
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@swiftsend_user';

// Save user data on login
export const saveUser = async (user, role) => {
  try {
    const session = { user, role, loginTime: new Date().toISOString() };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(session));
    console.log(' Session saved');
  } catch (error) {
    console.log(' Save session error:', error);
  }
};

// Get current logged-in user
export const getUser = async () => {
  try {
    const session = await AsyncStorage.getItem(USER_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.log(' Get session error:', error);
    return null;
  }
};

// Clear session on logout
export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log(' Session cleared');
  } catch (error) {
    console.log(' Clear session error:', error);
  }
};