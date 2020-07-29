"""
<%= dagDisplayName %>
=========

"""
from datetime import datetime, timedelta

from airflow import DAG
from airflow.macros import handle_failure


dag_id = '<%= dagId %>'
schedule_interval = '0 0 * * *'
default_args = {
    'owner': '<%= dagOwner %>',
    'retries': 5,
    'retry_delay': timedelta(minutes=15),
    'depends_on_past': False,
    'on_failure_callback': handle_failure,
    'email': ['<%= dagEmail %>'],
    'email_on_failure': True,
    'email_on_retry': False,
}


dag = DAG(
    dag_id,
    start_date=datetime<%= startDateTuple %>,
    max_active_runs=1,
    schedule_interval=schedule_interval,
    default_args=default_args,
)
dag.doc_md = __doc__
