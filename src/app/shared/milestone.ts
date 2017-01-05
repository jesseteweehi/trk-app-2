export class MilestoneModel {
	constructor(
		public $key: string,
		public title: string,
        public date: string,
		public description: string,
		public tags: string) {}



	static fromJsonList(array): MilestoneModel[] {
        return array.map(MilestoneModel.fromJson);
    }

    static fromJson({$key, title, date, description,tags}):MilestoneModel {
        return new MilestoneModel(
            $key,
            title,
            date,
            description,
            tags);
    }
}