import React from 'react';
import { shallow } from 'enzyme';
import AppFunctional from './AppFunctional';

describe('AppFunctional', () => {
  it('should show the active square on mount', () => {
    // Arrange
    const wrapper = shallow(<AppFunctional />);

    // Act
    wrapper.instance().componentDidMount();

    // Assert
    expect(wrapper.find('.square.active').length).toEqual(1);
  });
});