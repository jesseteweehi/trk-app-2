export class PostModel {
	constructor(
		public $key: string,
		public posttype: string,
		public title: string,
		public description: string) {}

	static fromJsonList(array): PostModel[] {
        return array.map(PostModel.fromJson);
    }

    static fromJson({$key, posttype, title, description  }):PostModel {
        return new PostModel(
            $key,
            posttype,
            title,  
            description);
    }
}


