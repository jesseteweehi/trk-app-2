export class UrlModel {
	constructor(
		public $key: string,
		public title: string,
		public url: string) {}

	static fromJsonList(array): UrlModel[] {
		return array.map(UrlModel.fromJson)
	}

	static fromJson({$key, title, url}): UrlModel {
		return new UrlModel(
			$key,
			title,
			url);
	}
}
