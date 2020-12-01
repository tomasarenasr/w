import React, {useEffect, useState } from 'react'
import logo from '../pages/assets/logo_web.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import app from "../base.js"
import ManageUser from '../utils/manageUser'
import Button from 'react-bootstrap/Button'
import '../pages/assets/styleTable.css'
import '../pages/assets/home.css'
import {
  DataSearch,
  SingleRange,
  ReactiveList,
  ResultList
} from '@appbaseio/reactivesearch';


const HomePage = ({ history }) => {
  const [userOnline, setUserOnline] = useState([])

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUserOnline(user)
    })
  })

  const manage = new ManageUser()
  const LogOut = (() => {
    manage.logOutUser({ history })
  });

  const NavBarStatus = () => {
    if (userOnline) {
      return [<Nav.Link href="/profile" key={3}> Profile </Nav.Link>,
      <Button variant="light" key={4} onClick={LogOut}>Log Out</Button>]
    }
    else {
      return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
      <Nav.Link href="/signup" key={2}> Sign Up </Nav.Link>]
    }
  }

  return (

    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/home">
          {/* 71 y 100 */}
          <img src={logo} alt="Logo" height="60px" width="90" />

        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/books" class="loggedIN" >Libros</Nav.Link>

        </Nav>
        <NavBarStatus />
        <DataSearch
          componentId="mainSearch"
          dataField={["original_title", "original_title.search", "authors", "authors.search"]}
          queryFormat="and"
          placeholder="Search for a book title or an author"
          autosuggest={false}
          className="datasearch"
          innerClass={{
            "input": "searchbox",
            "list": "suggestionlist"
          }}
        />

      </Navbar>

      <div className={"display"}>
        <div className={"leftSidebar"}>
          <SingleRange
            componentId="ratingsFilter"
            dataField="average_rating"
            title="Book Ratings"
            data={[
              { start: 4, end: 5, label: "★★★★ & up" },
              { start: 3, end: 5, label: "★★★ & up" },
              { start: 2, end: 5, label: "★★ & up" },
              { start: 1, end: 5, label: "★ & up" },
            ]}
          />
        </div>
        <div className={"mainBar"}>
          <ReactiveList
            componentId="SearchResult"
            dataField="original_title"
            size={3}
            className="result-list-container"
            pagination
            URLParams
            react={{
              and: ['ratingsFilter', 'mainSearch'],
            }}
            render={({ data }) => (
              <ReactiveList.ResultListWrapper>
                {data.map(item => (
                  <div onClick={() => console.log({ item })}>
                    <ResultList key={item._id}>
                      <ResultList.Image src={item.image} />
                      <ResultList.Content>
                        <ResultList.Title>
                          <div
                            className="book-title"
                            dangerouslySetInnerHTML={{
                              __html: item.original_title,
                            }}
                          />
                        </ResultList.Title>
                      </ResultList.Content>
                    </ResultList>
                  </div>


                ))
                }

              </ReactiveList.ResultListWrapper>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
