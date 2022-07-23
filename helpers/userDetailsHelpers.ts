import { getMyUserDetailsService } from "../services/authService";
import store from "../store";
import { setUserDetails } from "../store/auth/userDetails";

export const updateLocalUserDetails = async () => {
	try {
		const res = await getMyUserDetailsService();
		const { uid, name, email, image_url, phone } = res.data;
		store.dispatch(
			setUserDetails({
				id: String(uid),
				displayName: name,
				email,
				profileImageURL: image_url + "?" + new Date(),
				mobile: String(phone),
			})
		);
	} catch (e) {
		console.log(e);
	}
};
