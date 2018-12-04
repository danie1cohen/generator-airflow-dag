'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-airflow-dag:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        dagId: 'test_dag',
        dagDisplayName: 'Test Dag Name',
        dagEmail: '123@fake.biz',
        dagOwner: 'yourid'
      });
  });

  it('creates files', () => {
    assert.file(['test_dag.py']);
  });
});
