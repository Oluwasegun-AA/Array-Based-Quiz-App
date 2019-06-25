// Accessing the Document so as to manipulate its Content
var question_text = document.getElementById('question_text');
var question_number = document.getElementById('question_number');
var question_options = document.getElementById('question_options');
var button_start = document.getElementById('button_start');
var button_next = document.getElementById('button_next');
var button_submit = document.getElementById('button_submit');
var start_instruction = document.getElementById('start_instruction');
var radio = document.getElementsByName('option');
var radio_options = document.getElementsByName('radio_options');
var options_with_buttons = document.getElementById('options_with_buttons');
var percentage_score = document.getElementById('percentage_score');

//Global Variables declared
var score = 0;
var correct_question = [];
var radio_value = '';
var i = 0;
var options_html = '';

//Array of the Quiz Questions
var quiz_questions = [
  {
    question_number: '1',
    question: 'The Country Nigeria, has How many States?',
    options: ['32 States', '34 States', '36 States', '38 States'],
    correct_answer: '36 States'
  },
  {
    question_number: '2',
    question: ' The highest Court in Nigeria is the :',
    options: [
      'Court of Appeal',
      'High Court',
      'Magistrate Court',
      'Supreme Court'
    ],
    correct_answer: 'Supreme Court'
  },
  {
    question_number: '3',
    question: ' Nigeria Gained Independence in the Year :',
    options: ['1960', '1900', '1963', '1969'],
    correct_answer: '1960'
  },
  {
    question_number: '4',
    question: ' What is the Meaning of the Abbrevation W.H.O?',
    options: [
      'Women Health Organisation',
      'Waylay Helpless Octopus',
      'World Health Organisation',
      'What Hassan Organised'
    ],
    correct_answer: 'World Health Organisation'
  },
  {
    question_number: '5',
    question: ' Another Name for JavaScript is :',
    options: ['Java', 'Phython Script', 'ECMA Script', 'Query Script'],
    correct_answer: 'ECMA Script'
  }
];

//Event listeners to listen for clicks on the Html Button Attributes
button_start.addEventListener('click', () => start_quiz());
button_next.addEventListener('click', () => next_question());
button_submit.addEventListener('click', () => submit());

/**
 * @description function Displays Questions
 */
start_quiz = () => {
  button_start.style.display = 'none';
  options_html = '';
  question_options.innerHTML = '';

  if (i <= quiz_questions.length - 1) {
    createRadio();
    start_instruction.innerHTML = '';
    question_number.innerHTML = 'Question ' + quiz_questions[i].question_number;
    question_text.innerHTML = quiz_questions[i].question;
  }
  radio_option_click();
}

/**
 * @description function Increments and calls the Next question/Next Set of Options
 */
next_question = () => {
  i++;
  start_quiz();
}

/**
 * @description function creates the radio buttons and their respective labels
 * while also allocating the appropriate ID and Values to the radio buttons
 */
createRadio = () => {
  button_next.style.display = 'none';
  if (i < quiz_questions.length) {
    for (var a = 0; a < 4; a++) {
      options_html +=
        `<input type='radio' name='option' onclick='radio_option_click()' id='option${a + 1}' value=''>
        <label class='label' for='option${a + 1}'>${quiz_questions[i].options[a]}</label><br></br>`;
      question_options.innerHTML = options_html;
      if (a == 4) {
        return;
      }
    }
  }
  if (i < quiz_questions.length) {
    for (var b = 0; b < radio.length; b++) {
      radio[b].value = quiz_questions[i].options[b];
      if (b == 4) {
        return b;
      }
    }
  }
}

/**
 * @description ckeck to see if the Radio housing the
 * answer was clicked saves the Radio value at the click
 * while calling function mark to increment score
 */
radio_option_click = () => {
  button_next.style.display = 'block';
  button_next.disabled = true;
  button_submit.disabled = false;
  button_next.style.transition = '';
  button_next.style.font = '';
  if (i == quiz_questions.length - 1) {
    for (var c = 0; c < radio.length; c++) {
      if (radio[c].checked) {
        button_next.style.display = 'none';
        button_submit.style.display = 'block';
        button_submit.disabled = false;
        radio_value = radio[c].value;
        mark();
      }
    }
  } else {
    for (var d = 0; d < radio.length; d++) {
      if (radio[d].checked) {
        button_next.style.display = 'block';
        button_next.disabled = false;
        button_next.style.textAlign = 'center';
        radio_value = radio[d].value;
        mark();
      }
    }
    return;
  }
}

/**
 * @description This increments score, when the right answer is chosen
 *
 */
mark = () => {
  {
    if (radio_value == quiz_questions[i].correct_answer) {
      score += 1;
    }
  }
}

/**
 * @description function presents a submit message
 */
submit = () => {
  question_number.innerHTML = 'Result';
  options_with_buttons.style.display = 'none';
  question_text.innerHTML = 'Quiz Completed!';
  start_instruction.innerHTML =
    `Your score is \xa0 
    ${score} \xa0 out of  \xa0 ${quiz_questions.length} \xa0Questions.`;
  percentage_score.innerHTML =
    `Percentage Score \xa0 = \xa0 ${score / quiz_questions.length * 100}%`;
}