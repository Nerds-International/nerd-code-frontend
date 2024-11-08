import React from 'react';
import {render, screen} from '@testing-library/react';
import {forumStore} from '../../store/forumStore/ForumStore';
import DiscussPage from './DiscussPage';

jest.mock('../../store/forumStore/ForumStore', () => ({
  forumStore: {
    getTopics: jest.fn(),
  },
}));

describe('DiscussPage', () => {
  beforeEach(() => {
    forumStore.getTopics.mockClear();
  });

  test('renders the component correctly', () => {
    forumStore.getTopics.mockReturnValue([
      { title: 'Topic 1', author: 'user1', time: '2023-10-01' },
      { title: 'Topic 2', author: 'user2', time: '2023-10-02' },
    ]);

    render(<DiscussPage />);
    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Topic 2')).toBeInTheDocument();

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText('Hot')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    expect(screen.getByText('Create topic')).toBeInTheDocument();
  });

  test('disables buttons and search input', () => {
    render(<DiscussPage />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeDisabled();
  });

  test('calls getTopics on render', () => {
    forumStore.getTopics.mockReturnValue([]);

    render(<DiscussPage />);

    expect(forumStore.getTopics).toHaveBeenCalledTimes(1);
  });
});
