import mongoose from 'mongoose'

//Establishes how user data will be stored in the database

const u = { //Basically making a 2D list of fields
        name: {
            type: String,
            trim: true,
            required: 'Name is required'
            },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'], //not sure what the hell the sticks and plus signs do
            required: 'Email is required'
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date
        },
        hashed_password: { //The hash of the password is stored in the database
                            //The actual password is stored somewhere else more secure
            type: String,
            required: "Password is required"

        },
        salt: { //The random data which will help create a hash function for our password
            type:String
        }
        

        }

const userSchema = new mongoose.Schema(u); //Takes a schema definition object

//Establishing that the password shouldn't be stored directly in the database
//hence, making it a 'virtual' field
userSchema.virtual('password').set(function(password){
    this._password = password

    //Both stored in the database
    this.salt = this.makeSalt() //Generates a random unique salt value
    this.hashed_password = this.encryptPassword(password) //Since hash functions are one way, we just use a hash specialized for encryption
})

//Encryption logic and salt generation logic are defined in userSchema.methods
userSchema.methods =
    { authenticate: //Called to verify sign-in attempts by looking at user data
        function(plainText) { //Just returns true or false if the plainText received from the form matches the hashed password
            return this.encryptPassword(plainText) === this.hashed_password
        }
    }, //
    { encryptPassword: //Generates an encrypted hash for the user from plain-text password and salt
        function(password){ //Takes some password string
            if (!password){ //Just exception handling I guess???
                return ''
            }

            try{
                    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
            }
            catch (err) {
                return ''
            }
        }

    },
    { makeSalt: //Generates a unique and random salt value for the user
        function(){
            return Math.round((new Date().valueOf() * Math.random())) + '' //Our arbitrary salt formula
        }
    }

    //Password field validation

    //Adding a validation function to the hashed_password field in our schema
    //Each time mongoose tries to store the hashed_password (use the path to the variable)
    //this function will get run as a validation.
    //Think of .validate as a listener which gets set up on the path to hashed_password

    //What does this. refer to in this context??? The userSchema?

    userSchema.path('hashed_password').validate( 
        function (/*why does it put v here?*/) {
                if (this._password /*not sure what this first part is for*/ && this._password.length < 6){
                    this.invalidate('password', 'Password must be at least 6 characters long!') //I guess this invalidates the attempt to make a user???
                }

                if (this.isNew && !this._password) { //this.isNew is a property of the mongoose document
                        //!this_password is basically the same thing as if this._password == null
                        this.invalidate('password', 'Password is required')
                }

        }
    , null)
    


//Now that we have a complete User model in place, and set up in mongoose, we can start working on CRUD operations for Users with API endpoints
export default Mongoose.model('User', userSchema)

/*
With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.

const kittySchema = new mongoose.Schema({
  name: String
});
So far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.

const Kitten = mongoose.model('Kitten', kittySchema);
A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema.

Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:


const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
*/