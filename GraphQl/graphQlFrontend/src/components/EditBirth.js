import React from 'react'
import Select from 'react-select'

const EditBirth = (props) => {
    let listauthors =  props.authors.map(a => a = {value : a.name, label: a.name})
    console.log(listauthors)



   
    const editBirthYear = async (event) => {
        event.preventDefault()
        let name = event.target.name.value
        let born = parseInt(event.target.born.value)
        await props.setBirthYear({
            variables: {name, born}
        })

    }

    return (
        <div>
            <h2>Set BirthYear</h2>
            <form onSubmit = {editBirthYear}>
                <p>Authors Name</p>
                <Select
                    name = "name"
                    options = {listauthors}
                >
                
                </Select>
                <p>Authors BirthYear</p>
                <input name = "born" type ="number"></input>
                <button type = "submit">Confirm Edit</button>
            </form>
        </div>
    )
}

export default EditBirth