const questions = [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: [
        "&lt;link&gt;",
        "&lt;href&gt;",
        "&lt;hyperlink&gt;",
        "&lt;a&gt;"
      ],
      answer: 3
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Coded Style Syntax"
      ],
      answer: 0
    },
    {
      question: "Which of these is a version control system?",
      options: [
        "Node.js",
        "Git",
        "Bootstrap",
        "NPM"
      ],
      answer: 1
    },
    {
      question: "Which method is used to output data to the console in JavaScript?",
      options: [
        "print()",
        "echo()",
        "console.log()",
        "write()"
      ],
      answer: 2
    },
    {
      question: "Which protocol is used to transfer web pages?",
      options: [
        "HTTP",
        "FTP",
        "SMTP",
        "TCP"
      ],
      answer: 0
    }
  ];
  
  let score = 0;
  let answered = new Set();
  
  window.onload = () => {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = questions.map((q, idx) => {
      return `
        <div class="question-block" data-q="${idx}">
          <p><strong>Q${idx + 1}:</strong> ${q.question}</p>
          <div class="option-grid">
            ${q.options.map((opt, i) =>
              `<button onclick="checkAnswer(this, ${idx}, ${i})">${opt}</button>`
            ).join('')}
          </div>
        </div>`;
    }).join('');
  };
  
  function checkAnswer(button, questionIndex, selectedOption) {
    if (answered.has(questionIndex)) return;
  
    answered.add(questionIndex);
    const correctIndex = questions[questionIndex].answer;
    const parent = button.closest('.question-block');
    const buttons = parent.querySelectorAll('button');
  
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) {
        btn.classList.add('correct');
        if (index === selectedOption) {
          btn.innerHTML += " ✓ Correct!";
          score++;
        } else {
          btn.innerHTML += " (Correct)";
        }
      } else if (index === selectedOption) {
        btn.classList.add('incorrect');
        btn.innerHTML += " ✗ Incorrect!";
      }
    });
  
    if (answered.size === questions.length) {
      document.getElementById('result').innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!`;
    }
  }
  
  // Joke API
  function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(res => res.json())
      .then(data => {
        document.getElementById('jokeDisplay').textContent =
          `${data.setup} — ${data.punchline}`;
      })
      .catch(err => {
        document.getElementById('jokeDisplay').textContent = "Oops! Couldn't fetch a joke.";
      });
  }
  