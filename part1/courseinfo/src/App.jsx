// const Header = ({name}) => {
//   return (
//     <h1>
//       {name}
//     </h1>
//   )
// }

// const Part = ({part}) => {
//   return (
//     <p>
//       {part.name} {part.exercises}
//     </p>
//   )
// }

// const Content = ({parts}) => {
//   return (
//     <>
//       {
//         parts.map((part, index) => (
//           <Part key={index} part={part} />
//         ))
//       }
//     </>
//   )
// }

// const Total = ({parts}) => {
//   return (
//     <p>
//       Number of excercises {parts.reduce((sum, part) => (sum + part.exercises), 0)}
//     </p>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header name={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

import { useState } from 'react'

// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0);
//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button text={"plus"} onClick={increaseByOne} />
//       <Button text={"minus"} onClick={decreaseByOne} />
//       <Button text={"zero"} onClick={setToZero} />
//     </div>
//   )
// }

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setClicks({ ...clicks, left: clicks.left + 1 });
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({ ...clicks, right: clicks.right + 1 });
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {clicks.right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App