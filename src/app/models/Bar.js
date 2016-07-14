import _ from 'lodash';
import { observable, computed } from 'mobx';

export default class Bar {

  // constructor() {
  //   setInterval(() => {
  //     this.data[5] = Math.round(Math.random() * 200);
  //   }, 1500);
  // }

  @observable data = [10, 52, 200, 334, 390, 330];

  @computed get option() {
    return _.merge(
      {},
      this.defaultOption,
      { series: [{ data: this.data }] }
    );
  }

  defaultOption = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  }
}
