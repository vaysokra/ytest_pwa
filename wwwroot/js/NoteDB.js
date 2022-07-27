function _insertNote(db, jsonData) {
    // create a new transaction
    const txn = db.transaction('Notes', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('Notes');
    //
    let query = store.put(jsonData);
    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };
    // handle the error case
    query.onerror = function (event) {
        console.log("onerror");
        console.log(event.target.errorCode);
    }
    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}
window.setNote = async (jsonData) => {
    // const arrayBuffer = await imageStream.arrayBuffer();
    // const blob = new Blob([arrayBuffer]);
    // const url = URL.createObjectURL(blob);
    // document.getElementById(imageElementId).src = url;

    //URL.revokeObjectURL(url);
    const request = indexedDB.open('Note', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        _insertNote(db, {
            title: jsonData.title,
            description: jsonData.description,
        });
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        let store = db.createObjectStore('Notes', {
            autoIncrement: true
        });
    };
}