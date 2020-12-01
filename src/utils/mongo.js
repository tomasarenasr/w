
import axios from 'axios'
const DATABASE_PATH = 'https://librostec.herokuapp.com/'

class Mongo {

    getUser = async ({firebaseId}) => {
        const result = await axios.get(`${DATABASE_PATH}user`, {params: {
            firebaseId
        }})
        return result
    }

    insertUser = async ({firebaseId, name, email}) => {
        const result = await axios.post(DATABASE_PATH + "user/", null, {params: {
            firebaseId,
            name,
            email
        }})
        return result
    }

    getUserBooks = async ({firebaseId}) => {
        const result = await axios.get(`${DATABASE_PATH}userBooks`, {params: {firebaseId}})
        return result
    }

    addReadingNowBook = async ({bookId, firebaseId, currentPage, totalPages, dateStarted}) => {
        const result = await axios.post(`${DATABASE_PATH}readingNow/`, null, {params: {
            firebaseId,
            bookId, currentPage, totalPages, dateStarted
        }})

        return result
    }

    addPlanningToReadBook = async ({bookId, firebaseId}) => {
        const result = await axios.post(`${DATABASE_PATH}planningToRead/`, null, {params: {
            firebaseId,
            bookId
        }})

        return result
    }

    addBookRead = async({bookId, firebaseId, dateEnded}) => {
        const result = await axios.post(`${DATABASE_PATH}booksRead/`, null, {
            params: {
                bookId, 
                firebaseId, 
                dateEnded
            }}
        )
        console.log({result})
        return result;
    }

    updateBookCurrentPage = async ({bookId, firebaseId, currentPage}) => {
        const result = await axios.post(`${DATABASE_PATH}user/book/updateCurrentPage/`, null, {
            params: {
                bookId, 
                firebaseId, 
                currentPage
            }}
        )
        return result;
    }

    setPagesRead = async ({firebaseId,date,pages}) => {
        const result = await axios.post(`${DATABASE_PATH}user/stats/pagesRead/`, null, {
            params: {
                date, 
                firebaseId, 
                pages
            }}
        )
        return result;
    }

}

export default Mongo