export default class BlogService {
  API = 'https://kata.academy:8021/api/';

  getInfo = async (url) => {
    try {
      const res = await fetch(`${this.API}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url} , received ${res.status}`);
      }
      return await res.json();
    } catch {
      throw new Error();
    }
  };

  getAticles(number = 0) {
    return this.getInfo(`articles?limit=5&offset=${number}`);
  }
}
