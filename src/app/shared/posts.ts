export class PostModel {
	constructor(
		public $key: string,
		public posttype: string, 
		public title: string,
        public url: string,
		public description: string,) {}

	static fromJsonList(array): PostModel[] {
        return array.map(PostModel.fromJson);
    }

    static fromJson({$key, posttype, title, url, description}):PostModel {
        return new PostModel(
            $key,
            posttype,
            title,
            url,    
            description);
    }
}

// {
//   "type": "video",
//   "url": "http://www.youtube.com/watch?v=jofNR_WkoCE",
//   "provider_name": "YouTube",
//   "provider_url": "https://www.youtube.com/", 
//   "title": "Ylvis - The Fox (What Does The Fox Say?) [Official music video HD]",
//   "description": "iTunes: http://smarturl.it/YlvisFox Fra I kveld med Y...", 
//   "author_name": "TVNorge",
//   "author_url": "https://www.youtube.com/user/tvnorge",
//   "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FjofNR_WkoCE%3Ffeature%3Doembed&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjofNR_WkoCE&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FjofNR_WkoCE%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" frameborder=\"0\" allowfullscreen></iframe>",
//   "width": 854,
//   "height": 480, 
//   "thumbnail_url": "https://i.ytimg.com/vi/jofNR_WkoCE/hqdefault.jpg", 
//   "thumbnail_width": 480,
//   "thumbnail_height": 360,
//   "version": "1.0"
// }