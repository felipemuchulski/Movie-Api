//importando express
const express = require('express');
const app = express();

app.use(express.json());

//importando AppError
const AppError = require('./utils/AppError');


//enviando erro e resposta
app.use((error, request, response, message) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
         });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});


// Porta de conexao
const PORT = 3333;
app.listen(PORT,() => console.log(`Server is running on PORT ${PORT}`));

