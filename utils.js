const questions = require('./questions.json');
const { Random } = require('random-js');
const random = new Random();

const getRandomQuestion = (topic) => {
    const questionTopic = topic.toLowerCase();
    const randomQuestionIndex = random.integer(0, questions[questionTopic].length - 1);
    return questions[questionTopic][randomQuestionIndex];
};

const getRandomQuestionFromAllTopics = () => {
    const allQuestions = Object.entries(questions).flatMap(([topic, questions]) => 
        questions.map(question => ({ ...question, topic }))
    );
    const randomQuestionIndex = random.integer(0, allQuestions.length - 1);
    return allQuestions[randomQuestionIndex];
};

const getCorrectAnswer = (topic, id) => {
    const question = questions[topic].find((question) => question.id === id);
    if (!question) throw new Error(`Question with id ${id} not found in topic ${topic}`);
    if (!question.hasOptions) {
        return question.answer;
    }
    const correctOption = question.options.find((option) => option.isCorrect);
    if (!correctOption) throw new Error(`Correct option not found for question ${id} in topic ${topic}`);
    return correctOption.text;
};

module.exports = { getRandomQuestion, getRandomQuestionFromAllTopics, getCorrectAnswer };
