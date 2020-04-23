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