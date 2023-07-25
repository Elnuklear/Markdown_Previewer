import * as React from 'react';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState(localStorage.getItem('TextBox') || '');
  const textAreaRef = useRef(null);
  const caretPositionRef = useRef(0);

  console.log('@thetopofApp');

  useEffect(() => {
    localStorage.setItem('TextBox', textInput);

    const handleKeyPress = (e) => {
      //Focuses the textarea after a keypress.
      textAreaRef.current.focus(); 
      //Saves the caret position.
      textAreaRef.current.setSelectionRange(caretPositionRef.current, caretPositionRef.current + 1); 
    
      console.log('Keypressed: ', e.inputType);
    };

    window.addEventListener('input', handleKeyPress);

    return () => {
      window.removeEventListener('input', handleKeyPress);
    }
  }, [textInput]);

  const handleKeyDown = (e) => {
    const {selectionStart, selectionEnd} = textAreaRef.current;
    if (e.key === 'Enter') {
      // Prevent default behavior of the Enter key (form submission).
      e.preventDefault();
      // Add a line break (newline) to the current value of the textarea.
      setTextInput((prevText) => {
        const newText = prevText.slice(0, selectionStart) + '\n' + prevText.slice(selectionEnd);
        
        return newText      
      });
      
      setTimeout(() => {
      //Refocus of the caret after Enter key is pressed.
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(selectionStart + 1, selectionEnd + 1);
    });
      console.log('@handleKeyDown', e.key);
    }
    
    if (e.key === 'Tab') {
      // Prevent default behavior of the Tab key leaving the focus area.
      e.preventDefault();
      // Add a tab character to the current value of the textarea.
      setTextInput((prevText) => {
        const updatedText =
          prevText.substring(0, selectionStart) +
          '\t' +
          prevText.substring(selectionEnd);

          setTimeout(() => {
            //Refocus of the caret after Enter key is pressed.
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(selectionStart + 1, selectionEnd + 1);
          });
          return updatedText
      });
    }
  };
  
  const handleChange = (e) => {
    setTextInput(e.target.value);
    caretPositionRef.current = e.target.selectionStart;
    console.log('@handleChange:', textInput, e.target.selectionStart, e.target.selectionEnd, caretPositionRef.current);
  };
  
  const handleSelect = (e) => {
    textAreaRef.current.focus();
    console.log('@handleSelect', caretPositionRef.current);
  };
    
  const TextBox = () => (
    <div>
      <textarea
        ref={textAreaRef}
        value={textInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleSelect}
        placeholder='Enter text here...'
      />
        <hr />
    </div>
  );

  const Previewer = ({ output }) => (
    <div 
    style={{ whiteSpace: 'pre-wrap'}}
    >
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
