var React = require('react');
var ReactDOM = require('react-dom');
var SurveyContainer = require('./phq9Survey.js').SurveyContainer;

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
	{id: 1, firstName: 'Jaime', lastName: 'Marx', street: '123 1st St.', city: 'New York', state: 'NY', phone: '111-111-1111', specialty: 'Depression'},
	{id: 2, firstName: 'Rae', lastName: 'Specie', street: '456 2nd St.', city: 'New York', state: 'NY', phone: '222-222-2222', specialty: 'Depression'},
	{id: 3, firstName: 'First', lastName: 'Last', street: '789 3rd Ave.', city: 'New York', state: 'NY', phone: '333-333-3333', specialty: 'Depression'}
]

ReactDOM.render(
  <SurveyContainer questions={QUESTIONS} responses={RESPONSES} resources={RESOURCES} />,
  document.getElementById('container')
);

