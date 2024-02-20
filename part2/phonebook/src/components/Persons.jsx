const Person = ({person}) => {
    return <span>{person.name} {person.number}<br /></span>
}

const Persons = ({persons}) => {
    return (
        <>
            {persons.map(person => 
                <Person key={person.name} person={person} />
            )}
        </>
    )
}

export default Persons