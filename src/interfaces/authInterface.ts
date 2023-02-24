interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  job: string;
  active: Boolean;
  role: string;
}

export default User;
