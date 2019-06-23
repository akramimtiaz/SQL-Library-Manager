const determineValidationError = (err) => {
    const valErr = err.errors
    if(valErr.length === 2){

    	err.title = valErr[0].message
    	err.author = valErr[1].message

    } else if (valErr.length === 1){

    	if(valErr[0].path === 'title'){
    		err.title = valErr[0].message
    	}else if(valErr[0].path === 'author'){
    		err.author = valErr[0].message
    	}
    }

    return err
}

module.exports = determineValidationError