import { observable } from 'mobx';

export default class Bar {

  @observable list = ['name1', 'name'];

  addName(name) {
    this.list.push(name);
  }

}
