const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.title} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))
      }
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of excercises {props.parts.reduce((sum, part) => (sum + part.exercises), 0)}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    { title: part1, exercises: exercises1 },
    { title: part2, exercises: exercises2 },
    { title: part3, exercises: exercises3 },
  ];

  return (
    <div>
      <Header 
        course={course} 
      />
      <Content 
        parts={parts}
      />
      <Total 
        parts={parts}
      />
    </div>
  )
}

export default App