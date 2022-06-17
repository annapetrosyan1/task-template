const client_id = '23af14549f384b6b87c24b7de737d30b';
const client_secret = '04eabed74c6a4ba0acd59d337669292a';

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
       },
       body: 'grant_type=client_credentials'
    });
 
    const data = await result.json();
    return data.access_token;
 }

const fetchTemplate = async (url) => {
    let token = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/` + url, {
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
       }
    })
    
    if (result.ok) {
       const data = await result.json();
       return data
    }
    
    switch(result.status){
       case "401":
          throw new Error
                ("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.");
       case "403":
          throw new Error
                   ("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.");
       case "404":
          throw new Error("There's no data. Try to reload page.");
       default: 
          throw new Error("Something went wrong");
    }
 }

export const getNewReleases = async () => {

    try {
       const limit = 12;
       const url = `browse/new-releases?limit=${limit}`;
 
       return await fetchTemplate(url);
    }
 
    catch (e) {
       alert(e);
    }
 }
 
 export const getTracks = async (id) => {
 
    try {
       const url = `albums/${id}/tracks`;
 
       let data = await fetchTemplate(url);
       return data.items;
    }
 
    catch (e) {
       alert(e);
    }
 }