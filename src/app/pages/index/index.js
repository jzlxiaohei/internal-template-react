import './index.scss';
import React from 'react';
import { observer } from 'mobx-react';
import EChartsWrapper from './../../components/EChartsWrapper';
import Bar from '../../models/Bar';
import NameList from '../../models/NameList';

@observer
class List extends React.Component {

  static propTypes = {
    list: React.PropTypes.object
  };

  // constructor() {
  //   super();
  //   // this.nameList = new NameList();
  //   // window.$nameList = this.nameList;
  // }

  render() {
    console.log('list');
    return (
      <ul>
        {
          this.props.list.map((name, index) => (
            <li key={index}>{name}</li>
          ))
        }
      </ul>
    );
  }
}

@observer
class IndexComponent extends React.Component {

  constructor() {
    super();
    this.bar = new Bar();
    this.nameList = new NameList();
    window.$nameList = this.nameList;
  }

  render() {
    console.log('index');
    return (
      <div>
        <List list={this.nameList.list}/>
        <div className="chart-container">
          <EChartsWrapper option={this.bar.option}/>
        </div>
      </div>
    );
  }
}

export default IndexComponent;
