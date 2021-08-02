//Exists to return the error messages which correspond to specific codes in using mongoose on MongoDB

const getErrorMessage =

    (err) => {
        let message = ''
        //'let' keyword allows you to create a variable which is restricted to the scope of a block statement
        //whereas 'var' makes a global variable
        //'const' also restricts variable scope and capabilities

        if (err.code) { //Errors which aren't because of a Mongoose valdiator violation have a numeric code
                        //sometimes these need to be handled differently 

            //If there is some numeric error code which is not null
            switch (err.code){
                case 11000:
                
                case 11001:
                    message = getUniqueErrorMessage(err) //Errors caused by violation of the 'unique' constraint return a different error object, 
                                        //so they need to get handled by a separate method
                    break

                default:
                    message = 'An oopsie has occured'
            }
        }
        else{ //Handles all errors thrown because of a Mongoose validator violation
            for (let errName in err.errors){ //errors is a public datastructure filled with all of the possible errors and their string description
                if (err.errors[errName].message){
                    message = err.errors[errName].message
                }
            }
        }
        return message
    }


    const getUniqueErrorMessage = (err) => { //No clue how this works
        let output
        try {
            let fieldname = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
            output = fieldName.chartAt(0).toUpperCase() + fieldName.slice(1) + ' already exists' 
        }
        catch (ex) {
                output = 'Unique field already exists'
        }
        return output
    }



export default {getErrorMessage} //when exporting a lambda function as default you need to put its name in brackets