class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'வணக்கம், **தமிழ்**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>உள்ளீடு</h3>
        <label htmlFor="markdown-content">
          இங்கே உள்ளிடவும்
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>வெளிளீடு</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MarkdownEditor />,
  document.getElementById('markdown-example')
);
