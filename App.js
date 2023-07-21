import * as React from 'react';
import { useRef, useEffect } from 'react';
import './App.css';

/* const textReducer = (state, action) => {
  switch (action.type) {
    case 'insertLineBreak':
      return {

      }
  }
} */

function App() {
  const [textInput, setTextInput] = React.useState('');
  const textAreaRef = useRef(null);
  const caretPositionRef = useRef(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      textAreaRef.current.focus(); //Focuses the textarea after a keypress
      textAreaRef.current.setSelectionRange(caretPositionRef.current, caretPositionRef.current); //Saves the caret position.
      console.log('Keypressed: ', e.inputType);
    };

    window.addEventListener('input', handleKeyPress);

    return () => {
      window.removeEventListener('input', handleKeyPress);
    }
  }, []);

  console.log('@thetopofApp')
  
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
        placeholder='Enter text here...'
      />
        <hr />
    </div>
  );

  const Previewer = ({ output }) => (
    <div>
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
      <Previewer output={textInput} />
      </div>
    </div>
  );
};

export default App;
