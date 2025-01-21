import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ToDo Application', () => {
  test('renders the app with initial UI', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByText('All Tasks')).toBeInTheDocument();
    expect(screen.getByText('Incomplete Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('does not add an empty task', () => {
    render(<App />);
    const button = screen.getByText('Add Task');
    fireEvent.click(button);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('marks a task as completed', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('switches to "Incomplete Tasks" tab', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]); // Mark the first task as completed

    const incompleteTab = screen.getByText('Incomplete Tasks');
    fireEvent.click(incompleteTab);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('switches to "Completed Tasks" tab', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]); // Mark the first task as completed

    const completedTab = screen.getByText('Completed Tasks');
    fireEvent.click(completedTab);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('shows no tasks in the "Completed Tasks" tab when no tasks are completed', () => {
    render(<App />);
    const completedTab = screen.getByText('Completed Tasks');
    fireEvent.click(completedTab);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('shows no tasks in the "Incomplete Tasks" tab when all tasks are completed', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox); // Mark the task as completed

    const incompleteTab = screen.getByText('Incomplete Tasks');
    fireEvent.click(incompleteTab);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
