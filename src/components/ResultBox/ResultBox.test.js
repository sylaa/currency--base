import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency'

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  const testCasesAmount = [
    { amount: 100 },
    { amount: 20 },
    { amount: 200 },
    { amount: 345 },
  ];

  for (const testObj of testCasesAmount) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'PLN');
      const convertedAmount = formatAmountInCurrency(testObj.amount / 3.5, 'USD');
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formattedAmount} = ${convertedAmount}`.replace(/\u00a0/g, " "));
    });
  }

  for (const testObj of testCasesAmount) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'USD');
      const convertedAmount = formatAmountInCurrency(testObj.amount * 3.5, 'PLN');
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formattedAmount} = ${convertedAmount}`.replace(/\u00a0/g, " "));
    });
  }

  const testCasesCurrencies = [
    { currency: 'PLN', amount: 200 },
    { currency: 'USD', amount: 200 },
    { currency: 'PLN', amount: 145 },
    { currency: 'USD', amount: 15 }
  ];

  for (const testObj of testCasesCurrencies) {
    it('should render proper info about conversion with the same currencies', () => {
      render(<ResultBox from={testObj.currency} to={testObj.currency} amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, testObj.currency);
      const output = screen.getByTestId('output');
      // console.log(output);
      expect(output).toHaveTextContent(`${formattedAmount} = ${formattedAmount}`.replace(/\u00a0/g, " "));
    });
  }

  const testNegativeValues = [
    { amount: -100, from: 'PLN', to: 'USD' },
    { amount: -20, from: 'USD', to: 'PLN' },
    { amount: -200, from: 'PLN', to: 'USD' },
    { amount: -345, from: 'USD', to: 'PLN' },
  ];
  for (const testObj of testNegativeValues) {
    it('should render text "Wrong value..." if the amount is negative', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    })
  }
});
