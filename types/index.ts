export interface ClassInfo {
  _id: number;
  section: string;
  students: {
    id: number;
    name: string;
    'time-in': string;
  }[];
}

export interface User {
  _id: number;
  username: string;
  password: string;
}