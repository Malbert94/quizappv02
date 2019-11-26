import React from 'react';
import { quizBook } from './QuizBook';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      maxScore: 0,
      subject: '',
      quizBook: [],
      activeQuiz: {},
      correctAnswers: [],
      imagelink: '',
      textInput: '',
      userAnswers: [],
      useStyle: false
    }

    this.checkAnswers = this.checkAnswers.bind(this)
  }


  handleSelectBook(selectedBook) {
    this.setState({
      activeQuiz: selectedBook,
      subject: selectedBook.Tema,
      maxScore: selectedBook.answers.length,
      correctAnswers: selectedBook.answers,
      imagelink: selectedBook.image,
      useStyle: false,
      textInput: '',
      userAnswers: [''],
      score: 0
    })
  }

  handleTextInput(index, event) {
    var userAnswers = this.state.userAnswers
    userAnswers[index] = event.target.value
    this.setState({
      textInput: event.target.value,
      userAnswers: userAnswers
    })
    console.log(this.state.userAnswers, index)
  }

  checkAnswers() {
    var answers = this.state.userAnswers
    var correct = this.state.correctAnswers
    var points = 0

    for(let i=0; i < answers.length; i++) {
      if(answers[i] === correct[i]) {
        points = points + 1
        console.log('Correct' + i);
      }
    }
    this.setState({score: points, useStyle: true})
    console.log(points);
  }

  componentDidMount() {
    this.setState({quizBook: quizBook})
  }

  render() {
    return(
      <div className='app-main'>
        <div className='header'>
          <h1>Quiz</h1>
          <div className='button-list'>
            {this.state.quizBook.map((tema, index) =>
              <button className='subjectButton' key={index} onClick={this.handleSelectBook.bind(this, quizBook[index])}>
                {quizBook[index].Tema}
              </button>
            )}
          </div>
          <p>Subject: {this.state.subject}</p>
          <p>Points: {this.state.score}/{this.state.maxScore}</p>
        </div>
        <button className='answerButton' onClick={this.checkAnswers}>
          Check Answers
        </button>
        <div className='quiz-container'>
          <ol className='input-list'>

            {this.state.correctAnswers.map((answer, index) =>{

              if(this.state.useStyle === false) {
                return(
                  <li key={index}>
                    <input
                      value={this.state.userAnswers[index] || ''}
                      onChange={this.handleTextInput.bind(this, index)}
                      className='user-input'
                    />
                  </li>)
              } else {
                if(answer === this.state.userAnswers[index]) {
                  return(
                    <li key={index}>
                      <input
                        value={this.state.userAnswers[index] || ''}
                        disabled={true}
                        style={{backgroundColor: 'lightgreen'}}
                        onChange={this.handleTextInput.bind(this, index)}
                        className='user-input'
                      />
                    </li>)
                } else {
                  return(
                    <li key={index}>
                      <input
                        value={this.state.userAnswers[index]  || ''}
                        disabled={true}
                        style={{backgroundColor: 'red'}}
                        onChange={this.handleTextInput.bind(this, index)}
                        className='user-input'
                      />
                    </li>)
                }
              }
            })}
          </ol>
          {this.state.imagelink ?(
            <img className='quiz-image' alt='Europa' src={this.state.imagelink}/>
          ) : (
            <div>Bildet ikke funnet</div>
          )}
        </div>
      </div>
    )
  }
}
