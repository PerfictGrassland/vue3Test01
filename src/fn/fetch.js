// fetch.js
import { ref } from "vue";

export function useFetch(url) {
  // console.log(
  //   "%c [ url ]-5",
  //   "font-size:13px; background:pink; color:#bf2c9f;",
  //   url
  // );
  const data = ref(null);
  const error = ref(null);
  setTimeout(() => {
    data.value = { aa: 55 };
    error.value = { bb: 55 };
  }, 2000);
  return { data, error }
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => (data.value = json))
  //     .catch((err) => (error.value = err))

  //   return Promise.resolve({ data, error });
  //   return new Promise((resolve, reject) => {
  //     try {
  //       setTimeout(() => {
  //         data.value = { aa: 55 };
  //         error.value = { bb: 55 };
  //         resolve({ data, error });
  //       }, 2000);
  //     } catch (err) {
  //       console.log(
  //         "%c [ err ]-21",
  //         "font-size:13px; background:pink; color:#bf2c9f;",
  //         err
  //       );
  //       reject(err)
  //     }
  //   });
}
