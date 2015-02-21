var Tile = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    onOver: React.PropTypes.func
  },

  onChange: function() {
    this.props.onOver(this.props.index);
  },

  render: function() {
    var style = {backgroundColor: this.props.color};
    return (
      <div className="tile" onMouseOver={this.onChange} style={style}>
      </div>
    );
  }
});

var PaletteColor = React.createClass({
  getInitialState: function() {
    return {
      color: this.props.color
    };
  },

  onClick: function() {
    this.props.onClick(this.state.color);
  },

  render: function() {
    var style = {backgroundColor: this.props.color};
    return (
      <div className='tile' onClick={this.onClick} style={style}>
      </div>
    )
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      active: false,
      tilesData: this.generateTilesData(),
      hue: [0, 1, 2, 3, 4, 5],
      hueMap: {
        'red': [0, 1],
        'green': [2, 3],
        'blue': [4, 5],
        'yellow': [0, 1, 2, 3]
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
    var hexa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
      color = [0, 0, 0, 0, 0, 0];

    this.state.hue.forEach(function(index) {
      var code = Math.floor(Math.ceil(Math.random() * 10) * 1.4);
      color[index] = hexa[code];
    });

    return '#' + color.join('');
  },

  changeTileColor: function(index) {
    if (this.state.active){
      tmp = this.state.tilesData;
      tmp[index] = this.generateColor();
      this.setState({tilesData: tmp});
    }
  },

  changePaletteColor: function(color) {
    this.setState({hue: this.state.hueMap[color]});
  },

  handleSpace: function(e) {
    if (e.which == 32) {
      e.preventDefault();
      this.setState({active: !this.state.active});
    }
  },

  render: function() {
    var tiles = [];

    for (var i in this.state.tilesData) {
      tiles.push(<Tile color={this.state.tilesData[i]} active={this.state.activeState} index={i} onOver={this.changeTileColor} />);
    };

    return (
      <div>
        <div onKeyPress={this.handleSpace}>
          <PaletteColor color='red' onClick={this.changePaletteColor} />
          <PaletteColor color='blue' onClick={this.changePaletteColor} />
          <PaletteColor color='green' onClick={this.changePaletteColor} />
          <PaletteColor color='yellow' onClick={this.changePaletteColor} />
          {tiles}
        </div>
      </div>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('content')
);
