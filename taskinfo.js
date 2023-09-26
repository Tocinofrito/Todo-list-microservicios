const express = require("express");
const fs = require("fs");
const app = express();

//Ruta de consulta de información del JSON
app.get("/taskinfo", function (req, res) {
    try {
        //Guardamos los datos del JSON en la variable
        const tasksData = JSON.parse(fs.readFileSync("tasks.json", "utf8"));

        //La mandamos como respuesta
        res.json({ tasks: tasksData });
    } catch (error) {
        //SI no existe, manda el error
        res.status(500).json({ error: "No se pudo leer el archivo JSON" });
    }
});

app.listen(3003, function () {
    console.log("Microservicio para mostrar tareas");
});

