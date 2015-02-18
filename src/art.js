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
    if ($('#content').data('active') == 'true') {
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
    var windowHeight = window.innerHeight,
        windowWidth = window.innerWidth,
        tileSize = 52,
        lineLength = Math.floor(windowWidth / tileSize),
        columnHeight = Math.floor(windowHeight / tileSize),
        tileAmount = lineLength * columnHeight;

    var tiles = [];
    for (var i = 0; i < tileAmount; i++) {
      tiles.push(<Tile />);
    }

    return {
      tiles: tiles
    };
  },

  render: function() {
    return (
      <div>
        {this.state.tiles}
      </div>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('content')
);
$('body').keydown(function(e) {
  if (e.which == 32) {
    e.preventDefault();
    var content = $('#content');
    if (content.data('active') == 'false') {
      content.data('active', 'true');
    } else {
      content.data('active', 'false');
    }
  }
});
