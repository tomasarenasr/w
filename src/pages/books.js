import React, {
  useState
} from 'react'
import Mongo from '../utils/mongo'
import Library from '../utils/library'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/assets/logo_web.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import firebase from "../base.js"

const BooksPage = ({history}) => {

  let [textQuery, setTextQuery] = useState("")
  let [books, setBooks] = useState([])

  var user = firebase.auth().currentUser;
  if (user) {
    console.log("HI")
    const Navbar1 = () => (
      <Nav.Link href = "/profile" key = {3}> Profile </Nav.Link>
    )
    const NavBar2 = () => (
      <Button variant="light" key = {4}>Log Out</Button>
    )
  } else {
    console.log("IH")
    const Navbar1 = () => (
      <Nav.Link href = "/login" key = {0}> Log In </Nav.Link> 
    )
    const NavBar2 = () => (
      <Nav.Link href = "/signup" key = {2}> Sign Up </Nav.Link> 
    )
  }

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`)
  }


  const onInsertUser = () => {
    const mongo = new Mongo()
    mongo.insertUser({
      firebaseId: "testId",
      name: "testName",
      email: "testEmail"
    }).then(result => {
      console.log({
        result
      })
    })
  }

  const searchBooks = () => {
    const library = new Library()
    library.searchBooks({
      textQuery
    }).then(result => {
      console.log({
        result
      })
      const {
        books
      } = result.data
      setBooks(books)
    })
  }

  var user = firebase.auth().currentUser;
  if (user) {
    console.log("Existe un usuario")
  }

  return (

    <div>
      <Navbar bg="light"
        variant="light" >
        <Navbar.Brand href="/home" >

          <img src={
            logo
          }
            alt="Logo"
            height="60px"
            width="90" />
        </Navbar.Brand>

        <Nav className="mr-auto" >
          <Nav.Link href="/books" > Mis libros </Nav.Link>
        </Nav >


        <Form inline >

          <Form.Control type="text"
            placeholder="Busca un libro"
            className="mr-sm-2"
            onChange={
              (e) => setTextQuery(e.target.value)
            } />

          <Button id="buscarLibro" variant="outline-primary" onClick={
            searchBooks
          } > Search </Button>


        </Form >



      </Navbar>

      {/*  
    <div>

    <button onClick = {
      onInsertUser
    } > Insert User </button> 
    </div>
*/}
      <div>


        <div style={
          {
            display: "flex",
            flexWrap: "wrap"
          }
        } > {
            books.map((book, index) => {
              return (

                <div style={
                  {
                    margin: 40,
                    width: 200
                  }
                } 
                onClick={() => onBookSelected(book.id)}
                >
                  <img style={
                    {
                      width: 100,
                      height: 200
                    }
                  }
                    src={
                      book.imageLinks ? book.imageLinks.smallThumbnail : ""
                    } /> <p key={
                      index
                    } > < b > {
                      book.title
                    } </b></p >
                  <p> {
                    book.subtitle
                  } </p> </div >



              )

            })
          } </div> </div>

    </div>
  )
}

export default BooksPage