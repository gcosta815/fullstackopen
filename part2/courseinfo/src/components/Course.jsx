const Course = ({course}) => {

    const Header = ({name}) => (<h1>{name}</h1>)
    const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

    const Content = ({parts}) => {
        return (
            <>
                {parts.map((part, index) => (
                    <Part key={index} part={part} />
                ))}
            </>
        )
    }

    const Total = ({parts}) => (
        <p>
            <b>Total of {parts.reduce((sum, part) => (sum + part.exercises), 0)} exercises</b>
        </p>
    )
    
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

export default Course