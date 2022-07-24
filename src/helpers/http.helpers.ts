export class HTTPClient{
  targetWindow : Window;
  constructor(targetWindow : Window){
    this.targetWindow = targetWindow
  }
  async call(url : string, options : RequestInit){
      const res = await this.targetWindow.fetch(url, options);
      const json = res.json();
      return json;
  }
}