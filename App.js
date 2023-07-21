import * as React from 'react';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState('');
  const textAreaRef = useRef(null);
  const caretPositionRef = useRef(0);

  useEffect(() => {
    const handleKeyPress = () => {
      textAreaRef.current.focus(); //Focuses the textarea after a keypress
      textAreaRef.current.setSelectionRange(caretPositionRef.current, caretPositionRef.current);
      console.log('@handleKeyPress');
    };

    window.addEventListener('input', handleKeyPress);

    return () => {
      window.removeEventListener('input', handleKeyPress);
    }
  }, []);

  console.log('@thetopofApp')
  
  const handleChange = (e) => {
    console.log(e);
    setTextInput(e.target.value);
    caretPositionRef.current = e.target.selectionStart;
    console.log(e.target.value);
    console.log(textInput);
    };
    
  const TextBox = () => {
    console.log('TextBox renders');
   
    return(
    <div>
      <textarea
        ref={textAreaRef}
        value={textInput}
        onChange={handleChange}
        placeholder='Enter text here...'
      />
        <hr />
    </div>
    )
  };

  const Previewer = ({ output }) => {
    console.log('Previewer renders');
    
    return(
    <div>
      {output}
    </div>
    );
  };

  return (
    <div className="App">
      <div className="TextBox">
        <header>Markdown Previewer</header>
        <TextBox />
      </div>
      <div className='Previewer'>
      <Previewer output={textInput} />
      </div>
    </div>
  );
};

export default App;
