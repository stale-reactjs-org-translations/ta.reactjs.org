function Welcome(props) {
  return <h1>வணக்கம், {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="சாரா" />
      <Welcome name="சாகால்" />
      <Welcome name="எடிட்டி" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
