import React from 'react';
import test from 'ava';
import { shallow, mount} from 'enzyme';
import Index from '../src/app/pages/index';
import EChartsWrapper from '../src/app/components/EChartsWrapper';

test('Index',t=>{
  const wrapper = shallow(<Index/>);
  t.true(wrapper.find(EChartsWrapper).length == 1);
});

