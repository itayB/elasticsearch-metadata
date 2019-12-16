"""
Global configurations file
"""
import os


LISTENING_PORT = int(os.getenv('LISTENING_PORT', '8080'))
ELASTICSEARCH_HOST = os.getenv('ELASTICSEARCH_HOST', 'localhost')
ELASTICSEARCH_PORT = int(os.getenv('ELASTICSEARCH_HOST', '9200'))
