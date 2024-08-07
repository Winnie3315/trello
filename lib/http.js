import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
const fixerURL = import.meta.env.VITE_PUBLIC_FIXER_URL


export const getData = async (path) => {
    try {
        const res = await axios.get(baseURL + path)

        return res
    } catch(e) {
        alert(e.message, 'error')
    }
}
export const postData = async (path, body) => {
    try {
        const res = await axios.post(baseURL + path, body)

        return res
    } catch(e) {
        alert(e.message , 'error')
    }
}
export const patchData = async (path, body) => {
    try {
       const res = await axios.patch(baseURL + path, body)

       return res
    } catch(e) {
       alert(e.message, 'error')
    }
}
export const deleteData = async (path) => {
    try{
        const res = await axios.delete(baseURL + path)
        
        return res
    }
    catch(e) {
        alert(e.message, 'error')
    }
}





// export const getSymbols = async (path) => {
//     const symbols = JSON.parse(localStorage.getItem('symbols'))

//     if(symbols) {
//         return symbols
//     }

//     try {
//         const res = await axios.get(fixerURL + path, {
//             headers: {
//                 apikey: import.meta.env.VITE_API_KEY
//             }
//         })

//         if(res.status === 200 || res.status === 201) {
//             localStorage.setItem('symbols', JSON.stringify(res.data.symbols))
//             return res.data.symbols
//         }

//     } catch(e) {
//         alert(e.message, 'error')
//     }
// }