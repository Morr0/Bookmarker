window.onload = pageLoaded

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

    // Retreives, adds and saves
    let folders = JSON.parse(localStorage.getItem("bookmarkFolders"))
    folders.push(folder)
    localStorage.setItem("bookmarkFolders", JSON.stringify(folders))
    
    refreshBookmarkFolders()
}

function Bookmark(){
    let name = document.getElementById("bookmarkName").value;
    let url = document.getElementById("bookmarkURL").value;
    let folderName = document.getElementById("bookmarkFolder").value

    // Uses template above to save bookmark into an object
    let bookmark = bookmarkTemplate
    bookmark.bookmarkName = name
    bookmark.url = url
    bookmark.folderName = folderName

    // Retreives, adds and saves
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    bookmarks.push(bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

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

    divBookmarks.innerHTML = 0
    for (let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name
        let url = bookmarks[i].url

        divBookmarks.innerHTML += '<div><h1><a href="\''+url+'\'">\''+name+'\'</a></h1></div>'
    }
    
}

function refreshBookmarkFolders(){
    let foldersAvailable = JSON.parse(localStorage.getItem("bookmarkFolders"))
    let foldersSelect = document.getElementById("bookmarkFolder")
    foldersSelect.innerHTML = ""

    for (let i = 0; i < foldersAvailable.length; i++){
        foldersSelect.innerHTML += `<option value="${foldersAvailable[i].name}" selected>${foldersAvailable[i].name}</option>`
    }
}