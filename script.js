// Will be used to initiate setInterval
var sorted_txt;

// An independent variable to store independent from state texts array:
const texts = [
["I'm here!", "No, here!", "Pick me!", "I'm blue", "You rock!", "Hello?"],
["I'm here!", "No, here!", "Pick me!"]];


// A variable to store maximum admissible number of buttons displayed at the start of each play
var limit = 0;

//Number of plays per game
const game_plays = 10;

//Helper function to sort arrays of str
function sort(arr, unsorted) {
  if (unsorted == 1) {
    return arr;
  }
  var idx = Math.ceil(unsorted * Math.random(unsorted)) - 1;
  var selected = arr[idx];
  [arr[0], arr[idx]] = [arr[idx], arr[0]];
  unsorted--;
  var new_array = arr.slice(-unsorted);
  return [arr[0], ...sort(new_array, unsorted)];
}

class Playground extends React.Component {
  render() {

    var pad = [];
    var text = "";
    if (!this.props.inactive) {
      for (let i = 0; i < this.props.colButtons.length; i++) {
        pad.push( /*#__PURE__*/
        React.createElement("button", {
          onClick: this.props.onclick,
          className: this.props.css_styles[i],
          id: this.props.colButtons[i],
          style: { backgroundColor: this.props.colButtons[i] } },

        this.props.btnTextAvailable ? this.props.btnTexts[i] : ""));


      }
    } else {
      pad = "";
      if (this.props.init) {
        if (this.props.userscore[1] < game_plays) {
          text = "Hit START on the menu to enjoy a new play or RESET to restart the game";
        } else {
          text = "You have completed the game! Hit START on the menu for a new game";
        }
      } else {
        text = "Welcome to the colorful COLOR GAME!";
      }
    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "dashboard" }, /*#__PURE__*/
      React.createElement("h3", null, this.props.message), /*#__PURE__*/
      React.createElement("h4", null, text), /*#__PURE__*/
      React.createElement("div", { className: "pad" }, pad)));


  }}


class Head extends React.Component {
  render() {
    var height_record;

    if (!this.props.user_record) {
      height_record = "100%";
    } else {
      height_record = 100 - this.props.user_record + "%";
    }
    var height_inprogress = 100 * (1 - this.props.uScore[0] / this.props.uScore[1]) + "%";
    if (this.props.uScore[1] === 0) {
      height_inprogress = "100%";
    }
    var col_name_displayed = this.props.colName ?
    this.props.colName :
    "RGB(255, 255, 255)";
    var background_for_h1 = {};
    var background_for_h2 = {};
    if (this.props.bgCol) {
      background_for_h1.backgroundColor = this.props.bgCol.
      replace("RGB", "RGBA").
      replace(")", ", 0.3)");
      background_for_h2.backgroundColor = this.props.bgCol;
    } else {
      background_for_h1.backgroundColor = "white";
      background_for_h2.backgroundColor = "white";
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "head" }, /*#__PURE__*/
      React.createElement("div", { className: "user-score" }, /*#__PURE__*/
      React.createElement("div", { className: "progress-info" }, /*#__PURE__*/
      React.createElement("p", null, /*#__PURE__*/
      React.createElement("span", null, "Your Score"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("span", null, this.props.uScore[0], "/", this.props.uScore[1])), /*#__PURE__*/

      React.createElement("div", { className: "bar-container" }, /*#__PURE__*/
      React.createElement("div", { className: "score-bar", style: { height: height_inprogress } }))), /*#__PURE__*/


      React.createElement("div", { className: "plays-tally" }, /*#__PURE__*/
      React.createElement("p", null, /*#__PURE__*/
      React.createElement("span", null, "Played"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("span", null, this.props.uScore[1], "/", game_plays))), /*#__PURE__*/

      React.createElement("div", { className: "progress-info" }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/
      React.createElement("span", null, "Your Record"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("span", null, this.props.user_record ? this.props.user_record + "%" : " -- ")), /*#__PURE__*/
      React.createElement("div", { className: "bar-container" }, /*#__PURE__*/
      React.createElement("div", { className: "score-bar", style: { height: height_record } })))), /*#__PURE__*/



      React.createElement("h1", { style: background_for_h1 }, "Welcome to the ultimate color guessing game!"), /*#__PURE__*/


      React.createElement("h2", { style: background_for_h2 }, col_name_displayed)));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: false,
      color: null,
      userRecord: null,
      userScore: [0, 0],
      wins: 0,
      mode: "easy",
      message: "Click START to initialize",
      numButtons: 3,
      winColor: null,
      styles: [],
      colSet: [],
      idle: true,
      btn_txt: [],
      show_btn_txt: false };


    this.start = this.start.bind(this);
    this.makeRandomColor = this.makeRandomColor.bind(this);
    this.setEasyMode = this.setEasyMode.bind(this);
    this.setHardMode = this.setHardMode.bind(this);
    this.randomizetxt = this.randomizetxt.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    clearInterval(sorted_txt);
    this.setState({
      color: "",
      userScore: [0, 0],
      wins: 0,
      message: "Click START to initialize",
      winColor: null,
      styles: [],
      colSet: [],
      idle: true,
      btn_txt: [],
      show_btn_txt: false,
      initiated: false });

  }

  randomizetxt(arr = this.state.btn_txt, unsorted = this.state.btn_txt.length) {
    var new_txt_arr = sort(arr, unsorted);
    this.setState({
      btn_txt: new_txt_arr });

  }

  makeRandomColor() {
    var rand_col =
    Math.round(255 * Math.random()) +
    ", " +
    Math.round(255 * Math.random()) +
    ", " +
    Math.round(255 * Math.random());
    return `RGB(${rand_col})`;
  }

  setEasyMode() {
    if (this.state.idle) {
      this.setState({
        mode: "easy" });

    }
  }

  setHardMode() {
    if (this.state.idle) {
      this.setState({
        mode: "hard" });

    }
  }

  start(event) {
    var user_wins = this.state.wins,
    updated_record = this.state.userRecord,
    user_score = this.state.userScore;

    if (event.target.textContent === "START") {
      if (this.state.userScore[1] === game_plays) {
        user_wins = 0;
        user_score = [0, 0];
        if (!updated_record || Math.round(100 * (this.state.wins / game_plays) > updated_record)) {
          updated_record = Math.round(100 * (this.state.wins / game_plays));
        }
      }

      var colorPalette = [];
      var styles = [];

      limit = this.state.mode === "easy" ? 3 : 6;
      for (let i = 0; i < limit; i++) {
        styles.push("std");
        do {
          colorPalette[i] = this.makeRandomColor();
        } while (colorPalette.indexOf(colorPalette[i]) < i);
      }


      this.setState({
        winColor: colorPalette[Math.floor(colorPalette.length * Math.random())],
        colSet: colorPalette,
        idle: false,
        color: null,
        initiated: true,
        numButtons: limit,
        message: "You can do it!",
        styles: styles,
        btn_txt: texts[6 / limit - 1],
        show_btn_txt: true,
        wins: user_wins,
        userScore: user_score,
        userRecord: updated_record });


      sorted_txt = setInterval(this.randomizetxt, 2000);

    } else {

      clearInterval(sorted_txt);
      if (this.state.numButtons < limit) {
        user_score = [user_wins, user_score[1] + 1];
      }
      this.setState({
        winColor: null,
        idle: true,
        colSet: [],
        message: "Ready for a new exciting play?",
        color: null,
        styles: [],
        btn_txt: [],
        userScore: user_score });

    }
  }

  handleClick(event) {
    var button_clicked = event.target.id;
    if (!this.state.color) {

      var new_styles = this.state.styles,
      index = this.state.colSet.indexOf(button_clicked),
      new_message = "",
      updated_wins = this.state.wins,
      color = this.state.color,
      display_btn_txt = this.state.show_btn_txt,
      playincrement = this.state.userScore[1],
      numButtons = this.state.numButtons,
      idle = this.state.idle;

      if (button_clicked === this.state.winColor) {
        color = button_clicked;
        display_btn_txt = false;
        playincrement++;
        numButtons = limit;
        idle = true;
        clearInterval(sorted_txt);
        for (let i = 0; i < this.state.colSet.length; i++) {
          new_styles[i] = "err";
        }
        new_styles[index] = "win";
        if (this.state.numButtons === limit) {
          updated_wins++;
          new_message = "Congratulations, You win!";
        } else {
          new_message = "That's right!";
        }
      } else {
        numButtons--;
        new_styles[index] = "err";
        if (this.state.numButtons > 2) {
          new_message = "Try again...";
        } else if (this.state.numButtons == 2) {
          new_message = "Last chance!";
          display_btn_txt = false;
        }
      }
      this.setState({
        message: new_message,
        numButtons: numButtons,
        styles: new_styles,
        color: color,
        show_btn_txt: display_btn_txt,
        wins: updated_wins,
        userScore: [updated_wins, playincrement],
        idle: idle });

    }
  }

  render() {
    var btn_class_easy = this.state.mode + "-easy pannel-button";
    var btn_class_hard = this.state.mode + "-hard pannel-button";
    return /*#__PURE__*/(
      React.createElement("div", { className: "core_game" }, /*#__PURE__*/
      React.createElement(Head, {
        user_record: this.state.userRecord,
        bgCol: this.state.color,
        colName: this.state.winColor,
        uScore: this.state.userScore }), /*#__PURE__*/

      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("button", { className: btn_class_easy, onClick: this.setEasyMode }, "Easy"), /*#__PURE__*/


      React.createElement("button", { className: btn_class_hard, onClick: this.setHardMode }, "Hard"), /*#__PURE__*/


      React.createElement("button", { className: "pannel-button", onClick: this.start },
      this.state.idle ? "START" : "NEW PLAY"), /*#__PURE__*/

      React.createElement("button", { className: "pannel-button", onClick: this.handleReset }, "RESET")), /*#__PURE__*/

      React.createElement(Playground, {
        init: this.state.initiated,
        inactive: this.state.idle,
        useroptions: this.handleSelection,
        userscore: this.state.userScore,
        colButtons: this.state.colSet,
        btnTexts: this.state.btn_txt,
        css_styles: this.state.styles,
        btnTextAvailable: this.state.show_btn_txt,
        onclick: this.handleClick,
        message: this.state.message })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));