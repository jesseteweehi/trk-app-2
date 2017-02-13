export class OrganisationModel {
	constructor(
		public $key:string,
		public title:string,
		public description:string,
		public code:string,
		public orgkey:string
	
		) {}

	static  fromJsonList(array): OrganisationModel[]{
		return array.map(OrganisationModel.fromJson);
	}

	static fromJson({$key, title, description, code, orgkey}): OrganisationModel {
		return new OrganisationModel(
			$key,
			title,
			description,
			code,
			orgkey
			)
	}
}
