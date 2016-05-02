# phq9-survey
Welcome to the PHQ-9 Survery!

## Run it locally
In order to get this running locally, clone this repo and start a server from the parent directory. I used a [Python server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python) because it was already installed and let me get to developing faster!. Open your browser to the port you're running on (if using the example given, that's port 8000). Then have fun playing around with the survey!

## Approach
To develop this survey, I tried to keep it as simple as possible, especially since this is my first React app. The steps I took are roughly as follows: 
  1. Generated a mock based on the user story given (see below)
  2. Identified components based on the mock. The initial outline, which changed a bit as I went along, is below:
~~~
  SurveyContainer
    QuestionsContainer
      QuestionCard
      ResponseCard
    ResultsContainer
      ScoreCard
      ResourcesCard
~~~
  3. Wrote a static version of the mock, with some basic responsiveness built in
  4. Identifed what data belongs in `state`
    * The responses to the survey questions are definitely part of `state`. The overall survey score is computed from that data, and since it is computed, it does not belone in `state`.
  5. Identified places where `state` is changed and from where that data needs to be accessed
    * The `ResponseCard` is where the user selects their response to the survey question, and `ScoreCard` is where that data needs to be displayed. The common parent element to both of those is the top-most component, `SurveyContainer`.
  6. Passed `state` through `props` as needed and added interactivity to the code
    * I set the users' responses, `state.scores`, to live in `SurveyContainer`, which gives its child `ResultsContainer` the prop `scores={this.state.scores}`, which in turn gives *its* child `ScoreCard` the prop `scores={this.props.scores}`.
    * Next I added event handlers to update `state` based on the user's responses to the questions.
    * Then I computed the score.
  7. Implemented conditional display of elements
    * I didn't want to display the score unless all questions were answered, so I added logic for that, then for displaying the therapist resources dependent on the score.
  
### User Stories
  * I am a patient and I want to take the PHQ-9 depression assessment on my phone, get my score, and an explanation of what that means.
  * If I score moderate depression or higher, I want to be presented with some options for therapists and be able to select one.
