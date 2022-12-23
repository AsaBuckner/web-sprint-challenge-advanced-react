import React from 'react';
import { render} from '@testing-library/react';
import AppFunctional from './AppFunctional';

describe('AppFunctional', () => {
  it('should show the active square on mount', () => {
    // Arrange
    const { getByText } = render(<AppFunctional />);

    // Act
    // No action is needed here, as the active square should be shown on mount

    // Assert
    expect(getByText('B').classList.contains('active')).toBeTruthy();
  });
});