jest.dontMock('../phq9Survey.js');

var React = require('react/addons');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var QuestionCard = require('../phq9Survey.js').QuestionCard;

describe('Question Card', function() {

  var question = {
    content: 'Little interest or pleasure in doing things', 
    topic: 'pleasure'
  };

  describe('the display of the question content', function() {

    it('should display the text of the question.', function() {

      var renderer = TestUtils.createRenderer();
      renderer.render( <QuestionCard question={question.content} />);
      var output = renderer.getRenderOutput();

      expect(output.props.children).toEqual(question.content);

    })

  });

})
