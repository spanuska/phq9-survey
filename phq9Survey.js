
var ResponseCard = React.createClass({
	onSelect: function(selectEvent){
    var points = selectEvent.target.value;
    var topic = this.props.topic
    this.props.onChange(points, topic);
	},
	render: function() {
		var rows = [<option value={null} key={null}>...</option>];
		this.props.responses.forEach(function(response, index) {
			rows.push(<option ref={index} value={response.points} key={index}>{response.content}</option>)
		}.bind(this));
		return (
			<div className="col-md-4 col-xs-12">
				<select className="row" onChange={this.onSelect}>
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
		var counter = 0;
		this.props.questions.forEach(function(question) {
			cards.push(<QuestionCard question={question.content} key={counter} />);
			cards.push(<ResponseCard responses={this.props.responses} topic={question.topic} key={question.topic} onChange={this.props.onChange} />);
			counter++
		}.bind(this));
		return (
			<div className="row">{cards}</div>
		)
	}
});


var ScoreCard = React.createClass({
	render: function() {
		return (
			<div><h4>{this.props.score}</h4></div>
		)
	}
});


var ResourcesCard = React.createClass({
	render: function() {
		var resourcesCards = [];
		this.props.resources.forEach(function(resource, index) {
				resourcesCards.push(
					<table className="col-md-4 col-xs-12" key={index}>
						<tbody>
							<tr>
								<th>{resource.firstName + ' ' + resource.lastName}</th>
							</tr>
							<tr>
								<td>{resource.street} {resource.city}, {resource.state}</td>
							</tr>
							<tr>
								<td>{resource.phone}</td>
							</tr>
							<tr>
								<td>Specialty: {resource.specialty}</td>
							</tr>
					</tbody>
				</table>);
			}.bind(this));
		return (
			<div className="row">{resourcesCards}</div>
		)
	}
});


var ResultsContainer = React.createClass({
	render: function() {
	var score = 0
	for (var key in this.state) {
		score += parseInt(this.state[key])	
	}

		return (
			<div>
				<h3>Results</h3>
				<ScoreCard score={score}/>
				<ResourcesCard resources={this.props.resources} />
			</div>
		)
	}
});


var SurveyContainer = React.createClass({
	getInitialState: function() {
		var results = {}
		this.props.questions.forEach(function(question){
			results[question["topic"]] = undefined;
		});
		return results;
  },

  handleUserAnswer: function(points, topic) {
  	var stateObject = function() {
      var returnObj = {};
      if (isNaN(points)) {
      	returnObj[topic] = undefined;
      } else {
      	returnObj[topic] = points;
      }
      return returnObj;
    };

    this.setState(stateObject); 
  },

	render: function() {
		return (
			<div>
				<h1>Patient Health Questionnaire: Depression Survey</h1>
				<p className="lead">Choose 1 response for each question below. Once you have answered all 9 questions, the result will be explained and we'll suggest some resources that may be helpful for you.</p>
				<h3 className="text-center">Over the last two weeks, how often have you been bothered by any of the following problems?</h3>
				<QuestionsContainer questions={this.props.questions} responses={this.props.responses} onChange={this.handleUserAnswer} />
				<ResultsContainer resources={this.props.resources} />
			</div>
		)
	}
});


var QUESTIONS = [
	{ content: 'Little interest or pleasure in doing things', topic: 'pleasure'},
	{ content: 'Feeling down, depressed, or hopeless', topic: 'feeling down'},
	{ content: 'Trouble falling or staying asleep, or sleeping too much', topic: 'sleep'},
	{ content: 'Feeling tired or having little energy', topic: 'energy'},
	{ content: 'Poor appetite or overeating', topic: 'appetite'},
	{ content: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down', topic: 'self esteem'},
	{ content: 'Trouble concentrating on things, such as reading the newspaper or watching television', topic: 'concentration'},
	{ content: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual', topic: 'movement'},
	{ content: 'Thoughts that you would be better off dead, or of hurting yourself in some way', topic: 'suicidal ideation'}
];


var RESPONSES = [
	{content: 'Not at all', points: 0},
	{content: 'Several days', points: 1},
	{content: 'More than half the days', points: 2},
	{content: 'Nearly every day', points: 3}
]

var RESOURCES = [
	{firstName: 'Jaime', lastName: 'Marx', street: '123 1st St.', city: 'New York', state: 'NY', phone: '111-111-1111', specialty: 'Depression'},
	{firstName: 'Rae', lastName: 'Specie', street: '456 2nd St.', city: 'New York', state: 'NY', phone: '222-222-2222', specialty: 'Depression'},
	{firstName: 'First', lastName: 'Last', street: '789 3rd Ave.', city: 'New York', state: 'NY', phone: '333-333-3333', specialty: 'Depression'}
]


ReactDOM.render(
  <SurveyContainer questions={QUESTIONS} responses={RESPONSES} resources={RESOURCES} />,
  document.getElementById('container')
);