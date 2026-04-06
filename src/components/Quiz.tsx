import React, { useState, useRef } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore'

const Quiz: React.FC = () => {
  // Task 1: QuizCore ашиглан core-GUI тусгаарлалт
  const quizCore = useRef(new QuizCore());
  const core = quizCore.current;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [, forceUpdate] = useState(0);

  const currentQuestion = core.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  // Task 3: Next товч дарахад дараагийн асуулт руу шилжих
  const handleButtonClick = (): void => {
    if (selectedAnswer === null) return;

    core.answerQuestion(selectedAnswer);

    if (core.hasNextQuestion()) {
      core.nextQuestion();
      setSelectedAnswer(null);
      forceUpdate(n => n + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Task 3: Бүх асуулт дууссаны дараа оноог харуулах
  if (quizFinished) {
    const score = core.getScore();
    const total = core.getTotalQuestions();
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {total}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      {/* Task 2: Сонгосон хариултыг тодруулах */}
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {core.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
