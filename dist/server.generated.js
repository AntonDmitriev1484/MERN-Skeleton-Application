/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//const is a data type in javascript which specifies read only access, its like final in Java\n//This const is an ?object? containing variables env, port, jswtSecret, mongoUri, which sets up a default configuration\n//for communication with our database.\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  jwtSecret: process.env.JWT_SECRET || \"YOUR_secret_key\",\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'\n};\nconst _default = config;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(config, \"config\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\config\\\\config.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\config\\\\config.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n //Since we're now working with authentication and authorization\n\n\n\n\nconst signin = async (req, res) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findOne({\n      \"email\": req.body.email\n    }); //Searches for a user with a matching email 'findOne({attribute: value})\n\n    if (!user) {\n      return res.status('401').json({\n        error: \"A user with this email could not be found.\"\n      });\n    }\n\n    if (!user.authenticate(req.body.password)) {\n      //Remember the method we defined as part of our user model\n      return res.status('401').json({\n        error: \"Email does not match with password.\"\n      });\n    } //If we make it through both of these if statements then that means the user's credentials are correct\n\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__.default.jwtSecret); //Each user has an _id value and this is used to create our jwt token\n\n    res.cookie('t', token, {\n      expire: new Date() + 9999\n    }); //Attaching this token as a cookie to the res JSON, setting an expiration date and naming it\n\n    return res.json({\n      token,\n      //The json we send back contains our token as well as the user object which was just signed in\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      }\n    }); //Could also add the token into the header of the json file under Authorization label\n  } catch (err) {\n    return res.status('401').json({\n      error: \"Could not sign in\"\n    });\n  }\n};\n\nconst signout = async (req, res) => {\n  res.clearCookie(\"t\"); //clear the same cookie we gave earlier during the signin request\n  //Does it matter if status is surrounded by single quotes???\n\n  return res.status(200).json({\n    message: \"Successfully signed out\"\n  });\n}; //To protect our read, update, and delete account routes, the server will have to run a controller which checks if the client\n//making the request is actually authorized\n\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  //Checks if the incoming request has a valid JWT in its Authorization header. Otherwise throws an authentication error\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__.default.jwtSecret,\n  userProperty: 'auth',\n  algorithms: ['HS256'] //Need to include this when instantiating an expressJwt\n\n});\n\nconst hasAuthorization = async (req, res, next) => {\n  const authorized = req.profile && req.auth && req.profile._id == req.auth._id; //For a client to be authorized, the request most have a profile (from the loader getById), an authorization header (from requireSignin), and these two must have the _id.\n\n  if (!authorized) {\n    return res.status('403').json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n};\n\nconst _default = {\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(signin, \"signin\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(signout, \"signout\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(requireSignin, \"requireSignin\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(hasAuthorization, \"hasAuthorization\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\auth.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../helpers/dbErrorHandler.js */ \"./server/helpers/dbErrorHandler.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//Contains definitions of all controller methods.\n\n\n // server\\helpers\\dbErrorHandler.js\n//Where do these (req, res) parameters get filled in from???\n\nconst create = async (req, res) => {\n  //create is a lambda function\n  //async, we need to specify that this function is asynchronous, so that we can use the 'await' keyword\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default(req.body); //Creates a new user using the body of the JSON object received in the http POST request from our front end\n\n  try {\n    await user.save(); //Saving this model object to our database\n    //We use 'await' because we can only save once mongoose has finished validating everything\n    //See pg. 77 for more detail\n\n    return res.status(200).json({\n      message: \"Successfully signed up!\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n}; //THIS CODE ISN'T THE PROBLEM\n\n\nconst list = async (req, res) => {\n  try {\n    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.find().select('name email updated created'); //User.find() parentheses are left empty because this will cause mongoose to bring up a list of all users\n    //await because again, we need to let mongoose do validation\n    //.select('name email updated created'), so mongoose will only return the name, email, updated, created fields of each user document stored\n\n    res.json(users); //The response is this list of user information stored as a json\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n}; //Read, Update, and Delete operations require mongoose to query a specific user. These functions are Loading functions\n//Loading function, responds automatically to the :userId parameter\n//adds additional information into the json file before sending it along to other controller methods\n\n\nconst userById = async (req, res, next, id) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findById(id); //this 'id' variable comes from whatever string is at :userId\n\n    if (!user) {\n      return res.status(400).json()({\n        error: \"User not found\"\n      });\n    }\n\n    req.profile = user; //The user information gets loaded into the req JSON object's profile (not body)\n\n    next(); //Moves onto the next function at this api endpoint, passing along the req JSON object\n  } catch (err) {\n    return res.status(400).json({\n      error: \"Couldn't retreive user\"\n    });\n  }\n};\n\nconst read = async (req, res) => {\n  //The req object here will come from userById\n  //Also since we've already loaded the user, no exceptions need to be handled\n  let user = req.profile;\n  user.hashed_password = undefined; //Setting these two fields as undefined for security\n\n  user.salt = undefined;\n  return res.json(user);\n};\n\nconst update = async (req, res) => {\n  try {\n    let user = req.profile;\n    user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, req.body); //From lodash\n    //This merges our loaded user object (stored in the req JSON's profile), with the changes requested in the req JSON's body of the http request\n\n    user.updated = Date.now(); //update the access field\n\n    await user.save(); //Let mongoose validate and save the user object once more\n\n    user.hashed_password = undefined; //Clean the user object of sensitive data\n\n    user.salt = undefined;\n    return res.json(user); //Return it to the user as a response json\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let user = req.profile;\n    user = await user.remove(); //Here we let mongoose validate, and then remove() the user object from the database\n\n    user.hashed_password = undefined;\n    user.salt = underfined;\n    return res.json(user);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n};\n\nconst _default = {\n  create,\n  userById,\n  read,\n  list,\n  remove,\n  update\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); //Have to export all of the lambda functions under default\n// import User from '../models/user.model'\n// import extend from 'lodash/extend'\n// import errorHandler from './../helpers/dbErrorHandler'\n// const create = async (req, res) => {\n//   const user = new User(req.body)\n//   try {\n//     await user.save()\n//     return res.status(200).json({\n//       message: \"Successfully signed up!\"\n//     })\n//   } catch (err) {\n//     return res.status(400).json({\n//       error: errorHandler.getErrorMessage(err)\n//     })\n//   }\n// }\n// /**\n//  * Load user and append to req.\n//  */\n// const userByID = async (req, res, next, id) => {\n//   try {\n//     let user = await User.findById(id)\n//     if (!user)\n//       return res.status('400').json({\n//         error: \"User not found\"\n//       })\n//     req.profile = user\n//     next()\n//   } catch (err) {\n//     return res.status('400').json({\n//       error: \"Could not retrieve user\"\n//     })\n//   }\n// }\n// const read = (req, res) => {\n//   req.profile.hashed_password = undefined\n//   req.profile.salt = undefined\n//   return res.json(req.profile)\n// }\n// const list = async (req, res) => {\n//   try {\n//     let users = await User.find().select('name email updated created')\n//     res.json(users)\n//   } catch (err) {\n//     return res.status(400).json({\n//       error: errorHandler.getErrorMessage(err)\n//     })\n//   }\n// }\n// const update = async (req, res) => {\n//   try {\n//     let user = req.profile\n//     user = extend(user, req.body)\n//     user.updated = Date.now()\n//     await user.save()\n//     user.hashed_password = undefined\n//     user.salt = undefined\n//     res.json(user)\n//   } catch (err) {\n//     return res.status(400).json({\n//       error: errorHandler.getErrorMessage(err)\n//     })\n//   }\n// }\n// const remove = async (req, res) => {\n//   try {\n//     let user = req.profile\n//     let deletedUser = await user.remove()\n//     deletedUser.hashed_password = undefined\n//     deletedUser.salt = undefined\n//     res.json(deletedUser)\n//   } catch (err) {\n//     return res.status(400).json({\n//       error: errorHandler.getErrorMessage(err)\n//     })\n//   }\n// }\n// export default {\n//   create,\n//   userByID,\n//   read,\n//   list,\n//   remove,\n//   update\n// }\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(create, \"create\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(list, \"list\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(userById, \"userById\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(read, \"read\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(update, \"update\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(remove, \"remove\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\controllers\\\\user.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../template */ \"./template.js\");\n/* harmony import */ var _routes_user_routes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/user.routes.js */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/auth.routes.js */ \"./server/routes/auth.routes.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n //HOW JS imports work\n// Template now refers to the default export from our template js file\n// ./template means look for template in 'server'\n// ./../template means look for template one layer higher, in the project file\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()(); //instantiates an express app\n//Configuring this express instance to use some of the dependencies we've added in with yarn\n//Since express is middleware framework\n//the dependencies that we're adding help abstract the requests going back and forth between front and back end\n//this makes our front-back end communication as simple as just \n//looking at the body of exchanged JSON or http comms\n\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()()); //Now we've configured our middleware to easily accept http requests\n// app.get('/', Template) Almost correct\n// '/' is the string which represents the root, any request with / means root, -> serve the template.js\n\napp.get('/', (req, res) => {\n  res.status(200).send((0,_template__WEBPACK_IMPORTED_MODULE_6__.default)());\n}); //A lambda function, automatically sends the Template.js html \n//as a JSON response when localhost:3000 is reached\n\napp.use('/', _routes_user_routes_js__WEBPACK_IMPORTED_MODULE_7__.default); //Configures our express app to use the routes we defined with Express router, going from localhost:3000\n\napp.use('/', _routes_auth_routes_js__WEBPACK_IMPORTED_MODULE_8__.default); //Auth error handling for express JWT\n\napp.use((err, req, res, next) => {\n  if (err.name === 'UnauthorizedError') {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  } else if (err) {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n    console.log(err);\n  }\n});\nconst _default = app;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(app, \"app\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\express.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\express.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n// //Exists to return the error messages which correspond to specific codes in using mongoose on MongoDB\n// const getErrorMessage =\n//     (err) => {\n//         let message = ''\n//         //'let' keyword allows you to create a variable which is restricted to the scope of a block statement\n//         //whereas 'var' makes a global variable\n//         //'const' also restricts variable scope and capabilities\n//         if (err.code) { //Errors which aren't because of a Mongoose valdiator violation have a numeric code\n//                         //sometimes these need to be handled differently \n//             //If there is some numeric error code which is not null\n//             switch (err.code){\n//                 case 11000:\n//                 case 11001:\n//                     message = getUniqueErrorMessage(err) //Errors caused by violation of the 'unique' constraint return a different error object, \n//                                         //so they need to get handled by a separate method\n//                     break\n//                 default:\n//                     message = 'An oopsie has occured'\n//             }\n//         }\n//         else{ //Handles all errors thrown because of a Mongoose validator violation\n//             for (let errName in err.errors){ //errors is a public datastructure filled with all of the possible errors and their string description\n//                 if (err.errors[errName].message){\n//                     message = err.errors[errName].message\n//                 }\n//             }\n//         }\n//         return message\n//     }\n//     const getUniqueErrorMessage = (err) => { //No clue how this works\n//         let output\n//         try {\n//             let fieldname = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))\n//             output = fieldName.chartAt(0).toUpperCase() + fieldName.slice(1) + ' already exists' \n//         }\n//         catch (ex) {\n//                 output = 'Unique field already exists'\n//         }\n//         return output\n//     }\n// export default {getErrorMessage} //when exporting a lambda function as default you need to put its name in brackets\n\n/**\r\n * Get unique error field name\r\n */\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';\n  } catch (ex) {\n    output = 'Unique field already exists';\n  }\n\n  return output;\n};\n/**\r\n * Get the error message from error object\r\n */\n\n\nconst getErrorMessage = err => {\n  let message = '';\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = 'Something went wrong';\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) message = err.errors[errName].message;\n    }\n  }\n\n  return message;\n};\n\nconst _default = {\n  getErrorMessage\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getUniqueErrorMessage, \"getUniqueErrorMessage\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n  reactHotLoader.register(getErrorMessage, \"getErrorMessage\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n //Establishes how user data will be stored in the database\n\nconst u = {\n  //Basically making a 2D list of fields\n  name: {\n    type: String,\n    trim: true,\n    required: 'Name is required'\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: 'Email already exists',\n    match: [/.+\\@.+\\..+/, 'Please fill a valid email address'],\n    //not sure what the hell the sticks and plus signs do\n    required: 'Email is required'\n  },\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: {\n    type: Date\n  },\n  hashed_password: {\n    //The hash of the password is stored in the database\n    //The actual password is stored somewhere else more secure\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String\n};\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)(u); //Takes a schema definition object\n//Establishing that the password shouldn't be stored directly in the database\n//hence, making it a 'virtual' field\n\nuserSchema.virtual('password').set(function (password) {\n  this._password = password; //Both stored in the database\n\n  this.salt = this.makeSalt(); //Generates a random unique salt value\n\n  this.hashed_password = this.encryptPassword(password); //Since hash functions are one way, we just use a hash specialized for encryption\n}); //Encryption logic and salt generation logic are defined in userSchema.methods\n\nuserSchema.methods = {\n  authenticate: //Called to verify sign-in attempts by looking at user data\n  function (plainText) {\n    //Just returns true or false if the plainText received from the form matches the hashed password\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  encryptPassword: //Generates an encrypted hash for the user from plain-text password and salt\n  function (password) {\n    //Takes some password string\n    if (!password) {\n      //Just exception handling I guess???\n      return '';\n    }\n\n    try {\n      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');\n    } catch (err) {\n      return '';\n    }\n  },\n  makeSalt: //Generates a unique and random salt value for the user\n  function () {\n    return Math.round(new Date().valueOf() * Math.random()) + ''; //Our arbitrary salt formula\n  }\n}; //Literally just spent an hour debugging this because I added an extra set of brackets\n//this made makeSalt() not work as a function and caused a promise rejection\n//Password field validation\n//Adding a validation function to the hashed_password field in our schema\n//Each time mongoose tries to store the hashed_password (use the path to the variable)\n//this function will get run as a validation.\n//Think of .validate as a listener which gets set up on the path to hashed_password\n//What does this. refer to in this context??? The userSchema?\n\nuserSchema.path('hashed_password').validate(function () {\n  if (this._password\n  /*not sure what this first part is for*/\n  && this._password.length < 6) {\n    this.invalidate('password', 'Password must be at least 6 characters long!'); //I guess this invalidates the attempt to make a user???\n  }\n\n  if (this.isNew && !this._password) {\n    //this.isNew is a property of the mongoose document\n    //!this_password is basically the same thing as if this._password == null\n    this.invalidate('password', 'Password is required');\n  }\n}, null); //Now that we have a complete User model in place, and set up in mongoose, we can start working on CRUD operations for Users with API endpoints\n\nconst _default = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n/*\r\nWith Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.\r\n\r\nconst kittySchema = new mongoose.Schema({\r\n  name: String\r\n});\r\nSo far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.\r\n\r\nconst Kitten = mongoose.model('Kitten', kittySchema);\r\nA model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema.\r\n\r\nFunctions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:\r\n\r\n\r\nconst fluffy = new Kitten({ name: 'fluffy' });\r\nfluffy.speak(); // \"Meow name is fluffy\"\r\nWe have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.\r\n\r\n  fluffy.save(function (err, fluffy) {\r\n    if (err) return console.error(err);\r\n    fluffy.speak();\r\n  });\r\n*/\n// import mongoose from 'mongoose'\n// import crypto from 'crypto'\n// const UserSchema = new mongoose.Schema({\n//   name: {\n//     type: String,\n//     trim: true,\n//     required: 'Name is required'\n//   },\n//   email: {\n//     type: String,\n//     trim: true,\n//     unique: 'Email already exists',\n//     match: [/.+\\@.+\\..+/, 'Please fill a valid email address'],\n//     required: 'Email is required'\n//   },\n//   hashed_password: {\n//     type: String,\n//     required: \"Password is required\"\n//   },\n//   salt: String,\n//   updated: Date,\n//   created: {\n//     type: Date,\n//     default: Date.now\n//   }\n// })\n// UserSchema\n//   .virtual('password')\n//   .set(function(password) {\n//     this._password = password\n//     this.salt = this.makeSalt()\n//     this.hashed_password = this.encryptPassword(password)\n//   })\n//   .get(function() {\n//     return this._password\n//   })\n// UserSchema.path('hashed_password').validate(function(v) {\n//   if (this._password && this._password.length < 6) {\n//     this.invalidate('password', 'Password must be at least 6 characters.')\n//   }\n//   if (this.isNew && !this._password) {\n//     this.invalidate('password', 'Password is required')\n//   }\n// }, null)\n// UserSchema.methods = {\n//   authenticate: function(plainText) {\n//     return this.encryptPassword(plainText) === this.hashed_password\n//   },\n//   encryptPassword: function(password) {\n//     if (!password) return ''\n//     try {\n//       return crypto\n//         .createHmac('sha1', this.salt)\n//         .update(password)\n//         .digest('hex')\n//     } catch (err) {\n//       return ''\n//     }\n//   },\n//   makeSalt: function() {\n//     return Math.round((new Date().valueOf() * Math.random())) + ''\n//   }\n// }\n// export default mongoose.model('User', UserSchema)\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(u, \"u\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\models\\\\user.model.js\");\n  reactHotLoader.register(userSchema, \"userSchema\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\models\\\\user.model.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\models\\\\user.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller.js */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//Configures an express router for API endpoints which require authorization\n\n\n/*\r\n    /auth/signin\r\n    Controller function:\r\n        POST request to authenticate user information\r\n\r\n    /auth/signout\r\n    Controller function:\r\n        GET request to clear the cookie containing the JWT given upon signin.\r\n\r\n*/\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/auth/signin').post(_controllers_auth_controller_js__WEBPACK_IMPORTED_MODULE_1__.default.signin);\nrouter.route('/auth/signout').get(_controllers_auth_controller_js__WEBPACK_IMPORTED_MODULE_1__.default.signout);\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); //Note: Most of your bugs are literally just typos, pay attention\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\routes\\\\auth.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\routes\\\\auth.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//The routes file contains access to all API endpoints\n//These routes are configured using the Express router\n//Then they are added into our Express instance in express.js\n\n/*\r\n    /api/users\r\n    Controller function:\r\n        list users with GET http\r\n        create new user with POST http\r\n    \r\n    /api/users/:userId\r\n    Controller funciton:\r\n        Fetch a user with GET\r\n        Updating a user with PUT\r\n        Deleting a user with DELETE\r\n\r\n*/\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/users').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.create);\nrouter.route('/api/users/:userId') //We add in authCtrl controllers here, because we want to block off access to these API endpoints unless the client is authorized\n.get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.remove);\nrouter.param('userId', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.userById); //Whenever there is a request which has the :userId parameter in it, \n//the app will execute the userById function, which fetches the user data, and loads it\n//into a Express request object. Before sending it to the next controller function.\n\n/* So for example:\r\nIf I send a get request from /api/users/:userId\r\n\r\nfirst userById will get called, and load the user model into a JSON req object\r\n\r\nthen this same JSON req object will get passed into the lambda function associated with .get(), userCtrl.read\r\n*/\n\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); //Associates our user controller with each specific http request\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\routes\\\\user.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\server\\\\routes\\\\user.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//Implements the server\n //We need 'const' from here\n\n //We need our express instance 'app' from here\n\n\n_express__WEBPACK_IMPORTED_MODULE_1__.default.listen(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.port, err => {\n  //Sets express to listen on config.port, if an error occurs and the site can't start, it'll log this error\n  if (err) {\n    console.log(err);\n  }\n\n  console.info('Server start on port %s', _config_config__WEBPACK_IMPORTED_MODULE_0__.default.port); //We set up config.port to be 3000\n}); //Configuring mongoose so that it uses 'native ES6 promises'\n\n(mongoose__WEBPACK_IMPORTED_MODULE_2___default().Promise) = global.Promise; //no idea what this does\n\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.mongoUri, {\n  useNewUrlParser: true,\n  useCreateIndex: true,\n  useUnifiedTopology: true\n}); //Sets up the mognoose connection\n\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.on('error', () => {\n  throw new Error('unable to connect to mongoDB: ${mongoUri}');\n}); //Runs this function upon an 'error'\n\n//# sourceURL=webpack://package/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst _default = () => {\n  //It wanted backticks\n  return `<!doctype html>\n      <html lang=\"en\">\n        <head>\n          <meta charset=\"utf-8\">\n          <title>MERN Skeleton</title>\n        </head>\n        <body>\n          <div id=\"root\">Hello world</div>\n        </body>\n      </html>`;\n};\n\n//In js you can export functions and variables to use in other files.\n//Here we're setting up a default html document as a string to build our other code off of.\n//This html will be served at the root url, it will be automatically requested upon reaching localhost:3000\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); //Once you write this, you have to feed it to the express instance\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\soula\\\\Desktop\\\\Coding\\\\MERNing\\\\MERN-Skeleton-Application\\\\template.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://package/./template.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*\
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/extend");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;