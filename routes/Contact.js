//contact routes create read update delete:-
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");



//create Functionality
//http://localhost:5000/api/contact
router.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save()
            .then((savedContact) => {
                console.log(savedContact);
                res.status(201).json({ msg: "contact sucessfully saved" })

            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ msg: "unable to create new contact" })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to save new contact" })
    }
});
//read  all Functionality
//http://localhost:5000/api/contact
router.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find(); // Use await to wait for the promise to resolve
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to get contacts" });
    }
});

//Read from id Functionality
//http://localhost:5000/api/contact/657d4d4e63dce9a02ca7fe65
router.get('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        Contact.findById(id)
            .then((contact) => {
                console.log(contact);
                res.status(200).json({ contact: contact })

            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ msg: "unable to get the contact" })
            })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to get the contact" });
    }
})

//update
//http://localhost:5000/api/contact/657d4d4e63dce9a02ca7fe65
router.put('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;
        await Contact.findOneAndUpdate({ _id: id }, updatedContact, { new: true })
            .then((updatedContact) => {
                console.log(updatedContact);
                res.status(200).json({ msg: "contact  sucessfully updated", contact: updatedContact })

            })
            .catch((error) => {
                console.log(error);
                res.status.json(500).json({ msg: "unable to update the contact" })
            })
    }
    catch (error) {
        console.log(error);
        res.status.json({ msg: "unable to update the contact" })

    }
});

//delete
//http://localhost:5000/api/contact/657fe91d8ab5281e0817f957
router.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.findByIdAndDelete(id)
            .then((deletedContact) => {
                console.log(deletedContact);
                res.status(200).json({ msg: "contact sucessfully deleted", contact: deletedContact })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ msg: "unable to delete the contact" })
            })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to delete the contact" })
    }
});




module.exports = router;