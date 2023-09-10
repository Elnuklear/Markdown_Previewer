import * as React from 'react';
import { marked } from 'marked';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState(localStorage.getItem('TextBox') || '');

  const handleChange = (e) => {
    setTextInput(e.target.value);

    localStorage.setItem('TextBox', textInput);
    console.log(textInput);
  };

  const parseMarkdown = () => {
    return { __html: marked(textInput) };
  };

  return (
    <div className="App">
      <div className="TextBox">
        <header>Markdown Previewer</header>
        <TextBox textValue={ textInput } onChange={ handleChange } />
      </div>
      <div className='Previewer'>
        <div id="preview" dangerouslySetInnerHTML={parseMarkdown()} />
      {/*  <Previewer
          output={ textInput }
        /> */}
      </div>
      <button onClick={() => {localStorage.clear()}}>Clear Text</button>
    </div>
  );
};

const TextBox = ({ textValue, onChange }) => (
  <textarea
    id='editor'
    placeholder="Enter text here"
    value={ textValue }
    onChange={ onChange }
  />
);

const Previewer = ({ output }) => (
  <div
    id='preview'
    style={ { whiteSpace: 'pre-wrap' } }
  >
    { output }
  </div>
);

export default App;
