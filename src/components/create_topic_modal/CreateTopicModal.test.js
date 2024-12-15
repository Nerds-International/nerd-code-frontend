import { render, screen, fireEvent } from '@testing-library/react';
import CreateTopicModal from './CreateTopicModal';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../store/forum/ForumStore', () => ({
  forumStore: {
    addTopic: jest.fn(),
  },
}));

global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

describe('CreateTopicModal', () => {
  let setVisible;

  beforeEach(() => {
    setVisible = jest.fn();
  });

  test('renders CreateTopicModal when visible is true', () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);
    
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Text of topic')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('calls addTopic and resets form on OK button click with valid input', () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);
    
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Topic' } });
    fireEvent.change(screen.getByPlaceholderText('Text of topic'), { target: { value: 'This is the content of the test topic.' } });

    fireEvent.click(screen.getByRole('button', { name: /OK/i }));
  });

  test('resets form and closes modal on Cancel button click', () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    expect(setVisible).toHaveBeenCalledWith(false);
  });
});
