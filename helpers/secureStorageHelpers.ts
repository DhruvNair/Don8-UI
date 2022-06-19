import * as SecureStore from "expo-secure-store";

export const getValueFromSecureStorage = (
	key: string
): Promise<string | null> => {
	return SecureStore.getItemAsync(key);
};

export const setValueInSecureStorage = (
	key: string,
	value: string
): Promise<void> => {
	return SecureStore.setItemAsync(key, value);
};

export const deleteValueFromSecureStorage = (key: string): Promise<void> => {
	return SecureStore.deleteItemAsync(key);
};
