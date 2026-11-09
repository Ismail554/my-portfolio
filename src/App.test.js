// src/App.test.js
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

global.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
let root = null;

function setInputValue(input, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.scrollTo = () => {};
  localStorage.clear();
  sessionStorage.clear();
  window.history.pushState({}, '', '/');
});

afterEach(() => {
  if (root) {
    act(() => {
      root.unmount();
    });
  }
  if (container) {
    container.remove();
  }
  container = null;
  root = null;
});

test('renders portfolio landing page with engineer name and sections', () => {
  act(() => {
    root.render(<App />);
  });
  expect(container.textContent).toContain('MD Ismail Hosen');
  expect(container.textContent).toContain('Flutter Developer');
  expect(container.textContent).toContain('Featured Applications');
  expect(container.textContent).toContain('Professional Experience');
  expect(container.textContent).toContain('Swarm Build');
});

test('navigates to /admin and renders admin login screen', () => {
  window.history.pushState({}, '', '/admin');
  act(() => {
    root.render(<App />);
  });

  expect(container.textContent).toContain('Portfolio CMS');
  expect(container.textContent).toContain('Restricted Access');
  const emailInput = container.querySelector('input[type="email"]');
  const passwordInput = container.querySelector('input[type="password"]');
  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();
});

test('shows error message on incorrect login credentials', () => {
  jest.useFakeTimers();
  window.history.pushState({}, '', '/admin');

  act(() => {
    root.render(<App />);
  });

  const emailInput = container.querySelector('input[type="email"]');
  const passwordInput = container.querySelector('input[type="password"]');
  const form = container.querySelector('form');

  act(() => {
    setInputValue(emailInput, 'wrong@gmail.com');
    setInputValue(passwordInput, 'wrongpassword');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(container.textContent).toContain('Invalid admin email or password');
  jest.useRealTimers();
});

test('logs in successfully with valid credentials and manages projects', () => {
  jest.useFakeTimers();
  window.history.pushState({}, '', '/admin');

  act(() => {
    root.render(<App />);
  });

  const emailInput = container.querySelector('input[type="email"]');
  const passwordInput = container.querySelector('input[type="password"]');
  const form = container.querySelector('form');

  // Submit valid credentials
  act(() => {
    setInputValue(emailInput, 'mdismail.cse59@gmail.com');
    setInputValue(passwordInput, '586908@sH');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Verify Dashboard loaded
  expect(container.textContent).toContain('Ismail Portfolio CMS');
  expect(container.textContent).toContain('Overview');
  expect(container.textContent).toContain('Projects (CRUD)');

  // Navigate to Projects tab
  const projectsSidebarBtn = Array.from(container.querySelectorAll('.admin-sidebar-item')).find(
    (btn) => btn.textContent.includes('Projects')
  );
  expect(projectsSidebarBtn).not.toBeNull();

  act(() => {
    projectsSidebarBtn.click();
  });

  expect(container.textContent).toContain('Projects Management');
  expect(container.textContent).toContain('ScoreLivePro');
  expect(container.textContent).toContain('HireNearby');

  jest.useRealTimers();
});
