import boto3
from find_instances_by_tag import find_instances_by_tag 

def start_servers(key, value):
    # find the instances by tag key-value pair
    client = boto3.client('ec2')
    instances = find_instances_by_tag(client, key, value)

    # get ids and start instances
    ids = [i['InstanceId'] for i in instances]
    res = client.start_instances(InstanceIds = ids)

    if res and len(res['StartingInstances']) > 0:
        print('Instances started successfully: ', ids)