import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SendMessageModal from './SendMessageModal';

describe('SendMessageModal Component', () => {
  let setVisibleMock;
  let addToMessageListMock;

  beforeEach(() => {
    setVisibleMock = jest.fn();
    addToMessageListMock = jest.fn();
  });

  test('does not render when visible is false', () => {
    render(
      <SendMessageModal visible={false} setVisible={setVisibleMock} addToMessageList={addToMessageListMock} />
    );
    expect(screen.queryByPlaceholderText('Text..')).not.toBeInTheDocument();
  });

});