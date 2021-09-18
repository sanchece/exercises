const Tweet = (prop)=>{
    return <div>
        <h3>{prop.username}</h3>
        <p><i>{prop.tweet}</i></p>
        <span>{prop.date}</span> 
        <span> from {prop.name}</span>

    </div>

}