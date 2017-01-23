export class SkillModel {
	constructor(
		public $key: string,
		public title: string,
		public about:string) {}

		static fromJsonList(array): SkillModel[] {
	        return array.map(SkillModel.fromJson);
	    }

	    static fromJson({$key, title, about}):SkillModel {
	        return new SkillModel(
	            $key,
	            title,
	            about);
	    }
}