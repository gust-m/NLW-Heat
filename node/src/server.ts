import { serverHttp } from "./app";

serverHttp.listen(3333, () => {
  console.log('working at 3333');
})