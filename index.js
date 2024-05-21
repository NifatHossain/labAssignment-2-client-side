const handleRegister=()=>{
    const fname = document.getElementById('fname').value;
    const lname= document.getElementById('lname').value;
    const gender= document.getElementById('gender').value;
    const dob= document.getElementById('dob').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const reTypedPassword= document.getElementById('reTypedPassword').value;
    const data= {fname,lname,dob,gender,email,password,reTypedPassword}
    console.log(data);

    fetch('http://localhost:3000/adduser', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    })
    .then(res=>{
        console.log('response: ', res)
    })

}