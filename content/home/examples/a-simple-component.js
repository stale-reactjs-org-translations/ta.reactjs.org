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
>>>>>>> cb9854a54984ef1288a8a2b8754897b15e75f433
