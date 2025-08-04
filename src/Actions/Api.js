import axios from "axios";

const baseurl = "http://localhost:5225/api/";
export default {
  Dcandidate(url = baseurl + "Dcandids/") {
    return {
      fetchall: () => axios.get(url),
      fetchbyId: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + id, updateRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
};
