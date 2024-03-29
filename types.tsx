/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddressResponse } from "./services/addressService";
import { PostResponse } from "./services/postsService";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Modal: undefined;
	NotFound: undefined;
};

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	"Forgot Password": {
		email: string;
	};
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
	NativeStackScreenProps<AuthStackParamList, Screen>;

export type RegisterStackParamList = {
	Step1: undefined;
	Step2: {
		name: string;
		email: string;
		phone: string;
	};
	Step3: {
		name: string;
		email: string;
		phone: string;
		password: string;
	};
};
export type RegisterStackScreenProps<
	Screen extends keyof RegisterStackParamList
> = NativeStackScreenProps<RegisterStackParamList, Screen>;

export type ForgotPasswordStackParamList = {
	Step1: { email: string };
	Step2: {
		email: string;
	};
};
export type ForgotPasswordStackScreenProps<
	Screen extends keyof ForgotPasswordStackParamList
> = NativeStackScreenProps<ForgotPasswordStackParamList, Screen>;

export type RootTabParamList = {
	Explore: undefined;
	Chat: undefined;
	Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type ExploreStackParamList = {
	AllPosts: undefined;
	PostDetails: { post: PostResponse };
};

export type ExploreStackScreenProps<
	Screen extends keyof ExploreStackParamList
> = NativeStackScreenProps<ExploreStackParamList, Screen>;

export type ProfileStackParamList = {
	ProfileOverview: undefined;
	EditProfile: undefined;
	MyPosts: undefined;
	MyAddresses: undefined;
};

export type ProfileStackScreenProps<
	Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

export type AddressStackParamList = {
	AddressList: undefined;
	EditAddress: { initialDetails?: AddressResponse };
};

export type AddressStackScreenProps<
	Screen extends keyof AddressStackParamList
> = NativeStackScreenProps<AddressStackParamList, Screen>;

export type MyPostsStackParamList = {
	MyPostsList: undefined;
	EditMyPosts: { initialValues?: PostResponse };
};

export type MyPostsStackScreenProps<
	Screen extends keyof MyPostsStackParamList
> = NativeStackScreenProps<MyPostsStackParamList, Screen>;
