const express = require('express');
const app = express();
const port = 3001;
const knex = require('./src/database/config');
const userRouter = require('./src/routes/user_route');
const officeRouter = require('./src/routes/office_route');
const areaRouter = require('./src/routes/area_route');
const managementRouter =  require('./src/routes/management_route')
const inspectionRouter = require('./src/routes/inspection_route');
const itemInspectionRouter = require('./src/routes/item_inspection_route');
const userInspectionRouter = require('./src/routes/user_ispection_route')
const body = require('body-parser');

app.use(body.json()); //Necessário para pegar o corpo da requisicao
app.use(body.urlencoded({
    extended: true
}));
app.use('/inspections',inspectionRouter)
app.use('/items',inspectionRouter);
app.use('/offices',officeRouter);
app.use('/users', userRouter);
app.use('/areas',areaRouter)
app.use('/managements', managementRouter);
app.use('/userinspections',userInspectionRouter)




app.listen(port, function (err) {
  (err) ? console.log('Ocorreu um erro ao iniciar o servidor') 
  : console.log(`Servidor iniciado com sucesso na porta ${port}`)
});
