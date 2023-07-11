import { Router } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

const router = Router();

// eslint-disable-next-line no-unused-vars
function getMovieList(req, response) {
  const option = {
    params: {
      api_key: process.env.TMDB_KEY,
      include_adult: "false",
      include_video: "false",
      language: "ko-KR",
      region: "KR",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };

  axios
    .get("https://api.themoviedb.org/3/discover/movie", option)
    .then((res) => {
      const responseData = {
        success: true,
        list: res.data, // Extract the data from the axios response
      };
      response.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTVList(req, response) {
  // 넷플릭스 8, 디즈니 337, 웨이브 356, 왓챠 97, 애플티비 350, 네이버 96
  const option = {
    params: {
      api_key: process.env.TMDB_KEY,
      include_adult: "false",
      include_null_first_air_dates: "false",
      language: "ko-KR",
      watch_region: "KR",
      with_watch_providers: "8 | 337| 356| 97| 350| 96",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };

  axios
    .get("https://api.themoviedb.org/3/discover/tv", option)
    .then((res) => {
      const responseData = {
        success: true,
        list: res.data, // Extract the data from the axios response
      };
      response.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMovieDetail(req, response) {
  const { id } = req.query;
  const option = {
    params: {
      api_key: process.env.TMDB_KEY,
      language: "ko-KR",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };

  // Array of Promises for each API request
  const promises = [
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, option),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, option),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, option),
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      option
    ),
  ];

  Promise.all(promises)
    .then(([detailRes, videoRes, creditsRes, providerRes]) => {
      const responseData = {
        detail: detailRes.data,
        video: videoRes.data.results,
        credit: creditsRes.data,
        provider: providerRes.data.results.KR,
      };
      response.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    });
}
function getTvDetail(req, response) {
  const { id } = req.query;
  const option = {
    params: {
      api_key: process.env.TMDB_KEY,
      language: "ko-KR",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };

  // Array of Promises for each API request
  const promises = [
    axios.get(`https://api.themoviedb.org/3/tv/${id}`, option),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, option),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/credits`, option),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers`, option),
  ];

  Promise.all(promises)
    .then(([detailRes, videoRes, creditsRes, providerRes]) => {
      const responseData = {
        detail: detailRes.data,
        video: videoRes.data.results,
        credit: creditsRes.data,
        provider: providerRes.data.results.KR,
      };
      response.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    });
}

function getTvSeries(req, response) {
  const { id, season } = req.query;
  const option = {
    params: {
      api_key: process.env.TMDB_KEY,
      language: "ko-KR",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };

  axios
    .get(`https://api.themoviedb.org/3/tv/${id}/season/${season}`, option)
    .then((res) => {
      const responseData = {
        success: true,
        list: res.data, // Extract the data from the axios response
      };
      response.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
    });
}

router.get("/discover/movie", getMovieList);
router.get("/movie/detail", getMovieDetail);
router.get("/tv/detail", getTvDetail);
router.get("/discover/tv", getTVList);
router.get("/tv/season", getTvSeries);

export default router;
