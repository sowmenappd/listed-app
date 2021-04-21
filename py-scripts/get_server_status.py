import boto3, json
from find_instances_by_tag import find_instances_by_tag

def get_status(tag_key):
    status = {}

    client = boto3.client('ec2')
    instances = find_instances_by_tag(client, tag_key)
    for instance in instances:
        status[instance['InstanceId']] = instance['State']['Name']

    return json.dumps(status, indent=2)