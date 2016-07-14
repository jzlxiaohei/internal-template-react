import { observable } from 'mobx';

class AppState {
  @observable isLockScreen = false;
}

export default new AppState();
