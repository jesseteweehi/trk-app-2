export class RepliesModel {
	constructor(
		public $key: string,
		public comment: string) {}

	static fromJsonList(array): RepliesModel[] {
		return array.map(RepliesModel.fromJson)
	}

	static fromJson({$key, comment}): RepliesModel {
		return new RepliesModel(
			$key,
			comment);
	}
}
