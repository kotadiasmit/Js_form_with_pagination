const tableBodyContainer = document.getElementById('table-body-container')
const inputUsername=document.getElementById('username')
const inputTextarea=document.getElementById('textarea')
const addBtn=document.getElementById('add-btn')
const addLocationBtn=document.getElementById('addLocationBtn')
const modelContainerEle=document.getElementById('model-container')
const modelBackdrop=document.getElementsByClassName('modal-backdrop')

let userLocationArray=[{userId:1, name:'Smit kotadia', location:'Sola Road, Ahmedabad, Gujarat, India'}, {userId:2, name:'Nikilbhai', location:'Sola Road, Ahmedabad, Gujarat, India'}]

addLocationBtn.onclick=function(){
    inputUsername.value=''
    inputTextarea.value=''
    //modelContainerEle.classList.remove('close-popup')
    addBtn.setAttribute('data-bs-dismiss',"modal")
}

function addLocation(userDetails){
    const rowId='row'+userDetails.userId
    const tableRowEle=document.createElement('tr')
    tableRowEle.id=rowId
    tableBodyContainer.appendChild(tableRowEle)

    const srNo=document.createElement('th')
    srNo.setAttribute('scope','row')
    srNo.textContent= userDetails.userId
    tableRowEle.appendChild(srNo)

    const userName=document.createElement('td')
    userName.textContent=userDetails.name
    tableRowEle.appendChild(userName)

    const userLocation=document.createElement('td')
    userLocation.textContent=userDetails.location
    tableRowEle.appendChild(userLocation)

    const updateDelBtnContainer=document.createElement('td')
    tableRowEle.appendChild(updateDelBtnContainer)

    const updateBtn=document.createElement('button')
    updateBtn.classList.add('update-delete-btn')
    updateBtn.setAttribute('data-bs-toggle',"modal")
    updateBtn.setAttribute('data-bs-target',"#staticBackdrop")
    updateBtn.textContent="Update"
    updateDelBtnContainer.appendChild(updateBtn)

    const btnSpan=document.createElement('span')
    btnSpan.textContent='/'
    btnSpan.classList.add('slash')
    updateDelBtnContainer.appendChild(btnSpan)

    const deleteBtn=document.createElement('button')
    deleteBtn.classList.add('update-delete-btn')
    deleteBtn.textContent="Delete"
    updateDelBtnContainer.appendChild(deleteBtn)

    deleteBtn.onclick=function(){
        tableBodyContainer.removeChild(tableRowEle)
    }

    updateBtn.onclick=function(){
        const arrayIndex=findIndex((each)=>'row'+each.userId===rowId)
        const nameValue=userLocationArray[arrayIndex].name
        const locationValue=userLocationArray[arrayIndex].location

        

    }

}
addBtn.onclick=function(event){
    const userNameValue=inputUsername.value
    const userLocationValue=inputTextarea.value
    const userId=userLocationArray[userLocationArray.length-1].userId+1
    //console.log(userId)
    if(userNameValue !== '' && userLocationValue !==""){
        const userDetailsObj={
            userId,
            name:userNameValue,
    location: userLocationValue
   }
   userLocationArray.push(userDetailsObj)
   addLocation(userDetailsObj)
   //modelContainerEle.classList.add('close-popup')
   //modelBackdrop.classList.remove('modal-backdrop fade show')
   
}else{
    console.log(event)
    event.preventDefault()
    addBtn.removeAttribute('data-bs-dismiss')
    alert('Please enter valid details')
}

}

for(let userDetails of userLocationArray){
    addLocation(userDetails)
}
 