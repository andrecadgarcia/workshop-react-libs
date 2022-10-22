import { render, screen } from '@testing-library/react';
import Login from './Login';
import configureStore from 'redux-mock-store'

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigator
}));

test('renders the landing page', () => {
  const mockStore = configureStore()
  const store = mockStore([])
  const login = render(<Login store={store} />); 
  expect(login).toBeTruthy();
});