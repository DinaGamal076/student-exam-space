
export const mockExams = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of basic JavaScript concepts and syntax.",
    duration: 30,
    questions: [
      {
        id: 1,
        text: "What is the correct way to declare a variable in JavaScript?",
        type: "multiple_choice",
        options: ["var x = 5;", "variable x = 5;", "declare x = 5;", "x := 5;"],
        correctAnswer: "var x = 5;"
      },
      {
        id: 2,
        text: "Which method is used to add an element to the end of an array?",
        type: "multiple_choice",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: "push()"
      },
      {
        id: 3,
        text: "JavaScript is a compiled language.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: 4,
        text: "What does DOM stand for?",
        type: "multiple_choice",
        options: [
          "Document Object Model",
          "Data Object Management",
          "Dynamic Object Mapping",
          "Document Oriented Model"
        ],
        correctAnswer: "Document Object Model"
      },
      {
        id: 5,
        text: "Which operator is used for strict equality in JavaScript?",
        type: "multiple_choice",
        options: ["==", "===", "=", "!="],
        correctAnswer: "==="
      }
    ],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    title: "React Basics",
    description: "Assess your understanding of React fundamentals and components.",
    duration: 45,
    questions: [
      {
        id: 1,
        text: "What is JSX?",
        type: "multiple_choice",
        options: [
          "A JavaScript extension that allows HTML-like syntax",
          "A CSS framework",
          "A database query language",
          "A testing library"
        ],
        correctAnswer: "A JavaScript extension that allows HTML-like syntax"
      },
      {
        id: 2,
        text: "React components must return a single parent element.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: 3,
        text: "Which hook is used to manage state in functional components?",
        type: "multiple_choice",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState"
      },
      {
        id: 4,
        text: "Props in React are mutable.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: 5,
        text: "What is the purpose of the useEffect hook?",
        type: "multiple_choice",
        options: [
          "To manage component state",
          "To handle side effects in functional components",
          "To create context providers",
          "To optimize component rendering"
        ],
        correctAnswer: "To handle side effects in functional components"
      }
    ],
    createdAt: "2024-01-02T00:00:00Z"
  },
  {
    id: 3,
    title: "CSS Fundamentals",
    description: "Test your knowledge of CSS styling and layout techniques.",
    duration: 25,
    questions: [
      {
        id: 1,
        text: "Which CSS property is used to change the text color?",
        type: "multiple_choice",
        options: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: "color"
      },
      {
        id: 2,
        text: "CSS stands for Cascading Style Sheets.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: 3,
        text: "Which display value creates a block-level flex container?",
        type: "multiple_choice",
        options: ["flex", "inline-flex", "block", "inline-block"],
        correctAnswer: "flex"
      },
      {
        id: 4,
        text: "The box-sizing property affects how the total width and height are calculated.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: 5,
        text: "Which CSS property is used to create space between elements?",
        type: "multiple_choice",
        options: ["margin", "padding", "border", "spacing"],
        correctAnswer: "margin"
      }
    ],
    createdAt: "2024-01-03T00:00:00Z"
  }
];
