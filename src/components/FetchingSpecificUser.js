import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchingSpecificUser() {
  const [IsLoading, setIsLoading] = useState(null);
  const [InitialUsers, setInitialUsers] = useState([]);
  const [Renderinitialusers, setRenderinitialusers] = useState(true);
  const [searchedUser, setSearchedUser] = useState("");
  const [ResponseUser, setResponseUser] = useState([]);
  const [Renderresponseusers, setRenderresponseusers] = useState(false);
  const [CancelButton, setCancelButton] = useState(false);
  const [RenderResponseError, setRenderResponseError] = useState(false);
  const DisplayClear = searchedUser.length > 0;

  function InputChangeHandeler(event) {
    setSearchedUser(event.target.value);
    if (searchedUser.length > 0) {
      setRenderinitialusers(false);
      setCancelButton(true);
      setRenderresponseusers(false);
      setRenderResponseError(false);
    } else {
      setRenderinitialusers(true);
    }
  }
  function ClearHandeler() {
    setSearchedUser("");
    setRenderinitialusers(true);
    setCancelButton(false);
  }

  function FindHandeler(event) {
    setSearchedUser(event.target.value);
    setIsLoading(true);
    const Searchedperson = `https://api.github.com/users/${searchedUser}`;
    axios
      .get(Searchedperson)
      .then((Response) => {
        setResponseUser(Response.data);
        setSearchedUser("");
        setRenderinitialusers(false);
        setRenderresponseusers(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setRenderResponseError(true);
        setIsLoading(false);
      });
  }
  function CancelHandeler() {
    setRenderinitialusers(true);
    setSearchedUser("");
    setCancelButton(!CancelButton);
    setRenderresponseusers(false);
    setRenderResponseError(false);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api.github.com/users")
      .then((response) => setInitialUsers(response.data));
    setIsLoading(false);
  }, []);
  return (
    <>
      <input
        type="text"
        placeholder="Search Someone You Know !!!"
        className="input"
        value={searchedUser}
        onChange={InputChangeHandeler}
      />
      {DisplayClear && (
        <button className="buttons" onClick={FindHandeler}>
          Find
        </button>
      )}
      {DisplayClear && (
        <button className="buttons" onClick={ClearHandeler}>
          Clear
        </button>
      )}
      {CancelButton && (
        <button className="buttons" onClick={CancelHandeler}>
          Cancel
        </button>
      )}
      {IsLoading && <h1 className="loading">Running around to find data</h1>}
      {Renderinitialusers &&
        InitialUsers.map(({ login, id, avatar_url }) => {
          const CustomLink = `https://github.com/${login}`;
          return (
            <div className="initialdata" key={id}>
              <div>
                <img className="userimage" src={avatar_url} alt={login} />
                <p className="name">
                  <b>{login}</b>
                </p>
                <p className="url">
                  {login} Profile URL is :{" "}
                  <a href={CustomLink} target="_blank" rel="noreferrer">
                    https://github.com/{login}
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      {Renderresponseusers && (
        <div key={ResponseUser.id} className="resultuser">
          <img
            className="userimage"
            src={ResponseUser.avatar_url}
            alt={ResponseUser.login}
          />
          <p className="name">
            <b>{ResponseUser.login}</b>
          </p>
          <p className="url">
            {ResponseUser.login} Profile URL is :{" "}
            <a
              href={`https://github.com/${ResponseUser.login}`}
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/{ResponseUser.login}
            </a>
          </p>
        </div>
      )}
      {RenderResponseError && (
        <div className="errorone">
          <h1 className="">OH NO!!!</h1>
          <p className="">
            This Special One Doesn't Exist In GitHub DataBase Go Create One now
            at{" "}
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default FetchingSpecificUser;
