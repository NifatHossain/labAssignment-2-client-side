const handleRegister=()=>{
    const fname = document.getElementById('fname').value;
    const lname= document.getElementById('lname').value;
    const gender= document.getElementById('gender').value;
    const dob= document.getElementById('dob').value;
    const email= document.getElementById('email').value;
    const image= document.getElementById('image').value;
    const password= document.getElementById('password').value;
    const reTypedPassword= document.getElementById('reTypedPassword').value;
    if(password.length<6){
        return alert('Password must contain atleast 6 character')
    }
    if(password!=reTypedPassword){
        return alert('ReTypedPassword is not matching with original')
    }
    const data= {fname,lname,dob,gender,email,password,image}
    console.log(data);

    fetch('http://localhost:3000/adduser', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    })
    .then(res=>{
        console.log('response: ', res.status)
        if(res.status==200){
            alert('Registered successfully')
            setTimeout(()=>{
                window.location.href = 'index.html'
            },0)
            
        }
    })

}
const showAllUser=async()=>{
    const response = await fetch('http://localhost:3000/allusers');
    const data= await response.json();
    console.log(data)
}

const showAllDataofCurrentUser=async(email)=>{
    const response = await fetch(`http://localhost:3000/allusers/${email}`);
    const data= await response.json();
    console.log(data)
}

const showSingleUser=async()=>{
    // finding cuttrent user 
    const response1 = await fetch(`http://localhost:3000/currentuser`);
    const data1= await response1.json();
    console.log(data1[0].email)
    const currentEmail=data1[0].email;
    //getting data of current user
    const response = await fetch(`http://localhost:3000/allusers/${currentEmail}`);
    const data= await response.json();
    console.log(data)
    // window.location.href = 'userData.html';
    const userData= document.getElementById('userInfo');
    userData.innerHTML=`
    <h2 class="text-3xl font-bold text-center my-5 ">Personal Information</h2>
    <div class="max-w-2xl mx-auto flex flex-col gap-4">
        <div class="flex justify-center">
            <img class="w-80 h-72 border-2" src="${data[0].image}" alt="">
        </div>
        <form class="flex flex-col gap-3">
            
            <p>First Name:</p>
            <input class="p-3 border" value="${data[0].fName}" disabled type="text" name="fname" id="fname" placeholder="Enter first name" required>
            <p>Lst Name:</p>
            <input class="p-3 border" value="${data[0].lName}" disabled type="text" name="lname" id="lname" placeholder="Enter last name" required>
            <p>Date of Birth:</p>
            <p class="p-3 border block" id="dobP">${data[0].birthDate}</p>
            <input class="p-3 border hidden"  type="date" name="dob" id="dob" placeholder="Enter date of Birth" required>
            <p>Gender:</p>
            <p class="p-3 border block" id="genderP">${data[0].gender}</p>
            <div class="flex flex-col hidden" id="genderDiv">
                <select class="p-3 border" value="" name="gender" id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <p>Email:</p>   
            <input class="p-3 border" value="${data[0].email}" disabled type="email" id="email" name="email" placeholder="Enter email" required>
            <div class="flex flex-col hidden" id="img&pass">
                <p>Image URL:</p>
                <input class="p-3 border" value="${data[0].image}" type="text" id="image" name="image" placeholder="Enter image url" required>
                <p>Password:</p>
                <input class="p-3 border" value="${data[0].password}" type="text" id="password" name="password" placeholder="Enter password" required>
            </div>
            
            <input onclick="handleUpdate()" id="updateBtn" class="bg-green-400 p-3 cursor-pointer text-white font-semibold" type="button" value="Update information">
            <input onclick="updateData(${data[0].id})" id="confirmBtn" class="bg-green-400 hidden p-3 cursor-pointer text-white font-semibold" type="button" value="Confirm Update">
        </form>
        <!-- Open the modal using ID.showModal() method -->
            <button class="btn text-white bg-red-400" id="deleteBtn"  onclick="my_modal_5.showModal()">Delete User</button>
            <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button onclick="handleDelete(${data[0].id})"  class="btn text-white bg-red-400">Delete</button>
                </form>
                </div>
            </div>
            </dialog>
    </div>
    `

}
const handleUpdate=()=>{
    document.getElementById('fname').disabled = false;
    document.getElementById('lname').disabled = false;
    document.getElementById('dobP').classList.replace('block','hidden')
    document.getElementById('dob').classList.replace('hidden','block')
    document.getElementById('genderDiv').classList.replace('hidden','block')
    document.getElementById('genderP').classList.replace('block','hidden')
    // document.getElementById('email').disabled = false;
    document.getElementById('img&pass').classList.replace('hidden','block')
    document.getElementById('confirmBtn').classList.replace('hidden','block')
    document.getElementById('deleteBtn').classList.add('hidden')
    document.getElementById('updateBtn').classList.add('hidden')
    
}

const updateData=(id)=>{
    const fname = document.getElementById('fname').value;
    const lname= document.getElementById('lname').value;
    const gender= document.getElementById('gender').value;
    const dob= document.getElementById('dob').value;
    // const email= document.getElementById('email').value;
    const image= document.getElementById('image').value;
    const password= document.getElementById('password').value;
    if(password.length<6){
        return alert('Password must contain atleast 6 character')
    }
    
    const data= {fname,lname,dob,gender,password,image}
    console.log(data);
    fetch(`http://localhost:3000/updatedata/${id}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    })
    .then(res=>{
        console.log('response: ', res)
        if(res.status==200){
            alert('updated data successfully')
            setTimeout(()=>{
                window.location.href = 'userData.html'
            },0)
        }
    })
}

const handleDelete=(id)=>{
    fetch(`http://localhost:3000/deleteuser/${id}`, {
        method: "DELETE",
    })
    .then(res=>{
        console.log('response: ', res)
    })
    deleteCurrentUser();
    // window.location.href = 'index.html';
}

const deleteCurrentUser=()=>{
    fetch(`http://localhost:3000/deletecurrentuser`, {
        method: "DELETE",
    })
    .then(res=>{
        console.log('response: ', res)
        if(res.status==200){
            alert('Deleted successfully')
            setTimeout(()=>{
                window.location.href = 'index.html'
            },0)
        }
    })
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
        window.location.href = 'userData.html';
        
    }
    else{
        alert('Wrong input')
    }

}
