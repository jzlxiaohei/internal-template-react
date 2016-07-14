import { observable } from 'mobx';

export default class NameList {
  @observable list = ['name1', 'name2'];

  addName(name) {
    this.list.push(name);
  }
}
