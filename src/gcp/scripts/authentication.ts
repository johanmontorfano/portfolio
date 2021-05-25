//token stored in the database for current session (nb: consider using realtime database for this kind of transations)
//this token can be shared between johanmontorfano's apps to load data about the user on redirect

//"global-token" is used to be shared between johanmontorfano's apps to load no data when user is transferred
//the token is changed by the user id token stored in the user associated package in firestore
//when the user is disconnected, the token became a global-token again

//use a tokenImport function to get the data relative to uuid stored in the token-store at the entry pointed by the token
export let tokenId: string = "global-token";
//set the token value for external files
export const setToken = (token: string) => tokenId = token;
