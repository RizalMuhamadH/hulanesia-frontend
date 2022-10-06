import { Profile } from "./profile";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  profile: Profile;
}
