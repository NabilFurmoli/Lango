var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Text_components, translated_txt } from './Main_text_component.js';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

/******************Reusable Shared components****************/
/**************************************************************/
/**************************************************************/

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

    _this.state = { user_name: "deafault" };

    _this.componentDidMount = function () {
      var url = "/user/userName";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object.name);

        _this.setState({ user_name: object.name });

        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      };

      // Actually send request to server
      console.log("before sending user/username req");
      xhr.send();
    };

    return _this;
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "username_div" },
        React.createElement(
          "p",
          null,
          this.state.user_name
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

var CardFront = function (_React$Component2) {
  _inherits(CardFront, _React$Component2);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-front" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement(
            "p",
            { id: "cardFront_p_id" },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component3) {
  _inherits(CardBack, _React$Component3);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-back" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement(
            "p",
            { id: "cardBack_p_id" },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardBack;
}(React.Component);

// React component for the card (main component)


var Card = function (_React$Component4) {
  _inherits(Card, _React$Component4);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "rev_textbox_2 card-container" },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(CardBack, { text: this.props.eng_txt }),
          React.createElement(CardFront, { text: this.props.trans_txt })
        )
      );
    }
  }]);

  return Card;
}(React.Component);

var Review_txt_components = function (_React$Component5) {
  _inherits(Review_txt_components, _React$Component5);

  function Review_txt_components(props) {
    _classCallCheck(this, Review_txt_components);

    var _this5 = _possibleConstructorReturn(this, (Review_txt_components.__proto__ || Object.getPrototypeOf(Review_txt_components)).call(this, props));

    _this5.state = { current_output: "farsi", curr_eng_txt: "english", cardCount: 0 };

    _this5.flipToNextCard = function () {

      // if end of card start from zero index.

      if (_this5.state.cardCount == _this5.state.cards.length - 1) {
        _this5.setState({ cardCount: 0 });
      } else {
        _this5.setState({ cardCount: _this5.state.cardCount + 1 });
      }
      _this5.setState({ curr_eng_txt: _this5.state.cards[_this5.state.cardCount].EngTxt });
      _this5.setState({ current_output: _this5.state.cards[_this5.state.cardCount].trans_txt });
    };

    _this5.checkForCorrection = function (event) {
      // might to make it more optimizez by case cheking and triming and staff.
      var user_ans = document.getElementById("rev_input_txtbox_id").value;
      console.log("event.charchode: " + event.charCode);
      if (event.charCode == 13) {
        var index = void 0;
        if (_this5.state.cardCount == 0) {
          index = 0;
        } else {
          index = _this5.state.cardCount - 1;
        }
        console.log(user_ans.toLowerCase().trim() + " = " + _this5.state.cards[index].EngTxt.toLowerCase().trim());
        if (user_ans.toLowerCase().trim() == _this5.state.cards[index].EngTxt.toLowerCase().trim()) {
          alert("Correct");
          console.log("correct");
        } else {
          alert("incorrect");
          console.log("incorrect");
        }
      }
    };

    console.log("rev_txt_comp, the array is:" + _this5.props.array);
    _this5.state.cards = _this5.props.array;
    _this5.state.curr_eng_txt = _this5.state.cards[_this5.state.cardCount].EngTxt;
    _this5.state.current_output = _this5.state.cards[_this5.state.cardCount].trans_txt;
    return _this5;
  }

  _createClass(Review_txt_components, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "rev_txt_butt_div" },
        React.createElement(
          "div",
          { className: "rev_txtbox_div" },
          React.createElement(Card, { className: "rev_textbox_2", id: "rev_output_txtbox_id", eng_txt: this.state.curr_eng_txt, trans_txt: this.state.current_output }),
          React.createElement("textarea", { placeholder: "English", className: "rev_textbox_1", id: "rev_input_txtbox_id", onKeyPress: this.checkForCorrection })
        ),
        React.createElement(
          "div",
          { className: "lower_butt_div" },
          React.createElement(
            "button",
            { id: "next_butt_id", onClick: this.flipToNextCard },
            " Next "
          )
        )
      );
    }
  }]);

  return Review_txt_components;
}(React.Component);

//////////// Pages component //////////////////
/////////////////////////////////////////////


var Pages = function (_React$Component6) {
  _inherits(Pages, _React$Component6);

  function Pages() {
    var _ref;

    var _temp, _this6, _ret;

    _classCallCheck(this, Pages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this6 = _possibleConstructorReturn(this, (_ref = Pages.__proto__ || Object.getPrototypeOf(Pages)).call.apply(_ref, [this].concat(args))), _this6), _this6.state = { current_page: "creation", cards_array: null }, _this6.changeToRevPage = function () {
      // when the user changes back to review page you want to refetch cards from database since
      // since maybe user has added new cards.
      // this call also changes current_page to review page.
      _this6.requestFor_CardsData();
    }, _this6.changeToCreationPage = function () {
      _this6.setState({ current_page: "creation" });
    }, _this6.requestFor_CardsData = function () {
      var url = "/user/page";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object);

        if (object.cardsArray.length == 0) {
          _this6.setState({ current_page: "creation" });
          alert("You have no saved Flashcards, please add some.");
        } else {
          _this6.setState({ current_page: "Review", cards_array: object.cardsArray });
        }

        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      };

      // Actually send request to server
      console.log("requestFor_CardsData: before sending user/page req");
      xhr.send();
    }, _this6.RequestToSave = function () {
      var url = void 0;
      var Eng_text = document.getElementById("input_txtbox_id").value;

      if (Eng_text == "") {
        alert("Please add a phrase to be saved");
      } else {
        url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;

        //console.log(url);
        var xhr = createCORSRequest('GET', url);

        // checking if browser does CORS
        if (!xhr) {
          alert('CORS not supported');
          return;
        }
        // Load some functions into response handlers.
        //runs when respond is back.
        xhr.onload = function () {
          var object = JSON.parse(xhr.responseText);
          //console.log(JSON.stringify(object, undefined, 2));
          // var content = document.getElementById("outputGoesHere");
          // content.textContent = object.translation;
          console.log(object.status); // object.status shoud = "saved!"
          //console.log("i am done");
        };

        xhr.onerror = function () {
          alert('Woops, there was an error to save.');
        };

        // Actually send request to server
        xhr.send();
      }
    }, _this6.logout = function () {
      var url = '/logout';
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        console.log("user loged out");
        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to logout.');
      };

      // Actually send request to server
      console.log("before sending /logout req");
      xhr.send();
    }, _temp), _possibleConstructorReturn(_this6, _ret);
  }

  _createClass(Pages, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this7 = this;

      // after comonent is rendered you want to fetch the dtabase data and also
      // information about whether to render creation page or review page.
      var url = "/user/page";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object);
        if (object.page == "creation") {
          _this7.setState({ current_page: object.page, cards_array: object.cardsArray });
        } else {
          _this7.setState({ current_page: object.page, cards_array: object.cardsArray });
        }
        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to ask for user page.');
      };

      // Actually send request to server
      console.log("before sending user/page req");
      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {
      // Main page
      if (this.state.current_page === "creation") {
        return React.createElement(
          "div",
          { className: "page_div" },
          React.createElement(
            "div",
            { className: "logo_div" },
            React.createElement(
              "button",
              { className: "logo_butt", id: "start_review_butt_id", onClick: this.changeToRevPage },
              " Start Review "
            ),
            React.createElement(
              "h1",
              null,
              " Lango! "
            )
          ),
          React.createElement(Text_components, null),
          React.createElement(
            "div",
            { className: "lower_butt_div" },
            React.createElement(
              "button",
              { id: "save_butt_id", onClick: this.RequestToSave },
              " Save "
            )
          ),
          React.createElement(Footer, null)
        );
      } // Review page
      else if (this.state.current_page === "Review") {
          return React.createElement(
            "div",
            { className: "page_div" },
            React.createElement(
              "div",
              { className: "logo_div" },
              React.createElement(
                "button",
                { className: "logo_butt", id: "add_butt_id", onClick: this.changeToCreationPage },
                " Add "
              ),
              React.createElement(
                "h1",
                null,
                " Lango! "
              )
            ),
            React.createElement(Review_txt_components, { array: this.state.cards_array }),
            React.createElement(Footer, null)
          );
        }
    }
  }]);

  return Pages;
}(React.Component);

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Pages, null), parent);