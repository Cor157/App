import React, { useEffect, useState } from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';
	  


const client = new ApolloClient({
	uri: "https://countries.trevorblades.com/graphql",
	cache: new InMemoryCache(),
})


export default function App() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [loading, setLoading] = useState(true);
	const [score, setScore] = useState(0);


	const questions= []
	useEffect(() => {
		client.query({
			query: gql`
			  query {countries{
				  name
				  capital
				  currency
			  }
			  }
			`,
		  })
		  .then((result) => {
			  // console.log(result.data.countries[Math.floor(Math.random()*result.data.countries.length)])
			  for (let i = 0; i < 5; i++) {
				  const questionCountry = result.data.countries[Math.floor(Math.random()*result.data.countries.length)]
				  const questionText = `Wat is de hoofdstad van ${questionCountry.name}?`
				  const correctAnswer = questionCountry.capital
				  questions.push({questionText, answerOptions: [{answerText: correctAnswer, isCorrect: true}, {answerText: "xxx", isCorrect: false}, {answerText:"xxx", isCorrect: false}, {answerText:"xxx", isCorrect: false}]})
				  // console.log(questions)
				  // console.log(questions.length)
			  }
			  console.log(questions)
		  })
		  .then(() => {
			  console.log(questions)
			  //setLoading(false)
		  });
		  
	}, [])

	console.log(questions)
	

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	const resetQuiz=()=>{
		setCurrentQuestion(0);
		setScore(0);
		setShowScore(false);

	}
	console.log(questions.length)
	if (loading || questions.length === 0) return null
	
	return (
		<div className='app'>
			<ApolloProvider client={client}>
    			<div>
				{showScore ? (
	<div className='score-section'>
		You scored {score} out of {questions.length} 
	   <button type="submit" onClick={resetQuiz}> Play again!!</button>
		
	</div>
) : (
	<>
		<div className='question-section'>
			<div className='question-count'>
				<span>Question {currentQuestion + 1}</span>/{questions.length}
			</div>
			<div className='question-text'>{questions[currentQuestion].questionText}</div>
		</div>
		<div className='answer-section'>
			{questions[currentQuestion].answerOptions.map((answerOption) => (
				<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
			))}
		</div>
	</>
)}
    			</div>
  			</ApolloProvider>
		</div>
	);
}

	// const questions = [
		
	// 	{
			
	// 		questionText: 
	// 		//<div> <img scr='/src/foto/Flag_of_the_Netherlands.png' alt="" /> </div>,
		    
	// 		 'Wat is de hoofdstad van Nederland',
			
	// 		answerOptions: [
			
	// 			{ answerText: 'Berlijn', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Amsterdam', isCorrect: true },
	// 			{ answerText: 'Dublin',Image:'./foto/NL.webp', isCorrect: false },
				
				
	// 		],
			
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Belgie',
	// 		answerOptions: [
	// 			{ answerText: 'Brussel', isCorrect: true },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Amsterdam', isCorrect: false },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Zit Engeland in Europa',
	// 		answerOptions: [
	// 			{ answerText: 'Ja', isCorrect: true },
	// 			{ answerText: 'Nee', isCorrect: false },
	// 			{ answerText: 'Misschien', isCorrect: false },
				
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van USA?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Washington DC', isCorrect: true },
	// 			{ answerText: 'Texas', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Duitsland?',
	// 		answerOptions: [
	// 			{ answerText: 'Brussel', isCorrect: false },
	// 			{ answerText: 'Berlijn', isCorrect: true },
	// 			{ answerText: 'Amsterdam', isCorrect: false },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Welke kleur heeft de vlag van Frankrijk',
	// 		answerOptions: [
	// 			{ answerText: 'rood/wit/blauw', isCorrect: true },
	// 			{ answerText: 'blauw/wit/rood', isCorrect: false },
	// 			{ answerText: 'rood/blauw/wit', isCorrect: false },
	// 			{ answerText: 'wit/rood/blauw', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Spanje?',
	// 		answerOptions: [
	// 			{ answerText: 'Madrid', isCorrect: true },
	// 			{ answerText: 'Barcalona', isCorrect: false },
	// 			{ answerText: 'Madrhid', isCorrect: false },
	// 			{ answerText: 'Spaanse republiek', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Portugal?',
	// 		answerOptions: [
	// 			{ answerText: 'Porto', isCorrect: false },
	// 			{ answerText: 'Albevera', isCorrect: false },
	// 			{ answerText: 'Sewey', isCorrect: false },
	// 			{ answerText: 'Lissabon', isCorrect: true },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Polen',
	// 		answerOptions: [
	// 			{ answerText: 'Porto', isCorrect: false },
	// 			{ answerText: 'Warshauwdim', isCorrect: false },
	// 			{ answerText: 'poland', isCorrect: false },
	// 			{ answerText: 'Warshauw', isCorrect: true },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Wat is de hoofdstad van Servie',
	// 		answerOptions: [
	// 			{ answerText: 'Soboutisa', isCorrect: false },
	// 			{ answerText: 'Nis', isCorrect: false },
	// 			{ answerText: 'Novi-sad', isCorrect: false },
	// 			{ answerText: 'Beograd', isCorrect: true },
	// 		],
	// 	},
	// ];

