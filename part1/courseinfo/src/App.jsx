const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map((part, index) => (
          <Part key={index} part={part} />
        ))
      }
    </>
  )
}

const Total = ({parts}) => {
  return (
    <p>
      Number of excercises {parts.reduce((sum, part) => (sum + part.exercises), 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App