const Filter = ({name, searchName}) => {
    return <div>filter shown with<input value={name} onChange={searchName}/></div>
}

export default Filter