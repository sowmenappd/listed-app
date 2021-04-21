import os, sys
from dotenv import load_dotenv

from start_db_servers import start_servers
from stop_db_servers import stop_servers
from get_server_status import get_status

load_dotenv()

# constants
TAG_KEY = os.environ['TAG_KEY']
TAG_VALUE = os.environ['TAG_VALUE']

if len(sys.argv) == 2:
    cli_option = sys.argv[1]
    if cli_option == 'start':
        start_servers(TAG_KEY, TAG_VALUE)
    elif cli_option == 'stop':
        stop_servers(TAG_KEY, TAG_VALUE)
    elif cli_option == 'status':
        print(get_status(TAG_KEY))
    else:
        print("Invalid command line argument: {}".format(cli_option))
else:
    raise Exception("No arguments provided")