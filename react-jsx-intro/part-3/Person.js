const Person=(prop)=>{
    return(
        <div>
            <p>Learn some info about this person!</p>
            <ul>
                <li>Name:{prop.name.length>=8? prop.name.slice(0,6) : prop.name}</li>
                <li>Age:{prop.age}</li>
                <li>{prop.age>=18 ? "go vote!":"go study!"}</li>
                <li><ul>Hobbies 
                    {prop.hobbies.map(hobby => <li>{hobby}</li>)}
                </ul>
                </li>
            </ul>
        </div>
        
    )
}