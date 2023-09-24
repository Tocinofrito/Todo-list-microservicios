var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para eliminar una tarea
app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;

    // Leer las tareas actuales desde el archivo JSON
    var tasks = JSON.parse(fs.readFileSync("tasks.json"));

    // Verificar el "typeof" de la tarea completada, luego agregarla a las tareas completadas
    if (typeof completeTask === "string") {
        tasks.tasks.completed.push(completeTask);
        // Verificar si la tarea completada ya existe en las tareas cuando se marca, luego eliminarla
        tasks.tasks.todo.splice(tasks.tasks.todo.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            tasks.tasks.completed.push(completeTask[i]);
            tasks.tasks.todo.splice(tasks.tasks.todo.indexOf(completeTask[i]), 1);
        }
    }

    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

    res.json({ status: "Task removed successfully" });
});

// set app to listen on port 3002 para el microservicio de eliminar tarea
app.listen(3002, function () {
    console.log("Microservicio remover tarea");
});
