import React from 'react';
import InputForm from './components/InputForm';

const App = () => {
  document.title = 'your_roll_number'; // Set the website title to your roll number

  return (
    <div className="App">
      <InputForm />
    </div>
  );
};

export default App;
