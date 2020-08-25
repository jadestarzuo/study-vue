import axios from 'axios';

export function getCourses(){
  return axios.get('/api/courses').then(res => res.data)
}

// 模拟异步数据调用
// export function getCourses() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 2000);
//   });
// }

