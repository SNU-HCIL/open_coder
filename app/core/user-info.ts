export class UserInfo{
    id: number;
    name: string;
    nickname: string;
    email: string;
    thumbUrl: string;

    constructor(json?){
        if(json)
        {
            this.update(json)
        }
    }

    update(json)
    {
        this.id = json.id
        this.email = json.email
        this.name = json.name
        this.nickname = json.nickname
        this.thumbUrl = json.thumbnail
    }
}