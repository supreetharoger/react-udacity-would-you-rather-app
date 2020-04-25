export function formatQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author
  
  return {
    username: name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatarURL
  }
}
export function getUnansweredQuestions(questions, authedUser) {
  const questionIds = []
  Object.keys(questions).forEach((id) => {
    const question = questions[id]
    const optionOneVotes = question.optionOne.votes
    const optionTwoVotes = question.optionTwo.votes
    let exists = false
    if((optionOneVotes.length !== 0 && optionOneVotes.includes(authedUser)) || 
       	(optionTwoVotes.length !== 0 && optionTwoVotes.includes(authedUser))) {
      	exists = true
    }
    if(!exists) {
      questionIds.push(id)
    }
  })
  return questionIds
}

export function formatPollResults(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author
  const { answers } = authedUser
  
  let optionOneVotes = optionOne.votes.length
  let optionTwoVotes = optionTwo.votes.length
  let totalVotes = optionOneVotes + optionTwoVotes
  let optionOnePercentage = ((optionOneVotes/totalVotes) * 100).toFixed(0)
  let optionTwoPercentage = ((optionTwoVotes/totalVotes) * 100).toFixed(0)
  let answerIds = Object.keys(answers)
  
  let answeredOption = ''
  if(answerIds.includes(id)) {
    answeredOption = answers[id]
  }
  
  return {
    username: name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatarURL,
    optionOneVotes,
    optionTwoVotes,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
    answeredOption
  }
}

export function formatUserLeaderboard(user) {
  const { id, name, avatarURL, answers, questions } = user
  
  let answeredquestions = Object.keys(answers).length
  let createdquestions = questions.length
  let score = answeredquestions + createdquestions
  
  return {
    name,
    id,
    avatarURL,
    answeredquestions,
    createdquestions,
    score
  }
}