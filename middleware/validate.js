const express = require("express");

const validate = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next();
    }
    catch(error){
        if (error.name === 'ZodError'){
            const formatted = {};
            error.errors.forEach((e) => {
                const field = e.path[0];
                formatted[field] = e.message;
            });
            return res.status(400).json({errors: formatted});
        }
        return res.status(500).json({message: "Internal Server Error"});
    }
};

module.exports = validate;