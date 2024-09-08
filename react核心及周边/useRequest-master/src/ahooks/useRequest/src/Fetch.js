class Fetch {
  constructor(serviceRef, options, subscribe) {
    this.serviceRef = serviceRef;
    this.options = options;
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
      throw error;
    }
  };
  run = () => {
    this.runAsync().catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  };
}
export default Fetch;
