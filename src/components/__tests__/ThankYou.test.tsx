import { screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import { render } from '@testing-library/react';
import ThankYou from '../ThankYou';
import { Context, ContextDefaultValues } from '../../Provider/ContextProvider';

describe('ThankYou component testing', () => {
  test('Should render ThankYou', () => {
    const deleteAll = vitest.fn();

    render(
      <Context.Provider value={{ ...ContextDefaultValues, deleteAll }}>
        <ThankYou />
      </Context.Provider>,
    );
    expect(screen.getByText('Your order is completed')).toBeInTheDocument();
    expect(deleteAll).toHaveBeenCalled();
  });
});
