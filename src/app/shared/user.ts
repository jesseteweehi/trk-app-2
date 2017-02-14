export class UserModel {
	constructor(
		public authid: string,
		public email: string,
		public firstName: string,
		public lastName: string
		) {}

	static  fromJsonList(array): UserModel[]{
		return array.map(UserModel.fromJson);
	}

	static fromJson({authid, email, firstName, lastName}): UserModel {
		return new UserModel(
			authid,
			email,
			firstName,
			lastName
			)
	} 
}
