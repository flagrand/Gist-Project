const axios = require('axios');

class Wrapper {
  constructor() {
    this.token = "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"
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + this.token
      }
    })
  }

  getRequest(path) {
    return this.client.get(path)
  }

  postRequest(path, payload) {
    return this.client.post(path, payload)
  }
  patchRequest(path,payload){
    return this.client.patch(path, payload)
  }
  deleteRequest(path) {
		return this.client.delete(path);
	}

  root() {
    return this.getRequest('/')
  }

  createGist(payload) {
    return this.postRequest('/gists', payload)
  }

  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`)
  }

  updateGist(gistId, payload) {
		return this.patchRequest(`/gists/${gistId}`, payload);
	}
  deleteGist(gistId) {
		return this.deleteRequest(`/gists/${gistId}`);
	}
}

export default Wrapper;