import './index.scss';
import React from 'react';
import { observer } from 'mobx-react';
import EChartsWrapper from './../../components/EChartsWrapper';
import Bar from '../../models/Bar';

@observer
class IndexComponent extends React.Component {

  constructor() {
    super();
    this.bar = new Bar();
  }

  render() {
    return (
      <div className="chart-container">
        <EChartsWrapper option={this.bar.option} />
      </div>
    );
  }
}

export default IndexComponent;
