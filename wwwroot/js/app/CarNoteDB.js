function _f_insertNote(db, jsonData) {
    // create a new transaction
    const txn = db.transaction('CarNote', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('CarNote');
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
function _f_findDB_by_id(db, id) {
    const txn = db.transaction('CarNote', 'readonly');
    const store = txn.objectStore('CarNote');

    let query = store.get(id);

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${id} not found`);
        } else {
            console.table(event.target.result);
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};
// function _readNote()
window.setNote = async (jsonData,dotNetObjRef) => {
    // const arrayBuffer = await imageStream.arrayBuffer();
    // const blob = new Blob([arrayBuffer]);
    // const url = URL.createObjectURL(blob);
    // document.getElementById(imageElementId).src = url;

    //URL.revokeObjectURL(url);
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        _f_insertNote(db, {
            title: jsonData.title,
            description: jsonData.description,
            typeID: jsonData.typeID,
            filter: jsonData.filter,
            startDate: jsonData.startDate,
        });
        dotNetObjRef.invokeMethod('SuccessfulNotify');
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        db.createObjectStore('CarNote', {
            autoIncrement: true
        });
    };
}
window.FindNoteDB = async () => {
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        _f_findDB_by_id(db, 1);
    };
}