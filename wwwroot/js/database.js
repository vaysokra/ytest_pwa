/////////////////////////function////////////////////////////////
function _f_insertDB(db, note) {
    // create a new transaction
    const txn = db.transaction('NoteObj', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('NoteObj');
    //
    let query = store.put(note);

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
    const txn = db.transaction('NoteObj', 'readonly');
    const store = txn.objectStore('NoteObj');

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
//////////////////////Global Public////////////////////////
window.NoteDB = async (_p_note,_p_blob) => {
    const request = indexedDB.open('NoteDB', 1);
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };
    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        _f_insertDB(db, {
            note: _p_note,
            blob: _p_blob
        });
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        let store = db.createObjectStore('NoteObj', {
            autoIncrement: true
        });
    };
}
window.FindNoteDB = async () => {
    const request = indexedDB.open('NoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        _f_findDB_by_id(db, 1);
    };
}