export interface userCreationData {
  id?: string;
  User_Name: string;
  email: string;
  First_Name: string;
  Last_Name: string;
  Phone_Number: string;
  gender: string;
}
export interface unKnownUser {
  [key: string]: userCreationData;
}
