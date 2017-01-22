export class OrganisationModel {
	constructor(
		public $key:string,
		public title:string,
		public website:string,
		) {}

	static  fromJsonList(array): OrganisationModel[]{
		return array.map(OrganisationModel.fromJson);
	}

	static fromJson({$key, title, website}): OrganisationModel {
		return new OrganisationModel(
			$key,
			title,
			website
			)
	}
}
