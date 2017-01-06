export class PostModel {
	constructor(
		public $key: string,
		public posttype: string, 
		public title: string,
        public url: string,
		public description: string,
        public imageurl: string) {}

	static fromJsonList(array): PostModel[] {
        return array.map(PostModel.fromJson);
    }

    static fromJson({$key, posttype, title, url, description, imageurl}):PostModel {
        return new PostModel(
            $key,
            posttype,
            title,
            url,    
            description,
            imageurl);
    }
}

