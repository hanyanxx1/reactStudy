class Fetch {
  constructor(serviceRef, subscribe) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;
    this.state = { loading: false, data: undefined, error: undefined };
  }
  setState = (s = {}) => {
    this.state = { ...this.state, ...s };
    this.subscribe();
  };
  runAsync = async () => {
    this.setState({ loading: true });
    try {
      const res = await this.serviceRef.current();
      this.setState({ loading: false, data: res, error: undefined });
    } catch (error) {
      this.setState({ loading: false, data: undefined, error: error });
    }
  };
  run = () => {
    this.runAsync();
  };
}
export default Fetch;
