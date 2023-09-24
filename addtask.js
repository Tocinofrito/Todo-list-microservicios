var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para agregar una nueva tarea
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;

    // Leer las tareas actuales desde el archivo JSON
    var tasks = JSON.parse(fs.readFileSync("tasks.json"));

    // Agregar la nueva tarea
    tasks.tasks.todo.push(newTask);

    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

    res.json({ status: "Tarea añadida" });
});

// set app to listen on port 3001 para el microservicio de agregar tarea
app.listen(3001, function () {
    console.log("Microservicio añadir tarea");
});
