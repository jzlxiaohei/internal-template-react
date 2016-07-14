import './index.scss';
import React from 'react';
import { observer } from 'mobx-react';

@observer
class SecondComponent extends React.Component {
  render() {
    return (
      <div>second</div>
    )
  }
}

export default SecondComponent;
