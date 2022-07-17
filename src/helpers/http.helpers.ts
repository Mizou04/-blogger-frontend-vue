export class HTTPClient{
  targetWindow : Window;
  constructor(targetWindow : Window){
    this.targetWindow = targetWindow
  }
  async call(url : string, options : RequestInit){
    try{
      let res = await this.targetWindow.fetch(url, options);
      let json = res.json();
      return json;
    } catch (e){
      throw e
    }
  }
}