import React, { useState } from 'react';
import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  { label: 'Numbers', value: 'numbers' },
  { label: 'Alphabets', value: 'alphabets' },
  { label: 'Highest Alphabet', value: 'highest_alphabet' },
];

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid JSON format: "data" key missing or not an array');
      }
      const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('numbers') && (
          <div>
            <h3>Numbers</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('alphabets') && (
          <div>
            <h3>Alphabets</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('highest_alphabet') && (
          <div>
            <h3>Highest Alphabet</h3>
            <p>{response.highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Frontend App</h1>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ width: '100%' }}>
          <legend>API Input</legend>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="4"
            cols="50"
            placeholder='{"data": ["A", "C", "z"]}'
            style={{ width: '100%' }}
          />
        </fieldset>
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            width: '100%',
            borderRadius: '30px',
            marginTop: '20px',
          }}
        >
          Submit
        </button>
        <fieldset style={{ width: '100%', marginTop: '20px' }}>
          <legend>Multi-Filter</legend>
          <MultiSelect
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            labelledBy="Select"
            style={{ width: '100%' }}
          />
        </fieldset>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && renderResponse()}
    </div>
  );
};

export default InputForm;
