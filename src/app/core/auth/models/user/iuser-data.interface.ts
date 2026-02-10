
interface UserDataResponse {
  message: string;
  user: IuserData;
  token: string;
}

interface IuserData {
  name: string;
  email: string;
  role: string;
}
