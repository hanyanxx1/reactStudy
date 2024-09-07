class Fetch {
  constructor(serviceRef, subscribe) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;
    this.state = { loading: false, data: undefined };
  }
  setState = (s = {}) => {
    this.state = { ...this.state, ...s };
    this.subscribe();
  };
  runAsync = async () => {
    this.setState({ loading: true });
    const res = await this.serviceRef.current();
    this.setState({ loading: false, data: res });
  };
  run = () => {
    this.runAsync();
  };
}
export default Fetch;
