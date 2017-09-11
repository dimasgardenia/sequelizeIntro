'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isEmail: true,
        //msg: "email must be on format"
      }
    },
    //StudentSubjectId: DataTypes.INTEGER
  })
  Student.associate = (models)=>{
    Student.belongsToMany(models.Subject,{through: "StudentSubjectId"})
  }

  return Student;
};
