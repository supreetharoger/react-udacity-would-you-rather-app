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
export function getSortedQuestions(questions, authedUser, users) {
  const questionIds = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    let answeredQuestions = {}, unansweredQuestions = {};
    if(authedUser) {
        answeredQuestions = questionIds.filter((id) => (users[authedUser].answers[id]))
        unansweredQuestions = questionIds.filter((id) => (!answeredQuestions.includes(id)))
    }

    return {
        answeredQuestions,
        unansweredQuestions
    }
}

export function checkUserAnswered(question, author) {
  const { id } = question
  const { answers } = author
  let answerIds = Object.keys(answers)
  if(answerIds.includes(id)) {
    return true
  }
  return false
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

export function sortLeaderboard(users) {
  return Object.keys(users)
    .sort((a,b) => {
      const answersA = Object.keys(users[a].answers).length
      const questionsA = users[a].questions.length

      const answersB = Object.keys(users[b].answers).length
      const questionsB = users[b].questions.length

      return (answersB + questionsB) - (answersA + questionsA)
    })
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


export const isAuthenticated = () => {
    if (localStorage.getItem('usertoken')) {
        return true;
    }

    return false;
}