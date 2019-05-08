function Welcome(props) {
  return <h1>வணக்கம், {props.name}</h1>;
}

const element = <Welcome name="சாரா" />;
ReactDOM.render(element, document.getElementById('root'));
