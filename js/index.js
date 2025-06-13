var bookmarkName = document.getElementById("bookmark_name");
var bookmarkUrl = document.getElementById("bookmark_url");

var bookmarkList;

if (localStorage.getItem("bookmarks") === null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  var name = bookmarkName.value;
  var url = bookmarkUrl.value;

  if (
    bookmarkName.classList.contains("is-valid") &&
    bookmarkUrl.classList.contains("is-valid")
  ) {
    var bookmark = {
      name: name,
      url: url,
    };
    console.log(bookmark);
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));

    displayBookmarks();
    // Clear the inputs
    clearBookmarks();
  }
  else{
    const regex = {
    siteName: /^[A-Z][a-z]{2,10}$/,
    siteurl: /^(https?:\/\/)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/,
  };
//   ???????
  if (!regex.siteName.test(bookmarkName.value) || !regex.siteurl.test(bookmarkUrl.value)) {
    
    const modal = new bootstrap.Modal(
      document.getElementById("validationModal")
    );
    modal.show();
  } else {
    
    console.log("Valid! Bookmark saved.");
  }
  }

  
}

function clearBookmarks() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";

  // Remove validation classes after clear the iputs
  document
    .getElementById("bookmark_name")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("bookmark_url")
    .classList.remove("is-valid", "is-invalid");
}

function displayBookmarks() {
  var cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `<div class="col-12 bookmark_border">
              <div class="row py-2">
                <div class="col-3">
                  <h4>${i + 1}</h4>
                </div>
                <div class="col-3">
                  <h4>${bookmarkList[i].name}</h4>
                </div>
                <div class="col-3">
                  <button class="btn btn-visit" onclick="window.open('${
                    bookmarkList[i].url
                  }', '_blank')">
                    <i class="fa-solid fa-eye "></i>
                    Visit
                  </button>
                </div>
                <div class="col-3">
                  <button class="btn btn-delete pe-2" onclick="deleteBookmark(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("bookmark_container").innerHTML = cartona;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  displayBookmarks();
  // Update localStorage after deletion
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
}

function valinputs(element) {
  var regex = {
    bookmark_name: /^[A-Z][a-z]{2,10}$/,
    bookmark_url: /^(https?:\/\/)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
