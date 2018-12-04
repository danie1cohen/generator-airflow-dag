'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the glorious ${chalk.red('generator-airflow-dag')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'dagId',
        message: 'Please specify a dag id',
        default: 'dag_id'
      },
      {
        type: 'input',
        name: 'dagDisplayName',
        message: 'How about a display name?',
        default: 'Display Name'
      },
      {
        type: 'input',
        name: 'dagEmail',
        message: 'Email notifications should go to:',
        default: 'youremail@organization.com'
      },
      {
        type: 'input',
        name: 'dagOwner',
        message: 'Who is the owner of this dag?',
        default: 'yourid',
      }
    ];

    return this.prompt(prompts).then(props => {

      let startDate = new Date();
      let startDateArray = [
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        '0',
        '0',
        '0'
      ]
      props.startDateTuple = '(' + startDateArray.join(', ') + ')'
      this.props = props;
    });
  }

  writing() {
    var dagDir = path.join('./', 'dags');
    var destPath = this.props.dagId + '.py';

    if ( fs.existsSync(dagDir) ) {
      destPath = path.join(dagDir, destPath);
    } else {
      console.log(dagDir + ' does not exist');
    }

    this.fs.copyTpl(
      this.templatePath('dag.py'),
      this.destinationPath(destPath),
      this.props
    );
  }

  install() {
    // this.installDependencies();
  }
};
