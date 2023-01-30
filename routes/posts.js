//import library
const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require("../config/database");

//variable
const _table = "posts"

/**
 * INDEX POSTS
 */
router.get("/", function(req, res){
    //query
    connection.query(`SELECT * FROM ${_table} ORDER BY id DESC`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
            })
        }else{
            return res.status(200).json({
                status: true, 
                message: "List Data Post", 
                data: rows
            })
        }
    })
})

/**
 * STORE POST
 */
router.post('/store', [
    body("title").notEmpty(),
    body("content").notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    //validasi inputan
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        title: req.body.title, 
        content: req.body.content
    }

    //insert query
    connection.query(`INSERT INTO ${_table} SET ?`, formData, function(err, rows){
        if(err){
            return res.status(500),json({
                status: false, 
                message: "Internal Server Error",
            })
        }else{
            return res.status(201).json({
                status: true, 
                message:  "Insert Data Succuessfully", 
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function(req, res){
    let id = req.params.id;

    connection.query(`SELECT * FROM ${_table} WHERE id = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status:false, 
                message: "Internal Server Error"
            })
        }

        //check available data
        if(rows.length <= 0){
            return res.status(404).json({
                status: true, 
                message: "Data Post not Found", 
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.patch('/update/:id', [
    body("title").notEmpty(),
    body("content").notEmpty()
], (req, res) => {

    //validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //get data
    let id = req.params.id;

    //data to update
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    //query update
    connection.query(`UPDATE ${_table} SET ? WHERE id = ${id}`, formData, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
            })
        }else{
            return res.status(200).json({
                status: true, 
                message: "Update Data Successfully"
            })
        }
    })
})

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;

    connection.query(`DELETE FROM ${_table} WHERE id = ${id}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        }else{
            return res.status(200).json({
                status: true, 
                message: "Delete Data Successfully"
            })
        }
    })
})


module.exports = router;