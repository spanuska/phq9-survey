var React = require('react');
var ReactDOM = require('react-dom');

var ResponseCard = React.createClass({
  onSelect: function(selectEvent) {
    var points = selectEvent.target.value;
    var topic = this.props.topic
    this.props.onChange(points, topic);
  },
  render: function() {
    var rows = [<option value={null} key={null}>...</option>];
    this.props.responses.forEach(function(response, index) {
      rows.push(
        <option 
            ref={index} 
            value={response.points} 
            key={index}>
              {response.content}
        </option>)
    }.bind(this));
    return (
      <div className="col-md-4 col-xs-8">
        <select onChange={this.onSelect}>
            {rows}
        </select>
      </div>
    )
  }
});


var QuestionCard = React.createClass({
  render: function() {
    return (
      <div className="col-md-8 col-xs-12">{this.props.question}</div>
    )
  }
});


var QuestionsContainer = React.createClass({
  render: function() {
    var cards = [];
    this.props.questions.forEach(function(question, index) {
      var card = [];
      card.push(<QuestionCard question={question.content} key={index} />);
      card.push(
        <ResponseCard 
          responses={this.props.responses} 
          topic={question.topic} 
          key={question.topic} 
          onChange={this.props.onChange} 
        />
      );
      cards.push(<div className="row" key={index}>{card}</div>)
    }.bind(this));
    return (
      <div className="row">{cards}</div>
    )
  }
});


var ScoreCard = React.createClass({
  render: function() {   
    var scoreDisplay;
    if (isNaN(this.props.calculatedScore)) {
      scoreDisplay = '...'
    } else {
      scoreDisplay = this.props.calculatedScore
    }

    var explanation;
    if (this.props.calculatedScore <= 4) {
      explanation = '- No Depression'
    } else if (5 <= this.props.calculatedScore && this.props.calculatedScore <= 9) {
      explanation = '- Mild Depression'
    } else if (10 <= this.props.calculatedScore && this.props.calculatedScore <= 14) {
      explanation = '- Moderate Depression'
    } else if (15 <= this.props.calculatedScore && this.props.calculatedScore <= 19) {
      explanation = '- Moderately Severe Depression'
    } else if (this.props.calculatedScore >= 20) {
      explanation = '- Severe Depression'
    }

    return (
      <div>
        <h4>Score: {scoreDisplay} {explanation}</h4>
    </div>
    )
  }
});


var ResourcesCard = React.createClass({
  getInitialState: function() {
    return {
      selectedResource: undefined
    }
  },
  handleClick: function(event) {
    this.setState({
      selectedResource: event.currentTarget.value
    })
  },
  notifySelection: function() {
    var notification;
    if (this.state.selectedResource) {
     notification = "Thank you for selecting Dr. " + this.state.selectedResource + ". We will contact you within 24 hours with next steps. Be well."
    }
    return notification;
  },

  render: function() {
    var resourcesCards = [];
    if (this.props.calculatedScore >= 10) {
      resourcesCards.push(
        <div key="choices">
            <h4>Choose one of the providers below and we will get you connected with them.</h4>
            <p className="success">{this.notifySelection()}</p>
        </div>
      )
      this.props.resources.forEach(function(resource, index) {
        resourcesCards.push(
          <div className="col-md-4 col-xs-12" key={index}>
            <address>
              <strong>{resource.firstName + ' ' + resource.lastName}</strong><br />
              {resource.street}<br />
              {resource.city}, {resource.state}<br />
              <abbr title="Phone">P:</abbr>{resource.phone}<br />
              Specialty: {resource.specialty}
            </address>
            <button 
                className="btn btn-default" 
                onClick={this.handleClick} 
                key={resource.id} 
                value={resource.lastName}>
                    Select Dr. {resource.lastName}
            </button>
        </div>);
      }.bind(this));
    }

    return (
      <div>
        <div className="row">{resourcesCards}</div>
      </div>
    )
  }
});

var ResultsContainer = React.createClass({
  calculateScore: function() {
    var score = 0;
    var allQuestionsAnswered = Object.keys(this.props.scores).length == 9;
    if (allQuestionsAnswered) {
      for (var key in this.props.scores) {
        score += parseInt(this.props.scores[key])
      }
    }
    return score;
  },

  render: function() {
    return (
      <div>
        <h3>Results</h3>
        <ScoreCard scores={this.props.scores} calculatedScore={this.calculateScore()} />
        <ResourcesCard resources={this.props.resources} calculatedScore={this.calculateScore()} />
    </div>
    )
  }
});


var SurveyContainer = React.createClass({
  getInitialState: function() {
    var scores = {}
    this.props.questions.forEach(function(question) {
      scores[question["topic"]] = undefined;
    });
    return {
      scores: scores
    };
  },

  handleUserAnswer: function(points, topic) {
    var stateObject = function() {
      var returnObj = this.state.scores;
      if (isNaN(points)) {
        returnObj[topic] = undefined;
      } else {
        returnObj[topic] = points
      }
      return returnObj;
    }.bind(this);
    this.setState({
      scores: stateObject()
    });
  },

  render: function() {
    return (
      <div>
        <h1>Patient Health Questionnaire: Depression Survey</h1>
        <p className="lead">Choose 1 response for each question below. Once you have answered all 9 questions, the result will be explained and we will suggest some resources that may be helpful for you.</p>
        <h3 className="text-center">Over the last two weeks, how often have you been bothered by any of the following problems?</h3>
        <QuestionsContainer 
          questions={this.props.questions} 
          responses={this.props.responses} 
          onChange={this.handleUserAnswer}
        />
        <ResultsContainer resources={this.props.resources} scores={this.state.scores} />
    </div>
    )
  }
});


module.exports.QuestionCard = QuestionCard;
module.exports.SurveyContainer = SurveyContainer;