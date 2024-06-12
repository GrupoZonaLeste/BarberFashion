const token = localStorage.getItem('token')

async function saveToken(token) {
    const request = indexedDB.open("tokenDB", 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore("tokens", { keyPath: "id" });
        store.transaction.oncomplete = () => {
            const tokenStore = db.transaction("tokens", "readwrite").objectStore("tokens");
            tokenStore.add({ id: "jwt_token", token: token });
        };
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tokenStore = db.transaction("tokens", "readwrite").objectStore("tokens");
        tokenStore.put({ id: "jwt_token", token: token });
    };
}
saveToken(token)


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjcuMC4wLjEiLCJzdWIiOjQsIm5hbWUiOiJub21lbGVnYWwiLCJleHAiOjIzMTgyMzE5MzQsInJvbGUiOjF9.06xj6Rna60o25xuFqgbR49H3a1Kq11eaWN5wDXMpd1k
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjcuMC4wLjEiLCJzdWIiOjQsIm5hbWUiOiJub21lbGVnYWwiLCJleHAiOjIzMTgyMzE5MzQsInJvbGUiOjF9.06xj6Rna60o25xuFqgbR49H3a1Kq11eaWN5wDXMpd1k