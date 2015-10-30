# Passport Auth

## Overview
The purpose of this code is to provide a proof-of-concept for using [Passport](http://passportjs.org) as the authentication mechanism for an [Express](http://expressjs.com) backend.

## Step 1
The server will expose four endpoints, `/login`, `/login-with-facebook`, `/index` and `/api/user`. A request to the first will return an HTML document containing a login prompt with a button to "Login with Facebook". A click on this button will initiate the process to log into facebook and then grant the app permission to access facebook account information. If granted, the user will be redirected to `/index` (a protected resource) then returned authentication info and an HTML document where a script will make an XHR request to `/api/user`, which based on the authentication header, will return information about the associated user, which the script will then render. Any attempt to access `/api/user` or `/index`  without authentication will be prohibited.
