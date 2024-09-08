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
  runAsync = async (...params) => {
    this.setState({ loading: true, params });
    try {
      const res = await this.serviceRef.current(...params);
      this.setState({ loading: false, data: res, error: undefined, params });
    } catch (error) {
      this.setState({ loading: false, data: undefined, error: error, params });
      throw error;
    }
  };
  run = (...params) => {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  };
}
export default Fetch;
