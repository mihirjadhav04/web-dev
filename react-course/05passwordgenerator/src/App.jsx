import React, { useRef, useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef("null")


  // Function to generate password
  const generatePassword = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecialChars) characters += '!@#$%^&*()_+-=<>?';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
  };

  // Function to copy password to clipboard
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select()
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="p-10 bg-white rounded-xl shadow-xl w-100 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">Password Generator</h2>

        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            readOnly
            className={`w-full p-3 text-center text-lg font-semibold rounded-lg border-2 focus:outline-none transition-colors duration-300 ${
              copied ? 'bg-green-100 border-green-500 shake' : 'bg-gray-100 border-indigo-300'
            }`}
            placeholder="Generated Password"
            ref={passwordRef}
          />
          
        </div>
        <button
            onClick={copyPassword}
            className="absolute right-2 top-2 text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

        <div className="mb-6">
          <label className="block text-md font-medium text-gray-700 mb-2">
            Password Length: <span className="font-bold text-indigo-600">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between mb-6 space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2 h-4 w-4 accent-purple-500"
            />
            <span className="text-sm font-semibold text-gray-700">Include Numbers</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="mr-2 h-4 w-4 accent-purple-500"
            />
            <span className="text-sm font-semibold text-gray-700">Include Symbols</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
        >
          Generate Password
        </button>
      </div>

      {/* Shake Animation CSS */}
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .shake {
          animation: shake 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default PasswordGenerator;
