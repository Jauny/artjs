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

var Board = React.createClass({
  getInitialState: function() {
    return {
      active: false,
      tilesData: this.generateTilesData(),
      hue: [0, 1, 2, 3, 4, 5]
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

    for (var index in this.state.hue) {
      var code = Math.floor(Math.ceil(Math.random() * 10) * 1.4);
      color[index] = hexa[code];
    }
    return '#' + color.join('');
  },

  changeTileColor: function(index) {
    if (this.state.active){
      tmp = this.state.tilesData;
      tmp[index] = this.generateColor();
      this.setState({tilesData: tmp});
    }
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
