class HelloMessage extends React.Component {
  render() {
<<<<<<< HEAD
    return (
      <div>
        வணக்கம் {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="தமிழ்" />,
  document.getElementById('hello-example')
);
=======
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Taylor" />);
>>>>>>> d4e42ab21f0cc7d8b79d1a619654e27c79e10af6
