const tableBodyContainer = document.getElementById('table-body-container')
const inputUsername=document.getElementById('username')
const inputTextarea=document.getElementById('textarea')
const addBtn=document.getElementById('add-btn')

let userLocationArray=[{id:1, name:'Smit kotadia', location:'Sola Road, Ahmedabad, Gujarat, India'}]

function addLocation(userDetails){
    const tableRowEle=document.createElement('tr')
    tableBodyContainer.appendChild(tableRowEle)

    const srNo=document.createElement('th')
    srNo.setAttribute('scope','row')
    srNo.textContent= userDetails.id
    tableRowEle.appendChild(srNo)

    const userName=document.createElement('td')
    userName.textContent=userDetails.name
    tableRowEle.appendChild(userName)

    const userLocation=document.createElement('td')
    userName.textContent=userDetails.location
    tableRowEle.appendChild(userLocation)
}
addBtn.onclick=addLocation()
const a1=userLocationArray[0]
addLocation(a1)
 