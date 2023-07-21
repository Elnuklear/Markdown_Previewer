import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = () => {
      textAreaRef.current.focus(); //Focuses the textarea after a keypress
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  console.log('@thetopofApp')
  
  const handleChange = (e) => {
    console.log(e);
    setTextInput(e.target.value);
    console.log(e.target.value);
    };
    
  const TextBox = () => {
    console.log('TextBox renders');
   
    return(
    <div
    id="previewer-top"
    >
      <textarea
        ref={textAreaRef}
        value={textInput}
        onChange={handleChange}
      />
        <hr />
    </div>
    )
  };

  const Previewer = ({ output }) => {
    console.log('Previewer renders');
    
    return(
    <div
    id="previewer-bottom"
    type="text"
    >
      <p>{output}</p>
    </div>
    );
  };

  return (
      <div className="App">
      <header>Markdown Previewer</header>
      <TextBox />
      <Previewer output={textInput} />
    </div>
  );
};

export default App;
