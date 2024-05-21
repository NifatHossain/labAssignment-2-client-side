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
const showAllUser=async()=>{
    const response = await fetch('http://localhost:3000/allusers');
    const data= await response.json();
    console.log(data)
}

const showSingleUser=async()=>{
    // console.log(email)
    const response1 = await fetch(`http://localhost:3000/currentuser`);
    const data1= await response1.json();
    console.log(data1[0].email)
    const currentEmail=data1[0].email;
    const response = await fetch(`http://localhost:3000/allusers/${currentEmail}`);
    const data= await response.json();
    console.log(data)
    // window.location.href = 'userData.html';
    const userData= document.getElementById('userInfo');
    userData.innerHTML=`
        <h1 class="text-3xl font-semibold">Name: ${data[0].fName}</h1>
    `

}
const validateUser=async(email,pass)=>{
    const response = await fetch(`http://localhost:3000/allusers/${email}`);
    const data= await response.json();
    const info= {email}
    if(data.length>0 && data[0].password==pass){
        fetch('http://localhost:3000/addcurrentuser', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(info)
        })
        .then(res=>{
            console.log('response: ', res)
        })
        
    }
    else{
        alert('Wrong input')
    }

}
