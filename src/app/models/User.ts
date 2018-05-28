export class User {
  constructor(public email: string,
              public userId: string | number,
              public sessionToken: string,
              public sessionExpires: Date) {

  }
}

export class CurrentUser extends User{

  constructor(userData: any){
    const sessionExpires = new Date(userData.sessionExpires);
    super(userData.email,
      userData.userId,
      userData.sessionToken,
      sessionExpires);
  }

  setCurrentUserInStorage(){
    localStorage.setItem('email', this.email);
    localStorage.setItem('userId', this.userId + '');
    localStorage.setItem('sessionToken', this.sessionToken);
    localStorage.setItem('sessionExpires', this.sessionExpires.toString());
  }
}