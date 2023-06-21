export class Singer{
  public name?:string;
  public avatar?:string;
  public description?:string;
  public birthday?:any


  constructor(name: string, avatar: string, description: string, birthday: any) {
    this.name = name;
    this.avatar = avatar;
    this.description = description;
    this.birthday = birthday;
  }
}
