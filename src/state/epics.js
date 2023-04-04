import { switchMap, catchError, tap } from "rxjs/operators";
import { of, from } from "rxjs";
import { map } from "rxjs/operators";
import { ofType } from "redux-observable";
import axios from "axios";

export const fetchDataEpic = (action$) =>
  action$.pipe(
    ofType("GET_USERS_REQ"),
    switchMap(() =>
      from(
        axios.get(`http://localhost:5000/users`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).pipe(
        tap(() => console.log("Sending API request...")),
        map((response) => ({
          type: "GET_USERS_SUCCESS",
          payload: response.data,
        })),
        tap((response) => console.log(response)),
        catchError((error) =>
          of({
            type: "REQ_FAILURE",
            payload: error.response,
          })
        )
      )
    )
  );

export const postEpic = (action$) =>
  action$.pipe(
    ofType("POST_REQ"),
    switchMap((action) => {
      const user = action.payload;
      const url = "http://localhost:5000/users/";
      const method = "POST";
      const body = JSON.stringify(user);
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      return from(
        axios({
          url,
          method,
          headers,
          data: body,
        })
      ).pipe(
        tap(() => console.log(`Sending ${method} request to ${url}`)),
        map((response) => ({
          type: "POST_USER_SUCCESS",
          payload: response.data,
        })),
        catchError((e) =>
          of({
            type: "REQ_FAILURE",
            payload: e.response,
          })
        )
      );
    })
  );
///
export const putEpic = (action$) =>
  action$.pipe(
    ofType("PUT_REQ"),
    switchMap((action) => {
      const user = action.payload;
      const UID = user.id;

      const url = `http://localhost:5000/users/${UID}`;

      const method = "PUT";
      const body = JSON.stringify(user);
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      return from(
        axios({
          url,
          method,
          headers,
          data: body,
        })
      ).pipe(
        tap(() => console.log(`Sending ${method} request to ${url}`)),
        map((response) => ({
          type: "PUT_USER_SUCCESS",
          payload: response.data,
        })),
        tap((response) => response.data),

        catchError((error) =>
          of({
            type: "REQ_FAILURE",
            payload: error.response,
          })
        )
      );
    })
  );
///

export const delEpic = (action$) =>
  action$.pipe(
    ofType("DEL_USER_REQ"),
    switchMap((action) =>
      from(
        axios.delete(`http://localhost:5000/users/${action.payload}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).pipe(
        map((response) => ({
          type: "DEL_USER_REQ_SUCCESS",
          payload: response.data,
        })),
        tap((response) => console.log(response)),
        catchError((error) =>
          of({
            type: "REQ_FAILURE",
            payload: error.response,
          })
        )
      )
    )
  );
