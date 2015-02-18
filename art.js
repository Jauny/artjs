var Tile = React.createClass({
  getInitialState: function() {
    return {color: false};
  },

  generateColor: function() {
    var hexa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
      color = [0,0,0,0];

    for (var i = 0; i < 2; i++) {
      var index = Math.floor(Math.ceil(Math.random() * 10) * 1.4);
      color.unshift(hexa[index]);
    }
    return '#' + color.join('');
  },

  changeColor: function() {
    if (this.props.active) {
      this.setState({color: this.generateColor()});
    }
  },

  render: function() {
    var style = {backgroundColor: this.state.color};
    return (
      <div className="tile" onClick={this.changeColor}
           onMouseOver={this.changeColor} style={style}>
      </div>
    );
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      active: false
    }
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleSpace);
  },

  handleSpace: function(e) {
    if (e.which == 32) {
      e.preventDefault();
      this.setState({active: !this.state.active});
    }
  },

  render: function() {
    var windowHeight = window.innerHeight,
        windowWidth = window.innerWidth,
        tileSize = 52,
        lineLength = Math.floor(windowWidth / tileSize),
        columnHeight = Math.floor(windowHeight / tileSize),
        tileAmount = lineLength * columnHeight;

    var tiles = [];
    for (var i = 0; i < tileAmount; i++) {
      tiles.push(<Tile active={this.state.active} />);
    }

    return (
      <div onKeyPress={this.handleSpace}>
        {tiles}
      </div>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('content')
);
