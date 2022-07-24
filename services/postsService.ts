import axios from "axios";
import APIs from "../constants/APIs";
import store from "../store";
import { AddressResponse } from "./addressService";
import { UploadableFile } from "./authService";

export type UserDetails = {
	uid: string;
	name: string;
	phone: string;
	email: string;
	image_url: string;
};

export type Post = {
	productName: string;
	dateAdded: string;
	dateExpiry: string;
	price: string;
	aid: string;
	p_image_url?: string;
	description?: string;
};

export type PostResponse = Post & {
	pid: string;
	uid: string;
	user: UserDetails;
	address: AddressResponse;
	is_donated: boolean;
};

export const getMyPostsService = () => axios.get(APIs.posts.myPosts);

export const getAllPostsService = () => axios.get(APIs.posts.allPosts);

export const createPostService = (post: Post, image: UploadableFile) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		const reqBody = new FormData();
		reqBody.append(
			"product",
			JSON.stringify({ ...post, uid: id, is_donated: false })
		);
		//@ts-ignore
		reqBody.append("productImage", image);
		return axios.post(APIs.posts.allPosts + "/", reqBody, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	} else {
		throw Error("Could not access ID");
	}
};
export const editPostService = (
	pid: string,
	post: Post,
	image?: UploadableFile
) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		const reqBody = new FormData();
		reqBody.append("product", JSON.stringify({ ...post, uid: id }));
		if (image) {
			//@ts-ignore
			reqBody.append("productImage", image);
		}
		return axios.put(APIs.posts.allPosts + "/" + pid, reqBody, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	} else {
		throw Error("Could not access ID");
	}
};

export const changeDonationStatusService = (
	pid: string,
	post: Post,
	is_donated: boolean
) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		const reqBody = new FormData();
		reqBody.append(
			"product",
			JSON.stringify({ ...post, uid: id, is_donated })
		);
		return axios.put(APIs.posts.allPosts + "/" + pid, reqBody, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	} else {
		throw Error("Could not access ID");
	}
};

export const deletePostService = (pid: string) =>
	axios.delete(APIs.posts.allPosts + "/" + pid);
