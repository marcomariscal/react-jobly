import axios from "axios";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = // for now, hardcode token for "testing"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
      // "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
      // "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U";
      JSON.parse(window.localStorage.getItem("token"));

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (
        await axios({
          method: verb,
          url: `http://localhost:3001/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompanies(params = {}) {
    let res = await this.request(`companies/`, params);
    return res;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(params = {}) {
    let res = await this.request(`jobs/`, params);
    return res;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.company;
  }

  static async registerUser(data) {
    let res = await this.request(`users/`, data, "post");
    return res;
  }

  static async loginUser(data) {
    let res = await this.request(`login/`, data, "post");
    return res;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }
}

export default JoblyApi;
