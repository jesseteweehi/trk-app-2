export class ApprovedUserModel {
	constructor(
		public $key: string,
		public email: string,
		public type: string
		) {}

		static fromJsonList(array): ApprovedUserModel[] {
	        return array.map(ApprovedUserModel.fromJson);
	    }

	    static fromJson({$key, email, type}):ApprovedUserModel {
	        return new ApprovedUserModel(
	            $key,
	            email,
	            type);
	    }
}