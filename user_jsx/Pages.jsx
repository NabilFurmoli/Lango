import {Text_components, translated_txt} from './Main_text_component.js';

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
 }



 /******************Reusable Shared components****************/
/**************************************************************/
/**************************************************************/
class Footer extends React.Component {
state = {user_name: "deafault"};
constructor(props){
  super(props);
}

componentDidMount = () => {
  let url = "/user/userName";
      let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = () => {
                let object = JSON.parse(xhr.responseText); 
               
                console.log(object.name);
              
                this.setState({user_name: object.name});
               
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to save.');
            };
     
            // Actually send request to server
            console.log("before sending user/username req");
      xhr.send();
}

render() {
  return (
      <div className="username_div">
          <p>{this.state.user_name}</p> 
      </div>
    );
  }
}

///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <p id='cardFront_p_id'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <p id='cardBack_p_id'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

// React component for the card (main component)
class Card extends React.Component {
  render(props) {
    return(
      <div className='rev_textbox_2 card-container'>
        <div className='card-body'>
          <CardBack text={this.props.eng_txt} />

          <CardFront text={this.props.trans_txt} />
        </div>
      </div>
    )
  }
}


class Review_txt_components extends React.Component {
  state = {current_output: "farsi", curr_eng_txt: "english", cardCount: 0};

  constructor(props){
    super(props);
    console.log("rev_txt_comp, the array is:"+ this.props.array);
    this.state.cards = this.props.array;
    this.state.curr_eng_txt = this.state.cards[this.state.cardCount].EngTxt;
    this.state.current_output = this.state.cards[this.state.cardCount].trans_txt;
  }

  flipToNextCard = () => {

    // if end of card start from zero index.

    if(this.state.cardCount == this.state.cards.length -1){
      this.setState({cardCount: 0});
    }else {
      this.setState({cardCount: this.state.cardCount + 1});
    }
    this.setState({curr_eng_txt: this.state.cards[this.state.cardCount].EngTxt});
    this.setState({current_output: this.state.cards[this.state.cardCount].trans_txt});
  }

  checkForCorrection = (event) => {
    // might to make it more optimizez by case cheking and triming and staff.
    let user_ans = document.getElementById("rev_input_txtbox_id").value;
    console.log("event.charchode: "+event.charCode);
    if (event.charCode == 13 ){
      let index;
      if(this.state.cardCount == 0){
        index = 0;
      }else {
        index = this.state.cardCount-1;
      }
      console.log(user_ans.toLowerCase().trim()+ " = "+ this.state.cards[index].EngTxt.toLowerCase().trim());
      if (user_ans.toLowerCase().trim() == this.state.cards[index].EngTxt.toLowerCase().trim()) {
        alert("Correct");
        console.log("correct");
      } else {
        alert("incorrect");
        console.log("incorrect");
      }
    }
    
  }

  render() {
    return (
      <div className="rev_txt_butt_div">
          <div className="rev_txtbox_div">
            <Card className="rev_textbox_2" id="rev_output_txtbox_id" eng_txt={this.state.curr_eng_txt} trans_txt={this.state.current_output}></Card>
            <textarea placeholder="English" className="rev_textbox_1" id="rev_input_txtbox_id" onKeyPress={this.checkForCorrection}/>
          </div>
          <div className="lower_butt_div">
              <button id="next_butt_id" onClick={this.flipToNextCard}> Next </button> 
           </div>
      </div>
    );
  }
}
 
//////////// Pages component //////////////////
/////////////////////////////////////////////
 class Pages extends React.Component {
    state = {current_page: "creation", cards_array: null};

    changeToRevPage = () => {
      // when the user changes back to review page you want to refetch cards from database since
      // since maybe user has added new cards.
      // this call also changes current_page to review page.
      this.requestFor_CardsData();
    }

    changeToCreationPage = () => {
      this.setState({current_page: "creation"});
    }

    requestFor_CardsData = () => {
      let url = "/user/page";
      let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = () => {
                let object = JSON.parse(xhr.responseText); 
               
                console.log(object);

                if(object.cardsArray.length == 0){
                  this.setState({current_page: "creation"});
                  alert("You have no saved Flashcards, please add some.");
                }else {
                  this.setState({current_page: "Review", cards_array:object.cardsArray});
                }
                
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to save.');
            };
     
            // Actually send request to server
            console.log("requestFor_CardsData: before sending user/page req");
      xhr.send();
    }
    componentDidMount() {
      // after comonent is rendered you want to fetch the dtabase data and also
      // information about whether to render creation page or review page.
      let url = "/user/page";
      let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = () => {
                let object = JSON.parse(xhr.responseText); 
               
                console.log(object);
                if (object.page == "creation") {
                  this.setState({current_page: object.page, cards_array:object.cardsArray});
                  
                } else {
                  this.setState({current_page: object.page, cards_array:object.cardsArray});
                }
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to ask for user page.');
            };
     
            // Actually send request to server
            console.log("before sending user/page req");
      xhr.send();
    }
    
     RequestToSave = () => {
      let url;
      let Eng_text = document.getElementById("input_txtbox_id").value;

      if (Eng_text == ""){
        alert("Please add a phrase to be saved");
      } else {
        url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;
      
      //console.log(url);
          let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = function() {
                let object = JSON.parse(xhr.responseText); 
                //console.log(JSON.stringify(object, undefined, 2));
                // var content = document.getElementById("outputGoesHere");
                // content.textContent = object.translation;
                console.log(object.status); // object.status shoud = "saved!"
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to save.');
            };
     
            // Actually send request to server
      xhr.send(); 
      }
     }

     logout = () => {
      let url = '/logout';
      let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = () => {
              console.log("user loged out"); 
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to logout.');
            };
     
            // Actually send request to server
            console.log("before sending /logout req");
      xhr.send(); 
     }

  render () {
    // Main page
    if (this.state.current_page === "creation") {
      return (

        <div className="page_div">

          <div className="logo_div">
            <button className="logo_butt" id="start_review_butt_id" onClick= {this.changeToRevPage}> Start Review </button>
            <h1> Lango! </h1>
          </div>
          <Text_components/>
          <div className="lower_butt_div">
              <button id="save_butt_id" onClick= {this.RequestToSave}> Save </button> 
          </div>
          <Footer/>
        </div>
        );

    } // Review page
    else if (this.state.current_page === "Review") {
      return (

        <div className="page_div">

           <div className="logo_div">
            <button className="logo_butt" id="add_butt_id" onClick={this.changeToCreationPage}> Add </button>
            <h1> Lango! </h1>
           </div>
           <Review_txt_components array={this.state.cards_array}/>
           <Footer/>

        </div>
     );

    }
  }
}

let parent = document.getElementById("root");
ReactDOM.render(<Pages/>, parent)