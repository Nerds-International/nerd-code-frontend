import { makeAutoObservable } from "mobx";

class AvatarStore {
  constructor() {
    makeAutoObservable(this);
  }

  avatar1 = "https://www.flaticon.com/free-icons/geek";
  avatar2 =
    "https://www.flaticon.com/free-icon/brain_4010814?term=nerd&related_id=4010814";
  avatar3 =
    "https://www.flaticon.com/free-icon/brain_4011139?related_id=4010915&origin=search";
}

export const avatarStore = new AvatarStore();
