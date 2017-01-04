export class LearningExperienceModel {
	constructor(
		public $key: string,
		public title: string,
        public date: string,
		public level: number,
		public learningArea: string,
		public description: string,
		public tags: string) {}



	static fromJsonList(array): LearningExperienceModel[] {
        return array.map(LearningExperienceModel.fromJson);
    }

    static fromJson({$key, title, date, level,
        learningArea,description,tags}):LearningExperienceModel {
        return new LearningExperienceModel(
            $key,
            title,
            date,
            level,
            learningArea,
            description,
            tags);
    }
}