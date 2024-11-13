import { render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import '@testing-library/jest-dom/extend-expect';

describe("Navbar", () => {
  test("correct rendering", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByText(/Problems/i)).toBeInTheDocument();
    expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
    expect(screen.getByText(/Battle/i)).toBeInTheDocument();
  });
});
