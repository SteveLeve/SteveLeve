import { useState } from 'react';

export default function TestReactComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">React Integration Test</h2>
      <p className="mb-4">
        This is a React component with state management to verify the integration works correctly.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="text-xl font-mono">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}