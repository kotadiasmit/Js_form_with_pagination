const addLocationBtn = document.getElementById("addLocationBtn");
const searchInput = document.getElementById("search-input");
const searchSelectContainer = document.getElementById(
  "search-select-container"
);
const searchBtn = document.getElementById("search-btn");

const tableContainer = document.getElementById("table-container");
const viewLocationTable = document.getElementById("view-location-table");
const tableBodyContainer = document.getElementById("table-body-container");
const formHeading = document.getElementById("form-heading");
const inputUsername = document.getElementById("username");
const inputTextarea = document.getElementById("textarea");
const updateBtnContainer = document.getElementById("update-btn-container");
const addBtnContainer = document.getElementById("add-btn-container");
const addBtn = document.getElementById("add-btn");
const locationUpdateBtn = document.getElementById("location-update-btn");

const modelContainerEle = document.getElementById("model-container");
const modelBackdrop = document.getElementsByClassName("modal-backdrop");
const deleteModelLabel = document.getElementById("deleteModelLabel");
const deleteLocation = document.getElementById("deleteLocation");
const noDataHeading = document.getElementById("noDataHeading");
const paginationEle = document.getElementById("pagination-container");

let userLocationArray = [
  {
    userId: 1,
    name: "Smit Kotadia",
    location: "Sola Road, Ahmedabad, Gujarat, India",
  },
  { userId: 2, name: "Smit", location: "Sola Road, Ahmedabad, Gujarat" },
  { userId: 3, name: "Kotadia", location: "Sola Road, Ahmedabad" },
  { userId: 4, name: "Raj", location: "Sola Road, India" },
  { userId: 5, name: "rahul", location: "Ahmedabad, Gujarat, India" },
  { userId: 6, name: "RKP", location: "Sola, Ahmedabad, Gujarat, India" },
  { userId: 7, name: "Niks", location: "Sola, Ahmedabad, Gujarat" },
  { userId: 8, name: "SSK", location: "Sola Road, Ahmedabad" },
  { userId: 9, name: "Dhruv", location: "Sola, Ahmedabad, Gujarat, India" },
  { userId: 10, name: "Parth", location: "Ahmedabad, Gujarat, India" },
  { userId: 11, name: "aaa", location: "Gujarat, India" },
  { userId: 12, name: "bb cc dd", location: "Sola Road, Ahmedabad" },
  { userId: 13, name: "qq ww", location: "Sola Road, Ahmedabad, Gujarat" },
  { userId: 14, name: "ll dk", location: "Sola Road, Ahmedabad, India" },
  { userId: 15, name: "hh cc ee", location: "Sola Road, Gujarat, India" },
  { userId: 16, name: "Smit Shah", location: "Ahmedabad, Gujarat, India" },
];

let currentPageNo = 1;
let displayRows = 5;
let searchedValueArray = userLocationArray;
let searchValue = "";
let searchBy = "search_by_name";

const searchBySelectedValue = () =>
  searchBy === "search_by_name"
    ? (searchedValueArray = userLocationArray.filter((each) =>
        each.name.toLocaleLowerCase().includes(searchValue)
      ))
    : (searchedValueArray = userLocationArray.filter((each) =>
        each.location.toLocaleLowerCase().includes(searchValue)
      ));

//search for name or location
searchBtn.addEventListener("click", () => {
  searchValue = searchInput.value.toLowerCase();
  searchBy = searchSelectContainer.value;
  searchBySelectedValue();
  //console.log(searchBy);
  //console.log(searchedValueArray);
  tableBodyContainer.textContent = "";
  paginationEle.textContent = "";
  currentPageNo = 1;
  pagination(searchedValueArray);
  displayList(searchedValueArray, displayRows, currentPageNo);
  searchedValueArray.length === 0
    ? (noDataHeading.textContent = "No Data Found.")
    : (noDataHeading.textContent = "");
});

const addLocationModal = document.getElementById("staticBackdrop");
addLocationModal.addEventListener("shown.bs.modal", () => {
  inputUsername.focus();
});

addLocationBtn.addEventListener("click", () => {
  inputUsername.value = "";
  inputTextarea.value = "";
  updateBtnContainer.classList.add("update-add-location-btn");
  addBtnContainer.classList.remove("update-add-location-btn");
  addBtn.setAttribute("data-bs-dismiss", "modal");
  formHeading.textContent = "Add Location Data";
});

// To update row
let updateArrayIndex;
locationUpdateBtn.onclick = function (event) {
  const userNameValue = inputUsername.value.trim();
  const userLocationValue = inputTextarea.value.trim();
  if (userNameValue !== "" && userLocationValue !== "") {
    //console.log(updateArrayIndex);
    userLocationArray[updateArrayIndex].location = inputTextarea.value;
    userLocationArray[updateArrayIndex].name = inputUsername.value;
    //console.log(userLocationArray[updateArrayIndex]);
    tableBodyContainer.textContent = "";
    //userLocationArray.map(each => addLocation(each))
    //console.log(searchValue);
    searchValue !== ""
      ? displayList(searchedValueArray, displayRows, currentPageNo)
      : displayList(userLocationArray, displayRows, currentPageNo);
  } else {
    //console.log(event);
    event.preventDefault();
    alert("Please enter valid details");
  }
};

// To delete row
let deleteArrayIndex;
deleteLocation.onclick = function () {
  //console.log(deleteArrayIndex)
  userLocationArray.splice(deleteArrayIndex, 1);
  //console.log(userLocationArray)
  let updatedUserLocationArray = userLocationArray.map((each, index) => ({
    userId: index + 1,
    name: each.name,
    location: each.location,
  }));
  userLocationArray = updatedUserLocationArray;
  tableBodyContainer.textContent = "";
  //userLocationArray.map(each => addLocation(each))
  paginationEle.textContent = "";
  if (searchValue !== "") {
    searchBySelectedValue();
    //console.log(searchedValueArray);
    searchedValueArray.length % displayRows === 0
      ? (currentPageNo = currentPageNo - 1)
      : currentPageNo;
    pagination(searchedValueArray);
    displayList(searchedValueArray, displayRows, currentPageNo);
    searchedValueArray.length === 0
      ? (noDataHeading.textContent = "No Data Found.")
      : (noDataHeading.textContent = "");
  } else {
    userLocationArray.length % displayRows === 0
      ? (currentPageNo = currentPageNo - 1)
      : currentPageNo;
    pagination(userLocationArray);
    displayList(userLocationArray, displayRows, currentPageNo);
    userLocationArray.length === 0
      ? (noDataHeading.textContent = "No Data Found.")
      : (noDataHeading.textContent = "");
  }
};

// To display table
function addLocation(userDetails) {
  const rowId = "row" + userDetails.userId;
  const tableRowEle = document.createElement("tr");
  tableRowEle.classList.add("capitalize");
  tableRowEle.id = rowId;
  tableBodyContainer.appendChild(tableRowEle);

  const srNo = document.createElement("th");
  srNo.setAttribute("scope", "row");
  srNo.textContent = userDetails.userId;
  tableRowEle.appendChild(srNo);

  const userName = document.createElement("td");
  userName.textContent = userDetails.name;
  tableRowEle.appendChild(userName);

  const userLocation = document.createElement("td");
  userLocation.textContent = userDetails.location;
  tableRowEle.appendChild(userLocation);

  const updateDelBtnContainer = document.createElement("td");
  tableRowEle.appendChild(updateDelBtnContainer);

  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update-delete-btn");
  updateBtn.setAttribute("data-bs-toggle", "modal");
  updateBtn.setAttribute("data-bs-target", "#staticBackdrop");
  updateBtn.textContent = "Update";
  updateDelBtnContainer.appendChild(updateBtn);

  const btnSpan = document.createElement("span");
  btnSpan.textContent = "/";
  btnSpan.classList.add("slash");
  updateDelBtnContainer.appendChild(btnSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("update-delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("data-bs-toggle", "modal");
  deleteBtn.setAttribute("data-bs-target", "#deleteModel");
  updateDelBtnContainer.appendChild(deleteBtn);

  deleteBtn.onclick = function () {
    deleteArrayIndex = userLocationArray.findIndex(
      (each) => "row" + each.userId === rowId
    );
    deleteModelLabel.textContent = userLocationArray[deleteArrayIndex].name;
  };

  updateBtn.onclick = function () {
    updateBtnContainer.classList.remove("update-add-location-btn");
    addBtnContainer.classList.add("update-add-location-btn");
    formHeading.textContent = "Update Location Data";
    const arrayIndex = userLocationArray.findIndex(
      (each) => "row" + each.userId === rowId
    );
    updateArrayIndex = arrayIndex;
    const nameValue = userLocationArray[arrayIndex].name;
    const locationValue = userLocationArray[arrayIndex].location;
    inputUsername.value = nameValue;
    inputTextarea.value = locationValue;
  };
}

// To Add New Location
addBtn.onclick = function (event) {
  let userNameValue = inputUsername.value.trim();
  let userLocationValue = inputTextarea.value.trim();
  let userId;
  userLocationArray.length === 0
    ? (userId = 1)
    : (userId = userLocationArray[userLocationArray.length - 1].userId + 1);
  //console.log(userId)
  if (userNameValue !== "" && userLocationValue !== "") {
    const userDetailsObj = {
      userId,
      name: userNameValue,
      location: userLocationValue,
    };
    userLocationArray.push(userDetailsObj);
    noDataHeading.textContent = "";
    paginationEle.textContent = "";
    //console.log(searchValue);
    searchValue = searchInput.value;

    // pagination(userLocationArray)
    // // To display last active page where location added
    // currentPageNo=Math.ceil(userLocationArray.length/displayRows)
    // //console.log('added to page no. '+currentPageNo)
    // let current_btn = document.querySelector('.pagination li button.active');
    // //console.log(current_btn)
    // current_btn.classList.remove('active');
    // let lastPage_btn=document.getElementById(`pageBtn${currentPageNo}`)
    // lastPage_btn.classList.add('active');
    // displayList(userLocationArray, displayRows, currentPageNo);

    if (searchValue !== "") {
      searchBySelectedValue();
      pagination(searchedValueArray);
      // To display last active page where location added
      currentPageNo = Math.ceil(searchedValueArray.length / displayRows);
      let current_btn = document.querySelector(".pagination li button.active");
      //console.log(current_btn)
      current_btn.classList.remove("active");
      let lastPage_btn = document.getElementById(`pageBtn${currentPageNo}`);
      lastPage_btn.classList.add("active");
      displayList(searchedValueArray, displayRows, currentPageNo);
    } else {
      pagination(userLocationArray);
      // To display last active page where location added
      currentPageNo = Math.ceil(searchedValueArray.length / displayRows);
      let current_btn = document.querySelector(".pagination li button.active");
      //console.log(current_btn)
      current_btn.classList.remove("active");
      let lastPage_btn = document.getElementById(`pageBtn${currentPageNo}`);
      lastPage_btn.classList.add("active");
      displayList(userLocationArray, displayRows, currentPageNo);
    }
  } else {
    //console.log(event);
    event.preventDefault();
    alert("Please enter valid details");
    addBtn.removeAttribute("data-bs-dismiss", "modal");
  }
};

// To set Pagination
function pagination(userLocationArray) {
  //console.log(userLocationArray);
  let pageCount = Math.ceil(userLocationArray.length / displayRows);

  // prev tag
  const prevEle = document.createElement("li");
  prevEle.classList.add("page-item");
  currentPageNo === 1 ? prevEle.classList.add("disabled") : null;
  paginationEle.appendChild(prevEle);

  const prevBtnTag = document.createElement("button");
  prevBtnTag.classList.add("page-link", "prev-nxt-btn");
  prevBtnTag.textContent = "Prev";
  prevEle.appendChild(prevBtnTag);

  //page no tag
  for (let i = 1; i <= pageCount; i++) {
    const pageNoEle = document.createElement("li");
    pageNoEle.classList.add("page-item");
    paginationEle.appendChild(pageNoEle);

    const pageNoBtn = document.createElement("button");
    pageNoBtn.id = "pageBtn" + i;
    pageNoBtn.classList.add("page-link");
    pageNoBtn.textContent = i;
    currentPageNo === i ? pageNoBtn.classList.add("active") : null;
    pageNoEle.appendChild(pageNoBtn);

    clickedPageView(pageNoBtn, i);
  }

  //next tag
  const nextEle = document.createElement("li");
  nextEle.classList.add("page-item");
  currentPageNo === pageCount ? nextEle.classList.add("disabled") : null;
  paginationEle.appendChild(nextEle);

  const nextBtnTag = document.createElement("button");
  nextBtnTag.classList.add("page-link", "prev-nxt-btn");
  nextBtnTag.textContent = "Next";
  nextEle.appendChild(nextBtnTag);

  prevPageView(prevBtnTag, nextEle, prevEle, pageCount);
  nextPageView(nextBtnTag, nextEle, prevEle, pageCount);

  function clickedPageView(pageNoBtn, i) {
    pageNoBtn.addEventListener("click", function () {
      currentPageNo = i;
      //console.log(currentPageNo);
      let current_btn = document.querySelector(".pagination li button.active");
      //console.log(current_btn);
      currentPageNo === 1
        ? prevEle.classList.add("disabled")
        : prevEle.classList.remove("disabled");
      currentPageNo === pageCount
        ? nextEle.classList.add("disabled")
        : nextEle.classList.remove("disabled");
      // condition added as when last page all item deleted current_btn will be null
      current_btn !== null ? current_btn.classList.remove("active") : null;
      pageNoBtn.classList.add("active");
      displayList(userLocationArray, displayRows, currentPageNo);
    });
  }
}

//on Prev btn Clicked
function prevPageView(prevBtnTag, nextEle, prevEle, pageCount) {
  prevBtnTag.addEventListener("click", function () {
    if (currentPageNo > 1) {
      currentPageNo = currentPageNo - 1;
      //console.log(currentPageNo);
      let current_btn = document.querySelector(".pagination li button.active");
      //console.log(current_btn);
      currentPageNo === 1
        ? prevEle.classList.add("disabled")
        : prevEle.classList.remove("disabled");
      currentPageNo === pageCount
        ? nextEle.classList.add("disabled")
        : nextEle.classList.remove("disabled");
      current_btn.classList.remove("active");
      let selected_btn = document.getElementById(`pageBtn${currentPageNo}`);
      selected_btn.classList.add("active");

      displayList(userLocationArray, displayRows, currentPageNo);
    }
  });
}

//on Next btn Clicked
function nextPageView(nextBtnTag, nextEle, prevEle, pageCount) {
  nextBtnTag.addEventListener("click", function () {
    if (currentPageNo < pageCount) {
      currentPageNo = currentPageNo + 1;
      //console.log(currentPageNo);
      let current_btn = document.querySelector(".pagination li button.active");
      //console.log(current_btn);
      currentPageNo === 1
        ? prevEle.classList.add("disabled")
        : prevEle.classList.remove("disabled");
      currentPageNo === pageCount
        ? nextEle.classList.add("disabled")
        : nextEle.classList.remove("disabled");
      current_btn.classList.remove("active");
      let selected_btn = document.getElementById(`pageBtn${currentPageNo}`);
      selected_btn.classList.add("active");

      displayList(userLocationArray, displayRows, currentPageNo);
    }
  });
}

function displayList(userLocationArray, displayRows, currentPage) {
  tableBodyContainer.textContent = "";
  currentPage--;
  let start = displayRows * currentPage;
  let end = start + displayRows;
  let showItems = userLocationArray.slice(start, end);
  for (const userDetails of showItems) {
    addLocation(userDetails);
  }
}

displayList(userLocationArray, displayRows, currentPageNo);
pagination(userLocationArray);
