export class AuthInfoModel{
	constructor(
		public $uid:string
		)
	{}

	isLoggedIn(){
		return !!this.$uid;
	}
}