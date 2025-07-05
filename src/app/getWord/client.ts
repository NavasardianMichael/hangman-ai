// import { TAppSlice } from "store/app/types";
import { GetWordAPI } from './types'

// export const getAppData = (data: IDBObjectStoreParameters) => {
//     let openRequest = indexedDB.open("hangman", 1);

//     openRequest.onupgradeneeded = function() {
//         console.log('indexDB / onupgradeneeded');
//         let db = openRequest.result;
//         db.createObjectStore('hangman', { keyPath: 'id' })
//         // срабатывает, если на клиенте нет базы данных
//         // ...выполнить инициализацию...
//     };

//     openRequest.onerror = function() {
//         console.error("Error", openRequest.error);
//     };

//     openRequest.onsuccess = function() {
//         let db = openRequest.result;
//         console.log({db});

//     };
// }

export const getWord = async (settings: GetWordAPI['payload']): Promise<GetWordAPI['response']> => {
  const response = await fetch('/getWord', {
    method: 'POST',
    body: JSON.stringify(settings),
  })
  const data = await response.text()
  return data
}
