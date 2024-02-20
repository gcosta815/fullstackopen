const FormInput = ({label, value, onChange}) => 
    <div>{label}: <input value={value} onChange={onChange}/></div>

const PersonForm = ({name, number, onChangeName, onChangeNumber, submit}) => {
    return (
        <form onSubmit={submit}>
            <FormInput label={'name'} value={name} onChange={onChangeName} />
            <FormInput label={'number'} value={number} onChange={onChangeNumber} />
            <div> <button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm