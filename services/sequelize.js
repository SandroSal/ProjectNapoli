/**
 * sequelize module.
 * @module sequelize
 */

const Sequelize = require('sequelize');
const RuntimeVars = require('../services/RuntimeVars');
const DeptManagerModel = require('../models/dept_manager');
const DepartmentsModel = require('../models/departments');
const DeptEmployeeModel = require('../models/dept_emp');
const EmployeesModel = require('../models/employees');
const SalariesModel = require('../models/salaries');
const TitlesModel = require('../models/titles');


// Init Sequelize ORM
const sequelize = new Sequelize('employees', RuntimeVars.DB.USERNAME, RuntimeVars.DB.PASSWORD, {
  host: RuntimeVars.DB.HOST,
  port: RuntimeVars.DB.PORT,
  dialect: 'mysql',
  logging: false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Defined Models
const Departments = DepartmentsModel(sequelize, Sequelize);
const DeptManager = DeptManagerModel(sequelize, Sequelize);
const DeptEmployee = DeptEmployeeModel(sequelize, Sequelize);
const Employees = EmployeesModel(sequelize, Sequelize);
const Salaries = SalariesModel(sequelize, Sequelize);
const Titles = TitlesModel(sequelize, Sequelize);


// Associations
Titles.belongsTo(Employees);
Employees.hasMany(Titles);

Employees.hasMany(Salaries, {foreignKey: 'emp_no', sourceKey: 'emp_no'});
Salaries.belongsTo(Employees, {foreignKey: 'emp_no', targetKey: 'emp_no'});


module.exports = {
  instance: sequelize,
  DeptEmployee,
  Departments,
  DeptManager,
  Employees,
  Salaries,
  Titles
}