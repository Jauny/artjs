var Tile = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    onMouseOver: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  onMouseOver: function() {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(this.props.index);
    }
  },

  onClick: function() {
    if (this.props.onClick) {
      this.props.onClick(this.props.color);
    }
  },

  render: function() {
    var style = {backgroundColor: this.props.color};
    return (
      <div className="tile" onMouseOver={this.onMouseOver} onClick={this.onClick} style={style}>
      </div>
    );
  }
});

var Palette = React.createClass({
  onClick: function(color) {
    this.props.onClick(color);
  },

  render: function() {
    var tiles = this.props.colors.map(function(color) {
      return <Tile key={color} color={color} onClick={this.onClick} />
    }.bind(this));
    return (
      <div className="palette">
        {tiles}
      </div>
    );
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      active: false,
      tilesData: this.generateTilesData(),
      currentColor: false,
      colors: {
        'red': true,
        'green': true,
        'blue': true
      }
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleSpace);
  },

  generateTilesData: function() {
    if (!this.props.tilesData) {
      var windowHeight = window.innerHeight,
          windowWidth = window.innerWidth,
          tileSize = 52,
          lineLength = Math.floor(windowWidth / tileSize),
          columnHeight = Math.floor(windowHeight / tileSize),
          tileAmount = lineLength * columnHeight;

      var tilesData = {};
      for (var i = 0; i < tileAmount; i++) {
        tilesData[i] = '#808080';
      }
      return tilesData;
    } else {
      return this.props.tilesData;
    }
  },

  generateColor: function() {
    var r, g, b;
    r = this.state.colors['red'] ? Math.floor(Math.random() * 255) : 0;
    g = this.state.colors['green'] ? Math.floor(Math.random() * 255) : 0;
    b = this.state.colors['blue'] ? Math.floor(Math.random() * 255) : 0;

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  },

  changeTileColor: function(index) {
    if (this.state.active) {
      tmp = this.state.tilesData;
      tmp[index] = this.generateColor();
      this.setState({tilesData: tmp});
    }
  },

  changePaletteColor: function(color) {
    if (this.state.currentColor == color) {
      return this.resetPaletteColor();
    }

    var colors = {};
    for (var c in this.state.colors) {
      c == color ? colors[c] = true : colors[c] = false;
    }
    return this.setState({colors: colors, currentColor: color});
  },

  resetPaletteColor: function() {
    var colors = {
      'red': true,
      'green': true,
      'blue': true
    };

    return this.setState({colors: colors, currentColor: false});
  },

  handleSpace: function(e) {
    if (e.which == 32) {
      e.preventDefault();
      return this.setState({active: !this.state.active});
    }
  },

  render: function() {
    var tiles = [];

    for (var i in this.state.tilesData) {
      tiles.push(
        <Tile key={i} color={this.state.tilesData[i]} active={this.state.activeState} index={i} onMouseOver={this.changeTileColor} />
      );
    };

    return (
      <div onKeyPress={this.handleSpace}>
        <Palette onClick={this.changePaletteColor} colors={['red', 'green', 'blue']} />
        {tiles}
      </div>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('content')
);
