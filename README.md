# phq9-survey
Welcome to the PHQ-9 Survey! Take the survey here: http://spanuska.github.io/phq9-survey/phq9Survey.html - for demonstration purposes ONLY. See the disclaimer below.

## Run it locally
  * In order to get this running locally, clone this repo and run `npm install`. Next, start up a server - I used a [Python server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python) because it was already installed and let me get to developing faster!. Open your browser to the port you're running on (if using the example given, that's port 8000). Then have fun playing around with the survey! 
  * To develop locally, note that you'll need to run `npm run bundle` after you make changes in order to see them reflected in the browser. 
  * Tests are a work in progress - currently there is only one! If you want to run that one test, run `jest`.

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
    * The responses to the survey questions are definitely part of `state`. The overall survey score is computed from that data, and since it is computed, it does not belong in `state`.
  5. Identified places where `state` is changed and from where that data needs to be accessed
    * The `ResponseCard` is where the user selects their response to the survey question, and `ScoreCard` is where that data needs to be displayed. The common parent element to both of those is the top-most component, `SurveyContainer`.
  6. Passed `state` through `props` as needed and added interactivity to the code
    * I set the users' responses, `state.scores`, to live in `SurveyContainer`, which gives its child `ResultsContainer` the prop `scores={this.state.scores}`, which in turn gives *its* child `ScoreCard` the prop `scores={this.props.scores}`.
    * Next I added event handlers to update `state` based on the user's responses to the questions.
    * Then I computed the score.
  7. Implemented conditional display of elements
    * I didn't want to display the score unless all questions were answered, so I added logic for that, then for displaying the therapist resources dependent on the score.
  8. Added in tests, using Jest - these are a work in progress! 
    * While adding in tests, I had to do some reorganization of the code because I ran into an issue where I could successfully load the app in the browser, but was unable to run the tests OR I could successfuly run the tests, but was unable to load the app in the browser. Both are pretty important, so I incorporated Babelify and CommonJS syntax for requiring files; once that was configuring properly, I was able to run the test AND open the survey in the browser.
  
### User Stories
  * I am a patient and I want to take the PHQ-9 depression assessment on my phone, get my score, and an explanation of what that means.
  * If I score moderate depression or higher, I want to be presented with some options for therapists and be able to select one.
 
  
# Disclaimer!
This project is for my own learning purposes and is not intended to give any health information or advice. For more information on the survey, visit [here](http://patient.info/doctor/patient-health-questionnaire-phq-9) and for mental health resources, visit these sites:
  * [National Alliance on Mental Illness](https://www.nami.org/)
  * [MentalHealth.gov](https://www.mentalhealth.gov/)
