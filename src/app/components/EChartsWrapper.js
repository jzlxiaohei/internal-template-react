import React from 'react';
import echarts from 'echarts';
import _ from 'lodash';
class EChartsWrapper extends React.Component {

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  renderChart() {
    const {
      option,
      notMerge,
      notRefreshImmediately
    } = this.props;
    if (!this.chart) {
      this.chart = echarts.init(this.refs.container);
    }
    this.chart.showLoading();
    this.chart.setOption(option, notMerge, notRefreshImmediately);
    this.chart.hideLoading();
  }

  render() {
    const style = this.props.style;
    const others = _.omit(this.props, 'option', 'notMerge', 'notRefreshImmediately', 'style');
    let newStyle = _.assign({
      width: '100%',
      height: '100%'
    }, style);

    return (
      <div ref="container" {...others} style={newStyle}></div>
    );
  }
}

EChartsWrapper.propTypes = {
  option: React.PropTypes.object.isRequired,
  notMerge: React.PropTypes.bool,
  notRefreshImmediately: React.PropTypes.bool,
  style: React.PropTypes.object
};

export default EChartsWrapper;
