const Person = ({person, deletePerson}) => {
    return <span>{person.name} {person.number} <button onClick={deletePerson}>delete</button><br/></span>
}

const Persons = ({persons, deletePerson}) => {
    return (
        <>
            {persons.map(person => 
                <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
            )}
        </>
    )
}

export default Persons