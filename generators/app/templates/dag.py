"""
<%= dagDisplayName %>
=========

"""
from datetime import datetime, timedelta

from airflow import DAG
from airflow.macros import slack_status, slack_error


dag_id = '<%= dagId %>'
schedule_interval = '0 10 * * *'
default_args = {
    'owner': '<%= dagOwner %>',
    'retries': 5,
    'retry_delay': timedelta(minutes=15),
    'depends_on_past': False,
    'email': ['<%= dagEmail %>'],
    'email_on_failure': True,
    'email_on_retry': False,
    'on_success_callback': slack_status,
    #'on_retry_callback': slack_status,
    'on_failure_callback': slack_error,
}


dag = DAG(
    dag_id,
    start_date=datetime<%= startDateTuple %>,
    max_active_runs=1,
    schedule_interval=schedule_interval,
    default_args=default_args,
)
dag.doc_md = __doc__
