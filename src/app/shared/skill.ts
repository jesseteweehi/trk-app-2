export class SkillModel {
	constructor(
		public $key: string,
		public title: string,
		public description:string,
		public infourl) {}

		static fromJsonList(array): SkillModel[] {
	        return array.map(SkillModel.fromJson);
	    }

	    static fromJson({$key, title, description, infourl}):SkillModel {
	        return new SkillModel(
	            $key,
	            title,
	            description,
	            infourl);
	    }
}