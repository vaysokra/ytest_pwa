function _insertNote(db, jsonData) {
    // create a new transaction
    const txn = db.transaction('Notes12', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('Notes12');
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
window.setNote = async (jsonData,dotNetObjRef) => {
    // const arrayBuffer = await imageStream.arrayBuffer();
    // const blob = new Blob([arrayBuffer]);
    // const url = URL.createObjectURL(blob);
    // document.getElementById(imageElementId).src = url;

    //URL.revokeObjectURL(url);
    const request = indexedDB.open('Notes1', 2);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        _insertNote(db, {
            title: jsonData.title,
            description: jsonData.description,
            home: "data12"
        });
        dotNetObjRef.invokeMethod('JStoCSCall');
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        let store = db.createObjectStore('Notes12', {
            autoIncrement: true
        });
    };
}