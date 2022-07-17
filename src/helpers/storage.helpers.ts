export function storeUser(windowTarget : Window, item : object | string){
  windowTarget.sessionStorage.setItem("user", typeof item === 'object' ? JSON.stringify(item) : item);
}
export function deleteUser( windowTarget : Window){
  windowTarget.sessionStorage.removeItem("user");
}