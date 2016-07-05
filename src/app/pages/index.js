import React from 'react';
import echarts from 'echarts';
import EChartsWrapper from './../components/common/EChartsWrapper';
import diskData from '../data.json';
const formatUtil = echarts.format;
import config from 'config';
console.log(config);

function getLevelOption() {
  return [
    {
      itemStyle: {
        normal: {
          borderWidth: 0,
          gapWidth: 5
        }
      }
    },
    {
      itemStyle: {
        normal: {
          gapWidth: 1
        }
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        normal: {
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      }
    }
  ];
}

const option = {

  title: {
    text: 'Disk Usage',
    left: 'center'
  },

  tooltip: {
    formatter: function (info) {
      const value = info.value;
      const treePathInfo = info.treePathInfo;
      const treePath = [];

      for (let i = 1; i < treePathInfo.length; i++) {
        treePath.push(treePathInfo[i].name);
      }

      return [
        '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
        'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
      ].join('');
    }
  },

  series: [
    {
      name: 'Disk Usage',
      type: 'treemap',
      visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        normal: {
          borderColor: '#fff'
        }
      },
      levels: getLevelOption(),
      data: diskData
    }
  ]
};

class IndexComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      option
    };
  }

  render() {
    return (
      <div>
        <EChartsWrapper option={this.state.option}/>
      </div>
    );
  }
}

export default IndexComponent;
