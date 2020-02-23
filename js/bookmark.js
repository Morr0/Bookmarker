window.onload = pageLoaded

let toBeDeletedBookmark = null

const bookmarkFolderTemplate =  {
    name: ""
}

const bookmarkTemplate = {
    folderName: "",
    bookmarkName: "",
    url: ""
}

function addFolder(){
    let name = document.getElementById("bookmarkFolderName").value;
    let folder = bookmarkFolderTemplate
    folder.name = name

    if (canAdd(true) == false){
        alert("You must provide a folder name")
        return;
    }

    // Retreives, adds and saves
    let folders = JSON.parse(localStorage.getItem("bookmarkFolders"))
    folders.push(folder)
    localStorage.setItem("bookmarkFolders", JSON.stringify(folders))

    emptyFields()
    refreshBookmarkFolders()
}

function Bookmark(){
    let name = document.getElementById("bookmarkName").value;
    let url = document.getElementById("bookmarkURL").value;
    let folderName = document.getElementById("bookmarkFolder").value

    if (canAdd(false) == false){
        alert("Fields must not be empty")
        return;
    }

    // Uses template above to save bookmark into an object
    let bookmark = bookmarkTemplate
    bookmark.bookmarkName = name
    bookmark.url = url
    bookmark.folderName = folderName

    // Retreives, adds and saves
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    bookmarks.push(bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    emptyFields()
    getBookmarks()
}

function pageLoaded(){
    if (localStorage.getItem("bookmarkFolders") === null){
        const folder = bookmarkFolderTemplate
        folder.name = "root"

        let bookmarkFolders = []
        bookmarkFolders.push(folder)
        localStorage.setItem("bookmarkFolders", JSON.stringify(bookmarkFolders))
    }

    if (localStorage.getItem("bookmarks") === null){
        const bookmarks = []
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }

    refreshBookmarkFolders()
    getBookmarks()
}

function getBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    let divBookmarks = document.getElementById("bookmarks")

    divBookmarks.innerHTML = ""
    for (let i = 0; i < bookmarks.length; i++){
        let bookmark = bookmarks[i]

        divBookmarks.innerHTML += `<div>
        <h1><a href="${bookmark.url}" target="_blank">${bookmark.bookmarkName}</a></h1>
        <h4 onclick="RemoveBookmark('${bookmark.url}')">Remove</h4>
        </div>`
    }
    
}

function refreshBookmarkFolders(){
    let foldersAvailable = JSON.parse(localStorage.getItem("bookmarkFolders"))
    let foldersSelect = document.getElementById("bookmarkFolder")
    foldersSelect.innerHTML = ""

    for (let i = 0; i < foldersAvailable.length; i++){
        foldersSelect.innerHTML += `<option value="${foldersAvailable[i].name}">${foldersAvailable[i].name}</option>`
    }
}

function RemoveBookmark(url){
    console.log(bookmark)
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    for (let i = 0; i < bookmarks.length; i++){
        let potentialBookmark = bookmarks[i]
        // checks that url and foldername must be same
        if (url == potentialBookmark.url){
            console.log("H3")
            // remove
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    refreshBookmarkFolders()
    getBookmarks()
}

function canAdd(isFolder) {
    if (isFolder){
        if (document.getElementById("bookmarkFolderName").value.length == 0)
            return false
    } else {
        if (document.getElementById("bookmarkName").value.length == 0)
            return false
        if (document.getElementById("bookmarkURL").value.length == 0)
            return false
    }

    return true
}

function emptyFields(){
    document.getElementById("bookmarkFolderName").value = ""
    document.getElementById("bookmarkName").value = ""
    document.getElementById("bookmarkURL").value = ""
}