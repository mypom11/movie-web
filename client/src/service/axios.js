import axios from "axios";
import { setInterceptors } from "./interceptors";

function createInstanceProduct() {
  // Token값과 특정 url을 붙여서 셋팅
  const instance = axios.create();
  return setInterceptors(instance);
}

const movieData = createInstanceProduct();

export const getMovieList = async (search) => {
  movieData
    .get("https://openapi.naver.com/v1/search/movie.json", {
      headers: {
        "X-Naver-Client-Id": `${process.env.VUE_APP_NAVER_KEY}`,
        "X-Naver-Client-Secret": `${process.env.VUE_APP_NAVER_CLIENT}`,
      },
      params: search,
    })
    .then((res) => {
      return res.data.rss;
    });
};
