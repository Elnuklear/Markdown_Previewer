import * as React from 'react';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState('');
  const textAreaRef = useRef(null);
  const caretPositionRef = useRef(0);

  console.log('@thetopofApp');

  useEffect(() => {
    const handleKeyPress = (e) => {
      textAreaRef.current.focus(); //Focuses the textarea after a keypress.
      //Saves the caret position.
      textAreaRef.current.setSelectionRange(caretPositionRef.current, caretPositionRef.current); 
    
      console.log('Keypressed: ', e.inputType);  
      console.log(typeof e.inputType);
    };

    window.addEventListener('input', handleKeyPress);

    return () => {
      window.removeEventListener('input', handleKeyPress);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Prevent default behavior of the Enter key (form submission).
      e.preventDefault();
      
      const {selectionStart, selectionEnd} = e.target;
      // Add a line break (newline) to the current value of the textarea.
      setTextInput(() => textInput + '\n');

      setTimeout(() => {
        //Refocus of the caret after Enter key is pressed.
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(selectionStart + 1, selectionEnd + 1);
      });
      console.log('@handleKeyDown', e.key);
    }
  };
  
  const handleChange = (e) => {
    setTextInput(e.target.value);
    caretPositionRef.current = e.target.selectionStart;
    console.log(textInput);
    };
    
  const TextBox = () => (
    <div>
      <textarea
        ref={textAreaRef}
        value={textInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter text here...'
      />
        <hr />
    </div>
  );

  const Previewer = ({ output }) => (
    <div style={{ whiteSpace: 'pre-wrap'}} >
      {output}
    </div>
  );

  return (
    <div className="App">
      <div className="TextBox">
        <header>Markdown Previewer</header>
        <TextBox />
      </div>
      <div className='Previewer'>
        <Previewer 
          output={textInput}
        />
      </div>
    </div>
  );
};

export default App;
