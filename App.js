import * as React from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e);
    setTextInput(e.target.value);
    console.log(e.target.value);
    };
    
  /* const TextBox = () => {
    console.log('TextBox renders');
   
    return(
    <div
    id="previewer-top"
    type="text"
    >
      <textarea
        onChange={handleChange}
        value={textInput}
      >
      </textarea>
        <hr />
    </div>
    )
  };*/

  const Previewer = ({ outPut }) => {
    console.log('Previewer renders');
    
    return(
    <div
    id="previewer-bottom"
    type="text"
    >
      <p>{outPut}</p>
    </div>
    );
  };

  return (
      <div className="App">
      <header>Markdown Previewer</header>
      <textarea
        onChange={handleChange}
      ></textarea>
      <Previewer outPut={textInput} />
    </div>
  );
};

export default App;
